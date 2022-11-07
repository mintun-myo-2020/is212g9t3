module.exports = app => {
  const learningJourney = require("../controllers/learning_journey.controller.js");

  var router = require("express").Router();

  // Create a new learningJourney
  router.post("/", learningJourney.create);

  // Retrieve all learningJourney
  router.get("/", learningJourney.findAll);

  // Retrieve a single learningJourney with id
  router.get("/:id", learningJourney.findOne);

  // Retrieve a single learningJourney with staffid
  router.get("/staff/:id", learningJourney.findLjbyStaffId);

  // Retrieve skills of a learningJourney with ljid
  router.get("/skills/:id", learningJourney.findLjSkills);

  // Retrieve skills of a learningJourney with ljid
  router.get("/courses/:id", learningJourney.findLjCourses);

  // Update a learningJourney with id
  router.put("/:id", learningJourney.update);

  // Delete a learningJourney with id
  router.delete("/:id", learningJourney.delete);

  // Delete all learningJourney
  router.delete("/", learningJourney.deleteAll);

  // Remove course from learningJourney
  router.post("/removecourse", learningJourney.removeCourseLj);

  app.use('/api/learningjourney', router);
};