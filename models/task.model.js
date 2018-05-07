const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String },
  listId: { type: Number },
  author: { type: String }
})

module.exports = mongoose.model('Task', taskSchema);