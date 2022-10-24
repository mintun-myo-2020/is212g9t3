const httpMocks = require("node-mocks-http")
const learningJourney = require("../../controllers/learning_journey.controller")
const learningJourneyModel = require("../../models/learning_journey.model")
const newLJ = require("../mock-data/new-lj.json")
require('iconv-lite').encodingExists('foo');


// TESTS TODO:
// 1. lj receive name and makes association with a user
// 2. lj gets created
// 3. lj gets an association with the correct role
// 4. lj gets an association with the correct courses

learningJourneyModel.create = jest.fn()


describe("learningJourney.create", () => {
    it("should have a create function", () => {
        expect(typeof learningJourney.create).toBe("function");
    });
    it("should call learningjourney.create", () =>{
        let req, res;
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        req.body = newLJ;
        learningJourney.create(req, res);

        expect(learningJourneyModel.create).toBeCalledWith(newLJ);
    });
} )