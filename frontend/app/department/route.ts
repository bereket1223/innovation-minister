import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const phone = searchParams.get("phone")

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 })
    }

    // Forward the request to your backend API
    const response = await fetch(`http://localhost:5000/api/department?phone=${phone}`, {
      headers: {
        // Forward any auth cookies or headers as needed
        Cookie: request.headers.get("cookie") || "",
        Authorization: request.headers.get("authorization") || "",
      },
    })

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching department data:", error)
    return NextResponse.json({ error: "Failed to fetch department data" }, { status: 500 })
  }
}

