const express = require('express');
const axios = require('axios')

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/code/:user_handle', (req, res) => {
  axios.get('https://www.codewars.com/api/v1/users/Iggyfufu?access_key=yascwivYsWnbjPgSmPxH')
    .then(result => res.send(result.data))
});

app.listen(port, () => console.log(`Listening on port ${port}`));