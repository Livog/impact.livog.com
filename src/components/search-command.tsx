"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { SearchIcon, Loader2 } from "lucide-react";
import { Input } from "./ui/input";

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
  onSelect,
}: SearchCommandProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
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
    onSelect?.(result);
    if (!onSelect) router.push(`/${result.type}/${result.path.join("/")}`);
    setOpen(false);
  };

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setOpen(false);
      return;
    }
    setOpen(true);
  };

  const memoizedResults = useMemo(() => {
    if (results.length === 0) {
      return <CommandEmpty>No results found.</CommandEmpty>;
    }
    return (
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
    );
  }, [results]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverAnchor>
          <div
            data-slot="command-input-wrapper"
            className="flex items-center gap-2 border-b px-3"
          >
            <SearchIcon className="size-4 shrink-0 opacity-50" />
            <Input
              data-slot="command-input"
              className={cn(
                "placeholder:text-muted-foreground flex h-11 w-full rounded-md py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background !ring-0 border-none bg-background !outline-none"
              )}
              placeholder={placeholder}
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            {isLoading && (
              <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" />
            )}
          </div>
        </PopoverAnchor>
        <PopoverContent
          asChild
          align="center"
          sideOffset={4}
          className="w-[var(--radix-popper-anchor-width)] p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Command>
            <CommandList>
              {query && memoizedResults}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
