'use client'

import { FileUpload } from '@chakra-ui/react'

export function FileUploadPage() {
  return (
    <FileUpload.Root>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <button type="button">Upload file</button>
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
  )
}
