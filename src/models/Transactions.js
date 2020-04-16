const db = require('../utils/db')
module.exports = {
  getAllCashPoint: function () {
    const table = 'cash_points'
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
  getCashById: function (id) {
    const table = 'cash_points'
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
  createUser: function (phone, roleId) {
    const table = 'users'
    roleId = roleId || 2
    return new Promise(function (resolve, reject) {
      const query = `INSERT INTO ${table} (phone, role_id) VALUES ('${phone}', ${roleId})`
      console.log(query)
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results.insertId)
        }
      })
    })
  },
  createSecurityCode: function (id, securityCode) {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET security_code='${securityCode}' WHERE id=${id}`
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
  createCashPoint: function (name) {
    const table = 'cash_points'
    return new Promise(function (resolve, reject) {
      const query = `INSERT INTO ${table} (name) VALUES ('${name}')`
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
  updateUser: function (id, phone) {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET phone='${phone}' WHERE id=${id}`
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
  updateUserDetails: function (idUser, fullname, email) {
    const table = 'user_details'
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET fullname='${fullname}', email='${email}' WHERE id_user=${idUser}`
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
  topupBalance: function (idUser, balance) {
    const table = 'user_details'
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET balance='${balance}' WHERE id_user=${idUser}`
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
  deleteUser: function (id) {
    const table = 'users'
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
  deleteUserDetail: function (id) {
    const table = 'user_details'
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
