import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sendContactEmail, sendAutoReply } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const propertyType = formData.get("propertyType") as string
    const location = formData.get("location") as string
    const message = formData.get("message") as string

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Save to database
    const submission = await db.createSubmission({
      name,
      email,
      phone: phone || undefined,
      propertyType: propertyType || undefined,
      location: location || undefined,
      message: message || undefined,
    })

    // Send emails
    await Promise.all([
      sendContactEmail({ name, email, phone, propertyType, location, message }),
      sendAutoReply(email, name),
    ])

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      submissionId: submission.id,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to process contact form" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const submissions = await db.getSubmissions()
    return NextResponse.json({ submissions })
  } catch (error) {
    console.error("Error fetching submissions:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}
