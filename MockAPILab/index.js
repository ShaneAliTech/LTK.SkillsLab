const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const loanRouter = require('./routes/ltk')

const port = 3000
const isLocal = true

app.get('/', (req, res) => {
  res.json({
    message: '✨ 👋🌏 ✨',
    stage: process.env.NODE_ENV,
  })
})

app.get('/ping', (req, res) => {
  res.json({
    message: '🏓',
  })
})

app.use(bodyParser.json())

app.use('/api/loan', loanRouter)

if (isLocal) {
  //local host
} else {
  //for lambda export
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app
