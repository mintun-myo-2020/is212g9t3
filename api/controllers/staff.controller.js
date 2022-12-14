const { Staff } = require("../models")
const db = require("../models");
const staff = db.Staff;
const Op = db.Sequelize.Op;


// Retrieve all Staff from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    staff.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

// Find a single Staff with an staff_id
exports.findOne = (req, res) => {
    const staff_id = req.params.staff_id;
  
    staff.findByPk(staff_id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find staff with staff_id=${staff_id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving staff with staff_id=" + staff_id
        });
      });
  };
//sends array of enrolled courses of staff
exports.findEnrolledCourses = (req, res) => {
  const staff_id = req.params.staff_id;
  var enrolled_courses = [];
  staff.findOne({
    where: { staff_id: staff_id },
    include: db.Course
  })
  .then(data => {
    if (data) {
      for(var course of data.courses){
        enrolled_courses.push(course.course_id);
      }
      res.send(enrolled_courses);
    } else {
      res.status(404).send({
        message: `Cannot find staff with staff_id=${staff_id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving staff with staff_id=" + staff_id
    });
  });
  };

// Update a  by the staff_id in the request
exports.update = (req, res) => {
    const staff_id = req.params.staff_id;
  
    staff.update(req.body, {
      where: { staff_id: staff_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "staff was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update staff with staff_id=${staff_id}. Maybe staff was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating staff with staff_id=" + staff_id
        });
      });
  };

// Delete a staff with the specified staff_id in the request
exports.delete = (req, res) => {
    const staff_id = req.params.staff_id;
  
    staff.destroy({
      where: { staff_id: staff_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "staff was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete staff with staff_id=${staff_id}. Maybe staff was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete staff with staff_id=" + staff_id
        });
      });
  };















