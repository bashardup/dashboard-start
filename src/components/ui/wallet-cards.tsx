import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/* ── Data shape ── */

export interface WalletCardData {
  gradient: [string, string]
  label: string
  amount: string
  amountLabel?: string
  textColor?: string        // defaults to white
}

/* ── Internal card face ── */

function CardFace({
  card,
  width,
  height,
}: {
  card: WalletCardData
  width: number
  height: number
}) {
  const text = card.textColor ?? "white"
  return (
    <div
      className="rounded-[20px] shadow-xl overflow-hidden relative"
      style={{
        width,
        height,
        background: `linear-gradient(135deg, ${card.gradient[0]} 0%, ${card.gradient[1]} 100%)`,
      }}
    >
      {/* shimmer */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,transparent_55%,rgba(255,255,255,0.04)_100%)] pointer-events-none" />

      <div className="relative h-full flex flex-col justify-between p-4 z-10">
        {/* label top-right */}
        <div className="flex justify-end">
          <span
            className="text-[11px] font-mono font-semibold tracking-wider"
            style={{ color: text, opacity: 0.85 }}
          >
            {card.label}
          </span>
        </div>

        {/* amount bottom-left */}
        <div>
          <p className="text-xl font-mono font-bold leading-none" style={{ color: text }}>
            {card.amount}
          </p>
          <p className="text-xs mt-1" style={{ color: text, opacity: 0.55 }}>
            {card.amountLabel ?? "Total Balance"}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── WalletCards ── */

interface WalletCardsProps {
  /** Ordered back→front — last card sits on top in idle */
  cards: WalletCardData[]
  balance: string
  balanceLabel?: string
  width?: number
  cardWidth?: number
  cardHeight?: number
  className?: string
}

export function WalletCards({
  cards,
  balance,
  balanceLabel = "Total Balance",
  width = 300,
  cardWidth = 260,
  cardHeight = 155,
  className,
}: WalletCardsProps) {
  const n = cards.length
  const walletH = 360
  const cardTopBase = 45           // y of front card in idle
  const cardStagger = 12           // offset per card going back
  const overlayTop = 135           // wallet overlay starts here → hides card bottoms

  const cardLeft = (width - cardWidth) / 2

  return (
    <motion.div
      className={cn("relative cursor-pointer select-none", className)}
      style={{ width, height: walletH }}
      initial="idle"
      whileHover="hover"
      animate="idle"
    >
      {/* Wallet background */}
      <div
        className="absolute inset-0 rounded-[32px]"
        style={{ background: "oklch(0.13 0.005 240)" }}
      />

      {/* Cards — rendered back-to-front (i=0 is back) */}
      {cards.map((card, i) => {
        // front = i === n-1 (highest z, moves most on hover)
        const idleTop = cardTopBase + (n - 1 - i) * cardStagger

        // front card travels furthest up, back card least
        const hoverY = -((i + 1) / n) * 205 - 15

        // all cards tilt left; front tilts most
        const hoverRotate = -4 - (i / Math.max(n - 1, 1)) * 9

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: cardLeft,
              top: idleTop,
              zIndex: 5 + i,
            }}
            variants={{
              idle: {
                y: 0,
                rotate: 0,
                scale: 1,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              },
              hover: {
                y: hoverY,
                rotate: hoverRotate,
                scale: 1,
                transition: {
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: (n - 1 - i) * 0.06,  // front card goes first
                },
              },
            }}
          >
            <CardFace card={card} width={cardWidth} height={cardHeight} />
          </motion.div>
        )
      })}

      {/* Overlay — same bg as wallet, masks card bottoms in idle */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end p-6"
        style={{
          top: overlayTop,
          background: "oklch(0.13 0.005 240)",
          borderRadius: "0 0 32px 32px",
        }}
      >
        {/* chip dot */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 size-[10px] rounded-full bg-white/15" />

        {/* balance */}
        <div>
          <p className="text-[30px] font-mono font-bold text-white leading-none">{balance}</p>
          <p className="text-sm text-white/40 mt-1.5">{balanceLabel}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Standalone WalletCard (for use outside WalletCards) ── */

interface WalletCardProps extends WalletCardData {
  width?: number
  height?: number
  className?: string
}

export function WalletCard({
  gradient = ["var(--chart-primary)", "oklch(0.45 0.18 152)"],
  label,
  amount,
  amountLabel,
  textColor,
  width = 260,
  height = 155,
  className,
}: WalletCardProps) {
  return (
    <div className={cn("", className)}>
      <CardFace
        card={{ gradient, label: label ?? "", amount: amount ?? "", amountLabel, textColor }}
        width={width}
        height={height}
      />
    </div>
  )
}
