const express = require('express')
const app = express()
const createError = require('http-errors')
// const path = require()
// configure
require('dotenv').config()

const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true })) // for x-www-urlencoded
app.use(bodyParser.json()) // for json
app.use(cors('*'))

app.use('/upload/files', express.static('./files'))

// source router
const AuthRouter = require('./src/routes/Auth')
const MigrateRouter = require('./src/routes/Migrations')
const UserRouter = require('./src/routes/Users')
const TransactionRouter = require('./src/routes/Transaction')
const PromoRouter = require('./src/routes/Promo')

// endpoint
app.use('/migrate', MigrateRouter) // migrate database
app.use('/auth', AuthRouter) // authentication
app.use('/user', UserRouter) // user
app.use('/transaction', TransactionRouter) // transaction
app.use('/promo', PromoRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
  res.send('404 Not Found')
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  if (err.code === 'FORMATTYPE') {
    res.status(400).send({ err: err.message })
  }
  if (err.code === 'FILESIZE') {
    res.status(400).send({ err: err.message })
  }
  res.status(err.status || 500)
  res.sendStatus(err.status)
})

// base url & PORT
app.listen(process.env.PORT, () => {
  console.log(`APP listen on ${process.env.PORT}`)
})
