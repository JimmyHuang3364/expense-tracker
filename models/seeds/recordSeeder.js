console.log('建立User種子資料')

const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const category = require('../category')
const expenseTracker = require('../expenseTracker')
const User = require('../user')
const seedExpenseTracker = require('./expenseTracker.json').results
const seedUsers = require('./users.json').results

const db = require('../../config/mongoose')

db.once('open', () => {
  Array.from(seedUsers, element => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(element.password, salt))
      .then(hash => User.create({
        userName: element.userName,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        const waitForCreate = []
        Array.from(
          { length: 5 },
          () => {
            let randomMath = Math.floor(Math.random() * seedExpenseTracker.length)
            let items = seedExpenseTracker.splice(randomMath, 1)
            items[0].userId = userId
            category.findOne({ enCategoryName: items[0].category })
              .lean()
              .then(categoryItems => {
                items[0].classIconName = categoryItems.classIconName
                console.log('===========')
                waitForCreate.push(items[0])
                expenseTracker.create(items[0])

              })
              .catch(err => console.log(err))
          })
      })
  })
})