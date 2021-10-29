const express = require('express')
const router = express.Router()

const expenseTracker = require('../../models/expenseTracker')
const category = require('../../models/category')

// homepage:
router.get('/', (req, res) => {
  const styleSheet = 'index.css'
  const userId = req.user._id
  let totalAmount = 0
  expenseTracker.find({ userId })
    .lean()
    .then(expenseTrackerItem => {
      category.find()
        .lean()
        .then(allCategoryItem => {
          Array.from(expenseTrackerItem, item => {
            totalAmount += item.amount
          })
          res.render('index', { allCategoryItem, expenseTrackerItem, totalAmount, styleSheet })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router