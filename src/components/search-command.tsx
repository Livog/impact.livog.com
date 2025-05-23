"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

export interface SearchResult {
  type: "ui" | "general";
  path: string[];
  sizeUp: number;
}

interface SearchCommandProps {
  placeholder?: string;
  className?: string;
  onSelect?: (result: SearchResult) => void;
}

export default function SearchCommand({
  placeholder = "Search components...",
  className,
  onSelect,
}: SearchCommandProps) {
  const [query, setQuery] = useState("");
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: results = [] } = useSWR<SearchResult[]>(
    query ? `/api/search?q=${encodeURIComponent(query)}` : null,
    fetcher
  );

  const router = useRouter();

  const handleSelect = (result: SearchResult) => {
    if (onSelect) {
      onSelect(result);
    } else {
      router.push(`/${result.type}/${result.path.join("/")}`);
    }
  };

  return (
    <Command className={cn(className)}>
      <CommandInput
        placeholder={placeholder}
        value={query}
        onValueChange={setQuery}
        className="h-12"
      />
      <CommandList>
        {query && results.length === 0 && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}
        {results.length > 0 && (
          <CommandGroup heading="Results">
            {results.map((r) => (
              <CommandItem
                key={`${r.path.join("/")}`}
                value={`${r.path.join("/")}`}
                onSelect={() => handleSelect(r)}
              >
                <span>
                  <Badge
                    variant="default"
                    className={cn(
                      r.type === "ui"
                        ? "bg-blue-500/10 text-blue-400"
                        : undefined,
                      r.type === "general"
                        ? "bg-green-500/10 text-green-400"
                        : undefined
                    )}
                  >
                    {r.type}
                  </Badge>{" "}
                  {r.path.map((p) => (
                    <span
                      key={p}
                      className="before:content-['/'] before:text-muted-foreground first:before:content-[''] before:mx-1"
                    >
                      {p}
                    </span>
                  ))}
                </span>
                <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                  {(r.sizeUp / 1024).toFixed(1)} kB
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
