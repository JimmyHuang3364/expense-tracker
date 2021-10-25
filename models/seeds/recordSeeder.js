console.log('建立User種子資料')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const expenseTracker = require('../expenseTracker')
const User = require('../user')
const seedExpenseTracker = require('./expenseTracker.json').results
const seedUsers = require('./users.json').results

const db = require('../../config/mongoose')

db.once('open', () => {
  Promise.all(
    Array.from(seedUsers, element => {
      return User.create({
        userName: element.userName,
        password: element.password
      })
        .then(user => {
          const userId = user._id
          const waitForCrate = []
          Array.from(
            { length: 5 },
            () => {
              let randomMath = Math.floor(Math.random() * seedExpenseTracker.length)
              let items = seedExpenseTracker.splice(randomMath, 1)
              items[0].userId = userId
              waitForCrate.push(items[0])
            })
          return expenseTracker.create(waitForCrate)
        })
    }))
    .then(() => {
      console.log('建立User種子資料完成')
      console.log('退出recordSeeder.js程式')
      process.exit()
    })
    .catch(err => console.log(err))
})