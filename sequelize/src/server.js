const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))

// rest api routes
require('./routes')(app)

app.get('*', (req, res) => {
  res.json({hello: 'welcome to the app. This one is for sequelize'})
})

const port = 3030
app.listen(port, () => console.log(`server is listening on http://localhost:${port}`))
