import { ImpactTable } from "@/components/impact-table";

export default async function Page() {
  return <ImpactTable routePattern="/shadcn/:name" />;
} 