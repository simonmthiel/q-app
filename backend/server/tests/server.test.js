const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Question} = require('./../models/question');

const questions = [{
  _id: new ObjectID(),
  title: 'First test question'
}, {
  _id: new ObjectID(),
  title: 'Second test question',
  completed: true,
  time_answered: 333
}];

beforeEach((done) => {
  Question.remove({}).then(() => {
    return Question.insertMany(questions);
  }).then(() => done());
});

describe('POST /questions', () => {
  it('should create a new question', (done) => {
    var title = 'Test question title';

    request(app)
      .post('/questions')
      .send({title})
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toBe(title);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Question.find({title}).then((questions) => {
          expect(questions.length).toBe(1);
          expect(questions[0].title).toBe(title);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create question with invalid body data', (done) => {
    request(app)
      .post('/questions')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Question.find().then((questions) => {
          expect(questions.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /questions', () => {
  it('should get all questions', (done) => {
    request(app)
      .get('/questions')
      .expect(200)
      .expect((res) => {
        expect(res.body.questions.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /questions/:id', () => {
  it('should return question doc', (done) => {
    request(app)
      .get(`/questions/${questions[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.question.title).toBe(questions[0].title);
      })
      .end(done);
  });

  it('should return 404 if question not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/questions/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/questions/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /questions/:id', () => {
  it('should remove a question', (done) => {
    var hexId = questions[1]._id.toHexString();

    request(app)
      .delete(`/questions/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.question._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Question.findById(hexId).then((question) => {
          expect(question).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if question not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/questions/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/questions/123abc')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /questions/:id', () => {
  it('should update the question', (done) => {
    var hexId = questions[0]._id.toHexString();
    var title = 'This should be the new title';

    request(app)
      .patch(`/questions/${hexId}`)
      .send({
        completed: true,
        title
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.question.title).toBe(title);
        expect(res.body.question.completed).toBe(true);
        expect(res.body.question.time_answered).toBeA('number');
      })
      .end(done);
  });

  it('should clear time_answered when question is not completed', (done) => {
    var hexId = questions[1]._id.toHexString();
    var title = 'This should be the new title!!';

    request(app)
      .patch(`/questions/${hexId}`)
      .send({
        completed: false,
        title
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.question.title).toBe(title);
        expect(res.body.question.completed).toBe(false);
        expect(res.body.question.time_answered).toNotExist();
      })
      .end(done);
  });
});
