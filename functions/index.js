const functions = require('firebase-functions');
const request = require('request')

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.grabKatas = functions.https.onCall((req, res) => {
  const url = "https://www.codewars.com/api/v1/users/Iggyfufu?access_key=yascwivYsWnbjPgSmPxH"
  
  // console.log(req);
  
  return request(url, (error, response, body) => {
    console.log('asdfjlsafljwkerjwkrjksladf',response, body);
    
    res.send(body);
  });
})