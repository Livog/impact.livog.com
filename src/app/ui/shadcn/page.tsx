import { ImpactTable } from "@/components/impact-table";

export default async function Page() {
  return <ImpactTable routePattern="/bundles/ui/shadcn/:name" />;
} 