const Transactions = require('express').Router()
const TransactionControllers = require('../controllers/CashPoint')
const NominalControllers = require('../controllers/Nominal')

// cash points
Transactions.get('/point', TransactionControllers.read) // get all cash point
Transactions.get('/point/:id', TransactionControllers.readById) // get all cash point by id
Transactions.post('/point', TransactionControllers.create) // create cash point options
Transactions.patch('/point/:id', TransactionControllers.update) // update cash point
Transactions.delete('/point/:id', TransactionControllers.delete) // delete cash point

// nominal
Transactions.get('/nominal', NominalControllers.read)
Transactions.post('/nominal', NominalControllers.create)
Transactions.patch('/nominal/:id', NominalControllers.update)
Transactions.delete('/nominal/:id', NominalControllers.delete)

// menu

module.exports = Transactions
