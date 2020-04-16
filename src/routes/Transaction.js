const Transactions = require('express').Router()
const CashPointControllers = require('../controllers/CashPoint')
const NominalControllers = require('../controllers/Nominal')
const CategoryControllers = require('../controllers/Category')

// cash points
Transactions.get('/point', CashPointControllers.read) // get all cash point
Transactions.get('/point/:id', CashPointControllers.readById) // get all cash point by id
Transactions.post('/point', CashPointControllers.create) // create cash point options
Transactions.patch('/point/:id', CashPointControllers.update) // update cash point
Transactions.delete('/point/:id', CashPointControllers.delete) // delete cash point

// category
Transactions.get('/nominal', NominalControllers.read)
Transactions.get('/nominal/:id', NominalControllers.readById)
Transactions.post('/category', CategoryControllers.create)
Transactions.patch('/nominal/:id', NominalControllers.update)
Transactions.delete('/nominal/:id', NominalControllers.delete)

// nominal
Transactions.get('/nominal', NominalControllers.read)
Transactions.post('/nominal', NominalControllers.create)
Transactions.patch('/nominal/:id', NominalControllers.update)
Transactions.delete('/nominal/:id', NominalControllers.delete)

module.exports = Transactions
