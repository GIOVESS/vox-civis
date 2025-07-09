"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MegaphoneIcon, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <MegaphoneIcon className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">VoxCivis</h1>
          <p className="hidden md:block text-sm text-muted-foreground">Sauti ya Wananchi</p>
        </div>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                href="/"
                className="text-lg font-medium px-2 py-2 hover:bg-muted rounded-md"
                onClick={() => setOpen(false)}
              >
                Map
              </Link>
              <Link
                href="/about"
                className="text-lg font-medium px-2 py-2 hover:bg-muted rounded-md"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
              <Button asChild className="mt-4">
                <a
                  href="https://forms.gle/A6EFQkwJTKw6sr2T7"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  Submit Report
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/" className="text-sm font-medium">
            Map
          </Link>
          <Link href="/about" className="text-sm font-medium">
            About
          </Link>
          <Button asChild>
            <a href="https://forms.gle/A6EFQkwJTKw6sr2T7" target="_blank" rel="noopener noreferrer">
              Submit Report
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}

