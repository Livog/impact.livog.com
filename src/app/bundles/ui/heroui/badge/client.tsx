"use client";

import {Badge} from "@heroui/react";

export function BadgePage() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge color="primary">Primary</Badge>
    </div>
  );
}
