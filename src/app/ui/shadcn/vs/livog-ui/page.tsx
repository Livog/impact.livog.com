import { ImpactTable } from '@/components/impact-table'

export default function Page() {
  return (
    <div className="mx-auto my-8 max-w-2xl">
      <h1 className="mb-4 text-2xl font-semibold">ShadCN vs Livog UI</h1>
      <ImpactTable
        routePattern="/bundles/ui/:lib/vs/:other"
        baselineRoute="/bundles/ui/livog-ui/vs/shadcn"
        trimPrefix={["/bundles/ui/"]}
      />
    </div>
  )
}
