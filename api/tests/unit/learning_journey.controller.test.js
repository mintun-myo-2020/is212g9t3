const { INET } = require("sequelize")
const learningJourney = require("../../controllers/learning_journey.controller")

describe("learningJourney.create", () => {
    it("should have a create function", () => {
        expect(typeof learningJourney.create).toBe("function");
    })
} )