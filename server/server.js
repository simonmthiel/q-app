require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Question} = require('./models/question');
var {Answer} = require('./models/answer');
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

// POST answer for specific question id
app.post('/answers/:q_id', (req, res) => {
  const q_id = req.params.q_id;

  // validate question id
  if (!ObjectID.isValid(q_id)) {
    return res.status(404).send();
  }
  Question.findById(q_id).then((question) => {
    if (!question) {
      return res.status(404).send();
    }
  }).catch((e) => {
    res.status(400).send();
  });

  const answer = new Answer({
    q_id,
    title: req.body.title,
    description: req.body.description,
    time_created: new Date().getTime()
  });

  answer.save().then((doc) => {
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

// debug API to retrieve all answers
app.get('/answers', (req, res) => {
  Answer.find().then((answers) => {
    res.send({answers});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET answers for specific question
app.get('/answers/:q_id', (req, res) => {
  var q_id = req.params.q_id;

  if (!ObjectID.isValid(q_id)) {
    return res.status(400).send();
  }

  Question.findById(q_id).then((question) => {
    if (!question) {
      return res.status(400).send();
    }

    Answer.find({"q_id": q_id}).then((answer) => {
      console.log('answer type of', typeof answer[0] );
      if (!answer || !answer[0]) {
        return res.status(404).send();
      }
      res.send({answer});
    }).catch((e) => {
      res.status(400).send();
    });
  }).catch((e) => {
    res.status(400).send();
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
