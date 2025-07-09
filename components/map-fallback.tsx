export function MapFallback() {
  return (
    <div className="flex-1 flex items-center justify-center bg-muted/20">
      <div className="text-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <h3 className="text-lg font-medium mb-2">Loading Map</h3>
        <p className="text-muted-foreground">Please wait while we load the interactive map...</p>
      </div>
    </div>
  )
}

