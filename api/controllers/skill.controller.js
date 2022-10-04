const db = require("../models");
const skill = db.Skill;
const Op = db.Sequelize.Op;

// Create and Save a new skill
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a skill
    const skill = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
  
    // Save skill in the database
    skill.create(skill)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the skill."
        });
      });
  };

// Retrieve all skills from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    skill.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving skills."
        });
      });
  };

// Find a single skill with an skill_id
exports.findOne = (req, res) => {
    const skill_id = req.params.skill_id;
  
    skill.findByPk(skill_id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find skill with skill_id=${skill_id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving skill with skill_id=" + skill_id
        });
      });
  };

// Update a skill by the skill_id in the request
exports.update = (req, res) => {
    const skill_id = req.params.skill_id;
  
    skill.update(req.body, {
      where: { skill_id: skill_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "skill was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update skill with skill_id=${skill_id}. Maybe skill was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating skill with skill_id=" + skill_id
        });
      });
  };

// Archive a skill by the skill_id in the request

exports.archive = (req, res) => {
    const skill_id = req.params.skill_id;
  
    // set archived to 1 in database 
    // to archive, body : {"archived": 1}
    // to UNarchive, body : {"archived": 0}
    skill.update(req.body, {
      where: { skill_id: skill_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "skill was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update skill with skill_id=${skill_id}. Maybe skill was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating skill with skill_id=" + skill_id
        });
      });
  };


// Delete a skill with the specified skill_id in the request
exports.delete = (req, res) => {
    const skill_id = req.params.skill_id;
  
    skill.destroy({
      where: { skill_id: skill_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "skill was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete skill with skill_id=${skill_id}. Maybe skill was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete skill with skill_id=" + skill_id
        });
      });
  };


// // Find all published skills
// exports.findAllPublished = (req, res) => {
//     skill.findAll({ where: { published: true } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving skills."
//         });
//       });
//   };














