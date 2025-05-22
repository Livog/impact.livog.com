import SearchDirect from "@/components/search-direct";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-80 min-h-60 relative">
        <h1 className="text-4xl font-bold">Impact Of UI Components</h1>
        <SearchDirect className="absolute top-0 left-0 w-full" />
      </div>
    </div>
  );
}
