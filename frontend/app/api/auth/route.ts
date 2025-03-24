import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// This is a helper route to check if the user is authenticated
export async function GET() {
  try {
    // Get the token from cookies
    const cookieStore = cookies()
    const token = cookieStore.get("token")

    if (!token) {
      return NextResponse.json({ authenticated: false, message: "Not authenticated" }, { status: 401 })
    }

    // Verify the token with your backend
    const response = await fetch("http://localhost:5000/api/user/verify", {
      method: "GET",
      headers: {
        Cookie: `token=${token.value}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json({ authenticated: false, message: "Invalid token" }, { status: 401 })
    }

    const data = await response.json()
    return NextResponse.json({ authenticated: true, user: data.user })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ authenticated: false, message: "Authentication error" }, { status: 500 })
  }
}

