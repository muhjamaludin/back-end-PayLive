const db = require('../utils/db')

const check = function (err, results, fields) {
  if (err) {
    throw err
  }
  console.log(results)
  console.log(fields)
}

db.query(
  `CREATE TABLE IF NOT EXISTS partner(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  purchase INT(8) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)
