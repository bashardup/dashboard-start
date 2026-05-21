import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Sparkles,
  User,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password needs at least one uppercase letter")
      .regex(/[0-9]/, "Password needs at least one number"),
    terms: z.literal(true, { message: "You must accept the terms to continue" }),
    updates: z.boolean().optional(),
  })

type SignupValues = z.infer<typeof schema>

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function MicrosoftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M11.4 11.4H0V0h11.4v11.4z" fill="#F25022" />
      <path d="M24 11.4H12.6V0H24v11.4z" fill="#7FBA00" />
      <path d="M11.4 24H0V12.6h11.4V24z" fill="#00A4EF" />
      <path d="M24 24H12.6V12.6H24V24z" fill="#FFB900" />
    </svg>
  )
}

const STRENGTH_TIERS = [
  { key: "weak", className: "bg-error-500" },
  { key: "fair", className: "bg-warning-500" },
  { key: "good", className: "bg-primary-400" },
  { key: "strong", className: "bg-primary-600" },
] as const

function passwordScore(pwd: string): number {
  if (!pwd) return 0
  let s = 0
  if (pwd.length >= 6) s++
  if (pwd.length >= 8) s++
  if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) s++
  if (/[^A-Za-z0-9]/.test(pwd)) s++
  return s
}

export interface SignupPatternProps {
  /** Path used by the "Sign in" footer link. Defaults to /login. */
  loginHref?: string
  /** Path used by the Terms link. */
  termsHref?: string
  /** Path used by the Privacy link. */
  privacyHref?: string
  /** Override the heading copy. */
  heading?: string
  /** Override the subheading copy. */
  subheading?: string
  /** Override the tagline on the brand panel. */
  tagline?: string
  /** Logo render slot — defaults to a brand mark using <Sparkles>. */
  logo?: React.ReactNode
  /** Brand-panel illustration slot. */
  illustration?: React.ReactNode
  className?: string
}

