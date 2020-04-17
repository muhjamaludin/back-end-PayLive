const multer = require('multer')
const storage = multer.diskStorage({
  destination: 'files/profile/',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const fileFilter = function (req, file, next) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    next({ message: 'Only .png, .jpg and .jpeg format allowed!', code: 'FORMATTYPE' }, false)
  }
  next(null, true)
}
const upload = multer({ storage, fileFilter, limits: { fileSize: 500000 } })

module.exports = upload
