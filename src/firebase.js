import firebase from 'firebase'
import config from './config'
// Initialize Firebase

firebase.initializeApp(config)
export const auth = firebase.auth()
export const db = firebase.database()
export const functions = firebase.functions()
export default firebase
