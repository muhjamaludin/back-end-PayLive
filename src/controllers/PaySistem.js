const PaySistemModel = require('../models/PaySistem')

module.exports = {
  read: async function (req, res) {
    const results = await PaySistemModel.getAllPaySistem()
    const data = {
      success: true,
      data: results
    }
    res.send(data)
  },
  readById: async function (req, res) {
    const data = {
      success: true,
      data: await PaySistemModel.getById(req.params.id)
    }
    res.send(data)
  },
  create: async function (req, res) {
    const { idOperator, name } = req.body
    const typeName = typeof name
    if (typeName !== 'undefined') {
      const results = await PaySistemModel.createPaySistem(idOperator, name)
      if (results) {
        const data = {
          success: true,
          msg: `Sistem Menu ${name} success to add`
        }
        res.send(data)
      } else {
        const data = {
          success: false,
          msg: 'Sorry you cannot add this feature'
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
    const { idOperator, name } = req.body
    if (name.length > 60) {
      const data = {
        succes: false,
        msg: 'your input too long, please input under 10 character'
      }
      res.send(data)
    } else {
      const results = await PaySistemModel.updatePaySistem(idOperator, name)
      if (results) {
        const data = {
          success: true,
          msg: `Name pay sistem ${name} has been updated!`,
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
    const results = await PaySistemModel.deletePaySistems(id)
    if (results) {
      const data = {
        success: true,
        msg: `Pay Sistem with id ${id} has been deleted!`
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
