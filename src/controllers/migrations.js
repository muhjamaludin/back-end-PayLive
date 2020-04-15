module.exports = {
  migration: (req, res) => {
    require('../migrations/category')
    require('../migrations/partner')
    require('../migrations/topup')
    require('../migrations/transactions')
    require('../migrations/user')
    const data = {
      success: true,
      msg: 'Data has been migrated'
    }
    res.send(data)
  }
}
