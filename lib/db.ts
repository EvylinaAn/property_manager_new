export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  propertyType?: string
  location?: string
  message?: string
  createdAt: Date
  status: "new" | "contacted" | "closed"
}

// In-memory storage (replace with real database in production)
const submissions: ContactSubmission[] = []

export const db = {
  // Create a new contact submission
  createSubmission: async (
    data: Omit<ContactSubmission, "id" | "createdAt" | "status">,
  ): Promise<ContactSubmission> => {
    const submission: ContactSubmission = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      status: "new",
    }

    submissions.push(submission)
    return submission
  },

  // Get all submissions
  getSubmissions: async (): Promise<ContactSubmission[]> => {
    return submissions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  },

  // Get submission by ID
  getSubmissionById: async (id: string): Promise<ContactSubmission | null> => {
    return submissions.find((s) => s.id === id) || null
  },

  // Update submission status
  updateSubmissionStatus: async (
    id: string,
    status: ContactSubmission["status"],
  ): Promise<ContactSubmission | null> => {
    const submission = submissions.find((s) => s.id === id)
    if (submission) {
      submission.status = status
      return submission
    }
    return null
  },

  // Delete submission
  deleteSubmission: async (id: string): Promise<boolean> => {
    const index = submissions.findIndex((s) => s.id === id)
    if (index > -1) {
      submissions.splice(index, 1)
      return true
    }
    return false
  },
}
