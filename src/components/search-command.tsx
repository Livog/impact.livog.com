"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

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

export function SearchCommand({
  placeholder = "Search components...",
  className,
  onSelect,
}: SearchCommandProps) {
  const [query, setQuery] = useState("");
  const controllerRef = useRef<AbortController | null>(null);

  const fetcher = useCallback(async (url: string) => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    const res = await fetch(url, { signal: controllerRef.current.signal });
    if (!res.ok) throw new Error("Request failed");
    return (await res.json()) as SearchResult[];
  }, []);

  const { data: results = [], isLoading } = useSWR<SearchResult[]>(
    query ? `/api/search?q=${encodeURIComponent(query)}` : null,
    fetcher,
    { keepPreviousData: Boolean(query) }
  );

  useEffect(() => () => controllerRef.current?.abort(), []);

  const router = useRouter();

  const handleSelect = (result: SearchResult) => {
    if (onSelect) {
      onSelect(result);
      return;
    }
    router.push(`/${result.type}/${result.path.join("/")}`);
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
        {query && results.length === 0 && !isLoading && (
          <CommandEmpty>No results found.</CommandEmpty>
        )}

        {isLoading && query && (
          <CommandEmpty className="text-left py-3 px-3">
            Loading...
          </CommandEmpty>
        )}

        {query && results.length > 0 && !isLoading && (
          <CommandGroup heading="Results">
            {results.map((r) => (
              <CommandItem
                key={r.path.join("/")}
                value={r.path.join("/")}
                onSelect={() => handleSelect(r)}
              >
                <span>
                  <Badge
                    variant="default"
                    className={cn(
                      r.type === "ui" && "bg-blue-500/10 text-blue-400",
                      r.type === "general" && "bg-green-500/10 text-green-400"
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
