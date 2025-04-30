"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Hotel,
  Calendar,
  Utensils,
  Brush,
  Car,
  CreditCard,
  Settings,
  Menu,
  X,
  LogOut,
  Moon,
  Sun,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const routes = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Rooms", path: "/rooms", icon: Hotel },
    { name: "Reservations", path: "/reservations", icon: Calendar },
    { name: "Food Orders", path: "/services/food", icon: Utensils },
    { name: "Housekeeping", path: "/services/housekeeping", icon: Brush },
    { name: "Service Requests", path: "/services/requests", icon: Car },
    { name: "Billing", path: "/billing", icon: CreditCard },
    { name: "Settings", path: "/settings", icon: Settings },
  ]

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <aside
        className={cn(
          "bg-white dark:bg-gray-900 border-r border-lavender-200 dark:border-gray-800 w-72 fixed inset-y-0 left-0 z-40 transition-transform duration-300 transform shadow-md",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="p-6 border-b border-lavender-200 dark:border-gray-800 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-lavender-400 to-lavender-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">LL</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-lavender-900 dark:text-lavender-100">Lavender Luxury</h1>
            <p className="text-sm text-lavender-600 dark:text-lavender-300">Hotel Management</p>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3 mb-6 p-3 bg-lavender-50 dark:bg-gray-800 rounded-lg">
            <Avatar className="h-10 w-10 border-2 border-lavender-200">
              <AvatarImage src="/placeholder.svg" alt="Admin" />
              <AvatarFallback className="bg-lavender-200 text-lavender-800">AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-lavender-900 dark:text-lavender-100 truncate">Admin User</p>
              <p className="text-xs text-lavender-600 dark:text-lavender-300 truncate">admin@lavenderluxury.com</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <CreditCard className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-1">
            {routes.map((route) => {
              const isActive = pathname === route.path
              const Icon = route.icon

              return (
                <Link
                  key={route.path}
                  href={route.path}
                  className={cn("sidebar-item", isActive ? "active" : "text-lavender-800 dark:text-lavender-200")}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon
                    className={cn("h-5 w-5", isActive ? "text-white" : "text-lavender-600 dark:text-lavender-300")}
                  />
                  {route.name}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-lavender-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-lavender-600 dark:text-lavender-300">© 2023 Lavender Luxury</span>
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
          </div>
        </div>
      </aside>
    </>
  )
}
