import { Link } from "react-router-dom"
import { useLottie } from "lottie-react"
import { Icon07 } from "@/components/lottie/registry"
import { Button } from "@/components/ui/button"

function LottieView({ animationData }: { animationData: object }) {
  const { View } = useLottie({
    animationData,
    loop: true,
    autoplay: true,
    style: { width: "100%", height: "100%" },
  })
  return <>{View}</>
}

/* Placeholder card that mimics a blurred service card in the background */
function GhostCard({ className }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-white/4 border border-white/6 p-5 flex flex-col gap-3 ${className ?? ""}`}>
      <div className="h-2.5 w-2/3 rounded-full bg-white/10" />
      <div className="h-2 w-full rounded-full bg-white/6" />
      <div className="h-2 w-4/5 rounded-full bg-white/6" />
      <div className="h-2 w-3/5 rounded-full bg-white/6" />
      <div className="mt-auto h-6 w-24 rounded-lg bg-white/6" />
    </div>
  )
}

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#071c14] overflow-hidden">

      {/* ── Background ghost card grid ── */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4 p-6 pointer-events-none select-none">
        {Array.from({ length: 9 }).map((_, i) => (
          <GhostCard key={i} />
        ))}
      </div>

      {/* ── Spotlight: keeps center readable ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 45%, transparent 0%, #071c14 65%)",
        }}
      />

      {/* ── Top logos ── */}
      <header className="relative z-10 flex items-center justify-between px-6 pt-5">
        <img
          src="/img/gov-dubai-logo.svg"
          alt="Government of Dubai"
          className="h-10 object-contain"
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
        />
        <img
          src="/img/dp-logo-color.svg"
          alt="Dubai Police"
          className="h-10 object-contain"
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none" }}
        />
      </header>

      {/* ── Main content ── */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">

        {/* Lottie icon with circular glow ring */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Outer glow ring */}
          <div
            className="absolute size-52 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(0,180,90,0.18) 0%, transparent 70%)",
              boxShadow: "0 0 80px 20px rgba(0,180,90,0.12)",
            }}
          />
          {/* Subtle ring lines */}
          <div className="absolute size-52 rounded-full border border-white/8" />
          <div className="absolute size-40 rounded-full border border-white/5" />

          {/* Lottie */}
          <div className="relative size-28">
            <LottieView animationData={Icon07} />
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-4"
          style={{
            background: "linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Page Not Found
        </h1>

        {/* Subtitle */}
        <p className="text-emerald-400/80 text-sm md:text-base font-medium max-w-sm leading-relaxed mb-10">
          The page you are looking for may have been moved, removed, or is temporarily unavailable.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button
            asChild
            variant="outlineGray"
            className="rounded-full border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white px-6"
          >
            <Link to="/services">View All Services</Link>
          </Button>
          <Button
            asChild
            className="rounded-full bg-zinc-800 hover:bg-zinc-700 text-white border border-white/10 px-6"
          >
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </main>

      {/* ── Footer: social + URL ── */}
      <footer className="relative z-10 flex flex-col items-center gap-2 pb-8 text-white/50">
        <div className="flex items-center gap-4">
          {/* <Facebook className="size-4 hover:text-white/80 transition-colors cursor-pointer" /> */}
          {/* <Twitter className="size-4 hover:text-white/80 transition-colors cursor-pointer" /> */}
          {/* <Instagram className="size-4 hover:text-white/80 transition-colors cursor-pointer" /> */}
          {/* <Youtube className="size-4 hover:text-white/80 transition-colors cursor-pointer" /> */}
          <span className="text-xs">DubaiPoliceHQ</span>
        </div>
        <span className="text-xs tracking-wide">www.dubaipolice.gov.ae</span>
      </footer>
    </div>
  )
}
