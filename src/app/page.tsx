import SearchDirect from "@/components/search-direct";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-80 min-h-60 relative">
        <SearchDirect className="absolute top-0 left-0 w-full" />
      </div>
    </div>
  );
}
