const express = require('express');
const axios = require('axios')

const app = express();
const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/api/code/:userhandle', async (req, res) => {
  axios.get(`https://www.codewars.com/api/v1/users/${req.params.userhandle}?access_key=yascwivYsWnbjPgSmPxH`)
    .then(result => res.send(result.data))
});

app.get('/api/code/validate/:userhandle', (req, res) => {
  console.log(req, res);
  
  axios.get(`https://www.codewars.com/api/v1/users/${req.params.userhandle}?access_key=yascwivYsWnbjPgSmPxH`)
    .then(() => res.send(true))
    .catch(() => res.send(false))
})

app.listen(port, () => console.log(`Listening on port ${port}`));
