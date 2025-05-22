import { NextResponse } from "next/server";
import { getSearchIndex } from "@/lib/search-index";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const data = await getSearchIndex();
  const filtered = q
    ? data.filter(
        (item) =>
          item.component.toLowerCase().includes(q) ||
          item.kit.toLowerCase().includes(q)
      )
    : [];
  return NextResponse.json(filtered);
}
