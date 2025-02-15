import type React from "react"
import { Sidebar } from "./components/Sidebar"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

