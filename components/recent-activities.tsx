"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Activity } from "@/models"

export function RecentActivities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch("/api/activities")
        if (!response.ok) {
          throw new Error("Failed to fetch activities")
        }
        const data = await response.json()
        setActivities(data.activities)
      } catch (error) {
        console.error("Error fetching activities:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  const getActivityColor = (type: string) => {
    switch (type) {
      case "check-in":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "check-out":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "food":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "housekeeping":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "reservation":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  if (loading) {
    return (
      <Card className="dashboard-card">
        <CardHeader className="pb-3">
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-lavender-50 dark:bg-gray-800 animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-lavender-50 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-3 w-1/2 bg-lavender-50 dark:bg-gray-800 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {activities.map((activity) => (
          <div key={activity._id} className="flex items-start gap-4">
            <Avatar className="h-10 w-10 border border-lavender-200 dark:border-gray-700">
              <AvatarImage src="/placeholder.svg" alt={activity.user} />
              <AvatarFallback className="bg-lavender-100 text-lavender-800 dark:bg-lavender-900 dark:text-lavender-200 text-xs">
                {activity.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-lavender-900 dark:text-lavender-100">{activity.user}</span>
                <Badge variant="outline" className={getActivityColor(activity.type)}>
                  {activity.type}
                </Badge>
              </div>
              <p className="text-sm text-lavender-800 dark:text-lavender-200">
                <span className="text-lavender-600 dark:text-lavender-400">{activity.action}</span>{" "}
                <span className="font-medium">{activity.details}</span>
              </p>
              <p className="text-xs text-lavender-500 dark:text-lavender-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
