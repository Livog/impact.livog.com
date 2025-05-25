'use client'

import type { ColumnDef, Column } from '@tanstack/react-table'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
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

function SortableHeader({ column, children }: { column: Column<ImpactRow>; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span>{children}</span>
      {column.getIsSorted() === 'desc' ? (
        <ArrowDown className="h-4 w-4" />
      ) : column.getIsSorted() === 'asc' ? (
        <ArrowUp className="h-4 w-4" />
      ) : (
        <ArrowUpDown className="h-4 w-4 opacity-50" />
      )}
    </div>
  )
}

export function ImpactTableClient({ data, deltaLabel }: ImpactTableClientProps) {
  const columns: ColumnDef<ImpactRow>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => <SortableHeader column={column}>Name</SortableHeader>,
      cell: ({ row }) => <span className="font-mono">{row.getValue('name')}</span>
    },
    {
      accessorKey: 'bundle',
      header: ({ column }) => <SortableHeader column={column}>Bundle size</SortableHeader>,
      cell: ({ row }) => {
        const v = row.getValue<number>('bundle')
        return <span>{(v / 1024).toFixed(1)} kB</span>
      }
    },
    {
      accessorKey: 'delta',
      header: ({ column }) => <SortableHeader column={column}>{`Δ vs ${deltaLabel}`}</SortableHeader>,
      enableSorting: true,
      cell: ({ row }) => {
        const v = row.getValue<number>('delta')
        return <span className="font-medium">{(v / 1024).toFixed(1)} kB</span>
      }
    }
  ]

  return <DataTable columns={columns} data={data} />
}
