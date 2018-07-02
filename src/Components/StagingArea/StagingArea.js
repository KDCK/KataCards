import React, { Component } from 'react'
import { firebaseConnect } from 'fire-connect'
import { Row, Col } from 'react-materialize'
import { withRouter } from 'react-router-dom'

import SingleCard from '../Cards/SingleCard.js'
import Spinner from '../Loader/Spinner.js'

import './StagingArea.css'

class StagingArea extends Component {
  constructor(props) {
    super(props)
    this.state = { deckIndex: 5, cardIndex: 5 }
    this.selectCard = this.selectCard.bind(this)
  }

  componentDidMount() {
    console.log('COMPONENTPROPS', this.props)
  }

  componentDidUpdate(prevProps) {
    if (this.props.player && !prevProps.player) {
      const { player, user } = this.props
      console.log('Battle initialized')

      this.props.initializeBattle(player.in_battle, player, user.uid)
    }
  }

  selectCard(card) {
    const { player, user } = this.props
    let cardsArray = this.props.battleInfo.p1[user.uid].cards
    let cardsLength = this.props.battleInfo.p1[user.uid].cards.length - 1
    console.log('Cards Length', cardsLength)
    let cardIndex = null
    for (let i = 0; i < cardsArray.length; i++) {
      if (!cardsArray[i]) continue
      if (cardsArray[i].name === card.name) {
        cardIndex = i
      }
    }
    console.log('Card Index', cardIndex)
    let deckLength = this.props.battleInfo.p1[user.uid].deck.length - 1
    console.log('Deck Length', deckLength)
    /// Takes the battle id, card to move, index of card to remove from cards, deck length to assign new id in deck, and user's uid
    this.props.addToDeck(
      player.in_battle,
      card,
      cardIndex,
      deckLength,
      user.uid
    )
  }

  deselectCard(card) {
    const { player, user } = this.props
    let cardsArray = this.props.battleInfo.p1[user.uid].cards
    let cardsLength = this.props.battleInfo.p1[user.uid].cards.length - 1
    console.log('Cards Length', cardsLength)
    let cardIndex = null
    for (let i = 0; i < cardsArray.length; i++) {
      if (!cardsArray[i]) continue
      if (cardsArray[i].name === card.name) {
        cardIndex = i
      }
    }
    console.log('Card Index', cardIndex)
    let deckLength = this.props.battleInfo.p1[user.uid].deck.length - 1
    console.log('Deck Length', deckLength)
    /// Takes the battle id, card to move, index of card to remove from cards, deck length to assign new id in deck, and user's uid
    this.props.removeFromDeck(
      player.in_battle,
      card,
      cardIndex,
      deckLength,
      user.uid
    )
  }

  render() {
    console.log('User UID', this.props.user.uid)
    console.log('Props', this.props)
    console.log('Battle Info', this.props.battleInfo)
    // this.props.battleInfo
    //   ? console.log(this.props.battleInfo.p1[this.props.user.uid].cards)
    //   : ''
    // console.log('Card Uids', this.props.battleInfo.p1)
    return (
      <div className="staging-area-main">
        <h1>Welcome to the Staging Area</h1>
        <h3>Select 5 cards for your battle deck!</h3>
        <Row>
          {!this.props.player ? (
            <Spinner />
          ) : !this.props.player.cards ? (
            <h1>You have no cards!</h1>
          ) : (
            this.props.player.deck.map(card => (
              <Col
                onClick={() => this.deselectCard(card)}
                key={card.id}
                s={2}
                m={2}
                style={{ paddingBottom: '15px' }}
              >
                <SingleCard card={card} />
              </Col>
            ))
          )}
          <hr />
          {!this.props.player ? (
            <Spinner />
          ) : !this.props.player.cards ? (
            <h1>You have no cards!</h1>
          ) : (
            this.props.player.cards.map(card => (
              <Col
                onClick={() => this.selectCard(card)}
                key={card.id}
                s={2}
                m={2}
                style={{ paddingBottom: '15px' }}
              >
                <SingleCard card={card} />
              </Col>
            ))
          )}
        </Row>
      </div>
    )
  }
}

