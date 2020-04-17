const OperatorModel = require('../models/Operator')

module.exports = {
  read: async function (req, res) {
    const results = await OperatorModel.getAllOperator()
    const data = {
      success: true,
      data: results
    }
    res.send(data)
  },
  readById: async function (req, res) {
    const { idUser } = req.params
    const data = {
      success: true,
      idUser: idUser,
      data: await OperatorModel.getOperatorById(req.body.idOperator)
    }
    res.send(data)
  },
  create: async function (req, res) {
    const { name } = req.body
    const typeName = typeof name
    if (typeName !== 'undefined') {
      const results = await OperatorModel.createOperator(name)
      if (results) {
        const data = {
          success: true,
          msg: `Operator ${name} success to add`
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
        idOperator: false,
        msg: 'Name of your input unknown'
      }
      res.send(data)
    }
  },
  update: async function (req, res) {
    const { id } = req.params
    const { name } = req.body
    const results = await OperatorModel.updateOperator(id, name)
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
  },
  delete: async function (req, res) {
    const { id } = req.params
    const results = await OperatorModel.deleteOperator(id)
    if (results) {
      const data = {
        success: true,
        msg: `Operator name with id ${id} has been deleted!`
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
