/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Mail, Phone, MapPin, Calendar, Building2 } from "lucide-react"
import type { ContactSubmission } from "@/lib/db"
import { toast } from "sonner"

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "new" | "contacted" | "closed">("all")

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/admin/submissions", {
        headers: {
          Authorization: "Bearer admin-token",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions)
      }
    } catch (error) {
      toast.error("Failed to fetch submissions")
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: ContactSubmission["status"]) => {
    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer admin-token",
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setSubmissions((prev) => prev.map((sub) => (sub.id === id ? { ...sub, status } : sub)))
        toast.success("Status updated successfully")
      }
    } catch (error) {
      toast.error("Failed to update status")
    }
  }

  const deleteSubmission = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return

    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer admin-token",
        },
      })

      if (response.ok) {
        setSubmissions((prev) => prev.filter((sub) => sub.id !== id))
        toast.success("Submission deleted successfully")
      }
    } catch (error) {
      toast.error("Failed to delete submission")
    }
  }

  const filteredSubmissions = submissions.filter((sub) => filter === "all" || sub.status === filter)

  const getStatusColor = (status: ContactSubmission["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-500"
      case "contacted":
        return "bg-yellow-500"
      case "closed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container py-8 m-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage property inquiries and contact submissions</p>
          </div>

          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Submissions</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
              <Badge className="bg-blue-500">New</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions.filter((s) => s.status === "new").length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contacted</CardTitle>
              <Badge className="bg-yellow-500">In Progress</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions.filter((s) => s.status === "contacted").length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Recent Submissions</h2>

          {filteredSubmissions.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">No submissions found</CardContent>
            </Card>
          ) : (
            filteredSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        {submission.name}
                        <Badge className={getStatusColor(submission.status)}>{submission.status}</Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {submission.email}
                        </span>
                        {submission.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {submission.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </span>
                      </CardDescription>
                    </div>

                    <div className="flex gap-2">
                      <Select
                        value={submission.status}
                        onValueChange={(value: ContactSubmission["status"]) => updateStatus(submission.id, value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button variant="outline" size="sm" onClick={() => deleteSubmission(submission.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {(submission.propertyType || submission.location) && (
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      {submission.propertyType && (
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {submission.propertyType}
                        </span>
                      )}
                      {submission.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {submission.location}
                        </span>
                      )}
                    </div>
                  )}

                  {submission.message && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Message:</h4>
                      <p className="text-sm text-muted-foreground bg-muted p-3 rounded">{submission.message}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
