import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDTUyDmowu9Zx2a-HfLonbr3hTx5SGqzv4',
  authDomain: 'fir-tutorial-f4f0f.firebaseapp.com',
  databaseURL: 'https://fir-tutorial-f4f0f.firebaseio.com',
  projectId: 'fir-tutorial-f4f0f',
  storageBucket: 'fir-tutorial-f4f0f.appspot.com',
  messagingSenderId: '576359877651',
}
firebase.initializeApp(config)

export default firebase
