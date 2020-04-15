const Auth = require('express').Router()
const AuthController = require('../controllers/Auth')
const AuthToken = require('../middleware/Auth')

Auth.post('/register', AuthController.register)
Auth.get('/verify', AuthController.verify)
Auth.patch('/security/:id', AuthController.madeSecurity)
Auth.post('/security/check/:id', AuthController.securityCheck)
Auth.post('/signin', AuthController.signIn)
Auth.post('/security/forgot/:id', AuthController.forgotSecurity)
Auth.get('/user', AuthToken.checkToken, function (req, res) {
  res.send(req.user)
})

module.exports = Auth
