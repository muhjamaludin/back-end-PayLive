const Transactions = require('express').Router()
const CashPointControllers = require('../controllers/CashPoint')
const NominalControllers = require('../controllers/Nominal')
const CategoryControllers = require('../controllers/Category')
const PaySistemControllers = require('../controllers/PaySistem')
const TransactionControllers = require('../controllers/Transaction')
const OperatorControllers = require('../controllers/Operator')

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

// operator
Transactions.post('/operator', OperatorControllers.create)
Transactions.patch('/operator/:id', OperatorControllers.update)

// pay sistem
Transactions.get('/paysistem', PaySistemControllers.read)
Transactions.get('/paysistem/:id', PaySistemControllers.readById)
Transactions.post('/paysistem', PaySistemControllers.create)
Transactions.patch('/paysistem/:id', PaySistemControllers.update)
Transactions.delete('/paysistem/:id', PaySistemControllers.delete)

// nominal
Transactions.get('/nominal', NominalControllers.read)
Transactions.get('/nominal/:id', NominalControllers.readById)
Transactions.post('/nominal', NominalControllers.create)
Transactions.patch('/nominal/:id', NominalControllers.update)
Transactions.delete('/nominal/:id', NominalControllers.delete)

// Transaction
Transactions.post('/pay', TransactionControllers.create)
Transactions.get('/pay', TransactionControllers.read)
Transactions.get('/pay/:id', TransactionControllers.readById)
Transactions.patch('/pay/:id', TransactionControllers.update)
Transactions.delete('/pay/:id', TransactionControllers.delete)

module.exports = Transactions
