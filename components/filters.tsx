"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useReportFilters } from "@/hooks/use-report-filters"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import { useState, useEffect } from "react"

const REPORT_CATEGORIES = [
  { id: "corruption", label: "Corruption" },
  { id: "safety", label: "Safety Hazards" },
  { id: "violence", label: "Violence & Crime" },
  { id: "infrastructure", label: "Infrastructure Issues" },
  { id: "water", label: "Water & Sanitation" },
  { id: "land", label: "Land Grabbing" },
  { id: "services", label: "Public Services" },
  { id: "other", label: "Other" },
]

export function Filters() {
  const { filters, toggleFilter, resetFilters } = useReportFilters()
  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      checkIfMobile()
      window.addEventListener("resize", checkIfMobile)

      return () => {
        window.removeEventListener("resize", checkIfMobile)
      }
    }
  }, [])

  const FilterContent = () => (
    <div className="space-y-4">
      <div className="space-y-3">
        {REPORT_CATEGORIES.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={`${category.id}${isMobile ? "-mobile" : ""}`}
              checked={filters.includes(category.id)}
              onCheckedChange={() => toggleFilter(category.id)}
            />
            <Label htmlFor={`${category.id}${isMobile ? "-mobile" : ""}`}>{category.label}</Label>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full" onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  )

  // Mobile view - show as a sheet
  if (isMobile) {
    return (
      <div className="fixed bottom-4 left-4 z-10">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="secondary" className="rounded-full shadow-md">
              <Filter className="h-5 w-5 mr-2" />
              <span>Filters</span>
              {filters.length > 0 && (
                <span className="ml-2 rounded-full bg-primary text-primary-foreground w-5 h-5 flex items-center justify-center text-xs">
                  {filters.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70vh] rounded-t-xl">
            <div className="pt-6">
              <CardTitle className="mb-4">Filter Reports</CardTitle>
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    )
  }

  // Desktop view - show as a sidebar
  return (
    <Card className="md:w-72 m-4 h-fit">
      <CardHeader>
        <CardTitle>Filter Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <FilterContent />
      </CardContent>
    </Card>
  )
}

