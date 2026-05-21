import * as React from "react"
import { useLottie } from "lottie-react"
import { X, User, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { DialogClose } from "@/components/ui/dialog"
import { UAEPassButton } from "@/components/ui/uae-pass-button"
import Icon34 from "@/components/lottie/Icon_34.json"

function LottieView({ animationData }: { animationData: object }) {
  const { View } = useLottie({
    animationData,
    loop: true,
    autoplay: true,
    style: { width: "100%", height: "100%" },
  })
  return <>{View}</>
}

export interface LoginModalContentProps {
  /** "full" = UAE Pass + username/password. "uaepass" = UAE Pass only. */
  variant?: "full" | "uaepass"
}

export function LoginModalContent({ variant = "full" }: LoginModalContentProps) {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [hovered] = React.useState(true)

  return (
    <div
      className="relative"
    // onMouseEnter={() => setHovered(true)}
    // onMouseLeave={() => setHovered(false)}
    >
      {/* Animated border gradient */}
      <span
        className={cn(
          "absolute top-0 right-0 -translate-x-px -translate-y-px w-[calc(100%+2px)] h-[calc(100%+2px)] bg-[linear-gradient(154deg,#ffffff6e,transparent,#ffffff6e)] rounded-3xl pointer-events-none",
          hovered && "border-gradient-animated"
        )}
      />

      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-40 bg-[radial-gradient(#26d07c70,#26d07c00_65%)] pointer-events-none" />
      <div className="bg-black relative z-10 ">

        <DialogClose
          className="absolute top-4 right-4  rtl:left-4 z-10 flex items-center justify-center size-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/60 hover:text-white"
          aria-label="Close"
        >
          <X className="size-4" />
        </DialogClose>

        <div className="relative z-10 flex flex-col items-center px-8 pb-8 pt-10">
          <div className="relative mb-6 flex items-center justify-center">
            <div className="relative size-20">
              <LottieView animationData={Icon34} />
            </div>
          </div>
          <h2 className="text-2xl font-mono font-bold text-white text-center mb-2">
            Sign in to continue.
          </h2>
          <p className="text-sm text-white/50 text-center mb-6 leading-relaxed">
            Access your personalised dashboard<br />to manage your requirements.
          </p>

          {/* UAE Pass button */}
          <UAEPassButton variant="black" radius="pill" />

          <p className="mt-3 text-xs text-white/40 text-center">
            You don&apos;t have UAE Pass?
            <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">
              {variant === "full" ? "Create New Account" : "Create new one"}
            </a>
          </p>

          {variant === "full" && (
            <>
              {/* Divider */}
              <div className="flex items-center gap-3 w-full my-5">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-white/30">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Username */}
              <div className="w-full space-y-1.5 mb-3">
                <Label className="text-xs font-medium text-white/60">Username</Label>
                <InputGroup className="border-white/15 bg-white/5 dark:bg-white/5">
                  <InputGroupAddon>
                    <InputGroupText className="text-white/30"><User /></InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    type="text"
                    placeholder=""
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                    className="text-white placeholder:text-white/20"
                  />
                </InputGroup>
              </div>

              {/* Password */}
              <div className="w-full space-y-1.5 mb-2">
                <Label className="text-xs font-medium text-white/60">Password</Label>
                <InputGroup className="border-white/15 bg-white/5 dark:bg-white/5">
                  <InputGroupAddon>
                    <InputGroupText className="text-white/30"><Lock /></InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    type="password"
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    className="text-white placeholder:text-white/20"
                  />
                </InputGroup>
              </div>

              <p className="w-full text-xs text-white/40 text-center mb-5">
                Forgot your
                <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">Username</a>
                or
                <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">Password</a>
                ?
              </p>

              <Button type="submit" className="w-full h-12 rounded-xl" onClick={(e) => e.preventDefault()}>
                Login
              </Button>

              <p className="mt-4 text-xs text-white/40 text-center">
                You don&apos;t have an account?
                <a href="#" className="text-primary-400 hover:text-primary-300 transition-colors">
                  Create New Account
                </a>
              </p>
            </>
          )}
        </div></div>
    </div>
  )
}
