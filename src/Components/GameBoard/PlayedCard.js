import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

const PlayedCard = props => {
  const { card } = props
  return (
    <Card>
      <Card.Content>
        <Image src="/skeleton_warrior.png" style={{ marginBottom: '10px' }} />
        <Card.Header>{card.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Icon name="legal" />
        {card.atk}
        {'                            '}
        <Icon name="target" />
        {card.def}
      </Card.Content>
    </Card>
  )
}

export default PlayedCard