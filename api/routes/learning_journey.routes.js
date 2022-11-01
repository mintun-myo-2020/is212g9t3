module.exports = app => {
    const learningJourney = require("../controllers/learning_journey.controller.js");
  
    var router = require("express").Router();
  
    // Create a new learningJourney
    router.post("/", learningJourney.create);
  
    // Retrieve all learningJourney
    router.get("/", learningJourney.findAll);
  
    // Retrieve a single learningJourney with id
    router.get("/:id", learningJourney.findOne);
  
    // Update a learningJourney with id
    router.put("/:id", learningJourney.update);
  
    // Delete a learningJourney with id
    router.delete("/:id", learningJourney.delete);
  
    // Delete all learningJourney
    router.delete("/", learningJourney.deleteAll);
  
    app.use('/api/learningjourney', router);
  };