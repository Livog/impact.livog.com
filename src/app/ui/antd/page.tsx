import { ImpactTable } from '@/components/impact-table'

export default async function Page() {
  return (
    <div className="mx-auto my-8 max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold">Antd UI</h1>
      <ImpactTable routePattern="/bundles/ui/antd/:name" trimPrefix={['/bundles/ui/antd/']} />
    </div>
  )
}
