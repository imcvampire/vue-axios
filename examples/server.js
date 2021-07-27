const express = require('express')

const app = express()

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': 'Content-Type'
}

app.get('/greet', function (req, res) {
  res.set(cors)
  res.send("<h1>Hello, Vue-Axios!</h1>")
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
