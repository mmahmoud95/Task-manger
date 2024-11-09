const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  dueDate: {
    type: Date,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }

}, {
  timestamps: true,

});

module.exports = mongoose.model('Task', taskSchema);