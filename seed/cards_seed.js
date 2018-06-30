const firebase = require('../src/firebase.js')
//import firebase from 'firebase'


const cards = [
  {
    name: 'Vérane',
    atk: 28,
    def: 10,
    tier: 2,
    global_count: 0,
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
  },
  {
    name: 'Bérengère',
    atk: 47,
    def: 14,
    tier: 2,
    global_count: 0,
    description:
      'Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.'
  },
  {
    name: 'Esbjörn',
    atk: 33,
    def: 10,
    tier: 3,
    global_count: 0,
    description:
      'Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.'
  },
  {
    name: 'Zoé',
    atk: 86,
    def: 83,
    tier: 2,
    global_count: 0,
    description:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla.'
  },
  {
    name: 'Lyséa',
    atk: 82,
    def: 68,
    tier: 2,
    global_count: 0,
    description:
      'Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.'
  },
  {
    name: 'Camélia',
    atk: 55,
    def: 39,
    tier: 2,
    global_count: 0,
    description:
      'Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.'
  },
  {
    name: 'Dorothée',
    atk: 73,
    def: 12,
    tier: 1,
    global_count: 0,
    description:
      'Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.'
  },
  {
    name: 'Björn',
    atk: 59,
    def: 82,
    tier: 1,
    global_count: 0,
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor.'
  },
  {
    name: 'Maïly',
    atk: 77,
    def: 97,
    tier: 2,
    global_count: 0,
    description:
      'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.'
  },
  {
    name: 'Tán',
    atk: 91,
    def: 97,
    tier: 2,
    global_count: 0,
    description:
      'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.'
  },
  {
    name: 'Clélia',
    atk: 53,
    def: 13,
    tier: 2,
    global_count: 0,
    description:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.'
  },
  {
    name: 'Eloïse',
    atk: 20,
    def: 37,
    tier: 1,
    global_count: 0,
    description:
      'Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.'
  },
  {
    name: 'Annotés',
    atk: 32,
    def: 54,
    tier: 3,
    global_count: 0,
    description:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus.'
  },
  {
    name: 'Néhémie',
    atk: 65,
    def: 70,
    tier: 2,
    global_count: 0,
    description:
      'Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.'
  },
  {
    name: 'Naëlle',
    atk: 86,
    def: 7,
    tier: 2,
    global_count: 0,
    description:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.'
  },
  {
    name: 'Andréa',
    atk: 19,
    def: 86,
    tier: 1,
    global_count: 0,
    description:
      'Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.'
  },
  {
    name: 'Athéna',
    atk: 56,
    def: 58,
    tier: 1,
    global_count: 0,
    description:
      'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat.'
  },
  {
    name: 'Aurélie',
    atk: 62,
    def: 83,
    tier: 1,
    global_count: 0,
    description:
      'In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy.'
  },
  {
    name: 'Céline',
    atk: 14,
    def: 91,
    tier: 1,
    global_count: 0,
    description:
      'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl.'
  },
  {
    name: 'Styrbjörn',
    atk: 40,
    def: 15,
    tier: 2,
    global_count: 0,
    description:
      'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
  },
  {
    name: 'Maïlis',
    atk: 74,
    def: 47,
    tier: 2,
    global_count: 0,
    description:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis.'
  },
  {
    name: 'Loïs',
    atk: 12,
    def: 31,
    tier: 3,
    global_count: 0,
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
  },
  {
    name: 'Clémence',
    atk: 27,
    def: 87,
    tier: 2,
    global_count: 0,
    description:
      'Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.'
  },
  {
    name: 'Nélie',
    atk: 7,
    def: 65,
    tier: 3,
    global_count: 0,
    description:
      'Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.'
  },
  {
    name: 'Pénélope',
    atk: 12,
    def: 38,
    tier: 1,
    global_count: 0,
    description:
      'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.'
  },
  {
    name: 'Lyséa',
    atk: 27,
    def: 53,
    tier: 1,
    global_count: 0,
    description:
      'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat.'
  },
  {
    name: 'Cléa',
    atk: 48,
    def: 13,
    tier: 2,
    global_count: 0,
    description:
      'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo.'
  },
  {
    name: 'Estève',
    atk: 49,
    def: 42,
    tier: 1,
    global_count: 0,
    description: 'Pellentesque ultrices mattis odio.'
  },
  {
    name: 'Clémentine',
    atk: 92,
    def: 52,
    tier: 1,
    global_count: 0,
    description:
      'Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.'
  },
  {
    name: 'Anaëlle',
    atk: 35,
    def: 37,
    tier: 1,
    global_count: 0,
    description:
      'Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.'
  }
]

firebase.ref(`dumbcards`).set({
  cards
})
