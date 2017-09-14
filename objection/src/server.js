const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())

// init db connections
const Model = require('objection').Model
const knexConfig = require('./knexfile')['development']
const knex = require('knex')(knexConfig)

Model.knex(knex)

require('./routes')(app)

app.get('*', (req, res) => {
  res.send({ message: 'hello and welcome to the objection js server' })
})

const port = 3030
app.listen(port, () => console.log(`server is listening on http://localhost:${port}`))
