const db = require("../models");
const skill = db.skill;
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

// Find a single skill with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    skill.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find skill with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving skill with id=" + id
        });
      });
  };

// Update a skill by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    skill.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "skill was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update skill with id=${id}. Maybe skill was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating skill with id=" + id
        });
      });
  };

// Delete a skill with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    skill.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "skill was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete skill with id=${id}. Maybe skill was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete skill with id=" + id
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














