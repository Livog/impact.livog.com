'use client'

import { Timeline } from '@chakra-ui/react'

export function TimelinePage() {
  return (
    <Timeline.Root maxW="400px">
      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Separator />
          <Timeline.Indicator>
          </Timeline.Indicator>
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title>Product Shipped</Timeline.Title>
          <Timeline.Description>13th May 2021</Timeline.Description>
          <div style={{ fontSize: '0.875rem' }}>
            We shipped your product via <strong>FedEx</strong> and it should
            arrive within 3-5 business days.
          </div>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Separator />
          <Timeline.Indicator>
          </Timeline.Indicator>
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title textStyle="sm">Order Confirmed</Timeline.Title>
          <Timeline.Description>18th May 2021</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Connector>
          <Timeline.Separator />
          <Timeline.Indicator>
          </Timeline.Indicator>
        </Timeline.Connector>
        <Timeline.Content>
          <Timeline.Title textStyle="sm">Order Delivered</Timeline.Title>
          <Timeline.Description>20th May 2021, 10:30am</Timeline.Description>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline.Root>
  )
}
