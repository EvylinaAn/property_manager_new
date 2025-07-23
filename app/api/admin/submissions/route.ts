import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// Simple authentication check (in production, use proper auth)
function isAuthenticated(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  // In production, implement proper authentication
  return authHeader === "Bearer admin-token"
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const submissions = await db.getSubmissions()
    return NextResponse.json({ submissions })
  } catch (error) {
    console.error("Error fetching submissions:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}
