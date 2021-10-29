const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

// login: page
router.get('/login', (req, res) => {
  res.render('login')
})

// login: action
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))



// register: page
router.get('/register', (req, res) => {
  res.render('register')
})

// register: action
router.post('/register', (req, res) => {
  const { userName, password, confirmPassword } = req.body //拿到送出的表單內容
  const errorsMsg = []

  //註冊流程
  //檢查表單有無未填寫
  if (!userName || !password || !confirmPassword) {
    errorsMsg.push({ message: '有*必填欄位未填寫' })
  }
  if (password !== confirmPassword) {
    errorsMsg.push({ message: '密碼與確認密碼不相符!!' })
  }
  if (errorsMsg.length) {
    return res.render('register', {
      errorsMsg,
      userName,
      password,
      confirmPassword
    })
  }
  //檢查用戶名是否重複
  User.findOne({ userName })
    .then(user => {
      if (user) {
        errorsMsg.push({ message: '此名稱已被使用' })
        return res.render('register', {
          errorsMsg,
          userName,
          password,
          confirmPassword
        })
      }
      //無重複，開始註冊程序
      return bcrypt
        .genSalt(10) //產鹽
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          userName,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})


// logout: action
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})
module.exports = router