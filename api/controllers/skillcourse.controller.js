const db = require("../models");
const skillcourse = db.SkillCourse;
const Op = db.Sequelize.Op;

// Create and Save a new course
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: req.body.skillSkillId
      });
      return;
    }

    // Create an assignment
    const assignment = {
      skillSkillId: req.body.skillSkillId,
      courseCourseId: req.body.courseCourseId,
      createdAt:  Date.now()
    };

    // Save course in the database
    skillcourse.create(assignment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while assigning course to skill."
        });
      });
  };

