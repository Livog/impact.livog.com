"use client"

import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export function TooltipPage() {
  return (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>Tooltip content</TooltipContent>
    </Tooltip>
  );
} 
