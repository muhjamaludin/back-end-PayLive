const NominalModel = require('../models/Nominal')

module.exports = {
  read: async function (req, res) {
    const results = await NominalModel.getAllNominal()
    const data = {
      success: true,
      data: results
    }
    res.send(data)
  },
  readById: async function (req, res) {
    const { id } = req.params
    const results = await NominalModel.getById(id)
    const data = {
      success: false,
      data: results
    }
    res.send(data)
  },
  create: async function (req, res) {
    const { idMenu, idPaySistem, nominal } = req.body
    const results = await NominalModel.createNominal(idMenu, idPaySistem, nominal)
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
    const { idMenu, idPaySistem, nominal } = req.body
    const results = await NominalModel.updateNominal(id, idMenu, idPaySistem, nominal)
    if (results) {
      const data = {
        success: true,
        msg: `Nonimal id menu = ${idMenu} and idPaySistem = ${idPaySistem} has been updated!`,
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
    const results = await NominalModel.deleteNominal(id)
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
