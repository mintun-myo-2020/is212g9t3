const { INET } = require("sequelize")
const learningJourney = require("../../controllers/learning_journey.controller")
const learningJourneyModel = require("../../models/learning_journey.model")


// TESTS TODO:
// 1. lj receive name and id
// 2. lj gets created
// 3. lj gets an association with the correct role
// 4. lj gets an association with the correct courses


describe("learningJourney.create", () => {
    it("should have a create function", () => {
        expect(typeof learningJourney.create).toBe("function");
    })
} )