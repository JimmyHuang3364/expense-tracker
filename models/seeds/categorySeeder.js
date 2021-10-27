console.log(`建立category種子資料`)

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const category = require('../category')
const categoryJson = require('./category.json').results

const db = require('../../config/mongoose')

db.once('open', () => {
  Promise.all(
    Array.from(categoryJson, element => {
      return category.create({
        CategoryName: element.CategoryName,
        enCategoryName: element.enCategoryName,
        classIconName: element.classIconName
      })
    })
  )
    .then(() => {
      console.log('建立category種子資料完成')
      console.log('退出category.js程式')
      console.log('------------------')
      process.exit()
    })
    .catch(err => console.log(err))
})