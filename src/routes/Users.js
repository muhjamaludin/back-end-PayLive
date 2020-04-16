const Users = require('express').Router()
const UserControllers = require('../controllers/Users')
// const multer = require('multer')
// const storage = multer.diskStorage({
//   destination: 'files/profile/',
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`)
//   }
// })
// const upload = multer({ storage })

Users.get('/', UserControllers.read) // get all user for Admin
Users.get('/:id', UserControllers.getUser) // get user by Id
Users.patch('/:id', UserControllers.update) // update name, email, phone
Users.delete('/:id', UserControllers.delete) // delete user
Users.patch('/topup/:idUser', UserControllers.topup) // topu-up balance

// Users.get('/userdetail', UserControllers.readUser)
// Users.post('/userdetail/', upload.any('picture'), UserControllers.createUser)
// Users.patch('/userdetail/:id', upload.any('picture'), UserControllers.updateUser)

module.exports = Users
