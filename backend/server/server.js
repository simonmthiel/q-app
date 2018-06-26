require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { Question } = require('./models/question');
const { Answer } = require('./models/answer');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/questions', authenticate, (req, res) => {
  console.log('Into API questions/');
  const question = new Question({
    title: req.body.title,
    description: req.body.description,
    time_created: new Date().getTime(),
    u_id: req.user._id,
  });

  question.save().then(
    (doc) => {
      res.send(doc);
    },
    (e) => {
      res.status(400).send(e);
    },
  );
});

// POST answer for specific question id (any (community) question)
app.post('/answers/:q_id', authenticate, (req, res) => {
  console.log('Into API POST answers/:id');
  const q_id = req.params.q_id;
  // validate question id
  if (!ObjectID.isValid(q_id)) {
    return res.status(404).send();
  }

  // update question status to answered
  Question.findByIdAndUpdate(
    q_id,
    { $set: { status_answered: true, time_answered: new Date().getTime() } },
    { new: true },
  )
    .then((question) => {
      if (!question) {
        return res.status(404).send();
      }
    })
    .catch((e) => {
      res.status(400).send();
    });

  const answer = new Answer({
    q_id,
    title: req.body.title,
    description: req.body.description,
    time_created: new Date().getTime(),
    u_id: req.user._id,
  });

  answer.save().then(
    (doc) => {
      res.send(doc);
    },
    (e) => {
      res.status(400).send(e);
    },
  );
});

// GET all open community questions
// filter for user != req.user && status_answered == false
app.get('/questions', authenticate, (req, res) => {
  Question.find({
    u_id: { $ne: req.user._id },
    status_answered: false,
  }).then(
    (questions) => {
      res.send({ questions });
    },
    (e) => {
      res.status(400).send(e);
    },
  );
});

// GET all/opened/answered own questions
// filter for user = req.user
app.get('/questions/own/:status', authenticate, (req, res) => {
  console.log('Into API questions/own:status');
  let status_answered;
  let queryObject = {};
  console.log('inside API GET questions/own/. u_id: ', req.user._id);
  if (req.params.status === 'open' || req.params.status === 'answered') {
    if (req.params.status === 'open') status_answered = false;
    else if (req.params.status === 'answered') status_answered = true;
    queryObject = {
      u_id: req.user._id,
      status_answered,
    };
  } else if (req.params.status === 'all') {
    queryObject = {
      u_id: req.user._id,
    };
  } else {
    return res.status(400).send('invalid endpoint');
  }
  Question.find(queryObject)
    .sort({ time_created: -1 })
    .then(
      (questions) => {
        res.send({ questions });
      },
      (e) => {
        res.status(400).send(e);
      },
    );
});

// GET all own created answers
// filter for user = req.user
app.get('/answers/', authenticate, (req, res) => {
  console.log('Into API GET answers');
  Answer.find().then(
    (answer) => {
      res.send({ answer });
    },
    (e) => {
      res.status(400).send(e);
    },
  );
});

// GET answers for specific question
app.get('/answers/:q_id', authenticate, (req, res) => {
  console.log('Into API GET answers/:q_id for q_id: ', req.params.q_id);
  Answer.find({ q_id: req.params.q_id }).then(
    (answer) => {
      res.send({ answer });
    },
    (e) => {
      res.status(400).send(e);
    },
  );
});
// app.get('/answers/:q_id',  authenticate, (req, res) => {
//   console.log('Into API GET answers/:q_id');
//   debugger;
//   let q_id = req.params.q_id;
//
//   if (!ObjectID.isValid(q_id)) {
//     return res.status(400).send();
//   }
//
//   Question.findById(q_id).then((question) => {
//     console.log('Question: ', question);
//     if (!question) {
//       return res.status(404).send();
//     }
//     Answer.find({q_id}).then((answer) => {
//       console.log('Answer: ', answer);
//    if (!answer[0]) {
//      return res.status(404).send();
//    }
//       /*const response = {
//         question,
//         answers
//       }*/
//       res.send({answer});
//     }).catch((e) => {
//       res.status(400).send();
//     });
//   }).catch((e) => {
//     res.status(400).send();
//   });
// });

app.get('/questions/:id', authenticate, (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Question.findById(id)
    .then((question) => {
      if (!question) {
        return res.status(404).send();
      }

      res.send({ question });
    })
    .catch((e) => {
      res.status(400).send();
    });
});

// TODO fix
app.delete('/questions/:id', authenticate, (req, res) => {
  const q_id = req.params.id;

  if (!ObjectID.isValid(q_id)) {
    return res.status(404).send();
  }

  Question.findByIdAndRemove({ _id: q_id, u_id: req.user._id })
    .then((question) => {
      if (!question) {
        return res.status(404).send();
      }
      Answer.findByIdAndRemove({ q_id, u_id: req.user._id })
        .then((answer) => {
          const response = {
            question,
            answers,
          };
          res.send({ response });
        })
        .catch((e) => {
          res.status(400).send();
        });
    })
    .catch((e) => {
      res.status(400).send();
    });
});

app.delete('/answers/:id', authenticate, (req, res) => {
  const a_id = req.params.id;

  if (!ObjectID.isValid(a_id)) {
    return res.status(404).send();
  }

  Answer.findByIdAndRemove({ _id: a_id, u_id: req.user._id })
    .then((answer) => {
      if (!answer) {
        return res.status(404).send();
      }

      res.send({ answer });
    })
    .catch((e) => {
      res.status(400).send();
    });
});

// PATCH answers by specific answer ID
app.patch('/answers/:a_id', authenticate, (req, res) => {
  const id = req.params.a_id;
  const body = _.pick(req.body, ['title', 'description', 'status']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  body.time_updated = new Date().getTime();

  Answer.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then((answer) => {
      if (!answer) {
        return res.status(404).send();
      }

      res.send({ answer });
    })
    .catch((e) => {
      res.status(400).send();
    });
});

app.patch('/questions/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['title', 'description']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  body.time_updated = new Date().getTime();

  Question.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then((question) => {
      if (!question) {
        return res.status(404).send();
      }

      res.send({ question });
    })
    .catch((e) => {
      res.status(400).send();
    });
});

// POST /users
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);
  console.log('user: ', user);
  user
    .save()
    .then(() => user.generateAuthToken())
    .then((token) => {
      console.log('TOKEN: ', token);
      res.header('x-auth', token).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /login
app.post('/login', (req, res) => {
  console.log('into login API');

  const body = _.pick(req.body, ['email', 'password']);
  console.log('body: ', body);

  User.findByCredentials(body.email, body.password).then(
    (user) => {
      user
        .generateAuthToken()
        .then((token) => {
          res.header('x-auth', token).send(user);
        })
        .catch((e) => {
          res.status(400).send(e);
        });
    },
    (e) => {
      res.status(400).send(e);
    },
  );
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };
