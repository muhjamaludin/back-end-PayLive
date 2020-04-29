const TransactionModel = require('../models/Transaction')
// const UserModel = require('../models/Users')

module.exports = {
  read: async function (req, res) {
    const results = await TransactionModel.getAllPrice()
    const data = {
      success: true,
      data: results,
    }
    res.send(data)
  },
  readById: async function (req, res) {
    const { id } = req.params
    const results = await TransactionModel.getById(id)
    const data = {
      success: false,
      data: results,
    }
    res.send(data)
  },
  create: async function (req, res) {
    const { idOperator, idPaySistem, idNominal, price } = req.body
    const results = await TransactionModel.createPrice(
      idOperator,
      idPaySistem,
      idNominal,
      price
    )
    if (results) {
      const data = {
        success: true,
        msg: `Price for id_menu ${idOperator} id_pay_sistem ${idPaySistem} id_nominal ${idNominal} has been created`,
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'Sorry you cannot add this feature',
      }
      res.send(data)
    }
  },
  update: async function (req, res) {
    const { id } = req.params
    const { idOperator, idPaySistem, idNominal, price } = req.body
    const results = await TransactionModel.updatePrice(
      id,
      idOperator,
      idPaySistem,
      idNominal,
      price
    )
    if (results) {
      const data = {
        success: true,
        msg: `Total price with id menu = ${idOperator} and idPaySistem = ${idPaySistem} has been updated!`,
        data: { id, ...req.body },
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'There is no data can be updated',
      }
      res.send(data)
    }
  },
  delete: async function (req, res) {
    const { id } = req.params
    const results = await TransactionModel.deletePrice(id)
    if (results) {
      const data = {
        success: true,
        msg: `Cash_point name with id ${id} has been deleted!`,
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'There is no data can be deleted',
      }
      res.send(data)
    }
  },
  totalPrice: async function (req, res) {
    try {
      const { idUser } = req.params
      const { idNominal } = req.body
      const results = await TransactionModel.totalTransaction(idNominal)
      if (results) {
        const data = {
          success: true,
          msg: '`Total Appear`',
          data: { idUser, ...results },
        }
        res.send(data)
      }
    } catch (err) {
      console.log(err)
    }
  },
  purchase: async function (req, res) {
    try {
      const { idUser } = req.params
      const { idNominal } = req.body
      const results = await TransactionModel.payTransaction(idUser, idNominal)
      await TransactionModel.insertHistoryPurchase(idNominal)
      if (results) {
        const data = {
          success: true,
          msg: 'Thank you for Your Purchase, Please enjoy our products',
          data: { idUser, cash: results[0].cash },
        }
        res.send(data)
      }
    } catch (err) {
      console.log(err)
    }
  },
}
