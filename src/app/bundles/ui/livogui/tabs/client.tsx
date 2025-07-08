'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent, TabPanel } from '@/components/livogui/tabs'

export function TabsPage() {
  return (
    <Tabs defaultValue="tab1" className="max-w-md">
      <TabsList className="mb-4">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>

      <TabsContent>
        <TabPanel value="tab1">
          <p>Content for Tab 1</p>
        </TabPanel>
        <TabPanel value="tab2">
          <p>Content for Tab 2</p>
        </TabPanel>
        <TabPanel value="tab3">
          <p>Content for Tab 3</p>
        </TabPanel>
      </TabsContent>
    </Tabs>
  )
} 