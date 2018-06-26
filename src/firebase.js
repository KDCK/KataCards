import firebase from 'firebase'
import config from './config'
// Initialize Firebase

firebase.initializeApp(config)
export const auth = firebase.auth()
export default firebase
