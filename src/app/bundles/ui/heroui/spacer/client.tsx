"use client";

import {Spacer} from "@heroui/react";

export function SpacerPage() {
  return (
    <div>
      <p>Above</p>
      <Spacer y={1} />
      <p>Below</p>
    </div>
  );
}
