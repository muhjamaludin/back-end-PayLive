const express = require('express')
const app = express()
require('dotenv').config()

const bodyParser = require('body-parser')

const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false })) // for x-www-urlencoded
app.use(bodyParser.json()) // for json
app.use(cors('*'))

// const AuthRouter = require('./src/routes/Auth')
const MigrateRouter = require('./src/routes/migrations')

app.use('/migrate', MigrateRouter)
// app.use('/auth', AuthRouter) // first register here

app.listen(process.env.PORT, () => {
  console.log(`APP listen on ${process.env.PORT}`)
})
