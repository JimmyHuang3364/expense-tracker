const express = require('express')
const router = express.Router()

// loginpage:
router.get('/login', (req, res) => {
  res.render('login')
})

// registerpage:
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router