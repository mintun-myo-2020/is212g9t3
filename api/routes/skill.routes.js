module.exports = app => {
    const skill = require("../controllers/skill.controller.js");
  
    var router = require("express").Router();
    
    // Create a new Tutorial
    router.post("/", skill.create);

    // Retrieve all Staffs
    router.get("/", skill.findAll);  
  
    // Retrieve a single Staff with id
    router.get("/:skill_id", skill.findOne);
  
    // Update a Staff with id
    router.put("/:skill_id", skill.update);
  
    // Delete a Staff with id
    router.delete("/:skill_id", skill.delete);
  
    app.use('/api/skill', router);
  };