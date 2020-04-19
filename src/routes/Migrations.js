const Migrate = require('express').Router()
const MigrateController = require('../controllers/Migrations')

Migrate.get('/', MigrateController.migration)

module.exports = Migrate
