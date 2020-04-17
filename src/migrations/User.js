const db = require('../utils/db')

const check = function (err, results, fields) {
  if (err) {
    throw err
  }
  console.log(results)
  console.log(fields)
}

db.query(
  `CREATE TABLE IF NOT EXISTS users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  phone VARCHAR(14) NOT NULL,
  security_code VARCHAR(60),
  verification_code VARCHAR(37),
  is_active TINYINT(2) DEFAULT 0,
  is_verified TINYINT(2) DEFAULT 0,
  role_id TINYINT(2) DEFAULT 2,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)

db.query(`
  CREATE TABLE IF NOT EXISTS user_details(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT(5) NOT NULL,
    fullname VARCHAR(30) NOT NULL,
    email VARCHAR(20) NOT NULL,
    profile_picture TEXT,
    identity_picture TEXT,
    cash INT(8) NULL,
    points INT(8) NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)
