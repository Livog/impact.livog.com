"use client";

import {Tooltip} from "@heroui/react";

export function TooltipPage() {
  return (
    <Tooltip content="I am a tooltip">
      <button>Hover me</button>
    </Tooltip>
  );
}
