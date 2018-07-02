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
    console.log("SELECTCARD PROPS", this.props)
    const { player, user } = this.props
    const playerNumber = this.props.user.uid === Object.keys(this.props.battleInfo.p1)[0] ? 'p1' : 'p2'

    let cardsArray = this.props.battleInfo[playerNumber][user.uid].cards
    let cardsLength = this.props.battleInfo[playerNumber][user.uid].cards.length - 1
    console.log('Cards Length', cardsLength)
    let cardIndex = null
    for (let i = 0; i < cardsArray.length; i++) {
      if (cardsArray[i].name === card.name) {
        cardIndex = i
      }
    }
    console.log('Card Index', cardIndex)
    let deckLength = this.props.battleInfo[playerNumber][user.uid].deck.length - 1
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
    const playerNumber = this.props.user.uid === Object.keys(this.props.battleInfo.p1)[0] ? 'p1' : 'p2'

    let deckArray = this.props.battleInfo[playerNumber][user.uid].deck
    let deckLength = this.props.battleInfo[playerNumber][user.uid].deck.length - 1
    console.log('Deck Length', deckLength)
    let deckIndex = null
    for (let i = 0; i < deckArray.length; i++) {
      if (deckArray[i].name === card.name) {
        deckIndex = i
      }
    }
    console.log('Deck Index', deckIndex)
    let cardLength = this.props.battleInfo[playerNumber][user.uid].cards.length - 1
    console.log('Card Length', cardLength)
    /// Takes the battle id, card to move, index of card to remove from cards, deck length to assign new id in deck, and user's uid
    this.props.removeFromDeck(
      player.in_battle,
      card,
      deckIndex,
      cardLength,
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
    ref(`/battles/${connector.props.battleId}`).on(
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

    ref(`/battles/${battleId}`).once('value', snapshot => {
      // debugger
      const battle = snapshot.val()
      const player = battle.p1uid === uid ? 'p1' : 'p2'

      const deckRef = ref(`battles/${battleId}/${player}/${uid}/deck`)
      deckRef.child(deckLength + 1).set({ ...card, id: deckLength + 1 })

      const cardRef = ref(`battles/${battleId}/${player}/${uid}/cards/${cardIndex}`)
      cardRef.remove()

    })
  },
  removeFromDeck(battleId, card, deckIndex, cardLength, uid) {

    ref(`/battles/${battleId}`).once('value', snapshot => {
      // debugger
      const battle = snapshot.val()
      const player = battle.p1uid === uid ? 'p1' : 'p2'

      const cardRef = ref(`battles/${battleId}/${player}/${uid}/cards/`)
      cardRef.child(cardLength + 1).set({ ...card, id: cardLength + 1 })

      const deckRef = ref(`battles/${battleId}/${player}/${uid}/deck/${deckIndex}`)
      deckRef.remove()

    })
  }
})

export default firebaseConnect(addListener, addDispatcher)(
  withRouter(StagingArea)
)

// WOOOO
