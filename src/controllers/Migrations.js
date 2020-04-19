module.exports = {
  migration: (req, res) => {
    require('../migrations/Category')
    require('../migrations/Partner')
    require('../migrations/Operator')
    require('../migrations/Transactions')
    require('../migrations/User')
    require('../migrations/Vouchers')
    const data = {
      success: true,
      msg: 'Data has been migrated'
    }
    res.send(data)
  }
}
