'use client'

import { Tabs } from '@chakra-ui/react'

export function TabsPage() {
  return (
    <Tabs.Root defaultValue="members">
      <Tabs.List>
        <Tabs.Trigger value="members">
          Members
        </Tabs.Trigger>
        <Tabs.Trigger value="projects">
          Projects
        </Tabs.Trigger>
        <Tabs.Trigger value="tasks">
          Settings
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="members">Manage your team members</Tabs.Content>
      <Tabs.Content value="projects">Manage your projects</Tabs.Content>
      <Tabs.Content value="tasks">Manage your tasks for freelancers</Tabs.Content>
    </Tabs.Root>
  )
}
