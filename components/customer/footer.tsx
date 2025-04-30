import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function CustomerFooter() {
  return (
    <footer className="bg-lavender-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-lavender-400 to-lavender-600 flex items-center justify-center">
                <span className="text-white font-bold text-xl">LL</span>
              </div>
              <span className="font-bold text-xl">Lavender Luxury</span>
            </div>
            <p className="text-lavender-200 mb-4">
              Experience luxury and comfort in the heart of the city. Our hotel offers the perfect blend of elegance and
              modern amenities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-lavender-200 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-lavender-200 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-lavender-200 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-lavender-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rooms" className="text-lavender-200 hover:text-white">
                  Rooms
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-lavender-200 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-lavender-200 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-lavender-200 hover:text-white">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-lavender-200 space-y-2">
              <p>123 Luxury Avenue, City Center</p>
              <p>New Delhi, 110001</p>
              <p>Phone: +91 98765 43210</p>
              <p>Email: info@lavenderluxury.com</p>
            </address>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-lavender-200 mb-4">Subscribe to our newsletter for special offers and updates.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-900"
              />
              <button type="submit" className="bg-lavender-600 hover:bg-lavender-500 px-4 py-2 rounded-r-md">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-lavender-800 mt-8 pt-8 text-center text-lavender-300">
          <p>&copy; {new Date().getFullYear()} Lavender Luxury Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
