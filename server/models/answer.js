var mongoose = require('mongoose');

var Answer = mongoose.model('Answer', {
  q_id:{
    type: String,
    required: true
  },  
  status: {
    type: Number
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
  time_created: {
    type: Number,
    default: null
  },
  time_updated: {
    type: Number,
    default: null
  },
});

module.exports = {Answer};
