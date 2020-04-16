const db = require('../utils/db')

const check = function (err, results, fields) {
  if (err) {
    throw err
  }
  console.log(results)
  console.log(fields)
}

db.query(
  `CREATE TABLE IF NOT EXISTS pay_sistems(
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_menu TINYINT(2) NOT NULL,
  name VARCHAR(30) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)

db.query(`
  CREATE TABLE IF NOT EXISTS nominals(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_menu TINYINT(2) NOT NULL,
    pay_sistem_id INT(2) NOT NULL,
    nominal INT(8) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)

db.query(`
  CREATE TABLE IF NOT EXISTS cash_points(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)

db.query(`
  CREATE TABLE IF NOT EXISTS transactions(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_menu TINYINT(2) NOT NULL,
    pay_sistem_id TINYINT(2) NOT NULL,
    nominal_id TINYINT(8) NOT NULL,
    price TINYINT(8) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)
