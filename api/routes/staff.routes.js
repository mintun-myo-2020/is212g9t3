module.exports = app => {
    const staff = require("../controllers/staff.controller.js");
  
    var router = require("express").Router();
    
    // Retrieve all Staffs
    router.get("/", staff.findAll);
  
    // Retrieve a single Staff with id
    router.get("/:staff_id", staff.findOne);

    // Retrieve COURSES enrolled by staff with staffid
    router.get("/enrolledcourses/:staff_id", staff.findEnrolledCourses);
  
    // Update a Staff with id
    router.put("/:staff_id", staff.update);
  
    // Delete a Staff with id
    router.delete("/:staff_id", staff.delete);
  
    app.use('/api/staff', router);
  };