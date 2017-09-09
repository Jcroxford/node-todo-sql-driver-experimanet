const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(logger('dev'))

app.get('*', (req, res) => {
    res.json({hello: 'welcome to the app. This one is for sequelize'})
})

const port = 3030
app.listen(port, () => console.log(`server is listeingin on http://localhost:${port}`))
