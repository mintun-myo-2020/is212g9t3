const db = require("../models");
const { Skill, Role, Course } = require("../models");
const LearningJourney = db.learningJourneys;
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
  
    lj_name - req.body.lj_name
    role_id = req.body.role_id;
    skills = req.body.skills; // array of skill ids
    courses = req.body.courses; // array of course ids

    // Create a LearningJourney
    const learningJourney = {
      lj_name: lj_name
    };

    // Save LearningJourney in the database
    LearningJourney.create(learningJourney)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the LearningJourney."
        });
      });

    // Create associations with roles and skills (foreach id)

    const assignment = {
        skills : skills,
        courses: courses
      };
    
    LearningJourney.findOne({
    where: { skill_id: assignment.skillSkillId }
    }).then(skill => {
        skill.setCourses([assignment.courseCourseId])
        res.sendStatus(200);
    }).catch(e => console.log(e));
  

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
      where: { id: id }
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
          message: "Error updating LearningJourney with id=" + id
        });
      });
  };

// Delete a LearningJourney with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    LearningJourney.destroy({
      where: { id: id }
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

// Find all published LearningJourneys
exports.findAllPublished = (req, res) => {
    LearningJourney.findAll({ where: { published: true } })
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




//Remove skill from learning Journey. 
//Get the skill id then unassign the skills id if its associated with a course, remove course also. 
exports.removeSkillLJ = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const assignment = {
    skill : skills,
    courses: courses
  };

  skill.findOne({
    where: { skill_id: assignment.skill }
    }).then(skill => {
        skill.unassignCourse([assignment.courses])
        res.sendStatus(200);
    }).catch(e => console.log(e));

};







