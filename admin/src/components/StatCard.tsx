"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: ReactNode;
  trend?: string;
  tone?: "default" | "positive" | "warning" | "danger" | "premium";
  className?: string;
}

const toneClasses: Record<string, string> = {
  default: "bg-muted text-muted-foreground border",
  positive: "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-700 border border-emerald-100 dark:from-emerald-500/20 dark:to-emerald-500/5 dark:text-emerald-200",
  warning: "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 border border-amber-100 dark:from-amber-500/20 dark:to-amber-500/5 dark:text-amber-200",
  danger: "bg-gradient-to-br from-rose-50 to-rose-100 text-rose-700 border border-rose-100 dark:from-rose-500/20 dark:to-rose-500/5 dark:text-rose-200",
  premium: "bg-gradient-to-br from-indigo-500/10 via-white to-purple-500/5 text-indigo-600 border border-indigo-100 dark:from-indigo-500/20 dark:via-transparent dark:to-purple-500/10 dark:text-indigo-200",
};

export function StatCard({
  label,
  value,
  subtext,
  icon,
  trend,
  tone = "default",
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-none shadow-lg ring-1 ring-black/[0.04] dark:ring-white/10",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7),_rgba(255,255,255,0))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_45%)]" />
      <div className="relative">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/80">
              {label}
            </p>
          </div>
          {icon && (
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-2xl border text-sm",
                toneClasses[tone],
              )}
            >
              {icon}
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-3xl font-semibold tracking-tight">{value}</div>
          {subtext && (
            <p className="text-sm text-muted-foreground/80 leading-relaxed">{subtext}</p>
          )}
          {trend && (
            <p
              className={cn(
                "text-xs font-medium uppercase tracking-wide",
                tone === "default" && "text-muted-foreground",
              )}
            >
              {trend}
            </p>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
