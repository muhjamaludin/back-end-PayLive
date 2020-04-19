const db = require('../utils/db')
module.exports = {
  getAllPaySistem: function () {
    const table = 'pay_sistems'
    return new Promise(function (resolve, reject) {
      const query = `SELECT * FROM ${table}`
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getById: function (id) {
    const table = 'pay_sistems'
    const query = `SELECT * FROM ${table} WHERE id=${id}`
    return new Promise(function (resolve, reject) {
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.length) {
            resolve(results[0])
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  createPaySistem: function (idOperator, name) {
    const table = 'pay_sistems'
    return new Promise(function (resolve, reject) {
      const query = `INSERT INTO ${table} (id_operator, name) VALUES (${idOperator}, '${name}')`
      console.log(query)
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(results.affectedRows)
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  updatePaySistem: function (idOperator, name) {
    const table = 'pay_sistems'
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET name='${name}' WHERE id_operator=${idOperator}`
      console.log(query)
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(results.affectedRows)
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  deletePaySistems: function (id) {
    const table = 'pay_sistems'
    return new Promise(function (resolve, reject) {
      const query = ` DELETE FROM ${table} WHERE id= ${id}`
      console.log(query)
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  }
}
