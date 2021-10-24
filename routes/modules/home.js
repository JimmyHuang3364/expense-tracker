const express = require('express')
const router = express.Router()

// homepage:
router.get('/', (req, res) => {
  res.send('asdasd')
})

module.exports = router