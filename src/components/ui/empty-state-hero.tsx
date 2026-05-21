import { useLottie } from "lottie-react"
import { cn } from "@/lib/utils"

interface EmptyStateHeroProps {
  title: string
  description?: string
  img?: string
  hasDecor?: boolean
  className?: string
  variant?: "default" | "wide" | "small"
  isLottie?: boolean
  lottieData?: object
}

function LottieView({ animationData }: { animationData: object }) {
  const { View } = useLottie({
    animationData,
    loop: true,
    autoplay: true,
    style: { width: "100%", height: "100%" },
  })
  return <>{View}</>
}

export function EmptyStateHero({
  title,
  description,
  img,
  hasDecor: _hasDecor = true,
  className,
  variant = "default",
  isLottie = false,
  lottieData,
}: EmptyStateHeroProps) {
  return (
    <div className={cn("pb-16 relative", className)} data-variant={variant}>
      {/* {hasDecor && (
        <>
          <div className="pointer-events-none w-96 h-96 top-1/2 left-0 opacity-50 translate-x-[-37%] -translate-y-[60%] absolute rounded-full bg-[radial-gradient(#cbf1d8,#eaf9ef00_65%)]" />
          <div className="pointer-events-none w-96 h-96 top-1/2 right-0 opacity-50 -translate-x-[-37%] -translate-y-[60%] absolute rounded-full bg-[radial-gradient(#cbf1d8,#eaf9ef00_65%)]" />
        </>
      )} */}
      <div
        className={cn(
          "mx-auto",
          variant === "wide"
            ? "md:flex items-center md:flex-row-reverse justify-between gap-5"
            : "max-w-[472px]"
        )}
      >
        <div
          className={cn(
            "relative mb-6",
            variant === "wide" && "md:w-[200px]"
          )}
        >
          <span className="size-1.5 block bg-[#BFE8BE] absolute top-[54%] left-[27%] rounded-full animate-pulse" />
          <span className="size-1.5 block bg-[#BFE8BE] absolute top-[70%] left-[70%] animate-bounce animation-duration-[10s]" />
          <span className="size-2.5 block bg-[#BFE8BE] absolute top-[13%] left-[30%] animate-pulse" />
          <span className="size-2.5 block bg-[#BFE8BE] absolute top-[18%] left-[75%] rounded-full animate-pulse" />

          <div className="aspect-square w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[150px] md:max-w-[180px]">
            <img
              src="/img/decor/decor-circle.svg"
              className="animate-spin animation-duration-[10s] w-full h-full"
              alt=""
            />
          </div>
          <div className="aspect-square w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[220px] md:max-w-[240px]">
            <img
              src="/img/decor/decor-circle.svg"
              className="animate-spin animation-duration-[5s] w-full h-full"
              alt=""
            />
          </div>

          <div className="aspect-square w-full relative mx-auto max-w-[150px] md:max-w-[190px]">
            {isLottie && lottieData ? (
              <div className="absolute inset-0 z-10">
                <LottieView animationData={lottieData} />
              </div>
            ) : img ? (
              <img
                src={img}
                alt={title}
                className="absolute inset-0 z-10 w-full h-full object-contain"
              />
            ) : null}
          </div>
        </div>

        <div className="data-[variant=wide]:md:max-w-[300px]" data-variant={variant}>
          <h3 className="text-primary dark:text-success-300 font-mono font-bold mb-3
            data-[variant=small]:text-base data-[variant=small]:text-center
            data-[variant=wide]:text-start
            data-[variant=default]:text-center data-[variant=default]:text-2xl data-[variant=default]:md:text-[40px]"
            data-variant={variant}
          >
            {title}
          </h3>
          {description && (
            <p
              className="text-[#4B4C4D] dark:text-gray-300 font-mono text-sm md:text-[20px]
                data-[variant=small]:text-center
                data-[variant=wide]:text-start
                data-[variant=default]:text-center"
              data-variant={variant}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
