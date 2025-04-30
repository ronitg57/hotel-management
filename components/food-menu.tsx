"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import type { MenuItem } from "@/models"

export function FoodMenu() {
  const [menuItems, setMenuItems] = useState<Record<string, MenuItem[]>>({
    breakfast: [],
    lunch: [],
    dinner: [],
    desserts: [],
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("breakfast")

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const response = await fetch("/api/menu-items")
        if (!response.ok) {
          throw new Error("Failed to fetch menu items")
        }
        const data = await response.json()

        // Group items by category
        const groupedItems: Record<string, MenuItem[]> = {}
        data.menuItems.forEach((item: MenuItem) => {
          if (!groupedItems[item.category]) {
            groupedItems[item.category] = []
          }
          groupedItems[item.category].push(item)
        })

        setMenuItems(groupedItems)
      } catch (error) {
        console.error("Error fetching menu items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  if (loading) {
    return (
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-lavender-900">Food Menu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-10 bg-lavender-50 dark:bg-gray-800 rounded-lg mb-4"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 bg-lavender-50 dark:bg-gray-800 rounded-lg"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-lavender-900">Food Menu</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="breakfast" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="dinner">Dinner</TabsTrigger>
            <TabsTrigger value="desserts">Desserts</TabsTrigger>
          </TabsList>

          {Object.entries(menuItems).map(([category, items]) => (
            <TabsContent key={category} value={category} className="space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-8 text-lavender-600 dark:text-lavender-400">
                  No items found in this category
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-start p-3 border border-lavender-100 dark:border-gray-800 rounded-lg hover:bg-lavender-50 dark:hover:bg-gray-900"
                  >
                    <div>
                      <h3 className="font-medium text-lavender-900 dark:text-lavender-100">{item.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                      <p className="text-sm font-semibold text-lavender-700 dark:text-lavender-300 mt-1">
                        {item.price}
                      </p>
                    </div>
                    <Button size="sm" className="bg-lavender-600 hover:bg-lavender-700 text-white">
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
