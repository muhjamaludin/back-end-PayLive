const Vouchers = require('express').Router()
const VoucherControllers = require('../controllers/Voucher')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: 'files/voucher/',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage })

Vouchers.get('/', VoucherControllers.read)
Vouchers.get('/:id', VoucherControllers.getVoucher)
Vouchers.post('/', upload.single('picture'), VoucherControllers.create)
Vouchers.patch('/:id', VoucherControllers.update)
Vouchers.delete('/:id', VoucherControllers.delete)

module.exports = Vouchers
