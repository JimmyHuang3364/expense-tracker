console.log('開啟recordSeeder.js')

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

db.once('open', async () => {
  console.log('  建立User種子資料')
  for (const user of seedUsers) {
    console.log('============')
    console.log(`建立${user.userName}用戶  passeord:1234`)
    const salt = await bcrypt.genSalt(10) //加鹽
    const hash = await bcrypt.hash(user.password, salt)
    const newUser = await User.create({
      userName: user.userName,
      password: hash
    })
    const newUserId = newUser._id
    for (let i = 0; i < 5; i++) {
      console.log(`  ->建立支出${i + 1}`)
      let randomNum = Math.floor(Math.random() * seedExpenseTracker.length)
      let item = seedExpenseTracker.splice(randomNum, 1)[0]
      let categoryItems = await category.findOne({ enCategoryName: item.category }).lean()
      console.log(categoryItems)
      // item.userId = newUserId
      await expenseTracker.create({
        caption: item.caption,
        date: item.date,
        category: item.category,
        amount: item.amount,
        classIconName: categoryItems.classIconName,
        userId: newUserId
      })
    }
  }
  console.log('')
  console.log('資料建立完成')
  console.log('自動退出recordSeeder.js')
  console.log('完成')
  process.exit()
})