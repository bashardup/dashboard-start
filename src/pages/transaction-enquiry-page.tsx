import { useState, useEffect, useCallback } from "react"
import { useNavigate, NavLink } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { useLottie } from "lottie-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-input"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useBreadcrumb } from "@/components/breadcrumb-context"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Icon34Data from "@/components/lottie/Icon_34.json"

/* ── Schema ── */

const enquirySchema = z.object({
  referenceNo: z
    .string()
    .min(1, "Reference number is required")
    .regex(/^[A-Za-z0-9-]+$/, "Only letters, numbers and dashes"),
  phone: z
    .string()
    .min(7, "Phone number is required"),
})

type EnquiryFormData = z.infer<typeof enquirySchema>

/* ── Lottie helper ── */

function LottieIcon({ data, className }: { data: object; className?: string }) {
  const { View } = useLottie({ animationData: data, loop: true, autoplay: true, style: { width: "100%", height: "100%" } })
  return <div className={className}>{View}</div>
}

/* ── Countdown ── */

const INITIAL_SECONDS = 146

function useCountdown(active: boolean) {
  const [seconds, setSeconds] = useState(INITIAL_SECONDS)

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000)
    return () => {
      clearInterval(id)
      setSeconds(INITIAL_SECONDS)
    }
  }, [active])

  const reset = useCallback(() => setSeconds(INITIAL_SECONDS), [])
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0")
  const ss = String(seconds % 60).padStart(2, "0")

  return { label: `${mm}:${ss} mins`, expired: seconds === 0, reset }
}

/* ── Modal content ── */

type Step = "form" | "otp"

function TransactionEnquiryModal({ onConfirmed }: { onConfirmed?: () => void }) {
  const [step, setStep] = useState<Step>("form")
  const countdown = useCountdown(step === "otp")

  const { control, handleSubmit, formState: { errors } } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { referenceNo: "", phone: "" },
  })

  function onSubmit(_data: EnquiryFormData) {
    setStep("otp")
  }

  function handleOtpComplete(_code: string) {
    onConfirmed?.()
  }

  /* ── Form step ── */
  if (step === "form") {
    return (
      <div className="p-2">
        <div className="mb-8 flex items-center gap-4">
          <div className="size-16 rounded-2xl bg-primary/10 dark:bg-transparent dark:bg-linear-to-br from-green-700/30 via-gray-600/5 to-gray-600/5 flex items-center justify-center shrink-0">
            <img src="/img/icons-dual/4.svg" alt="" className="size-9 object-contain" />
          </div>
          <h2 className="font-mono font-bold text-xl leading-tight">Transaction Inquiry</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field data-invalid={!!errors.referenceNo || undefined}>
              <FieldLabel htmlFor="referenceNo">Reference number</FieldLabel>
              <Controller
                name="referenceNo"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="referenceNo"
                    placeholder="Ex: 3465489842"
                    aria-invalid={!!errors.referenceNo}
                  />
                )}
              />
              <FieldError errors={[errors.referenceNo]} />
            </Field>

            <Field data-invalid={!!errors.phone || undefined}>
              <FieldLabel htmlFor="txn-phone">Phone Number</FieldLabel>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    id="txn-phone"
                    onChangeNumber={field.onChange}
                    invalid={!!errors.phone}
                  />
                )}
              />
              <FieldError errors={[errors.phone]} />
            </Field>
          </FieldGroup>

          <div className="flex justify-end mt-8">
            <Button type="submit" className="gap-2 rounded-4xl px-6">
              Inquire
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </form>
      </div>
    )
  }

  /* ── OTP step ── */
  return (
    <div className="p-2 flex flex-col items-center text-center">
      <div className="size-20 mb-4">
        <LottieIcon data={Icon34Data} />
      </div>

      <h2 className="font-mono font-bold text-xl mb-2">Enter verification code</h2>
      <p className="text-sm text-muted-foreground mb-8 max-w-xs">
        Please enter the 6-digit code that was sent to your phone to complete the verification process.
      </p>

      <InputOTP maxLength={6} onComplete={handleOtpComplete}>
        <InputOTPGroup>
          {Array.from({ length: 6 }, (_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <div className="mt-8 flex flex-col items-center gap-1 text-sm text-muted-foreground">
        <p>
          The code will expire in{" "}
          <span className="font-bold text-foreground">{countdown.label}</span>
        </p>
        <p>
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={countdown.reset}
            disabled={!countdown.expired}
            className="text-primary font-medium hover:underline disabled:opacity-40 disabled:no-underline"
          >
            Resend
          </button>
        </p>
      </div>

      <button
        type="button"
        onClick={() => setStep("form")}
        className="mt-4 text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
      >
        ← Back to form
      </button>
    </div>
  )
}

/* ── Page ── */

export default function TransactionEnquiryPage() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useBreadcrumb(
    <div className="flex items-center gap-2">
      <Button
        variant="gray"
        size="icon-sm"
        className="rounded-4xl"
        aria-label="Back"
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
            <BreadcrumbPage>Transaction Enquiry</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
      <p className="text-sm text-muted-foreground">Click below to open the Transaction Enquiry modal.</p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button className="gap-2 rounded-4xl px-6">
              <Search className="size-4" />
              Transaction Enquiry
            </Button>
          }
        />
        <DialogContent className="w-full md:max-w-[636px]" showCloseButton>
          <TransactionEnquiryModal
            onConfirmed={() => {
              setOpen(false)
              navigate("/services/confirmation")
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { TransactionEnquiryModal }
