import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

const SingleCard = (props) => {
  const { card } = props
  console.log(card);
  
  return (
    <Card>
      <Card.Content>
        <Image src="/skeleton_warrior.png" />
        <Card.Header>{card.name}</Card.Header>
        <Card.Meta>
          <span>Summon Count: {card.global_count}</span>
        </Card.Meta>
        <Card.Description>
          {card.description.length > 30 ? card.description.substr(0, 30) : card.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name='legal' />{card.atk}
        {"                            "}
        <Icon name='target' />{card.def}
      </Card.Content>
    </Card>
  )
}


export default SingleCard
