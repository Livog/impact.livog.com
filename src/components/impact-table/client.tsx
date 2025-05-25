'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/data-table'

export interface ImpactRow {
  name: string
  bundle: number
  delta: number
}

interface ImpactTableClientProps {
  data: ImpactRow[]
  deltaLabel: string
}

export function ImpactTableClient({ data, deltaLabel }: ImpactTableClientProps) {
  const columns: ColumnDef<ImpactRow>[] = [
    {
      accessorKey: 'name',
      header: () => <span>Name</span>,
      cell: ({ row }) => <span className="font-mono">{row.getValue('name')}</span>
    },
    {
      accessorKey: 'bundle',
      header: () => <span>Bundle size</span>,
      cell: ({ row }) => {
        const v = row.getValue<number>('bundle')
        return <span>{(v / 1024).toFixed(1)} kB</span>
      }
    },
    {
      accessorKey: 'delta',
      header: () => <span>{`Δ vs ${deltaLabel}`}</span>,
      enableSorting: false,
      cell: ({ row }) => {
        const v = row.getValue<number>('delta')
        return <span className="font-medium">{(v / 1024).toFixed(1)} kB</span>
      }
    }
  ]

  return <DataTable columns={columns} data={data} />
}
