// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const CATEGORY = require('../../models/category')
const EXPENSETRACKER = require('../../models/expenseTracker')


//about 新增支出部分-增-page
router.get('/new', (req, res) => {
  CATEGORY.find()
    .lean()
    .then((categoryItem) => {
      return res.render('new', { categoryItem })
    })
})

//about新增支出部分-增-action
router.post('/', (req, res) => {
  req.body.userId = req.user._id
  return CATEGORY.findOne({ enCategoryName: req.body.category })
    .then((categoritem) => req.body.classIconName = categoritem.classIconName)
    .then(() => {
      return EXPENSETRACKER.create(req.body)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})


//刪除內容部分-刪
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return EXPENSETRACKER.findByIdAndRemove(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


//about 修改內容部分-改-page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  CATEGORY.find()
    .lean()
    .then((allCategoryItem) => {
      return EXPENSETRACKER.findOne({ _id: id })
        .lean()
        .then((expense) => {
          res.render('edit', { expense, allCategoryItem })
        })
    })
})

//about 修改內容部分-改-action
router.put('/:id', (req, res) => {
  console.log('收到PUT')
  const id = req.params.id
  return CATEGORY.findOne({ enCategoryName: req.body.category })
    .then((categoritem) => {
      req.body.classIconName = categoritem.classIconName
    })
    .then(() => {
      return EXPENSETRACKER.findByIdAndUpdate(id, req.body)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})


//查詢內容部分-查-分類
router.get('/categoryCondition', (req, res) => {
  const styleSheet = 'index.css'
  const category = req.query.categoryCondition
  const userId = req.user._id
  let totalAmount = 0
  if (category) {
    EXPENSETRACKER.find({ category, userId })
      .lean()
      .then(expenseTrackerItem => {
        CATEGORY.find()
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
  } else {
    EXPENSETRACKER.find({ userId })
      .lean()
      .then(expenseTrackerItem => {
        CATEGORY.find()
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
  }
})






module.exports = router