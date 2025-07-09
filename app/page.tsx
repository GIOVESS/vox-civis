import { Filters } from "@/components/filters"
import { Header } from "@/components/header"
import { MapClientWrapper } from "@/components/map-client-wrapper"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-col md:flex-row flex-1">
        <Filters />
        <MapClientWrapper />
      </div>
    </main>
  )
}

