'use client'

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"
import type React from "react" // Added import for React
import { useParams, usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Your Website",
//   description: "A website with home, services, and blog",
//     generator: 'v0.dev'
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname= usePathname()
  const p = pathname.startsWith('/dashboard') || pathname.startsWith('/form')

  return (
    <html lang="en">
      <body className={inter.className}>
        {
         !p && <Navbar />
          }
        <main>{children}</main>
      </body>
    </html>
  )
}



import './globals.css'