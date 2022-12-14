module.exports = app => {
    const skill = require("../controllers/skill.controller.js");
  
    var router = require("express").Router();
    
    // Create a new Skill
    router.post("/", skill.create);

    // Retrieve all Skills
    router.get("/", skill.findAll);  

    // Retrieve ALL skill based on role_id
    router.get("/by-role/:role_id", skill.findByRole);
  
    // Retrieve a single Skill with id
    router.get("/:skill_id", skill.findOne);
  
    // Update a Skill with id
    router.put("/:skill_id", skill.update);

    // Archive a Skill with id
    router.put("/archive/:skill_id", skill.archive)
  
    // Delete a Skill with id
    router.delete("/:skill_id", skill.delete);

    // Assign a course to skill
    router.post("/assigncourse", skill.assignCourse);

    // Unassign a course to skill
    router.post("/unassigncourse", skill.unassignCourse);
     
    app.use('/api/skill', router);
  };