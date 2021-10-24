// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
  return res.render('new')
})

//新增支出部分
router.post('/', (req, res) => {
  res.redirect('/')
})

//修改內容部分
router.get('/edit', (req, res) => {
  return res.render('edit')
})

module.exports = router