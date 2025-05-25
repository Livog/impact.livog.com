import { ImpactTable } from '@/components/impact-table'

export default async function Page() {
  return (
    <div className="mx-auto my-8 max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold">Material UI</h1>
      <ImpactTable routePattern="/bundles/ui/material/:name" trimPrefix={['/bundles/ui/material/']} />
    </div>
  )
}
