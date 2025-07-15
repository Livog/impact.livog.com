'use client'

import { AccordionPage } from '@/app/bundles/ui/livogui/accordion/client'
import { CheckboxPage } from '@/app/bundles/ui/livogui/checkbox/client'
import { CollapsiblePage } from '@/app/bundles/ui/livogui/collapsible/client'
import { DialogPage } from '@/app/bundles/ui/livogui/dialog/client'
import { PopoverPage } from '@/app/bundles/ui/livogui/popover/client'
import { SwitchPage } from '@/app/bundles/ui/livogui/switch/client'
import { TabsPage } from '@/app/bundles/ui/livogui/tabs/client'

export default function LivoguiBundlePage() {
  return (
    <>
      <AccordionPage />
      <CheckboxPage />
      <CollapsiblePage />
      <DialogPage />
      <PopoverPage />
      <SwitchPage />
      <TabsPage />
    </>
  )
}
