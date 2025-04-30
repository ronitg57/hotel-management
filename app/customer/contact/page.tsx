"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setSubmitMessage({
        type: "success",
        text: "Thank you for your message! We'll get back to you soon.",
      })
      setIsSubmitting(false)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-lavender-900 mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card className="border-lavender-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-lavender-100 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-lavender-600" />
            </div>
            <h3 className="text-lg font-medium text-lavender-900 mb-2">Our Location</h3>
            <p className="text-gray-700">123 Luxury Avenue, City Center</p>
            <p className="text-gray-700">New Delhi, 110001</p>
          </CardContent>
        </Card>

        <Card className="border-lavender-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-lavender-100 flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-lavender-600" />
            </div>
            <h3 className="text-lg font-medium text-lavender-900 mb-2">Phone</h3>
            <p className="text-gray-700">Reservations: +91 98765 43210</p>
            <p className="text-gray-700">Reception: +91 98765 43211</p>
          </CardContent>
        </Card>

        <Card className="border-lavender-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-lavender-100 flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-lavender-600" />
            </div>
            <h3 className="text-lg font-medium text-lavender-900 mb-2">Email</h3>
            <p className="text-gray-700">info@lavenderluxury.com</p>
            <p className="text-gray-700">reservations@lavenderluxury.com</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-lavender-800 mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="border-lavender-200"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="border-lavender-200"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                required
                className="border-lavender-200"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                className="border-lavender-200 min-h-[150px]"
              />
            </div>

            <Button type="submit" className="bg-lavender-600 hover:bg-lavender-700 w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>

            {submitMessage && (
              <div
                className={`p-3 rounded-md ${
                  submitMessage.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                }`}
              >
                {submitMessage.text}
              </div>
            )}
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-lavender-800 mb-6">Opening Hours</h2>
          <Card className="border-lavender-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-lavender-600 mr-2" />
                <h3 className="text-lg font-medium text-lavender-900">Reception</h3>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-700">Monday - Sunday</span>
                  <span className="font-medium text-lavender-900">24 Hours</span>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-lavender-600 mr-2" />
                <h3 className="text-lg font-medium text-lavender-900">Restaurant</h3>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-700">Breakfast</span>
                  <span className="font-medium text-lavender-900">6:30 AM - 10:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Lunch</span>
                  <span className="font-medium text-lavender-900">12:30 PM - 3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Dinner</span>
                  <span className="font-medium text-lavender-900">7:00 PM - 11:00 PM</span>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-lavender-600 mr-2" />
                <h3 className="text-lg font-medium text-lavender-900">Spa & Fitness</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Monday - Friday</span>
                  <span className="font-medium text-lavender-900">7:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Saturday - Sunday</span>
                  <span className="font-medium text-lavender-900">8:00 AM - 8:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
