import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { X, Monitor, Smartphone, Info, ChevronLeft, ArrowRight } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useInquiryStore, inquirySchema, type InquiryFormData } from "@/stores/inquiry-store"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileInput, MultiFileInput } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { useBreadcrumb, useHeaderAction } from "@/components/breadcrumb-context"
import useIsRtl from "@/hooks/useIsRtl"

export default function InquiryFormPage() {
  const [open, setOpen] = useState(true)
  const [_file, setFile] = useState<File | null>(null)
  const isRtl = useIsRtl()
  const navigate = useNavigate()
  const { setDraft, setAttachments } = useInquiryStore()

  const { control, handleSubmit, formState: { errors } } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { inquiryType: "", subject: "", details: "" },
  })

  function onSubmit(data: InquiryFormData) {
    setDraft(data)
    navigate("/services/inquiry")
  }

  useBreadcrumb(
    <div className="flex items-center gap-2">
      <Button
        variant="gray"
        size="icon-sm"
        className="rounded-4xl"
        aria-label="Back button"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<NavLink to="/services" />}>Services</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<NavLink to="/services/inquiry" />}>Inquiry</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Submit an Inquiry</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )

  useHeaderAction(
    <Button
      variant="gray"
      size="icon-sm"
      onClick={() => setOpen((o) => !o)}
      className="rounded-4xl"
      aria-label="Toggle info panel"
    >
      <Info className="size-4" />
    </Button>
  )

  return (
    <>
      <SidebarProvider open={open} onOpenChange={setOpen} className="min-h-[calc(100vh-60px)] bg-transparent">
        <div className="flex-1 p-6 lg:p-8 overflow-auto">

          <div className="bg-white dark:bg-[#15161E] rounded-3xl border border-[#d9dddb29] p-6 mb-6">
            <div className="flex items-center gap-3 mb-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <p className="font-mono font-bold text-base">Ahmad</p>
            </div>
            <div className="grid grid-cols-1  gap-y-3 gap-x-8 text-sm">
              <div className="flex items-center gap-6">
                <span className="text-muted-foreground w-24 shrink-0">Emirates ID</span>
                <span className="font-medium">784-1220-193949</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-muted-foreground w-24 shrink-0">Mobile</span>
                <span className="font-medium">0504003929</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-muted-foreground w-24 shrink-0">Email</span>
                <span className="font-medium">Ahmad@gmail.com</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white dark:bg-[#15161E] rounded-3xl border border-[#d9dddb29] p-6">
            <h2 className="font-mono font-bold text-base mb-6">Send an inquiry</h2>

            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Inquiry Type */}
                <Field data-invalid={!!errors.inquiryType || undefined}>
                  <FieldLabel htmlFor="inquiryType">Inquiry Type</FieldLabel>
                  <Controller
                    name="inquiryType"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="inquiryType" aria-invalid={!!errors.inquiryType}>
                          <SelectValue placeholder="Select Option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                            <SelectItem value="billing">Billing</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.inquiryType]} />
                </Field>

                {/* Subject */}
                <Field data-invalid={!!errors.subject || undefined}>
                  <FieldLabel htmlFor="subject">Subject</FieldLabel>
                  <Controller
                    name="subject"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="subject" aria-invalid={!!errors.subject}>
                          <SelectValue placeholder="Write subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="status">Status inquiry</SelectItem>
                            <SelectItem value="documents">Documents request</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.subject]} />
                </Field>
              </div>

              {/* Details */}
              <Field data-invalid={!!errors.details || undefined}>
                <FieldLabel htmlFor="details">Details</FieldLabel>
                <Controller
                  name="details"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="details"
                      placeholder="Description"
                      rows={5}
                      aria-invalid={!!errors.details}
                    />
                  )}
                />
                <FieldError errors={[errors.details]} />
              </Field>

              {/* Attachment */}
              <Field>
                <FieldLabel htmlFor="attachment">Attachment</FieldLabel>
                <FileInput id="attachment" onChange={(f) => setFile(f)} />
              </Field>

              {/* Multi-file upload */}
              <Field>
                <FieldLabel>Supporting Documents</FieldLabel>
                <MultiFileInput
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  maxFiles={5}
                  onChange={(files) => setAttachments(files)}
                />
              </Field>
            </FieldGroup>

            {/* Footer */}
            <div className="flex justify-end mt-8">
              <Button type="submit" className="gap-2 rounded-4xl px-6">
                Next
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
          </form>
        </div>

        <Sidebar
          side={isRtl ? "left" : "right"}
          variant="sidebar"
          className="border-l-0! p-4 pt-20 pointer-events-none"
          style={{ '--sidebar-width': "400px" } as React.CSSProperties}
        >
          <SidebarHeader className="flex flex-row items-center justify-between px-6 py-6 border-b border-border mb-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-8 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
                <img src="/img/icons-dual/1.svg" alt="" className="size-4 object-contain" />
              </div>
              <p className="font-mono font-bold text-sm leading-tight truncate">Inquiry</p>
            </div>
            <Button variant="gray" size="icon-sm" className="shrink-0" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </Button>
          </SidebarHeader>

          <SidebarContent className="flex flex-col gap-6 overflow-auto p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Fees</p>
                <p className="font-mono font-bold text-sm">
                  Required <Info className="inline size-3 text-muted-foreground" />
                </p>
                <p className="text-xs text-muted-foreground">AED</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Duration</p>
                <p className="font-mono font-bold text-sm">
                  2 <Info className="inline size-3 text-muted-foreground" />
                </p>
                <p className="text-xs text-muted-foreground">Working Days</p>
              </div>
            </div>

            <div className="text-sm text-muted-foreground leading-relaxed">
              This service allows the Business Sector to request the disposal of expired explosives,
              ammunition, and fireworks in an official and safe manner.{" "}
              <button className="text-primary font-medium hover:underline">more</button>
            </div>

            <div className="text-sm text-muted-foreground leading-relaxed">
              To access the service card later, click the{" "}
              <Info className="inline size-3.5" /> Informations button at the top of the page.
              <br />
              <button className="text-primary font-medium hover:underline mt-1 block">Dismiss</button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-muted aspect-video">
              <img
                src="https://placehold.co/600x340/1a1a1a/ffffff?text=▶"
                alt="Service video"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-3">Available on</p>
              <div className="flex items-center gap-4">
                <Smartphone className="size-5 text-muted-foreground" />
                <Monitor className="size-5 text-muted-foreground" />
                <span className="text-xs font-bold text-muted-foreground">SPS</span>
                <span className="text-xs font-bold text-muted-foreground border border-border rounded px-1">001</span>
                <span className="text-xs font-bold text-muted-foreground">DXI</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-8 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
                  <img src="/img/icons-dual/1.svg" alt="" className="size-4 object-contain" />
                </div>
                <div>
                  <p className="font-mono font-bold text-xs">Steps of the Application</p>
                  <p className="text-xs text-muted-foreground">A step-by-step guide to easily navigate the application process.</p>
                </div>
              </div>
              <ol className="flex flex-col gap-2">
                {["Fill up application form", "Pay service fees"].map((step, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="size-5 rounded-full bg-muted flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </>
  )
}
