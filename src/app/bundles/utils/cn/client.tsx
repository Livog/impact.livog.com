"use client";

import { cn } from "@/lib/utils";

export default function CnClient({ className }: { className?: string }) {
  return <div className={cn("flex", className)}>CnClient</div>;
}
