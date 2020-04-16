const db = require('../utils/db')
module.exports = {
  getAllCash: function () {
    const table = 'nominal'
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
  createNominal: function (idMenu, idPaySistem, nominal) {
    const table = 'nominals'
    return new Promise(function (resolve, reject) {
      const query = `INSERT INTO ${table} (id_menu, pay_sistem_id, nominal) VALUES (${idMenu}, ${idPaySistem}, ${nominal})`
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
  updateCash: function (id, name) {
    const table = 'cash_points'
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET name='${name}' WHERE id=${id}`
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
  deleteCash: function (id) {
    const table = 'cash_points'
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
