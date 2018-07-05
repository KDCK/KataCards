// const functions = require('firebase-functions')

// // Firebase Admin to access Firebase Realtime DB
// const admin = require('firebase-admin')
// admin.initializeApp()

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //  response.send("Hello from Firebase!");
// // });

// // exports.addMessage = functions.https.onRequest((req, res) => {
// //   const original = req.query.text
// //   return admin
// //     .database()
// //     .ref('/messages')
// //     .push({original: original})
// //     .then(snapshot => {
// //       return res.redirect(303, snapshot.ref.toString())
// //     })
// // })

// exports.makeBattle = functions.database
//   .ref('/queue')
//   .onWrite((change, context) => {
//     console.log(change)
//   })
