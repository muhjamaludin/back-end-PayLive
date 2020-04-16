const UserModel = require('../models/Nominal')

module.exports = {
  read: async function (req, res) {
    const results = await UserModel.getAllCash()
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
    const { idMenu, idPaySistem, nominal } = req.body
    const results = await UserModel.createNominal(idMenu, idPaySistem, nominal)
    if (results) {
      const data = {
        success: true,
        msg: `Nominal price for id menu ${idMenu} has been created`
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'Sorry you cannot add this feature'
      }
      res.send(data)
    }
  },
  update: async function (req, res) {
    const { id } = req.params
    const { name } = req.body
    if (name.length > 9) {
      const data = {
        succes: false,
        msg: 'your input too long, please input under 10 character'
      }
      res.send(data)
    } else {
      const results = await UserModel.updateCash(id, name)
      if (results) {
        const data = {
          success: true,
          msg: `Name ${name} has been updated!`,
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
    }
  },
  delete: async function (req, res) {
    const { id } = req.params
    const results = await UserModel.deleteCash(id)
    if (results) {
      const data = {
        success: true,
        msg: `Cash_point name with id ${id} has been deleted!`
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'There is no data can be deleted'
      }
      res.send(data)
    }
  }
}
