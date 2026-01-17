"use client";

import { Search, SunMedium, Moon, Bell, WifiOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useAuthStore } from "@/lib/store";
import { OFFLINE_MODE } from "@/lib/config";

export function TopBar() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuthStore();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="hidden md:flex w-full max-w-md items-center gap-2 rounded-full border bg-muted/40 px-4 py-2 text-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search anything…"
            className="h-6 border-0 bg-transparent p-0 focus-visible:ring-0"
          />
        </div>
        <div className="flex flex-1 items-center justify-end gap-2">
          {OFFLINE_MODE && (
            <div className="hidden items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-200 sm:flex">
              <WifiOff className="h-3 w-3" />
              Offline Demo
            </div>
          )}
          <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleTheme}>
            {theme === "dark" ? (
              <SunMedium className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <div className="flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold uppercase text-primary">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="hidden text-left leading-tight sm:block">
              <p className="text-sm font-medium">{user?.name || "Admin"}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role?.toLowerCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
