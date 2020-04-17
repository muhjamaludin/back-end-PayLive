const Users = require('express').Router()
const UserControllers = require('../controllers/Users')
const TransactionControllers = require('../controllers/Transaction')
const upload = require('../helpers/multer')

Users.get('/', UserControllers.read) // get all user for Admin
Users.get('/:id', UserControllers.getUser) // get user by Id
Users.patch('/:id', UserControllers.update) // update name, email, phone
Users.delete('/:id', UserControllers.delete) // delete user
Users.patch('/upload/:idUser', upload.single('picture'), UserControllers.uploadPhoto)

Users.patch('/topup/:idUser', UserControllers.topup) // topu-up balance
Users.get('/balance/:id', UserControllers.getCash)
Users.get('/price/:idUser', TransactionControllers.totalPrice)

module.exports = Users
