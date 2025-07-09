"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { useReportFilters } from "@/hooks/use-report-filters"
import { fetchReports } from "@/lib/api"
import type { Report } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Clock, Locate } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import dynamic from "next/dynamic"

// Dynamically import Leaflet components with no SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

// Kenya's coordinates
const KENYA_CENTER = [-1.2921, 36.8219] // Nairobi
const KENYA_ZOOM = 7

// Different colors for different categories
const colorMap: Record<string, string> = {
  corruption: "red",
  safety: "orange",
  violence: "purple",
  infrastructure: "blue",
  water: "cyan",
  land: "green",
  services: "yellow",
  other: "gray",
}

export default function ReportMap() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { filters } = useReportFilters()
  const [mapReady, setMapReady] = useState(false)
  const leafletRef = useRef<any>(null)
  const mapRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)

  useEffect(() => {
    // Fix Leaflet icon issues
    const fixLeafletIcon = async () => {
      try {
        // Only load in browser environment
        if (typeof window !== "undefined") {
          const L = await import("leaflet")
          leafletRef.current = L

          // Fix the icon paths
          delete L.Icon.Default.prototype._getIconUrl
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
            iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
            shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
          })

          setMapReady(true)
        }
      } catch (err) {
        console.error("Failed to load Leaflet:", err)
        setError("Failed to load map. Please try again later.")
      }
    }

    fixLeafletIcon()

    async function loadReports() {
      try {
        setLoading(true)
        const data = await fetchReports()
        setReports(data)
      } catch (err) {
        setError("Failed to load reports. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadReports()

    // Refresh data every 5 minutes
    const interval = setInterval(loadReports, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Function to create marker icons - only called after Leaflet is loaded
  const getMarkerIcon = (category: string) => {
    if (!leafletRef.current) return null

    const L = leafletRef.current
    const color = colorMap[category] || "gray"

    return L.divIcon({
      className: `marker-icon marker-${color}`,
      html: `<div class="w-6 h-6 rounded-full bg-${color}-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold"></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    })
  }

  // Get user's current location
  const getUserLocation = () => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation([latitude, longitude])

          // Center map on user's location if map is available
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 12)
          }
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
    }
  }

  // Filter reports based on selected categories
  const filteredReports = filters.length > 0 ? reports.filter((report) => filters.includes(report.category)) : reports

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading reports...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Error Loading Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 relative" ref={mapContainerRef}>
      {/* Add Leaflet CSS directly via a style tag */}
      <style jsx global>{`
        /* Leaflet CSS */
        .leaflet-container {
          height: 100%;
          width: 100%;
          z-index: 1;
        }
        .leaflet-pane,
        .leaflet-tile,
        .leaflet-marker-icon,
        .leaflet-marker-shadow,
        .leaflet-tile-container,
        .leaflet-pane > svg,
        .leaflet-pane > canvas,
        .leaflet-zoom-box,
        .leaflet-image-layer,
        .leaflet-layer {
          position: absolute;
          left: 0;
          top: 0;
        }
        .leaflet-container {
          overflow: hidden;
        }
        .leaflet-tile,
        .leaflet-marker-icon,
        .leaflet-marker-shadow {
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
          -webkit-user-drag: none;
        }
        .leaflet-tile::selection {
          background: transparent;
        }
        .leaflet-safari .leaflet-tile {
          image-rendering: -webkit-optimize-contrast;
        }
        .leaflet-safari .leaflet-tile-container {
          width: 1600px;
          height: 1600px;
          -webkit-transform-origin: 0 0;
        }
        .leaflet-marker-icon,
        .leaflet-marker-shadow {
          display: block;
        }
        .leaflet-container .leaflet-overlay-pane svg {
          max-width: none !important;
          max-height: none !important;
        }
        .leaflet-container .leaflet-marker-pane img,
        .leaflet-container .leaflet-shadow-pane img,
        .leaflet-container .leaflet-tile-pane img,
        .leaflet-container img.leaflet-image-layer,
        .leaflet-container .leaflet-tile {
          max-width: none !important;
          max-height: none !important;
          width: auto;
          padding: 0;
        }
        
        /* Custom marker styles */
        .marker-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .marker-cyan div {
          background-color: rgb(6, 182, 212);
        }
        .marker-green div {
          background-color: rgb(34, 197, 94);
        }
        .marker-yellow div {
          background-color: rgb(234, 179, 8);
        }
        .marker-red div {
          background-color: rgb(239, 68, 68);
        }
        .marker-orange div {
          background-color: rgb(249, 115, 22);
        }
        .marker-purple div {
          background-color: rgb(168, 85, 247);
        }
        .marker-blue div {
          background-color: rgb(59, 130, 246);
        }
        .marker-gray div {
          background-color: rgb(107, 114, 128);
        }
        
        /* Additional Leaflet styles */
        .leaflet-container {
          background: #ddd;
          outline-offset: 1px;
        }
        .leaflet-control {
          position: relative;
          z-index: 800;
          pointer-events: auto;
        }
        .leaflet-top,
        .leaflet-bottom {
          position: absolute;
          z-index: 1000;
          pointer-events: none;
        }
        .leaflet-top {
          top: 0;
        }
        .leaflet-right {
          right: 0;
        }
        .leaflet-bottom {
          bottom: 0;
        }
        .leaflet-left {
          left: 0;
        }
        .leaflet-control {
          float: left;
          clear: both;
        }
        .leaflet-right .leaflet-control {
          float: right;
        }
        .leaflet-top .leaflet-control {
          margin-top: 10px;
        }
        .leaflet-bottom .leaflet-control {
          margin-bottom: 10px;
        }
        .leaflet-left .leaflet-control {
          margin-left: 10px;
        }
        .leaflet-right .leaflet-control {
          margin-right: 10px;
        }
        .leaflet-touch .leaflet-bar {
          border: 2px solid rgba(0, 0, 0, 0.2);
          background-clip: padding-box;
        }
        .leaflet-bar {
          box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
          border-radius: 4px;
        }
        .leaflet-bar a,
        .leaflet-bar a:hover {
          background-color: #fff;
          border-bottom: 1px solid #ccc;
          width: 26px;
          height: 26px;
          line-height: 26px;
          display: block;
          text-align: center;
          text-decoration: none;
          color: black;
        }
        .leaflet-bar a:hover {
          background-color: #f4f4f4;
        }
        .leaflet-bar a:first-child {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        }
        .leaflet-bar a:last-child {
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          border-bottom: none;
        }
        .leaflet-bar a.leaflet-disabled {
          cursor: default;
          background-color: #f4f4f4;
          color: #bbb;
        }
        .leaflet-touch .leaflet-bar a {
          width: 30px;
          height: 30px;
          line-height: 30px;
        }
        .leaflet-touch .leaflet-bar a:first-child {
          border-top-left-radius: 2px;
          border-top-right-radius: 2px;
        }
        .leaflet-touch .leaflet-bar a:last-child {
          border-bottom-left-radius: 2px;
          border-bottom-right-radius: 2px;
        }
      `}</style>

      {mapReady && leafletRef.current && (
        <MapContainer
          center={KENYA_CENTER}
          zoom={KENYA_ZOOM}
          style={{ height: "calc(100vh - 4rem)", width: "100%" }}
          scrollWheelZoom={true}
          whenCreated={(map) => {
            mapRef.current = map
            // Force a resize after map is created to ensure it fills container
            setTimeout(() => {
              map.invalidateSize()
            }, 100)
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredReports.map((report) => (
            <Marker
              key={report.id}
              position={[report.latitude, report.longitude]}
              icon={getMarkerIcon(report.category)}
            >
              <Popup>
                <div className="max-w-xs">
                  <h3 className="font-bold text-lg">{report.title}</h3>
                  <Badge className="mb-2">{report.category}</Badge>
                  <p className="text-sm mb-2">{report.description}</p>
                  {report.imageUrl && (
                    <img
                      src={report.imageUrl || "/placeholder.svg"}
                      alt="Report evidence"
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                  )}
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {userLocation && (
            <Marker
              position={userLocation}
              icon={leafletRef.current.divIcon({
                className: "user-location-marker",
                html: `<div class="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold animate-pulse"></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12],
              })}
            >
              <Popup>
                <div className="text-center">
                  <p className="font-medium">Your Location</p>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}

      {/* Location button */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute bottom-20 right-4 z-10 rounded-full shadow-md"
        onClick={getUserLocation}
      >
        <Locate className="h-5 w-5" />
      </Button>

      <div className="absolute bottom-4 right-4 z-10">
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-muted-foreground">
              Showing {filteredReports.length} of {reports.length} reports
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

