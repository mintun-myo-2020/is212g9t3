module.exports = app => {
    const skill = require("../controllers/skill.controller.js");
  
    var router = require("express").Router();
    
    // Create a new Tutorial
    router.post("/", skill.create);

    // Retrieve all Skills
    router.get("/", skill.findAll);  

    // Retrieve ALL roles based on role_name
    router.get("/by-role/:role_name", skill.findByRole);
  
    // Retrieve a single Skill with id
    router.get("/:skill_id", skill.findOne);
  
    // Update a Skill with id
    router.put("/:skill_id", skill.update);

    // Archive a Skill with id
    router.put("/:skill_id", skill.archive)
  
    // Delete a Skill with id
    router.delete("/:skill_id", skill.delete);
  
    app.use('/api/skill', router);
  };