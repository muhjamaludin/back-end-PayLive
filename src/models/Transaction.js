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
      const query = `INSERT INTO ${table} (id_operator, pay_sistem_id, nominal_id, add_price) VALUES (${idOperator}, ${idPaySistem}, ${idNominal}, ${price})`
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
      const query = `UPDATE ${table} SET id_operator=${idOperator}, pay_sistem_id=${idPaySistem}, nominal_id=${idNominal}, add_price=${price} WHERE id=${id}`
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
  },
  totalTransaction: function (idNominal) {
    const table = 'nominals'
    const join = 'transactions'
    return new Promise(function (resolve, reject) {
      const query = `SELECT (${table}.nominal + ${join}.add_price) AS 'Total Price' FROM ${table} 
                    JOIN ${join} ON ${table}.id=${join}.nominal_id WHERE ${table}.id=${idNominal}`
      console.log(query)
      db.query(query, function (err, results, fields) {
        console.log(results)
        if (err) {
          reject(err)
        } else {
          if (results[0]) {
            resolve(results[0])
          } else {
            resolve(false)
          }
        }
      })
    })
  }
}
