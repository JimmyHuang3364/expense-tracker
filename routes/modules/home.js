const express = require('express')
const router = express.Router()

const expenseTracker = require('../../models/expenseTracker')
const category = require('../../models/category')

// homepage:
router.get('/', (req, res) => {
  expenseTracker.find()
    .lean()
    .then(expenseTrackerItem => {
      return category.find()
        .lean()
        .then(allCategoryItem => {

          res.render('index', { allCategoryItem, expenseTrackerItem })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router