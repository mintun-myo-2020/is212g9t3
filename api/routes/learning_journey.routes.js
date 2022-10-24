module.exports = app => {
    const learningJourney = require("../controllers/learning_journey.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", learningJourney.create);
  
    // Retrieve all Tutorials
    router.get("/", learningJourney.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", learningJourney.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", learningJourney.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", learningJourney.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", learningJourney.delete);
  
    // Delete all Tutorials
    router.delete("/", learningJourney.deleteAll);
  
    app.use('/api/learningjourney', router);
  };