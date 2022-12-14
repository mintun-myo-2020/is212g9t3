module.exports = app => {
    const role = require("../controllers/role.controller.js");
  
    var router = require("express").Router();
    
    // Create a new Tutorial
    router.post("/", role.create);

    // Retrieve all Roles
    router.get("/", role.findAll);  
  
    // Retrieve a single Role with id
    router.get("/:role_id", role.findOne);
  
    // Retrieve ALL roles associated with skill_name
    router.get("/by-skill/:skill_name", role.findAssociatedSkills);

    // Update a Role with id
    router.put("/:role_id", role.update);

    // Archive a Role with id
    router.put("/archive/:role_id", role.archive);

    // Unassign skill from role
    router.delete("/unassign-skill/:skill_id", role.unassign);
  
    // Delete a Role with id
    router.delete("/:role_id", role.delete);

    // Assign a role to skill
    router.post("/assignskill", role.assignSkill);

    //Unassign a skill from role
    router.post('/unassignskill', role.unassignSkill)
  
    app.use('/api/role', router);
    
  };