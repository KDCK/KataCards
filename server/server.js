const express = require('express');
const axios = require('axios')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;

var corsOptions = {
  origin: 'https://codecards-53f05.firebaseapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors())

app.get('/api/code/:userhandle', cors(corsOptions), async (req, res) => {
  axios.get(`https://www.codewars.com/api/v1/users/${req.params.userhandle}?access_key=yascwivYsWnbjPgSmPxH`)
    .then(result => res.send(result.data))
});

app.get('/api/code/validate/:userhandle', cors(corsOptions), (req, res) => {
  console.log(req, res);

  axios.get(`https://www.codewars.com/api/v1/users/${req.params.userhandle}?access_key=yascwivYsWnbjPgSmPxH`)
    .then(() => res.send(true))
    .catch(() => res.send(false))
})

app.listen(port, () => console.log(`Listening on port ${port}`));
