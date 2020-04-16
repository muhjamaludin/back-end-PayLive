const Transactions = require('express').Router()
const TransactionControllers = require('../controllers/Transactions')

// cash points
Transactions.get('/point', TransactionControllers.read) // get all cash point
Transactions.get('/point/:id', TransactionControllers.readById) // get all cash point by id
Transactions.post('/point', TransactionControllers.create) // create cash point options
Transactions.patch('/point/:id', TransactionControllers.update) // update cash point
Transactions.delete('/point/:id', TransactionControllers.delete) // delete cash point

module.exports = Transactions
