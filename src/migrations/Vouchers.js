const db = require('../utils/db')

const check = function (err, results, fields) {
  if (err) {
    throw err
  }
  console.log(results)
  console.log(fields)
}

db.query(
  `CREATE TABLE IF NOT EXISTS vouchers(
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_user INT(2) NOT NULL,
  name VARCHAR(35) NOT NULL,
  image TEXT,
  nominal INT(8) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)
