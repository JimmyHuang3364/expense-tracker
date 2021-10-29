const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const expenseTracker = require('./modules/expenseTracker')
const users = require('./modules/users')


router.use('/expenseTracker', authenticator, expenseTracker)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router