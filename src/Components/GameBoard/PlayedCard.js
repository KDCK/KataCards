import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

const PlayedCard = props => {
  const { card } = props
  return (
    <Card>
      <Card.Content>
        <Image src={`/${card.name}.${card.file}`} style={{ marginBottom: '10px' }} />
        <Card.Header>{card.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Icon name="legal" />
        {card.atk}
        <Icon name="shield" />
        {card.def}
      </Card.Content>
    </Card>
  )
}

export default PlayedCard
