const Transactions = require('express').Router()
const TransactionControllers = require('../controllers/Transactions')

// cash points
Transactions.get('/point', TransactionControllers.read)
Transactions.get('/point/:id', TransactionControllers.readById)
Transactions.post('/point', TransactionControllers.create)
Transactions.patch('/:id', TransactionControllers.update)
Transactions.delete('/:id', TransactionControllers.delete)
Transactions.patch('/topup/:idUser', TransactionControllers.topup)

module.exports = Transactions
