const learningJourneyModel = require("../../models/learning_journey.model")
const newLJ = require("../mock-data/new-lj.json")
const request = require('supertest')
const app = require('api/server')

// TESTS TODO:
// 1. lj receive name and makes association with a user
// 2. lj gets created
// 3. lj gets an association with the correct role
// 4. lj gets an association with the correct courses

learningJourneyModel.create = jest.fn()


// describe("learningJourney.create", () => {
//     it("should have a create function", () => {
//         expect(typeof learningJourney.create).toBe("function");
//     });
//     it("should call learningjourney.create", () =>{
//         let req, res;
//         req = httpMocks.createRequest();
//         res = httpMocks.createResponse();
//         req.body = newLJ;
//         learningJourney.create(req, res);

//         expect(learningJourneyModel.create).toBeCalledWith(newLJ);
//     });
// } )



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

});
