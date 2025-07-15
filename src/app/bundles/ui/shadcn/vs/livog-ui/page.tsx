// This page imports matching ShadCN components for bundle size comparison
'use client'

import { AccordionPage } from '@/app/bundles/ui/shadcn/accordion/client'
import { DialogPage } from '@/app/bundles/ui/shadcn/dialog/client'
import { AlertDialogPage } from '@/app/bundles/ui/shadcn/alert-dialog/client'
import { SheetPage } from '@/app/bundles/ui/shadcn/sheet/client'
import { CheckboxPage } from '@/app/bundles/ui/shadcn/checkbox/client'
import { CollapsiblePage } from '@/app/bundles/ui/shadcn/collapsible/client'
import { PopoverPage } from '@/app/bundles/ui/shadcn/popover/client'
import { SwitchPage } from '@/app/bundles/ui/shadcn/switch/client'
import { TabsPage } from '@/app/bundles/ui/shadcn/tabs/client'

export default function ShadcnBundlePage() {
  return (
    <div className="hidden">
      <AccordionPage />
      <AlertDialogPage />
      <DialogPage />
      <SheetPage />
      <CheckboxPage />
      <CollapsiblePage />
      <PopoverPage />
      <SwitchPage />
      <TabsPage />
    </div>
  )
}
