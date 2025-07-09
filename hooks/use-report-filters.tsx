"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type FiltersContextType = {
  filters: string[]
  toggleFilter: (category: string) => void
  resetFilters: () => void
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined)

export function ReportFiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<string[]>([])

  const toggleFilter = (category: string) => {
    setFilters((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]))
  }

  const resetFilters = () => {
    setFilters([])
  }

  return <FiltersContext.Provider value={{ filters, toggleFilter, resetFilters }}>{children}</FiltersContext.Provider>
}

export function useReportFilters() {
  const context = useContext(FiltersContext)
  if (context === undefined) {
    throw new Error("useReportFilters must be used within a ReportFiltersProvider")
  }
  return context
}

