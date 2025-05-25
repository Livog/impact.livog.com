'use client'

import { Splitter } from 'antd'

export function SplitterPage() {
  return (
    <Splitter>
      <Splitter.Panel>
        <div style={{ padding: 8 }}>Left</div>
      </Splitter.Panel>
      <Splitter.Panel>
        <div style={{ padding: 8 }}>Right</div>
      </Splitter.Panel>
    </Splitter>
  )
}
