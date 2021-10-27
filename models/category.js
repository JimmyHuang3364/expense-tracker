const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  CategoryName: {
    type: String,
    required: true
  },
  enCategoryName: {
    type: String,
    required: true
  },
  classIconName: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('category', categorySchema)