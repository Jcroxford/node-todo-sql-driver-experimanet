const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())

app.get('*', (req, res) => {
  res.send({ message: 'welcome to the knex server' })
})

const port = 3030
app.listen(port, () => console.log(`server is listening on http://localhost:${port}`))
