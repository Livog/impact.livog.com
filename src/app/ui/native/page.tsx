import { ImpactTable } from '@/components/impact-table'

export default async function Page() {
  return (
    <div className="mx-auto my-8 max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold">Native</h1>
      <ImpactTable routePattern="/bundles/native/:name" trimPrefix={['/bundles/native/']} />
    </div>
  )
}
