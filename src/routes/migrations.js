const Migrate = require('express').Router()
const MigrateController = require('../controllers/migrations')

Migrate.get('/', MigrateController.migration)

module.exports = Migrate
