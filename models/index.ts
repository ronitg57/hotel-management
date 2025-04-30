export interface Room {
  _id?: string
  number: string
  type: string
  floor: string
  status: string
  price: string
  amenities: string[]
  createdAt?: Date
  updatedAt?: Date
}

export interface Reservation {
  _id?: string
  guest: string
  roomType: string
  roomNumber?: string
  checkIn: Date | string
  checkOut: Date | string
  status: string
  payment: string
  specialRequests?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface FoodOrder {
  _id?: string
  room: string
  items: {
    name: string
    price: string
    quantity: number
  }[]
  total: string
  status: string
  notes?: string
  time: string
  createdAt?: Date
  updatedAt?: Date
}

export interface HousekeepingRequest {
  _id?: string
  room: string
  time: string
  services: string[]
  notes?: string
  status: string
  requested: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ServiceRequest {
  _id?: string
  room: string
  type: string
  details: string
  time: string
  status: string
  priority: string
  requested: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Invoice {
  _id?: string
  id: string
  guest: string
  room: string
  checkIn: string
  checkOut: string
  amount: string
  status: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Activity {
  _id?: string
  user: string
  action: string
  details: string
  time: string
  avatar: string
  type: string
  createdAt?: Date
  updatedAt?: Date
}

export interface DashboardStat {
  _id?: string
  title: string
  value: string | number
  change: string
  icon: string
  createdAt?: Date
  updatedAt?: Date
}

export interface RevenueData {
  _id?: string
  period: string
  data: {
    name: string
    total: number
  }[]
  totalRevenue: string
  createdAt?: Date
  updatedAt?: Date
}

export interface MenuItem {
  _id?: string
  id: number
  name: string
  price: string
  description: string
  category: string
  createdAt?: Date
  updatedAt?: Date
}
