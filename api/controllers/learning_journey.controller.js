const db = require("../models");
const LearningJourney = db.learningJourneys;
const Op = db.Sequelize.Op;

// Create and Save a new LearningJourney
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a LearningJourney
    const learningJourney = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
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














