"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Inbox, AlertCircle, MoreHorizontal, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GitBranch, Bug, Server, BookOpen, BarChart3, Settings } from "lucide-react";

const primaryNavItems = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "requests", label: "Requests", icon: Inbox, href: "/requests", badge: 12 },
  { id: "incidents", label: "Incidents", icon: AlertCircle, href: "/incidents", badge: 5 },
];

const moreNavItems = [
  { id: "changes", label: "Changes", icon: GitBranch, href: "/changes" },
  { id: "problems", label: "Problems", icon: Bug, href: "/problems" },
  { id: "assets", label: "Assets", icon: Server, href: "/assets" },
  { id: "knowledge", label: "Knowledge Base", icon: BookOpen, href: "/knowledge" },
  { id: "reports", label: "Reports", icon: BarChart3, href: "/reports" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "relative flex min-w-[64px] flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && (
                  <span className="absolute -right-2 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />}
            </Link>
          );
        })}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex min-w-[64px] flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground">
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-[10px] font-medium">More</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-48 mb-2">
            {moreNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <DropdownMenuItem key={item.id} asChild>
                  <Link href={item.href} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
          href="/profile"
          className={cn(
            "flex min-w-[64px] flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 transition-colors",
            pathname === "/profile" ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <User className="h-5 w-5" />
          <span className="text-[10px] font-medium">Profile</span>
          {pathname === "/profile" && (
            <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary" />
          )}
        </Link>
      </div>

      <div className="h-safe-area-inset-bottom bg-background" />
    </nav>
  );
}
