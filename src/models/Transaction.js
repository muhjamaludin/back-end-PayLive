const db = require('../utils/db')
module.exports = {
  getAllPrice: function () {
    const table = 'transactions'
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
    const table = 'transactions'
    return new Promise(function (resolve, reject) {
      const query = `SELECT * FROM ${table} where id=${id}`
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  createPrice: function (idOperator, idPaySistem, idNominal, price) {
    const table = 'transactions'
    return new Promise(function (resolve, reject) {
      const query = `INSERT INTO ${table} (id_menu, pay_sistem_id, nominal_id, add_price) VALUES (${idOperator}, ${idPaySistem}, ${idNominal}, ${price})`
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
  updatePrice: function (id, idOperator, idPaySistem, idNominal, price) {
    const table = 'transactions'
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET id_menu=${idOperator}, pay_sistem_id=${idPaySistem}, nominal_id=${idNominal}, add_price=${price} WHERE id=${id}`
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
  deletePrice: function (id) {
    const table = 'transactions'
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
