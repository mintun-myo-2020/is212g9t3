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
          for (let course of courses){
            lj.setCourses([course]);
          }
          for (let skill of skills) {
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

  //Find learning journey by staffid
exports.findLjbyStaffId = (req, res) => {
    const id = req.params.id;
  
    LearningJourney.findAll({
      where: { staffStaffId: id }
      }).then(data => {
          res.send(data);
      }).catch(e => console.log(e));


  };

  exports.findLjSkills = (req, res) => {
    const lj_id = req.params.id;
    var lj_skills = [];
    LearningJourney.findOne({
      where: { lj_id: lj_id },
      include: db.Skill
    })
    .then(data => {
      if (data) {
        for(var skill of data.skills){
          lj_skills.push(skill.skill_name);
        }
        res.send(lj_skills);
      } else {
        res.status(404).send({
          message: `Cannot find lj with lj_id=${lj_id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving lj with lj_id=" + lj_id
      });
    });
    };


  exports.findLjCourses = (req, res) => {
    const lj_id = req.params.id;
    var lj_courses = [];
    LearningJourney.findOne({
      where: { lj_id: lj_id },
      include: db.Course
    })
    .then(data => {
      if (data) {
        for(var course of data.courses){
          lj_courses.push(course.course_name);
        }
        res.send(lj_courses);
      } else {
        res.status(404).send({
          message: `Cannot find lj with lj_id=${lj_id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving lj with lj_id=" + lj_id
      });
    });
    };

// Update a LearningJourney by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

        
    const staff_id = req.body.staffStaffId;
    const lj_name = req.body.lj_name;
    const role_id = req.body.role_id;
    const skills = req.body.skills; // array of skill ids
    const courses = req.body.courses; // array of course ids

    const learningJourney = {
      lj_name: lj_name,
      staffStaffId: staff_id,
      roleRoleId: role_id,
    }

    LearningJourney.update(learningJourney, {
      where: { lj_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: `${num}`
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

      LearningJourney.findByPk(id)
      .then(lj => {
        for (let course of courses){
          lj.addCourses([course]);
        }
        for (let skill of skills) {
          lj.addSkills([skill]);
        };
      })

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













