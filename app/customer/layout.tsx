import type React from "react"
import { Inter } from "next/font/google"
import { CustomerHeader } from "@/components/customer/header"
import { CustomerFooter } from "@/components/customer/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="flex min-h-screen flex-col">
          <CustomerHeader />
          <main className="flex-1">{children}</main>
          <CustomerFooter />
        </div>
        <Toaster />
      </ThemeProvider>
    </div>
  )
}
