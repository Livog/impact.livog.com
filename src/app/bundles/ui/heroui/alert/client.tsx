"use client";

import {Alert} from "@heroui/react";

export function AlertPage() {
  const title = "This is an alert";
  const description = "Thanks for subscribing to our newsletter!";
  return (
    <div className="flex items-center justify-center w-full">
      <Alert description={description} title={title} />
    </div>
  );
}
