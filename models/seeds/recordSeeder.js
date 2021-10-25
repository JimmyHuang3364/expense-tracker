const expenseTracker = require('../expenseTracker')
const expenseTrackerJson = require('./expenseTracker.json').results

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('運行recordSeeder加載種子資料')
  Promise.all(
    Array.from(categoryList, element => {
      return category.create({
        CategoryName: element.CategoryName,
        en_CategoryName: element.en_CategoryName,
        class_IconName: element.class_IconName
      })
    })
  )
    .then(() => {
      console.log('種子資料加載完成')
      console.log('退出程式')
      process.exit()
    })
    .catch(err => console.log(err))
})