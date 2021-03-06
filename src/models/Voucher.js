const db = require('../utils/db')
module.exports = {
  getAllVouchers: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'nominal', value: 1 }
    const sortValue = parseInt(sort.value)
    search = search || { key: 'name', value: '' }
    const table = 'vouchers'
    return new Promise(function (resolve, reject) {
      const query = `SELECT * FROM ${table}
                    WHERE ${search.key} LIKE '%${search.value}%'
                    ORDER BY ${sort.key} ${sortValue ? 'ASC' : 'DESC'} 
                    LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
      db.query(query, function (err, results, fields) {
        console.log(query)
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
    search = search || { key: 'name', value: '' }
    const table = 'vouchers'
    return new Promise(function (resolve, reject) {
      const query = `SELECT COUNT (*) AS total FROM ${table}
                    WHERE ${search.key} LIKE '%${search.value}%'`
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
  updateVoucher: function (idUser, name, picture, nominal) {
    const table = 'vouchers'
    picture = (typeof picture === 'string' ? `'${picture}'` : picture)
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET name='${name}', image=${picture}, nominal=${nominal} WHERE id_user=${idUser}`
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
  deleteVoucher: function (id) {
    const table = 'vouchers'
    return new Promise(function (resolve, reject) {
      const query = ` DELETE FROM ${table} WHERE id_user= ${id}`
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
