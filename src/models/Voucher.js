const db = require('../utils/db')
module.exports = {
  getAllVouchers: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: '' }
    search = search || { key: 'name', value: '' }
    const table = 'vouchers'
    return new Promise(function (resolve, reject) {
      const query = `SELECT * FROM ${table}
                    WHERE ${search.key} LIKE '${search.value}%'
                    ORDER BY ${sort.key} ${sort.value ? 'ASC' : 'DESC'} 
                    LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getTotalVouchers: function (conditions = {}) {
    let { search } = conditions
    search = search || { key: 'phone', value: '' }
    const table = 'vouchers'
    return new Promise(function (resolve, reject) {
      const query = `SELECT COUNT (*) AS total FROM ${table}
                    WHERE ${search.key} LIKE '${search.value}%'`
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results[0].total)
        }
      })
    })
  },
  getVoucherById: function (id) {
    const table = 'vouchers'
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
  createVoucher: function (idUser, name, picture, nominal) {
    const table = 'vouchers'
    picture = (typeof picture === 'string' ? `'${picture}'` : picture)
    return new Promise(function (resolve, reject) {
      const query = `INSERT INTO ${table} (id_user, name, image, nominal) VALUES (${idUser}, '${name}', ${picture}, ${nominal})`
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
  updateNominal: function (id, idMenu, idPaySistem, nominal) {
    const table = 'nominals'
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET id_menu=${idMenu}, pay_sistem_id=${idPaySistem}, nominal=${nominal} WHERE id=${id}`
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
  deleteNominal: function (id) {
    const table = 'nominals'
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
