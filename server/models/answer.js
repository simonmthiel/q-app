var mongoose = require('mongoose');

var Question = mongoose.model('Question', {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String,
    minlength: 1,
    trim: true
  },
  picture: {
    type: String,
  },
  status_answered: {
    type: String,
  },
  time_created: {
    type: Number,
    default: null
  }
  time_changed: {
    type: Number,
    default: null
  }
  time_answered: {
    type: Number,
    default: null
  }
});

module.exports = {Question};
