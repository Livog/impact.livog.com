"use client";

import {Divider} from "@heroui/react";

export function DividerPage() {
  return (
    <div>
      <p>Content above</p>
      <Divider className="my-2" />
      <p>Content below</p>
    </div>
  );
}
