var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server');

describe('Test LJ endpoints', function() {
    it('Create a learning journey', function(done) {
      request(app)
        .post('/api/learningjourney')
        .send({
          lj_name: "Test",
          staffStaffId: 1,
          roleRoleId: 1,
          skills: ["teamwork"],
          courses: ["team building 101"]
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
    it('Get all learning journeys', function(done) {
      request(app)
        .get('/api/learningjourney')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
    it('Get all published learning journeys', function(done) {
      request(app)
        .get('/api/learningjourney/published')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
    it('Get learning journey by id', function(done) {
      let id = 2;
      request(app)
        .get('/api/learningjourney/' + id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
    it('Update learning journey by id', function(done) {
      let id = 100;
      request(app)
        .put('/api/learningjourney/' + id)
        .send({
          lj_name: "UPDATED test",
          staffStaffId: 1,
          roleRoleId: 1,
          skills: ["teamwork"],
          courses: ["team building 101"]
        })
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
    // it('Delete all learning journeys', function(done) {
    //   request(app)
    //     .delete('/api/learningjourney')
    //     .expect(200)
    //     .end(function(err, res) {
    //       if (err) return done(err);
    //       return done();
    //     });
    // });
    it('Delete learning journey by id', function(done) {
      let id = 1;
      request(app)
        .delete('/api/learningjourney/' + id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });

