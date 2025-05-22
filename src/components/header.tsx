"use client"

import Link from "next/link";
import { TwitterIcon } from "lucide-react";
import SearchButton from "./search-button";
import { appConfig } from "@/config/app";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-12 max-w-5xl items-center gap-4 px-4">
        <Link href="/" className="font-semibold">UI Impact</Link>
        <div className="flex-1 max-w-md mx-auto">
          <SearchButton />
        </div>
        <Link
          href={appConfig.social.x}
          target="_blank"
          className="text-muted-foreground hover:text-foreground"
        >
          <TwitterIcon className="size-5" />
        </Link>
      </div>
    </header>
  );
}
