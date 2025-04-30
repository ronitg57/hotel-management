"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

export function CustomerHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-lavender-100 dark:border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-lavender-400 to-lavender-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">LL</span>
            </div>
            <Link href="/" className="font-bold text-xl text-lavender-900 dark:text-lavender-100">
              Lavender Luxury
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-lavender-600 ${
                    pathname === item.href
                      ? "text-lavender-600 dark:text-lavender-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-lavender-300" />
                  ) : (
                    <Moon className="h-5 w-5 text-lavender-600" />
                  )}
                </Button>
              )}

              <Button asChild className="bg-lavender-600 hover:bg-lavender-700">
                <Link href="/booking">Book Now</Link>
              </Button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full mr-2"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-lavender-300" />
                ) : (
                  <Moon className="h-5 w-5 text-lavender-600" />
                )}
              </Button>
            )}

            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-lavender-100 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-lavender-600 ${
                    pathname === item.href
                      ? "text-lavender-600 dark:text-lavender-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <Button asChild className="bg-lavender-600 hover:bg-lavender-700 w-full">
              <Link href="/booking" onClick={() => setIsOpen(false)}>
                Book Now
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
