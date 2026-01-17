"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number | null
  max?: number
}

export function Progress({ className, value = 0, max = 100, ...props }: ProgressProps) {
  const clamped = Math.min(Math.max(value ?? 0, 0), max)
  const percentage = (clamped / max) * 100

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn("h-2 w-full text-primary", className)}
      {...props}
    >
      <svg className="h-full w-full" viewBox="0 0 100 4" preserveAspectRatio="none">
        <rect width="100" height="4" rx="2" fill="currentColor" opacity="0.2" />
        <rect width={percentage} height="4" rx="2" fill="currentColor" />
      </svg>
    </div>
  )
}