export function SignupPattern({
  loginHref = "/login",
  termsHref = "/terms",
  privacyHref = "/privacy",
  heading,
  subheading,
  tagline,
  logo,
  illustration,
  className,
}: SignupPatternProps) {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: undefined,
      updates: false,
    },
  })

  const password = watch("password")
  const terms = watch("terms")
  const updates = watch("updates")
  const score = passwordScore(password ?? "")
  const tier = score > 0 ? STRENGTH_TIERS[Math.min(score - 1, STRENGTH_TIERS.length - 1)] : null

  async function onSubmit(values: SignupValues) {
    await new Promise((r) => setTimeout(r, 1000))
    toast.success(t("patterns.signup.toast.success"), {
      description: `${t("patterns.signup.toast.welcome")} ${values.firstName}`,
    })
  }

  return (
    <div className={cn("min-h-screen flex bg-background", className)}>
      {/* ── Form column ── */}
      <div className="flex flex-1 flex-col justify-center px-6 py-10 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-[480px]">
          <div className="mb-8">
            {logo ?? (
              <div className="inline-flex items-center gap-2">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                  <Sparkles className="size-5" />
                </span>
                <span className="font-mono text-lg font-semibold tracking-tight">
                  {t("patterns.signup.brand")}
                </span>
              </div>
            )}
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {heading ?? t("patterns.signup.heading")}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {subheading ?? t("patterns.signup.subheading")}
            </p>
          </div>

          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="firstName">{t("patterns.signup.firstName.label")}</FieldLabel>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="firstName"
                      autoComplete="given-name"
                      placeholder={t("patterns.signup.firstName.placeholder")}
                      aria-invalid={!!errors.firstName}
                      className="pl-9"
                      {...register("firstName")}
                    />
                  </div>
                  <FieldError errors={errors.firstName ? [errors.firstName] : []} />
                </Field>

                <Field>
                  <FieldLabel htmlFor="lastName">{t("patterns.signup.lastName.label")}</FieldLabel>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="lastName"
                      autoComplete="family-name"
                      placeholder={t("patterns.signup.lastName.placeholder")}
                      aria-invalid={!!errors.lastName}
                      className="pl-9"
                      {...register("lastName")}
                    />
                  </div>
                  <FieldError errors={errors.lastName ? [errors.lastName] : []} />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="email">{t("patterns.signup.email.label")}</FieldLabel>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("patterns.signup.email.placeholder")}
                    aria-invalid={!!errors.email}
                    className="pl-9"
                    {...register("email")}
                  />
                </div>
                <FieldError errors={errors.email ? [errors.email] : []} />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">{t("patterns.signup.password.label")}</FieldLabel>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    aria-invalid={!!errors.password}
                    className="pl-9 pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? t("patterns.signup.password.hide") : t("patterns.signup.password.show")}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                {password && (
                  <div className="flex flex-col gap-1.5 pt-1">
                    <div className="flex gap-1.5">
                      {STRENGTH_TIERS.map((s, i) => (
                        <div
                          key={s.key}
                          className={cn(
                            "h-1 flex-1 rounded-full transition-colors",
                            tier && score > i ? s.className : "bg-muted"
                          )}
                        />
                      ))}
                    </div>
                    {tier && (
                      <p className="text-xs text-muted-foreground">
                        {t("patterns.signup.password.strength.label")}:{" "}
                        <span className="font-medium text-foreground">
                          {t(`patterns.signup.password.strength.${tier.key}`)}
                        </span>
                      </p>
                    )}
                  </div>
                )}
                <FieldError errors={errors.password ? [errors.password] : []} />
              </Field>

              <div className="flex items-start gap-2 pt-1">
                <Checkbox
                  id="terms"
                  checked={terms === true}
                  onCheckedChange={(v) => setValue("terms", v === true ? true : (false as unknown as true), { shouldValidate: true })}
                  aria-invalid={!!errors.terms}
                />
                <FieldLabel
                  htmlFor="terms"
                  className="text-sm font-normal text-muted-foreground cursor-pointer select-none leading-snug"
                >
                  {t("patterns.signup.terms.prefix")}{" "}
                  <Link to={termsHref} className="font-medium text-primary hover:text-primary/80">
                    {t("patterns.signup.terms.terms")}
                  </Link>{" "}
                  {t("patterns.signup.terms.and")}{" "}
                  <Link to={privacyHref} className="font-medium text-primary hover:text-primary/80">
                    {t("patterns.signup.terms.privacy")}
                  </Link>
                  .
                </FieldLabel>
              </div>
              {errors.terms && (
                <p className="text-xs text-error-600 -mt-1">{errors.terms.message}</p>
              )}

              <div className="flex items-start gap-2">
                <Checkbox
                  id="updates"
                  checked={!!updates}
                  onCheckedChange={(v) => setValue("updates", Boolean(v))}
                />
                <FieldLabel
                  htmlFor="updates"
                  className="text-sm font-normal text-muted-foreground cursor-pointer select-none leading-snug"
                >
                  {t("patterns.signup.updates")}
                </FieldLabel>
              </div>

              <Button type="submit" size="xl" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                {isSubmitting ? t("patterns.signup.submitting") : t("patterns.signup.submit")}
              </Button>

              <div className="flex items-center gap-3 py-2">
                <Separator className="flex-1" />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t("patterns.signup.or")}
                </span>
                <Separator className="flex-1" />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button type="button" variant="outlineGray" size="lg" className="w-full">
                  <GoogleIcon className="size-4" />
                  <span>{t("patterns.signup.sso.google")}</span>
                </Button>
                <Button type="button" variant="outlineGray" size="lg" className="w-full">
                  <MicrosoftIcon className="size-4" />
                  <span>{t("patterns.signup.sso.microsoft")}</span>
                </Button>
              </div>
            </FieldGroup>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            {t("patterns.signup.footer.cta")}{" "}
            <Link
              to={loginHref}
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {t("patterns.signup.footer.signIn")}
            </Link>
          </p>
        </div>
      </div>

      {/* ── Brand panel (desktop) ── */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 dark:from-primary-800 dark:via-primary-900 dark:to-slate-950">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 size-[600px] rounded-full bg-primary-500/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 size-[500px] rounded-full bg-primary-400/20 blur-3xl" />
        </div>

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative flex flex-col justify-between p-12 w-full text-white">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium ring-1 ring-white/15 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-emerald-300 animate-pulse" />
            {t("patterns.signup.brandPanel.badge")}
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight max-w-md">
              {tagline ?? t("patterns.signup.brandPanel.tagline")}
            </h2>

            {illustration ?? (
              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
                <p className="text-xs font-mono uppercase tracking-wider text-white/60 mb-4">
                  {t("patterns.signup.brandPanel.illustrationLabel")}
                </p>
                <ul className="space-y-3">
                  {[
                    t("patterns.signup.brandPanel.bullets.tickets"),
                    t("patterns.signup.brandPanel.bullets.team"),
                    t("patterns.signup.brandPanel.bullets.insights"),
                    t("patterns.signup.brandPanel.bullets.support"),
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2 text-sm text-white/90">
                      <span className="mt-0.5 inline-flex size-4 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                        <Check className="size-2.5" />
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <p className="text-xs text-white/50">
            {t("patterns.signup.brandPanel.footer")}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignupPattern
