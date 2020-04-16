// define a model
const AuthModel = require('../models/Auth')
const UserModel = require('../models/Users')
const UserdModel = require('../models/UserDetails')
// package
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const uuid = require('uuid').v4

module.exports = {
  register: async function (req, res) {
    console.log('register guys')
    const { fullname, phone, email } = req.body
    const checkUser = await AuthModel.checkPhone(phone)
    const valid = phone.length > 10 && phone.length < 13
    if (valid) {
      if (checkUser !== 0) {
        const data = {
          success: false,
          msg: 'Phone already registered'
        }
        res.send(data)
      } else {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (email.match(mailformat)) {
          const results = await UserModel.createUser(phone)
          const info = await AuthModel.getUserByPhone(phone)
          await UserdModel.createUserDetail(info.id, fullname, email)
          if (results) {
            if (await AuthModel.createVerificationCode(results, uuid())) {
              const code = await AuthModel.getVerificationCode(phone)
              const data = {
                success: true,
                msg: `register for phone number ${phone} success \n waiting for verify`,
                code
              }
              res.send(data)
            } else {
              const data = {
                success: false,
                msg: 'Verification code couldn\'t be generate'
              }
              res.send(data)
            }
          } else {
            const data = {
              success: false,
              msg: 'register failed'
            }
            res.send(data)
          }
        } else {
          const data = {
            succes: false,
            msg: 'email not valid'
          }
          res.send(data)
        }
      }
    } else {
      const data = {
        succes: false,
        msg: 'Phone number is not valid'
      }
      res.send(data)
    }
  },
  madeSecurity: async function (req, res) {
    const { securityCode } = req.body
    const id = req.params.id
    const encrypPass = bcrypt.hashSync(securityCode)
    console.log(id, securityCode)
    const results = await UserModel.createSecurityCode(id, encrypPass)
    if (results) {
      const data = {
        succes: true,
        msg: 'security_code has been created, You can go home now'
      }
      res.send(data)
    }
  },
  verify: async function (req, res) {
    const { phone, code } = req.query
    if (await AuthModel.verifyUser(phone, code)) {
      const data = {
        success: true,
        msg: 'User activated succesfully Please made security code'
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'User can\'t be activated, please register again'
      }
      res.send(data)
    }
  },
  securityCheck: async function (req, res) {
    const { id } = req.params
    const { securityCode } = req.body
    console.log(id, securityCode)
    const info = await AuthModel.getUserById(id)
    const checkPass = await bcrypt.compareSync(securityCode, info.security_code)
    if (checkPass) {
      if (await AuthModel.checkVerifiedUser) {
        if (await AuthModel.checkActivatedUser) {
          const payload = { id: info.id, securityCode, roleId: info.role_id }
          const options = { expiresIn: '30m' }
          const key = process.env.APP_KEY
          const token = jwt.sign(payload, key, options)
          const data = {
            success: true,
            token,
            msg: 'Let\'s go Home with token'
          }
          res.send(data)
        } else {
          const data = {
            success: false,
            msg: 'Phone not active'
          }
          res.send(data)
        }
      } else {
        const data = {
          success: false,
          msg: 'Phone not verified'
        }
        res.send(data)
      }
    } else {
      const data = {
        success: false,
        msg: 'Wrong Security Code'
      }
      res.send(data)
    }
  },
  signIn: async function (req, res) {
    const { phone } = req.body
    const checkUser = await AuthModel.checkPhone(phone)
    if (!checkUser) {
      const data = {
        success: false,
        msg: 'Your phone number is not registered'
      }
      res.send(data)
    } else {
      const data = {
        succes: true,
        msg: 'Phone available, Please Verify and insert your security code to enjoy the feature'
      }
      res.send(data)
    }
  },
  forgotSecurity: async function (req, res) {
    const { id } = req.params
    const user = await AuthModel.getUserById(id)
    if (!user) {
      const data = {
        succes: false,
        msg: `Internal params error, id ${id} Not Found`
      }
      res.send(data)
    } else {
      const { oldCode } = req.body
      const checkPass = await bcrypt.compareSync(oldCode, user.security_code)
      if (checkPass) {
        const { newCode } = req.body
        const encrypPass = bcrypt.hashSync(newCode)
        if (await AuthModel.setNewSecurity(id, encrypPass)) {
          const data = {
            success: true,
            msg: 'Your Security Code has been reset'
          }
          res.send(data)
        } else {
          const data = {
            success: false,
            msg: 'failed to reset Security Code, Old Code didn\'t match'
          }
          res.send(data)
        }
      } else {
        const data = {
          success: false,
          msg: 'Secuirity Code not match'
        }
        res.send(data)
      }
    }
  }
}
