import { ImpactTable } from '@/components/impact-table'

export default function Page() {
  return (
    <div className="mx-auto my-8 max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold">Livog UI vs ShadCN</h1>
      <ImpactTable
        routePattern="/bundles/ui/:lib/vs/:other"
        baselineRoute="/bundles/ui/shadcn/vs/livog-ui"
        trimPrefix={["/bundles/ui/"]}
      />
    </div>
  )
}
