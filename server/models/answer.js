var mongoose = require('mongoose');

var Answer = mongoose.model('Answer', {
  q_id:{
    type: String,
    required: true
  },
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
  status: {
    type: Number
  },
  time_created: {
    type: Number,
    default: null
  },
  time_changed: {
    type: Number,
    default: null
  },
});

module.exports = {Answer};
