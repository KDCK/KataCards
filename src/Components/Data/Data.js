import React, {Component} from 'react'
import {firebaseConnect} from 'fire-connect'

const specialDeck = [
  {
    id: 0,
    name: 'Vérane',
    atk: 28,
    def: 10,
    tier: 2,
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
  },
  {
    id: 1,
    name: 'Bérengère',
    atk: 47,
    def: 14,
    tier: 2,
    description:
      'Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.'
  },
  {
    id: 2,
    name: 'Esbjörn',
    atk: 33,
    def: 10,
    tier: 3,
    description:
      'Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.'
  },
  {
    id: 3,
    name: 'Zoé',
    atk: 86,
    def: 83,
    tier: 2,
    description:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla.'
  },
  {
    id: 4,
    name: 'Lyséa',
    atk: 82,
    def: 68,
    tier: 2,
    description:
      'Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.'
  }
]
export const cardsArray = [
  {
    id: 1,
    name: 'Vérane',
    atk: 28,
    def: 10,
    tier: 2,
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
  },
  {
    id: 2,
    name: 'Bérengère',
    atk: 47,
    def: 14,
    tier: 2,
    description:
      'Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.'
  },
  {
    id: 3,
    name: 'Esbjörn',
    atk: 33,
    def: 10,
    tier: 3,
    description:
      'Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.'
  },
  {
    id: 4,
    name: 'Zoé',
    atk: 86,
    def: 83,
    tier: 2,
    description:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla.'
  },
  {
    id: 5,
    name: 'Lyséa',
    atk: 82,
    def: 68,
    tier: 2,
    description:
      'Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.'
  },
  {
    id: 6,
    name: 'Camélia',
    atk: 55,
    def: 39,
    tier: 2,
    description:
      'Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.'
  },
  {
    id: 7,
    name: 'Dorothée',
    atk: 73,
    def: 12,
    tier: 1,
    description:
      'Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.'
  },
  {
    id: 8,
    name: 'Björn',
    atk: 59,
    def: 82,
    tier: 1,
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor.'
  },
  {
    id: 9,
    name: 'Maïly',
    atk: 77,
    def: 97,
    tier: 2,
    description:
      'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.'
  },
  {
    id: 10,
    name: 'Tán',
    atk: 91,
    def: 97,
    tier: 2,
    description:
      'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.'
  },
  {
    id: 11,
    name: 'Clélia',
    atk: 53,
    def: 13,
    tier: 2,
    description:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.'
  },
  {
    id: 12,
    name: 'Eloïse',
    atk: 20,
    def: 37,
    tier: 1,
    description:
      'Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.'
  },
  {
    id: 13,
    name: 'Annotés',
    atk: 32,
    def: 54,
    tier: 3,
    description:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus.'
  },
  {
    id: 14,
    name: 'Néhémie',
    atk: 65,
    def: 70,
    tier: 2,
    description:
      'Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.'
  },
  {
    id: 15,
    name: 'Naëlle',
    atk: 86,
    def: 7,
    tier: 2,
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.'
  },
  {
    id: 16,
    name: 'Andréa',
    atk: 19,
    def: 86,
    tier: 1,
    description:
      'Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.'
  },
  {
    id: 17,
    name: 'Athéna',
    atk: 56,
    def: 58,
    tier: 1,
    description:
      'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.'
  },
  {
    id: 18,
    name: 'Aurélie',
    atk: 62,
    def: 83,
    tier: 1,
    description:
      'In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy.'
  },
  {
    id: 19,
    name: 'Céline',
    atk: 14,
    def: 91,
    tier: 1,
    description:
      'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl.'
  },
  {
    id: 20,
    name: 'Styrbjörn',
    atk: 40,
    def: 15,
    tier: 2,
    description:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
  },
  {
    id: 21,
    name: 'Maïlis',
    atk: 74,
    def: 47,
    tier: 2,
    description:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis.'
  },
  {
    id: 22,
    name: 'Loïs',
    atk: 12,
    def: 31,
    tier: 3,
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
  },
  {
    id: 23,
    name: 'Clémence',
    atk: 27,
    def: 87,
    tier: 2,
    description:
      'Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.'
  },
  {
    id: 24,
    name: 'Nélie',
    atk: 7,
    def: 65,
    tier: 3,
    description:
      'Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.'
  },
  {
    id: 25,
    name: 'Pénélope',
    atk: 12,
    def: 38,
    tier: 1,
    description:
      'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.'
  },
  {
    id: 26,
    name: 'Lyséa',
    atk: 27,
    def: 53,
    tier: 1,
    description:
      'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.'
  },
  {
    id: 27,
    name: 'Cléa',
    atk: 48,
    def: 13,
    tier: 2,
    description:
      'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo.'
  },
  {
    id: 28,
    name: 'Estève',
    atk: 49,
    def: 42,
    tier: 1,
    description: 'Pellentesque ultrices mattis odio.'
  },
  {
    id: 29,
    name: 'Clémentine',
    atk: 92,
    def: 52,
    tier: 1,
    description:
      'Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
  },
  {
    id: 30,
    name: 'Anaëlle',
    atk: 35,
    def: 37,
    tier: 1,
    description:
      'Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.'
  }
]

export const starterDeck = () => {
    const result = []
    const tier1 = []
    const tier2 = []

    cardsArray.forEach(card=>{
      if(card.tier === 'Tier 1') return tier1.push(card)
    })

    cardsArray.forEach(card=>{
      if(card.tier === 'Tier 2') return tier2.push(card)
    })

    for(let i = 0; result.legnth < 5; i++){
      const randNum = Math.floor(Math.random() * tier1.length);
      if(!result.includes(tier1[randNum])){
        result.push(tier1[randNum])
      }
    }

    for(let i = 0; result.legnth < 6; i++){
      const randNum = Math.floor(Math.random() * tier2.length);
      if(!result.includes(tier2[randNum])){
        result.push(tier2[randNum])
      }
    }

    return result

  }

class Data extends Component {

  componentWillMount() {
    this.props.seedP1Deck(specialDeck)
    this.props.seedP2Deck(specialDeck)
    //this.props.seedCardCollection(cardsArray)
  }

  render() {
    return <div/>
  }
}


const addDispatcher = (connector, ref) => ({
  seedP1Deck(cards) {
    cards.forEach(card =>{
      //ref(`game/specialid/p1/TlgEFiyrHcYPFJKjVPaqYBzWWrs1/deck/${card.id}`).set({...card})
      //ref(`/users/TlgEFiyrHcYPFJKjVPaqYBzWWrs1/deck/${card.id}`).set({...card})
    })
  },

  seedP2Deck(cards) {
    cards.forEach(card =>{
      //ref(`game/specialid/p2/caCrOjoGxEamloCVeLGfcDtJDS92/deck/${card.id}`).set({...card})
      //ref(`users/caCrOjoGxEamloCVeLGfcDtJDS92/deck/${card.id}`).set({...card})
    })
  },

  seedCardCollection(cards){
    cards.forEach(card =>{
      ref(`cards`).set({...card})
    })
  }
})



export default firebaseConnect(null, addDispatcher)(Data)
