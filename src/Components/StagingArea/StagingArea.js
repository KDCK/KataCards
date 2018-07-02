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
    const playerNumber = this.props.user.uid === Object.keys(this.props.battleInfo.p1)[0] ? 'p1' : 'p2'

    let cardsArray = this.props.battleInfo[playerNumber][user.uid].cards
    console.log('cards keys', Object.values(cardsArray))
    console.log("CARDS ARRAY", cardsArray)
    let cardIndex = null

    for (let i = 0; i < cardsArray.length; i++) {
      if (cardsArray[i] === undefined) continue
      if (cardsArray[i].name === card.name) {
        cardIndex = i
      }
    }
    let deckLength = this.props.battleInfo[playerNumber][user.uid].deck.length - 1
    console.log("What is the deck?", this.props.battleInfo[playerNumber][user.uid].deck)
    console.log("deck length", deckLength + 1)
    if (deckLength + 1 >= 5) {
      return
    }
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
    let deckIndex = null

    for (let i = 0; i < deckArray.length; i++) {
      if (deckArray[i] === undefined) continue
      if (deckArray[i].name === card.name) {
        deckIndex = i
      }
    }
    let cardLength = this.props.battleInfo[playerNumber][user.uid].cards.length - 1
    /// Takes the battle id, card to move, index of card to remove from cards, deck length to assign new id in deck, and user's uid
    this
      .props.removeFromDeck(
        player.in_battle,
        card,
        deckIndex,
        cardLength,
        user.uid
      )
  }

  render() {
    if (!(this.props.battleInfo && this.props.player && this.props.user)) return <Spinner />
    const { battleInfo, user } = this.props
    if (typeof battleInfo.p1 !== 'object' || typeof battleInfo.p2 !== 'object') return <Spinner />
    console.log(battleInfo, user, battleInfo.p1)

    const playerInfo = (battleInfo.p1).hasOwnProperty(user.uid) ? battleInfo.p1[user.uid] : battleInfo.p2[user.uid]

    console.log("PLAYER INFO", playerInfo)
    console.log("PLAYER BATTLE INFO", battleInfo.p1[user.uid], battleInfo.p2[user.uid])
    console.log("The Deck is An Array?", Array.isArray(playerInfo.deck))
    // console.log("PLAYER INFO", battleInfo.p1[`${user.uid}`], battleInfo.p2[`${user.uid}`], Object.keys(this.props.battleInfo.p1))
    return (
      <div className="staging-area-main">
        <h1>Welcome to the Staging Area</h1>
        <h3>Select 5 cards for your battle deck!</h3>
        <Row>
          {playerInfo.deck ? playerInfo.deck.map(card => (
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
            : null}
          <hr />
          {playerInfo.cards ? playerInfo.cards.map(card => (
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
            : null}
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

      ref(`battles/${battleId}/${player}/${uid}/deck`).once('value', snapshot => {
        let arr = [...snapshot.val()]
        let filtered = arr.filter(item => item !== undefined)
        ref(`battles/${battleId}/${player}/${uid}/deck`).child(deckIndex).set({})
      })
    })
  }
})

export default firebaseConnect(addListener, addDispatcher)(
  withRouter(StagingArea)
)

// WOOOO
