"use client"

import Link from "next/link";
import { SearchButton } from "./search-button";
import { Container } from "./container";
import { appConfig } from "@/config/app";

export function Header() {
  return (
    <header className="border-grid py-2 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-12 items-center gap-4">
        <Link href="/" className="font-semibold">UI Impact</Link>
        <div className="flex-1 max-w-md mx-auto">
          <SearchButton />
        </div>
        <Link
          href={appConfig.social.x}
          target="_blank"
          className="text-muted-foreground hover:text-foreground"
        >
        </Link>
      </Container>
    </header>
  );
}
