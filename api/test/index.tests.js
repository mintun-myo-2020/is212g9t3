var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server');
var db = require('../models');

before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('Test LJ endpoints', function() {
    it('Create a learning journey', function(done) {
      request(app)
        .post('/api/learningjourney')
        .send({
          lj_name: "Test",
          staffStaffId: 2,
          roleRoleId: 2,
          skills: ["teamwork"],
          courses: ["team building 101"]
        })
        .expect(200,done)
    });
    it('Get all learning journeys', function(done) {
      request(app)
        .get('/api/learningjourney')
        .expect(200,done)
    });
    it('Get learning journey by id', function(done) {
      let id = 1;
      request(app)
        .get('/api/learningjourney/' + id)
        .expect(200,done)
    });
    it('Update learning journey by id', function(done) {
      let id = 1;
      request(app)
        .put('/api/learningjourney/' + id)
        .send({
          lj_name: "UPDATED test",
          staffStaffId: 1,
          roleRoleId: 1,
          skills: ["teamwork"],
          courses: ["team building 101"]
        })
        .expect(200,done)
    });
    it('Delete all learning journeys', function(done) {
      request(app)
        .delete('/api/learningjourney')
        .expect(200,done)
    });
    it('Delete learning journey by id', function(done) {
      let id = 1;
      request(app)
        .delete('/api/learningjourney/' + id)
        .expect(200,done)
    });
  });

