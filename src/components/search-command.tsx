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
import { useEffect, useState } from "react";

interface SearchResult {
  kit: string;
  component: string;
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
  onSelect 
}: SearchCommandProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then(setResults)
      .catch(() => {});
    return () => controller.abort();
  }, [query]);

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
                key={`${r.kit}-${r.component}`}
                value={`${r.kit} ${r.component}`}
                onSelect={() => onSelect?.(r)}
              >
                <span>
                  {r.kit} / {r.component}
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