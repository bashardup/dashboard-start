import { create } from "zustand"
import { z } from "zod"

export const inquirySchema = z.object({
  inquiryType: z.string().min(1, "Inquiry type is required"),
  subject: z.string().min(1, "Subject is required"),
  details: z.string().min(10, "Details must be at least 10 characters"),
})

export type InquiryFormData = z.infer<typeof inquirySchema>

interface InquiryStore {
  draft: Partial<InquiryFormData>
  attachments: File[]
  setDraft: (data: Partial<InquiryFormData>) => void
  setAttachments: (files: File[]) => void
  reset: () => void
}

export const useInquiryStore = create<InquiryStore>((set) => ({
  draft: {},
  attachments: [],
  setDraft: (data) => set((s) => ({ draft: { ...s.draft, ...data } })),
  setAttachments: (files) => set({ attachments: files }),
  reset: () => set({ draft: {}, attachments: [] }),
}))
