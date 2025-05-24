'use client'

import { Pagination } from '@chakra-ui/react'
import { LuChevronLeft, LuChevronRight } from 'lucide-react'

export function PaginationPage() {
  return (
    <Pagination.Root count={20} pageSize={2} defaultPage={1}>
      <div style={{ display: 'flex', gap: '4px' }}>
        <Pagination.PrevTrigger asChild>
          <button>
            <LuChevronLeft />
          </button>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <button style={{ border: '1px solid', padding: '2px 4px' }}>
              {page.value}
            </button>
          )}
        />

        <Pagination.NextTrigger asChild>
          <button>
            <LuChevronRight />
          </button>
        </Pagination.NextTrigger>
      </div>
    </Pagination.Root>
  )
}
