require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Question} = require('./models/question');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/questions', (req, res) => {
  const question = new Question({
    title: req.body.title,
    description: req.body.description,
    time_created: new Date().getTime()
  });

  question.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/questions', (req, res) => {
  Question.find().then((questions) => {
    res.send({questions});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/questions/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Question.findById(id).then((question) => {
    if (!question) {
      return res.status(404).send();
    }

    res.send({question});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/questions/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Question.findByIdAndRemove(id).then((question) => {
    if (!question) {
      return res.status(404).send();
    }

    res.send({question});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/questions/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['title', 'description', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.time_answered = new Date().getTime();
  } else {
    body.completed = false;
    body.time_changed = new Date().getTime();
  }

  Question.findByIdAndUpdate(id, {$set: body}, {new: true}).then((question) => {
    if (!question) {
      return res.status(404).send();
    }

    res.send({question});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
