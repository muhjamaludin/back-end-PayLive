const VoucherModel = require('../models/Voucher')

module.exports = {
  read: async function (req, res) {
    let { page, limit, search, sort } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: 'name', value: '' }
    console.log(search)

    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]
    sort = (sort && { key, value }) || { key: 'nominal', value: 1 }
    const conditions = { page, perPage: limit, search, sort }

    const results = await VoucherModel.getAllVouchers(conditions)
    conditions.totalData = await VoucherModel.getTotalVouchers(conditions)
    conditions.totalPage = Math.ceil(conditions.totalData / conditions.perPage)
    conditions.nextLink = (page >= conditions.totalPage ? null : process.env.APP_URI.concat(`promo?page=${page + 1}`))
    conditions.prevLink = (page <= 1 ? null : process.env.APP_URI.concat(`promo?page=${page - 1}`))
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
  getVoucher: async function (req, res) {
    const data = {
      success: true,
      data: await VoucherModel.getVoucherById(req.params.id)
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
    const { idUser } = req.params
    const { name, nominal } = req.body
    const picture = (req.file && req.file.filename) || null
    console.log(idUser, name, nominal, picture)
    const results = await VoucherModel.updateVoucher(idUser, name, picture, nominal)
    if (results) {
      const data = {
        success: true,
        msg: `Voucher with name ${name} has been updated!`,
        data: { idUser, ...req.body }
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
    const results = await VoucherModel.deleteVoucher(id)
    if (results) {
      const data = {
        success: true,
        msg: `Voucher with id user ${id} has been deleted!`
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
