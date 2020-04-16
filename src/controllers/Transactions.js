const UserModel = require('../models/Transactions')

module.exports = {
  read: async function (req, res) {
    const results = await UserModel.getAllCashPoint()
    const data = {
      success: true,
      data: results
    }
    res.send(data)
  },
  readById: async function (req, res) {
    const data = {
      success: true,
      data: await UserModel.getCashById(req.params.id)
    }
    res.send(data)
  },
  create: async function (req, res) {
    const { name } = req.body
    const typeName = typeof name
    if (typeName !== 'undefined') {
      const results = await UserModel.createCashPoint(name)
      if (results) {
        const data = {
          success: true,
          msg: `cash method ${name} success to add`
        }
        res.send(data)
      } else {
        const data = {
          success: false,
          msg: 'Sorry you cannot add this featureS'
        }
        res.send(data)
      }
    } else {
      const data = {
        succes: false,
        msg: 'Name of your input unknown'
      }
      res.send(data)
    }
  },
  update: async function (req, res) {
    const { id } = req.params
    const { fullname, phone, email } = req.body
    const idUser = id
    console.log(idUser, fullname, email, phone)
    const results = await UserModel.updateUser(id, phone)
    await UserModel.updateUserDetails(idUser, fullname, email)
    if (results) {
      const data = {
        success: true,
        msg: `User with phone ${phone} has been updated!`,
        data: { id, ...req.body }
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'There is no data can be updated'
      }
      res.send(data)
    }
  },
  delete: async function (req, res) {
    const { id } = req.params
    console.log(id)
    const results = await UserModel.deleteUser(id)
    await UserModel.deleteUserDetail(id)
    if (results) {
      const data = {
        success: true,
        msg: `Users with id ${id} has been deleted!`
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'There is no data can be deleted'
      }
      res.send(data)
    }
  },
  topup: async function (req, res) {
    const { idUser } = req.params
    const { balance } = req.body
    const result = await UserModel.topupBalance(idUser, balance)
    if (result) {
      const data = {
        succes: true,
        msg: `Your balance has been added with ${balance} rupiah`
      }
      res.send(data)
    } else {
      const data = {
        succes: false,
        msg: 'failed topup'
      }
      res.send(data)
    }
  }
}
