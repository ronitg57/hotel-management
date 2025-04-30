"use client"

import { Bell, Search, User, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-lavender-200 dark:border-gray-800 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-lavender-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-10 bg-lavender-50 dark:bg-gray-800 border-lavender-200 dark:border-gray-700 focus-visible:ring-lavender-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full border-lavender-200 dark:border-gray-700">
          <HelpCircle className="h-5 w-5 text-lavender-600 dark:text-lavender-300" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative rounded-full border-lavender-200 dark:border-gray-700"
            >
              <Bell className="h-5 w-5 text-lavender-600 dark:text-lavender-300" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="p-3 cursor-pointer">
                <div className="flex flex-col gap-1">
                  <div className="font-medium">New Reservation</div>
                  <div className="text-sm text-muted-foreground">John Smith booked Room 302 for Apr 15-18</div>
                  <div className="text-xs text-muted-foreground">10 minutes ago</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer">
                <div className="flex flex-col gap-1">
                  <div className="font-medium">Housekeeping Request</div>
                  <div className="text-sm text-muted-foreground">Room 201 requested fresh towels</div>
                  <div className="text-xs text-muted-foreground">25 minutes ago</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer">
                <div className="flex flex-col gap-1">
                  <div className="font-medium">Food Order</div>
                  <div className="text-sm text-muted-foreground">Room 105 ordered room service</div>
                  <div className="text-xs text-muted-foreground">1 hour ago</div>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center font-medium text-lavender-600 dark:text-lavender-300">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 gap-2 pl-2 pr-4 rounded-full">
              <Avatar className="h-8 w-8 border border-lavender-200 dark:border-gray-700">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-lavender-200 text-lavender-800">AD</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm hidden sm:inline">Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">admin@lavenderluxury.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

// Import the missing icons
import { Settings, LogOut } from "lucide-react"