const addListener = (connector, ref, user, setEventType) => ({
  listenUser: () =>
    ref(`/users/${connector.props.auth.currentUser.uid}`).on(
      setEventType('value'),
      snapshot => {
        connector.setState({ player: snapshot.val() })
      }
    ),
  // listenBattle: () =>
  //   ref('/battles').on(setEventType('child_added'), snapshot => {
  //     connector.setState({ battle: snapshot.val() })
  //   }),
  listenBattleInfo: () =>
    ref(`/battles/${connector.props.battleId}/`).on(
      setEventType('value'),
      snapshot => {
        console.log('VALUE', snapshot.val())
        connector.setState({ battleInfo: snapshot.val() })
      }
    )
})

const addDispatcher = (connector, ref) => ({
  initializeBattle(battleId, user, uid) {
    ref(`/battles/${battleId}`).once('value', snapshot => {
      const battle = snapshot.val()
      if (battle.p1 === uid) {
        const p1 = {}
        p1[uid] = user
        ref(`/battles/${battleId}`).update({
          p1: p1,
          p1uid: uid,
          p1done: false,
          p2done: false,
          p1atk: 0,
          p2atk: 0,
          p1def: 0,
          p2def: 0,
          ready: false,
          turn: 'playerOne',
          battleId: battleId
        })
      } else if (battle.p2 === uid) {
        const p2 = {}
        p2[uid] = user
        ref(`/battles/${battleId}`).update({
          p2: p2,
          p2uid: uid,
          p1done: false,
          p2done: false,
          p1atk: 0,
          p2atk: 0,
          p1def: 0,
          p2def: 0,
          ready: false,
          turn: 'playerOne',
          battleId: battleId
        })
      }
    })
  },
  addToDeck(battleId, card, cardIndex, deckLength, uid) {
    ref(`/battles/${battleId}`).on('value', snapshot => {
      const battle = snapshot.val()
      if (battle.p1uid === uid) {
        const deckRef = ref(`battles/${battleId}/p1/${uid}/deck`)
        deckRef.child(deckLength + 1).set(card)
        const cardRef = ref(`battles/${battleId}/p1/${uid}/cards/${cardIndex}`)
        cardRef.remove()
        // ref(`battles/${battleId}/p1/${uid}/cards/${deckKey}`).remove()
      } else if (battle.p2uid === uid) {
        const deckRef = ref(`battles/${battleId}/p2/${uid}/deck`)
        deckRef.child(deckLength + 1).set(card)
        const cardRef = ref(`battles/${battleId}/p2/${uid}/cards/${cardIndex}`)
        cardRef.remove()
        // ref(`battles/${battleId}/p2/${uid}/deck/${cardKey}`).update({
        //   id: cardKey
      }
    })
  },
  removeFromDeck(battleId, card, deckIndex, cardLength, uid) {
    ref(`/battles/${battleId}`).on('value', snapshot => {
      const battle = snapshot.val()
      if (battle.p1uid === uid) {
        const deckRef = ref(`battles/${battleId}/p1/${uid}/deck`)
        deckRef.remove()
        const cardRef = ref(`battles/${battleId}/p1/${uid}/cards/${deckIndex}`)
        cardRef.child(cardLength + 1).set(card)
        // ref(`battles/${battleId}/p1/${uid}/cards/${deckKey}`).remove()
      } else if (battle.p2uid === uid) {
        const deckRef = ref(`battles/${battleId}/p2/${uid}/deck`)
        deckRef.remove()
        const cardRef = ref(`battles/${battleId}/p2/${uid}/cards/${deckIndex}`)
        cardRef.child(cardLength + 1).set(card)
        // ref(`battles/${battleId}/p2/${uid}/deck/${cardKey}`).update({
        //   id: cardKey
      }
    })
  }
})

export default firebaseConnect(addListener, addDispatcher)(
  withRouter(StagingArea)
)
