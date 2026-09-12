import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-primary/30 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "btn-sheen bg-gradient-to-b from-[#3b82f6] to-primary text-primary-foreground shadow-primary hover:from-primary hover:to-primary-hover",
        outline: "border border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-alt",
        secondary: "bg-surface-alt text-foreground hover:bg-border",
        ghost: "text-foreground hover:bg-surface-alt",
        link: "text-primary underline-offset-4 hover:underline",
        inverse: "bg-surface text-foreground hover:bg-surface-alt",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
      },
      size: {
        default: "h-12 px-5 lg:h-11",
        sm: "h-9 rounded-lg px-3.5 text-[13px]",
        lg: "h-12 px-6 text-base",
        icon: "size-11",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
        inline: "h-auto px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
