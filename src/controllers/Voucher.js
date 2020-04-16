const VoucherModel = require('../models/Voucher')

module.exports = {
  read: async function (req, res) {
    let { page, limit, search, sort } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: 'phone', value: '' }

    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]
    sort = (sort && { key, value }) || { key: 'id', value: 1 }
    const conditions = { page, perPage: limit, search, sort }

    const results = await UserModel.getAllUsers(conditions)
    conditions.totalData = await UserModel.getTotalUsers(conditions)
    conditions.totalPage = Math.ceil(conditions.totalData / conditions.perPage)
    conditions.nextLink = (page >= conditions.totalPage ? null : process.env.APP_URI.concat(`users?page=${page + 1}`))
    conditions.prevLink = (page <= 1 ? null : process.env.APP_URI.concat(`users?page=${page - 1}`))
    delete conditions.search
    delete conditions.sort
    delete conditions.limit

    const data = {
      success: true,
      data: results,
      pageInfo: conditions
    }
    res.send(data)
  },
  getUser: async function (req, res) {
    const data = {
      success: true,
      data: await UserModel.getUserById(req.params.id)
    }
    res.send(data)
  },
  create: async function (req, res) {
    const { idUser, name, nominal } = req.body
    const picture = (req.file && req.file.filename) || null
    const results = await VoucherModel.createVoucher(idUser, name, picture, nominal)
    if (results) {
      const data = {
        success: true,
        msg: `Voucher with name ${name} has been created!`,
        data: { idUser, ...req.body }
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'Wrong Input data'
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
  uploadPhoto: async function (req, res) {
    const { idUser } = req.params
    const picture = (req.file && req.file.filename) || null
    const results = await UserModel.updateUserDetails(idUser, picture)
    if (results) {
      const data = {
        success: true,
        msg: `Photo for id ${idUser} has been updated!`,
        data: { idUser, ...req.file }
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
