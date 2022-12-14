module.exports = app => {
    const course = require("../controllers/course.controller.js");
  
    var router = require("express").Router();
    
    // Create a new Tutorial
    router.post("/", course.create);

    // Retrieve all Courses
    router.get("/", course.findAll);  
  
    // Retrieve a single Course with id
    router.get("/:course_id", course.findOne);

    // Retrieve all Courses associated with skill
    router.get("/by-skill/:skill_id", course.findBySkill);
  
    // Update a Course with id
    router.put("/:course_id", course.update);

    // Archive a Course with id
    router.put("/:course_id", course.archive)
  
    // Delete a Course with id
    router.delete("/:course_id", course.delete);
    
    app.use('/api/course', router);
  };