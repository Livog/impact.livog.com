import SearchDirect from "@/components/search-direct";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center flex-col justify-center">
      <h1 className="text-4xl font-bold text-center mb-4">Impact Of UI Components</h1>
      <div className="w-full max-w-xl min-h-60 relative">
        <SearchDirect className="absolute top-0 left-0 w-full" />
      </div>
    </div>
  );
}
