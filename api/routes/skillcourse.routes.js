module.exports = app => {
    const courseskill = require("../controllers/skillcourse.controller.js");
  
    var router = require("express").Router();
    
    // Create a new Tutorial
    router.post("/", courseskill.create);
    
    app.use('/api/courseskill', router);
  };