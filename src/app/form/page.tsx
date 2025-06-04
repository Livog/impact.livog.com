import { ImpactTable } from '@/components/impact-table'

export default function Page() {
  return (
    <div className="mx-auto my-8 max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold">Forms</h1>
      <ImpactTable routePattern="/bundles/form/:name" trimPrefix={['/bundles/form/']} />
    </div>
  )
}
