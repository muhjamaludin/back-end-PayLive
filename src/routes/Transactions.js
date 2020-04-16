const Transactions = require('express').Router()
const TransactionControllers = require('../controllers/Transactions')

// cash points
Transactions.get('/point', TransactionControllers.read)
Transactions.get('/point/:id', TransactionControllers.readById)
Transactions.post('/point', TransactionControllers.create)
Transactions.patch('/point/:id', TransactionControllers.update)
Transactions.delete('/point/:id', TransactionControllers.delete)

module.exports = Transactions
