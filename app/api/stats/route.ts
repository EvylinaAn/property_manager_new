import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const submissions = await db.getSubmissions()

    const stats = {
      total: submissions.length,
      new: submissions.filter((s) => s.status === "new").length,
      contacted: submissions.filter((s) => s.status === "contacted").length,
      closed: submissions.filter((s) => s.status === "closed").length,
      thisMonth: submissions.filter((s) => {
        const submissionDate = new Date(s.createdAt)
        const now = new Date()
        return submissionDate.getMonth() === now.getMonth() && submissionDate.getFullYear() === now.getFullYear()
      }).length,
      propertyTypes: submissions.reduce(
        (acc, s) => {
          if (s.propertyType) {
            acc[s.propertyType] = (acc[s.propertyType] || 0) + 1
          }
          return acc
        },
        {} as Record<string, number>,
      ),
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
