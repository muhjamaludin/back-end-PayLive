const Users = require('express').Router()
const UserControllers = require('../controllers/Users')
const TransactionControllers = require('../controllers/Transaction')
const upload = require('../helpers/multer')

Users.get('/', UserControllers.read) // get all user for Admin
Users.get('/:id', UserControllers.getUser) // get user by Id
Users.get('/details/:id', UserControllers.getDetails)
Users.patch('/:id', upload.single('picture'), UserControllers.update) // update name, email, phone
Users.delete('/:id', UserControllers.delete) // delete user
Users.patch('/upload/:idUser', upload.single('picture'), UserControllers.uploadPhoto)

Users.patch('/topup/:idUser', UserControllers.topup) // topu-up balance
Users.get('/balance/:idUser', UserControllers.getCash)
Users.get('/balance/history/:idUser', UserControllers.getHistory)
Users.post('/transfer/:idUser', UserControllers.transferMoney) // transfer
Users.get('/price/:idUser', TransactionControllers.totalPrice)

module.exports = Users
