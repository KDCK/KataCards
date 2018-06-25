import React, { Component } from 'react'
import { Card, Col, CardTitle, Row } from 'react-materialize'

class SingleCard extends Component {
  render() {
    return (
      <Row>
      <Col m={6} s={12}>
        <Card
          className="small"
          header={<CardTitle image="img/sample-1.jpg">Card Title</CardTitle>}
        >
          I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.
        </Card>
      </Col>
      </Row>
    )
  }
}

export default SingleCard
