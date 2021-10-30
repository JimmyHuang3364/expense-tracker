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
      const categoryItems = await category.findOne({ category: item.category }).lean()
      // item.classIconName = categoryItems.classIconName
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


// db.once('open', async () => {
//   for (const user of seedUser) {
//     const saltPwd = await bcrypt.genSalt(10).then(salt => bcrypt.hash(user.password, salt));
//     const createdUser = await User.create({
//       name: user.name,
//       email: user.email,
//       password: saltPwd
//     })
//     const recordList = Array.from(user.index, i => record[i])
//     for (const record of recordList) {
//       const category = await Category.findOne({ name: record.category }).lean()
//       await Record.create({
//         name: record.name,
//         date: record.date,
//         category: record.category,
//         icon: category.icon,
//         price: record.price,
//         userId: createdUser._id
//       })
//     }
//   }
//   process.exit()
// })


//   const waitForCreate = []
//     Array.from(seedUsers, element => {
//       return bcrypt
//         .genSalt(10)
//         .then(salt => bcrypt.hash(element.password, salt))
//         .then(hash => User.create({
//           userName: element.userName,
//           password: hash
//         }))
//         .then(user => {
//           const userId = user._id
//             Array.from({ length: 5 }, () => {
//               let randomMath = Math.floor(Math.random() * seedExpenseTracker.length)
//               let items = seedExpenseTracker.splice(randomMath, 1)
//               category.findOne({ enCategoryName: items[0].category })
//                 .lean()
//                 .then(categoryItems => {
//                   items[0].classIconName = categoryItems.classIconName
//                   items[0].userId = userId
//                   console.log(items[0])
//                   items[0]
//                 })
//                 .then((item) => {
//                   waitForCreate.push(item)
//                 })
//             })
//           return
//         })
//         .then((waitForCreate) => {
//           return expenseTracker.create(waitForCreate)
//         })
//     })
// })
