const CategoryModel = require('../models/Category')

module.exports = {
  read: async function (req, res) {
    const results = await CategoryModel.getAllCategory()
    const data = {
      success: true,
      data: results
    }
    res.send(data)
  },
  readById: async function (req, res) {
    const data = {
      success: true,
      data: await CategoryModel.getCategoryById(req.params.id)
    }
    res.send(data)
  },
  create: async function (req, res) {
    const { name } = req.body
    const typeName = typeof name
    if (typeName !== 'undefined') {
      const results = await CategoryModel.createCategory(name)
      if (results) {
        const data = {
          success: true,
          msg: `Category ${name} success to add`
        }
        res.send(data)
      } else {
        const data = {
          success: false,
          msg: 'Sorry you cannot add this featureS'
        }
        res.send(data)
      }
    } else {
      const data = {
        idOperator: false,
        msg: 'Name of your input unknown'
      }
      res.send(data)
    }
  },
  update: async function (req, res) {
    const { id } = req.params
    const { name } = req.body
    if (name.length > 60) {
      const data = {
        idOperator: false,
        msg: 'your input too long, please input under 10 character'
      }
      res.send(data)
    } else {
      const results = await CategoryModel.updateCategory(id, name)
      if (results) {
        const data = {
          success: true,
          msg: `Name ${name} has been updated!`,
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
    const results = await CategoryModel.deleteCategory(id)
    if (results) {
      const data = {
        success: true,
        msg: `Category name with id ${id} has been deleted!`
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
