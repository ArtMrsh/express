const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: { type: String },
  boardId: { type: Number },
  tasks: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }
})

module.exports = mongoose.model('List', listSchema);