const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const expenseTracker = require('./modules/expenseTracker')
const users = require('./modules/users')

router.use('/users', users)
router.use('/expenseTracker', expenseTracker)
router.use('/', home)

module.exports = router