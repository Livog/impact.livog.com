'use client'

import { Pagination } from '@chakra-ui/react'

export function PaginationPage() {
  return (
    <Pagination.Root count={20} pageSize={2} defaultPage={1}>
      <Pagination.PrevTrigger asChild>
        <button />
      </Pagination.PrevTrigger>

      <Pagination.Items render={(page) => <button style={{ border: '1px solid', padding: '2px 4px' }}>{page.value}</button>} />

      <Pagination.NextTrigger asChild>
        <button />
      </Pagination.NextTrigger>
    </Pagination.Root>
  )
}
