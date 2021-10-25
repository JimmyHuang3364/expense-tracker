const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const accounts = require('./modules/accounts')
const users = require('./modules/users')

router.use('/users', users)
router.use('/accounts', accounts)
router.use('/', home)

module.exports = router