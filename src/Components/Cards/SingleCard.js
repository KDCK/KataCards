import React from 'react'
import { Card, Image, Icon, Popup } from 'semantic-ui-react'
import './SingleCard.css'

const SingleCard = props => {
  const {card} = props
  return (
    <Card>
      <Card.Content>
        <Image src={`/${card.name}.${card.file}`} />
        <Card.Header>{card.name}</Card.Header>
        <Popup
          trigger={
            <Card.Description>
              {card.description.length > 30
                ? card.description.substr(0, 30) + '...'
                : card.description}
            </Card.Description>
          }
          content={card.description}
        />
      </Card.Content>
      <Popup
        trigger={
          <Card.Content extra>
            <Icon name="quidditch" />
            {card.atk}
            <Icon name="shield" />
            {card.def}
            <Icon name="target" />
            {card.tier}
          </Card.Content>
        }
        content="Attack, Defense, and Tier"
      />
    </Card>
  )
}

export default SingleCard
