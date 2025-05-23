"use client";

import SearchCommand from "./search-command";

export default function SearchDirect({ className }: { className?: string }) {

  return (
    <div className={`rounded-md border bg-background shadow-md overflow-hidden ${className ?? ""}`}>
      <SearchCommand 
        placeholder="Search components..."
        className="max-h-96 [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5 [&_[cmdk-list]]:max-h-80 [&_[cmdk-list]]:overflow-y-auto"
      />
    </div>
  );
} 