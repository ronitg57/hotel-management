"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import type { RevenueData } from "@/models"

export function RevenueChart() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("monthly")
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    async function fetchRevenueData() {
      try {
        const response = await fetch(`/api/revenue?period=${activeTab}`)
        if (!response.ok) {
          throw new Error("Failed to fetch revenue data")
        }
        const data = await response.json()
        setRevenueData(data.revenueData)
      } catch (error) {
        console.error("Error fetching revenue data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (mounted) {
      setLoading(true)
      fetchRevenueData()
    }
  }, [activeTab, mounted])

  if (!mounted || loading) {
    return (
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Hotel revenue over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="animate-pulse bg-lavender-100 dark:bg-gray-800 w-full h-[250px] rounded-lg"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-3">
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Hotel revenue over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList className="grid w-[200px] grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
            </TabsList>
            <div className="text-sm font-medium text-lavender-700 dark:text-lavender-300">
              Total Revenue: {revenueData?.totalRevenue || "$0"}
            </div>
          </div>
          <TabsContent value="monthly" className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData?.data || []}>
                <XAxis
                  dataKey="name"
                  stroke={theme === "dark" ? "#9370DB" : "#7B2CBF"}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={theme === "dark" ? "#9370DB" : "#7B2CBF"}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#1F2937" : "#FFF",
                    borderColor: theme === "dark" ? "#374151" : "#E6E6FA",
                  }}
                  formatter={(value) => [`$${value}`, "Revenue"]}
                />
                <Bar dataKey="total" fill={theme === "dark" ? "#9370DB" : "#8A4FD1"} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="weekly" className="space-y-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData?.data || []}>
                <XAxis
                  dataKey="name"
                  stroke={theme === "dark" ? "#9370DB" : "#7B2CBF"}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={theme === "dark" ? "#9370DB" : "#7B2CBF"}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#1F2937" : "#FFF",
                    borderColor: theme === "dark" ? "#374151" : "#E6E6FA",
                  }}
                  formatter={(value) => [`$${value}`, "Revenue"]}
                />
                <Bar dataKey="total" fill={theme === "dark" ? "#9370DB" : "#8A4FD1"} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
