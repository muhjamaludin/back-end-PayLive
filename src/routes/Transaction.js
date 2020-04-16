const Transactions = require('express').Router()
const CashPointControllers = require('../controllers/CashPoint')
const NominalControllers = require('../controllers/Nominal')
const CategoryControllers = require('../controllers/Category')
const PaySistemControllers = require('../controllers/PaySistem')

// cash points
Transactions.get('/point', CashPointControllers.read) // get all cash point
Transactions.get('/point/:id', CashPointControllers.readById) // get all cash point by id
Transactions.post('/point', CashPointControllers.create) // create cash point options
Transactions.patch('/point/:id', CashPointControllers.update) // update cash point
Transactions.delete('/point/:id', CashPointControllers.delete) // delete cash point

// category
Transactions.get('/category', CategoryControllers.read)
Transactions.get('/category/:id', CategoryControllers.readById)
Transactions.post('/category', CategoryControllers.create)
Transactions.patch('/category/:id', CategoryControllers.update)
Transactions.delete('/category/:id', CategoryControllers.delete)

// pay sistem
Transactions.get('/paysistem', PaySistemControllers.read)
Transactions.get('/paysistem/:id', PaySistemControllers.readById)
Transactions.post('/paysistem', PaySistemControllers.create)

// nominal
Transactions.get('/nominal', NominalControllers.read)
Transactions.get('/nominal/:id', NominalControllers.readById)
Transactions.post('/nominal', NominalControllers.create)
Transactions.patch('/nominal/:id', NominalControllers.update)
Transactions.delete('/nominal/:id', NominalControllers.delete)

module.exports = Transactions
