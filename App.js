// defining framework
const express = require('express')
const app = express()
// configure
require('dotenv').config()

const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false })) // for x-www-urlencoded
app.use(bodyParser.json()) // for json
app.use(cors('*'))

// source router
const AuthRouter = require('./src/routes/Auth')
const MigrateRouter = require('./src/routes/Migrations')
const UserRouter = require('./src/routes/Users')

// endpoint
app.use('/migrate', MigrateRouter) // migrate database
app.use('/auth', AuthRouter) // authentication
app.use('/user', UserRouter) // user

// base url & PORT
app.listen(process.env.PORT, () => {
  console.log(`APP listen on ${process.env.PORT}`)
})
