"use client"

import { useEffect, useState } from "react"
import { Users, Hotel, Utensils, CreditCard } from "lucide-react"
import type { DashboardStat } from "@/models"

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/dashboard-stats")
        if (!response.ok) {
          throw new Error("Failed to fetch stats")
        }
        const data = await response.json()
        setStats(data.stats)
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return <Users className="h-6 w-6" />
      case "Hotel":
        return <Hotel className="h-6 w-6" />
      case "Utensils":
        return <Utensils className="h-6 w-6" />
      case "CreditCard":
        return <CreditCard className="h-6 w-6" />
      default:
        return <Users className="h-6 w-6" />
    }
  }

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="stats-card animate-pulse">
            <div className="stats-card-icon bg-lavender-50"></div>
            <div className="h-8 w-24 bg-lavender-50 rounded mb-2"></div>
            <div className="h-4 w-full bg-lavender-50 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat._id} className="stats-card">
          <div className="stats-card-icon">{getIcon(stat.icon)}</div>
          <div className="stats-value">{stat.value}</div>
          <div className="flex items-center justify-between">
            <div className="stats-label">{stat.title}</div>
            <div className="text-xs font-medium text-green-600">{stat.change}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
