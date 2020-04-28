const UserModel = require('../models/Users')

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
  getDetails: async function (req, res) {
    const data = {
      success: true,
      data: await UserModel.getUserById(req.params.id)
    }
    res.send(data)
  },
  update: async function (req, res) {
    try {
      console.log(req.file)
      const { id } = req.params
      const { fullname, phone, email } = req.body
      const picture = (req.file && req.file.filename) || 'ayam'
      const idUser = id
      console.log(idUser, fullname, email, phone)
      const results = await UserModel.updateUser(id, phone)
      await UserModel.updateUserDetails(idUser, picture, fullname, email)
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
    } catch (err) {
      console.log(err)
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
    const topup = parseInt(balance)
    if (topup < 0) {
      const data = {
        success: false,
        msg: 'Wrong input balance'
      }
      res.send(data)
    } else {
      if (topup > 0 && topup < 10000) {
        const data = {
          success: false,
          msg: 'Minimum top up is Rp 10.000,00'
        }
        res.send(data)
      } else {
        if (topup > 1000000) {
          const data = {
            success: false,
            msg: 'Maximum top up is Rp 1.000.000,00 Rupiah'
          }
          res.send(data)
        } else {
          const result = await UserModel.topupBalance(idUser, topup)
          console.log(result)
          if (result) {
            const data = {
              success: true,
              msg: `Your cash has been added with ${balance} rupiah`,
              data: { ...result }
            }
            res.send(data)
          } else {
            const data = {
              success: false,
              msg: 'failed topup, your account not found'
            }
            res.send(data)
          }
        }
      }
    }
  },
  getCash: async function (req, res) {
    const { idUser } = req.params
    const results = await UserModel.getCash(idUser)
    if (results) {
      const data = {
        success: true,
        data: { idUser, ...results }
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'There is no data for your request'
      }
      res.send(data)
    }
  },
  transfer: async function (req, res) {
    try {
      const { idUser } = req.params
      const { idUserReceiver, amount } = req.body
      await UserModel.transferCash(idUserReceiver, amount)
      const results = await UserModel.getCashTransfer(idUser, amount)
      console.log(idUser)
      // if (amount > cash )
      // const results = UserModel.getCashTransfer(idUser, amount)
      // await UserModel.topupBalance(idUserReceiver, amount)
      if (results) {
        const data = {
          success: true,
          msg: `Your amount transfer Rp ${amount},00 Rupiah has been sent`,
          data: { idUser, ...results }
        }
        res.send(data)
      } else {
        const data = {
          success: false,
          msg: 'Your access has been wrong input'
        }
        res.send(data)
      }
    } catch (err) {
      console.log(err)
    }
  },
  getHistory: async function (req, res) {
    const { idUser } = req.params
    const results = await UserModel.getHistory(idUser)
    if (results.name_transaction === 'REGISTER') {
      const data = {
        success: false,
        msg: 'No data'
      }
      res.send(data)
    } else {
      if (results) {
        const data = {
          success: true,
          data: { idUser, ...results }
        }
        res.send(data)
      } else {
        const data = {
          success: false,
          msg: 'There is no data for your request'
        }
        res.send(data)
      }
    }
  },
}
