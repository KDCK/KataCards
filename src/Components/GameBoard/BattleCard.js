import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

const BattleCard = props => {
  const { card, playedCard, turn } = props
  return (
    <Card onClick={() => playedCard(card.id, turn, card.atk, card.def)}>
      <Card.Content>
        <Image src={`/${card.name}.${card.file}`} style={{marginBottom: '10px', height: '10vh'}}/>
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

export default BattleCard
