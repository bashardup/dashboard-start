import * as React from "react"
import { cn } from "@/lib/utils"

function CardWidget({
    className,
    wrapperClassName,
    size = "default",
    children,
    ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm"; wrapperClassName?: string }) {
    return (
        <div className={cn("relative h-full", wrapperClassName)}>
            <span
                className="absolute top-0 right-0 translate-x-px -translate-y-px w-[calc(100%+1px)] h-[calc(100%+1px)] bg-[linear-gradient(154deg,#ffffff29,transparent,#ffffff29)] rounded-3xl md:rounded-[32px]"
                style={{
                    padding: "1px",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                }}
            />
            <div
                data-slot="card-widget"
                data-size={size}
                className={cn(
                    "flex backdrop-blur-xs flex-col rounded-3xl md:rounded-[32px] overflow-hidden group/card-widget bg-white/60 dark:bg-slate-800/50 dark:shadow-[-2px_3px_9px_0px_rgba(16,20,19,0.50)] relative shadow-[-2px_3px_9px_0px_rgba(230,239,235,1.00)] h-full has-data-[slot=card-widget-footer]:pb-0",
                    className
                )}
                {...props}
            >
                <div className="pointer-events-none aspect-square w-[110%] left-0 opacity-20 translate-x-[-37%] -translate-y-[60%] top-0 absolute rounded-full dark:bg-[radial-gradient(#26d07c59,#26d07c00_65%)] bg-[radial-gradient(#cbf1d8,#eaf9ef00_65%)]" />
                {children}
            </div>
        </div>
    )
}

function CardWidgetHeader({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div data-slot="card-widget-header"
            className={cn(
                "flex items-center w-full gap-4 px-6 pt-6 group-data-[size=sm]/card-widget:px-5 group-data-[size=sm]/card-widget:pt-5 md:px-8 md:pt-8",
                className
            )}
            {...props}
        />
    )
}

function CardWidgetIcon({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-widget-icon"
            className={cn("shrink-0 w-14 aspect-square relative rounded-2xl p-2 bg-primary-25  dark:bg-transparent dark:bg-linear-to-br dark:from-green-500/10   dark:to-green-500/0 flex items-center justify-center", className)}
            {...props}
        />
    )
}



function CardWidgetTitle({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-widget-title"
            className={cn(
                "font-mono font-bold leading-tight text-base group-data-[size=sm]/card-widget:text-sm",
                className
            )}
            {...props}
        />
    )
}

function CardWidgetContent({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-widget-content"
            className={cn(
                "flex-1 px-6 py-6 group-data-[size=sm]/card-widget:px-5 group-data-[size=sm]/card-widget:py-5 md:px-8 md:py-8",
                className
            )}
            {...props}
        />
    )
}

function CardWidgetFooter({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-widget-footer"
            className={cn(
                "flex items-center rounded-b-3xl md:rounded-b-[32px] border-t  px-6 py-4 group-data-[size=sm]/card-widget:px-5 group-data-[size=sm]/card-widget:py-3 md:px-8 md:py-6",
                className
            )}
            {...props}
        />
    )
}

function CardWidgetAction({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-widget-action"
            className={cn("ms-auto flex items-center gap-2 shrink-0", className)}
            {...props}
        />
    )
}

export {
    CardWidget,
    CardWidgetHeader,
    CardWidgetIcon,
    CardWidgetTitle,
    CardWidgetContent,
    CardWidgetFooter,
    CardWidgetAction,
}
