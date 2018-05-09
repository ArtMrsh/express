const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: { type: String },
  boardId: { type: Number },
  tasks: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }
})

const List = mongoose.model('List', listSchema);

listSchema.method.updateData = function (callback) {
  List.find().populate('Task').exec(callback);
}

module.exports = List;
