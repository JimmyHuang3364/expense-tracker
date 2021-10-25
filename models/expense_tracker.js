const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseTrackerSchema = new Schema({
  caption: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('expenseTracker', expenseTrackerSchema)