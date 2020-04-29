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
  },
  payTransaction: function (idUser, amount) {
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
            const query1 = `UPDATE ${table} SET cash=(${cash} - ${amount}) WHERE id_user=${idUser}`
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
    // const table = 'nominals'
    // const join = 'transactions'
    // return new Promise(function (resolve, reject) {
    //   const query = `SELECT (${table}.nominal + ${join}.add_price) AS 'totalPrice' FROM ${table}
    //                 JOIN ${join} ON ${table}.id=${join}.nominal_id WHERE ${table}.id=${idNominal}`
    //   console.log(query)
    //   db.query(query, function (err, results, fields) {
    //     if (err) {
    //       reject(err)
    //     } else {
    //       if (results) {
    //         // resolve(results)
    //         const price = results[0].totalPrice
    //         const query1 = `SELECT (cash - ${price}) AS balanceNow FROM user_details where id_user=${idUser}`
    //         db.query(query1, function (err, results, fields) {
    //           if (err) {
    //             reject(err)
    //           } else {
    //             if (results) {
    //               console.log(results[0].balanceNow)
    //               const balance = results[0].balanceNow
    //               const query3 = `UPDATE user_details SET cash=${balance} WHERE id_user=${idUser}`
    //               db.query(query3, function (err, results, fields) {
    //                 if (err) {
    //                   reject(err)
    //                 } else {
    //                   if (results) {
    //                     const query4 = `SELECT cash from user_details WHERE id_user=${idUser}`
    //                     db.query(query4, function (err, results, fields) {
    //                       if (err) {
    //                         reject(err)
    //                       } else {
    //                         if (results) {
    //                           console.log(results)
    //                           resolve(results)
    //                         } else {
    //                           resolve(false)
    //                         }
    //                       }
    //                     })
    //                   }
    //                 }
    //               })
    //             }
    //           }
    //         })
    //       } else {
    //         resolve(false)
    //       }
    //     }
    //   })
    // })
  },
  historyPurchase: function (idNominal) {
    const table = 'nominals'
    return new Promise(function (resolve, reject) {
      const query = `INSERT INTO ${table} (id_category, nominal) VALUES (${idNominal}, 'PURCHASE')`
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
}
