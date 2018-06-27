import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'fire-connect'
import firebase, { auth, db } from './firebase'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import history from './history'

ReactDOM.render(
  <Provider
    auth={auth}
    database={db}
    firebaseTimestamp={firebase.database.ServerValue.TIMESTAMP}
  >
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
