import { ImpactTable } from "@/components/impact-table";

export default async function Page() {
  return (
    <div className="max-w-2xl mx-auto my-8">
      <h1 className="text-2xl font-semibold mb-4">Hero UI</h1>
      <ImpactTable routePattern="/bundles/ui/heroui/:name" trimPrefix={["/bundles/ui/heroui/"]} />
    </div>
  );
}
