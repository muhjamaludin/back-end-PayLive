const Vouchers = require('express').Router()
const VoucherControllers = require('../controllers/Voucher')
const upload = require('../helpers/multer')

Vouchers.get('/', VoucherControllers.read)
Vouchers.get('/:id', VoucherControllers.getVoucher)
Vouchers.post('/', upload.single('picture'), VoucherControllers.create)
Vouchers.patch('/:idUser', upload.single('picture'), VoucherControllers.update)
Vouchers.delete('/:id', VoucherControllers.delete)

module.exports = Vouchers
