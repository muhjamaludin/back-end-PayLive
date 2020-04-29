const db = require('../utils/db')
module.exports = {
  getAllUsers: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: '' }
    search = search || { key: 'phone', value: '' }
    const table = 'users'
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
  getTotalUsers: function (conditions = {}) {
    let { search } = conditions
    search = search || { key: 'phone', value: '' }
    const table = 'users'
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
  updateUserDetails: function (idUser, picture, fullname, email) {
    picture = typeof picture === 'string' ? `'${picture}'` : picture
    const table = 'user_details'
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET fullname='${fullname}', email='${email}', profile_picture=${picture} WHERE id_user=${idUser}`
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
  topupBalance: function (idUser, topup) {
    const table = 'user_details'
    return new Promise(function (resolve, reject) {
      const query = `SELECT cash FROM ${table} WHERE id_user=${idUser}`
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results) {
            let cash = results[0].cash
            cash = cash === null ? (cash = 0) : (cash = `${cash}`)
            const query1 = `UPDATE ${table} SET cash= (${topup} + ${cash}) WHERE id_user=${idUser}`
            console.log(query1)
            db.query(query1, function (err, result, fields) {
              if (err) {
                reject(err)
              } else {
                if (result) {
                  const query3 = `SELECT cash from ${table} WHERE id_user=${idUser}`
                  db.query(query3, function (err, results, fields) {
                    if (err) {
                      reject(err)
                    } else {
                      if (results) {
                        resolve(results[0])
                      } else {
                        resolve(false)
                      }
                    }
                  })
                } else {
                  resolve(false)
                }
              }
            })
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  insertHistory: function (idUser, balance) {
    const table = 'history'
    return new Promise(function (resolve, reject) {
      const query = `INSERT INTO ${table} (id_user, name_transaction, balance) VALUES (${idUser}, 'TOP UP', ${balance})`
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
  },
  getUserById: function (id) {
    const table = 'users'
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
  getDetailsById: function (id) {
    const table = 'user_details'
    const query = `SELECT * FROM ${table} WHERE id_user=${id}`
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
  getCash: function (idUser) {
    const table = 'user_details'
    const query = `SELECT cash from ${table} where id_user=${idUser}`
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
  transferCash: function (phone, amount) {
    const queryPhone = `SELECT id FROM users WHERE phone=${phone}`
    return new Promise(function (resolve, reject) {
      db.query(queryPhone, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results) {
            const table = 'user_details'
            const idUserReceiver = results[0].id
            const query = `SELECT cash from ${table} where id_user=${idUserReceiver}`
            return new Promise(function (resolve, reject) {
              db.query(query, function (err, results, fields) {
                if (err) {
                  reject(err)
                } else {
                  if (results) {
                    const cashReceiver = results[0].cash
                    const query1 = `UPDATE ${table} SET cash = (${cashReceiver} + ${amount}) WHERE id_user=${idUserReceiver}`
                    return new Promise(function (resolve, reject) {
                      db.query(query1, function (err, results, fields) {
                        if (err) {
                          reject(err)
                        } else {
                          if (results) {
                            console.log(results)
                            resolve(results)
                          } else {
                            resolve(false)
                          }
                        }
                      })
                    })
                  } else {
                    resolve(false)
                  }
                }
              })
            })
          }
        }
      })
    })


  },
  getCashTransfer: function (idUser, amount) {
    const table = 'user_details'
    const query = `SELECT cash from ${table} where id_user=${idUser}`
    return new Promise(function (resolve, reject) {
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results) {
            const cash = results[0].cash
            const query1 = `UPDATE ${table} SET cash = (${cash} - ${amount}) WHERE id_user=${idUser}`
            db.query(query1, function (err, results, fields) {
              if (err) {
                reject(err)
              } else {
                if (results) {
                  const queryBalance = `SELECT cash from ${table} where id_user=${idUser}`
                  db.query(queryBalance, function (err, results, fields) {
                    if (err) {
                      reject(err)
                    } else {
                      if (results) {
                        resolve(results)
                        console.log(results[0].cash)
                      } else {
                        resolve(false)
                      }
                    }
                  })
                } else {
                  resolve(false)
                }
              }
            })
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  insertHistoryTransfer: function (idUser, amount) {
    const table = 'history'
    return new Promise(function (resolve, reject) {
      const query = `INSERT INTO ${table} (id_user, name_transaction, balance) VALUES (${idUser}, 'Transfer', ${amount})`
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
  getHistory: function (conditions = {}, idUser) {
    let { page, perPage, sort, search } = conditions
    sort = sort || { key: 'id', value: 1 }
    const table = 'history'
    const query = `SELECT name_transaction, balance, created_at from ${table} 
    where id_user=${idUser} ORDER BY created_at DESC
    LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
    return new Promise(function (resolve, reject) {
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results) {
            console.log('results', results)
            resolve(results)
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  getAllHistory: function (idUser) {
    const table = 'history'
    const query = `SELECT count(*) AS total from ${table} 
    where id_user=${idUser}`
    return new Promise(function (resolve, reject) {
      db.query(query, function (err, results, fields) {
        console.log(query)
        if (err) {
          reject(err)
        } else {
          if (results) {
            resolve(results[0])
          } else {
            resolve(false)
          }
        }
      })
    })
  },
}
