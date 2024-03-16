require('dotenv').config()
const express = require('express')

const app = express()
app.get('/', (req, res) => {
  res.send('Hello Project')
})
app.get('/add', (req, res) => {
  res.send('Hello')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on the port ${port}`)
})
