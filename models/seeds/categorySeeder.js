const category = require('../category')
const categoryJson = require('./category.json').results

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('加載category種子資料')
  Promise.all(
    Array.from(categoryJson, element => {
      return category.create({
        CategoryName: element.CategoryName,
        en_CategoryName: element.en_CategoryName,
        class_IconName: element.class_IconName
      })
    })
  )
    .then(() => {
      console.log('加載category種子資料完成')
      console.log('退出程式')
      process.exit()
    })
    .catch(err => console.log(err))
})