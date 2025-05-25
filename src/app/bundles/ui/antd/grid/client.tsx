'use client'

import { Row, Col } from 'antd'

export function GridPage() {
  return (
    <Row gutter={8}>
      <Col span={8}>
        <div style={{ background: '#eee', padding: 8 }}>A</div>
      </Col>
      <Col span={8}>
        <div style={{ background: '#ccc', padding: 8 }}>B</div>
      </Col>
      <Col span={8}>
        <div style={{ background: '#aaa', padding: 8 }}>C</div>
      </Col>
    </Row>
  )
}
