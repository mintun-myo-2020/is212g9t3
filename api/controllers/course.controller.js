const db = require("../models");
const course = db.Course;
const Op = db.Sequelize.Op;

// Create and Save a new course
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    // Create a course
    const course = {
      course_name: req.body.course_name,
      course_desc: req.body.course_desc,
      course_status: req.body.course_status,
      course_type: req.body.course_type,
      course_category:req.body.course_category
    };

    // Save course in the database
    course.create(course)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the course."
        });
      });
  };

// Retrieve all courses from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    course.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving courses."
        });
      });
  };

// Find a single course with an course_id
exports.findOne = (req, res) => {
    const course_id = req.params.course_id;
  
    course.findByPk(course_id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find course with course_id=${course_id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving course with course_id=" + course_id
        });
      });
  };

// Update a course by the course_id in the request
exports.update = (req, res) => {
    const course_id = req.params.course_id;

    course.update(req.body, {
      where: { course_id: course_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "course was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update course with course_id=${course_id}. Maybe course was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating course with course_id=" + course_id
        });
      });
  };

// Archive a course by the course_id in the request

exports.archive = (req, res) => {
    const course_id = req.params.course_id;

    // set archived to 1 in database 
    // to archive, body : {"archived": 1}
    // to UNarchive, body : {"archived": 0}
    course.update(req.body, {
      where: { course_id: course_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "course was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update course with course_id=${course_id}. Maybe course was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating course with course_id=" + course_id
        });
      });
  };


// Delete a course with the specified course_id in the request
exports.delete = (req, res) => {
    const course_id = req.params.course_id;

    course.destroy({
      where: { course_id: course_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "course was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete course with course_id=${course_id}. Maybe course was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete course with course_id=" + course_id
        });
      });
  };


