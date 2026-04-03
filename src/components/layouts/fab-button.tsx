"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, AlertTriangle, HelpCircle } from "lucide-react";
import Link from "next/link";

export function FabButton() {
  return (
    <div className="fixed bottom-20 right-4 z-40 lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="lg" className="h-14 w-14 rounded-full shadow-lg shadow-primary/25">
            <Plus className="h-6 w-6" />
            <span className="sr-only">Create new</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top" className="mb-2 w-48">
          <DropdownMenuItem asChild>
            <Link href="/requests/new" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              New Request
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/incidents/new" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Report Incident
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/knowledge" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Search KB
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
