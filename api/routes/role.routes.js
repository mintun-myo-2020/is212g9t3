module.exports = app => {
    const role = require("../controllers/role.controller.js");
  
    var router = require("express").Router();
    
    // Create a new Tutorial
    router.post("/", role.create);

    // Retrieve all Roles
    router.get("/", role.findAll);  
  
    // Retrieve a single Role with id
    router.get("/:role_id", role.findOne);
  
    // Retrieve ALL skills associated with role_id
    router.get("/by-skill/:skill_id", role.findAssociatedSkills);

    // Update a Role with id
    router.put("/:role_id", role.update);

    // Archive a Role with id
    router.put("/:role_id", role.archive)
  
    // Delete a Role with id
    router.delete("/:role_id", role.delete);
  
    app.use('/api/role', router);
  };