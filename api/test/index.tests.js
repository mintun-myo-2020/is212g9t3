var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server');
var db = require('../models');

before(function(done) {
  db.sequelize.sync({ force: false }).then(function() {
    done();
  });
});

describe('Test LJ endpoints', function() {
    it('Create a learning journey', function(done) {
      request(app)
        .post('/api/learningjourney')
        .send({
          lj_name: "Test",
          staff_id: 1,
          role_id: 1,
          skills: [1],
          courses: ["FIN003"]
        })
        .expect(200,done)
    });
    it('Get all learning journeys', function(done) {
      request(app)
        .get('/api/learningjourney')
        .expect(200,done)
    });
    it('Get learning journey by id', function(done) {
      let id = 2;
      request(app)
        .get('/api/learningjourney/' + id)
        .expect(404,done)
    });
    it('Update learning journey by id', function(done) {
      let id = 2;
      request(app)
        .put('/api/learningjourney/' + id)
        .send({
          lj_name: "UPDATED test",
          staff_id: 2,
          role_id: 2,
          skills: [1],
          courses: ["FIN004"]
        })
        .expect(200,done)
    });
    // it('Delete all learning journeys', function(done) {
    //   request(app)
    //     .delete('/api/learningjourney')
    //     .expect(200,done)
    // });
    // it('Delete learning journey by id', function(done) {
    //   let id = 2;
    //   request(app)
    //     .delete('/api/learningjourney/' + id)
    //     .expect(200,done)
    // });
    it('Remove courses from learning journey', function(done) {
      request(app)
        .post('/api/learningjourney/removecourse')
        .send({
          learningjourneyLjId: 4,
          courseCourseId:"FIN003"
      })
        .expect(200,done)
    });
  });

describe('Test enrolled courses by staff', function() {
    it('Get enrolled courses of a staff', function(done) {
      let staff_id = 1;
      request(app)
        .get('/api/staff/enrolledcourses/' + staff_id)
        .expect(200,done)
    });
  });