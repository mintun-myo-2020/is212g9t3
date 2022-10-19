module.exports = app => {
    const skillcourse = require("../controllers/skillcourse.controller.js");
  
    var router = require("express").Router();
    
    // Create a new Tutorial
    router.post("/", skillcourse.create);
    
    app.use('/api/skillcourse', router);
  };