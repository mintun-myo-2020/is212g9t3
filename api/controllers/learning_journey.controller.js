const db = require("../models");
const { Skill, Role, Course, Staff,  } = require("../models");
const LearningJourney = db.LearningJourney;
const Op = db.Sequelize.Op;

// Create and Save a new LearningJourney
exports.create = (req, res) => {
    // Validate request
    if (!req.body.lj_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    
    const staff_id = req.body.staff_id;
    const lj_name = req.body.lj_name;
    const role_id = req.body.role_id;
    const skills = req.body.skills; // array of skill ids
    const courses = req.body.courses; // array of course ids

    // Create a LearningJourney
    const learningJourney = {
      lj_name: lj_name,
      staffStaffId: staff_id,
      roleRoleId: role_id,
    };

    LearningJourney.create(learningJourney)
      .then(data => {
        LearningJourney.findByPk(data.lj_id)
        .then(lj => {
          for (course of courses){
            lj.setCourses([course]);
          }
          for (skill of skills) {
            lj.setSkills([skill]);
          }
          res.send(lj)
        }
        
        )     
        
      })

  };

// Retrieve all LearningJourneys from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    LearningJourney.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving learningJourneys."
        });
      });
  };

// Find a single LearningJourney with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    LearningJourney.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find LearningJourney with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving LearningJourney with id=" + id
        });
      });
  };

// Update a LearningJourney by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    LearningJourney.update(req.body, {
      where: { lj_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "LearningJourney was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update LearningJourney with id=${id}. Maybe LearningJourney was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err
        });
      });
  };

// Delete a LearningJourney with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    LearningJourney.destroy({
      where: { lj_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "LearningJourney was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete LearningJourney with id=${id}. Maybe LearningJourney was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete LearningJourney with id=" + id
        });
      });
  };

// Delete all LearningJourneys from the database.
exports.deleteAll = (req, res) => {
    LearningJourney.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} LearningJourneys were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all learningJourneys."
        });
      });
  };

//Remove course from lj
exports.removeCourseLj = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const removal = {
    learningjourneyLjId: req.body.learningjourneyLjId,
    courseCourseId: req.body.courseCourseId
  };

  LearningJourney.findOne({
    where: { lj_id: removal.learningjourneyLjId }
    }).then(lj => {
        lj.removeCourses([removal.courseCourseId])
        res.sendStatus(200);
    }).catch(e => console.log(e));


};













