import { ImpactTable } from '@/components/impact-table'

export default async function Page() {
  return (
    <div className="mx-auto my-8 max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold">Livog UI</h1>
      <ImpactTable routePattern="/bundles/ui/livogui/:name" trimPrefix={['/bundles/ui/livogui/']} />
    </div>
  )
}
