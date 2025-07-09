"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import { MapFallback } from "@/components/map-fallback"

// Dynamically import the ReportMap component with no SSR
const ReportMap = dynamic(() => import("@/components/report-map"), {
  ssr: false,
  loading: () => <MapFallback />,
})

export function MapClientWrapper() {
  return (
    <Suspense fallback={<MapFallback />}>
      <ReportMap />
    </Suspense>
  )
}

