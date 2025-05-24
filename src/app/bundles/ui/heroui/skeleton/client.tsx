"use client";

import {Skeleton} from "@heroui/react";

export function SkeletonPage() {
  return (
    <Skeleton className="rounded-lg">
      <div className="h-24 rounded-lg bg-default-300" />
    </Skeleton>
  );
}
