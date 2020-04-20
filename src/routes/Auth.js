const Auth = require('express').Router()
const AuthController = require('../controllers/Auth')
const AuthToken = require('../middleware/Auth')

Auth.post('/register', AuthController.register)
Auth.get('/verify/:id', AuthController.verify)
Auth.patch('/security/:id', AuthController.madeSecurity)
Auth.post('/security/check/:id', AuthController.securityCheck)
Auth.post('/signin', AuthController.signIn)
Auth.post('/security/edit/:id', AuthController.forgotSecurity)
// Auth.post('/forgot-password/:id', AuthController.forgotEmail)
Auth.get('/user', AuthToken.checkToken, function (req, res) {
  res.send(req.user)
})

module.exports = Auth
