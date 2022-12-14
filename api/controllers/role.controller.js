const { Skill, Role, roleskill } = require("../models");
const db = require("../models");
const role  = db.Role;
const skill = db.Skill;
const Op = db.Sequelize.Op;

// Create and Save a new Role
exports.create = (req, res) => {
    // Validate request
    if (!req.body.role_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a role
    const role = {
      role_name: req.body.role_name,
      archived: req.body.archived,
    };
  
    // Save role in the database
    Role.create(role)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the role."
        });
      });
  };

// Retrieve all roles from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    role.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving roles."
        });
      });
  };

// Find a single role with an role_id
exports.findOne = (req, res) => {
  const role_id = req.params.role_id;
  role.findByPk(role_id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find role with role_id=${role_id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving role with role_id=" + role_id
      });
    });
};

// Find all skills associated with a Role
exports.findAssociatedSkills = (req, res) => {
  const skill_name = req.params.skill_name;

  role.findAll({
    include: Skill,
    where: {'$skills.skill_name$': skill_name}
  }).then(data =>{
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving skill."
    });
  })
}

// Update a role by the role_id in the request
exports.update = (req, res) => {
    const role_id = req.params.role_id;
  
    role.update(req.body, {
      where: { role_id: role_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "role was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update role with role_id=${role_id}. Maybe role was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating role with role_id=" + role_id
        });
      });
  };

// Unassign skill from role
exports.unassign = (req, res) => {

  const role_id = req.body.role_id;
  const skill_id = req.params.skill_id;

  role.findOne({
    where: {role_id: role_id}
  }).then(data => {
    if (data) {
      data.removeSkill([parseInt(skill_id)]);
      res.send({
        message: `${role_id} unassigned from ${skill_id}`
      })
    } else {
      res.status(404).send({
        message: `Cannot find role with role_id=${role_id} OR skill_id=${skill_id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving role with role_id=" + role_id
    });
  });


}

// Archive a skill by the skill_id in the request

exports.archive = (req, res) => {
    const role_id = req.params.role_id;
  
    // set archived to 1 in database 
    // to archive, body : {"archived": 1}
    // to UNarchive, body : {"archived": 0}
    role.update(req.body, {
      where: { role_id: role_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Role was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update role with role_id=${role_id}. Maybe role was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating skill with role_id=" + role_id
        });
      });
  };


// Delete a role with the specified role_id in the request
exports.delete = (req, res) => {
    const role_id = req.params.role_id;
  
    role.destroy({
      where: { role_id: role_id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "role was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete role with role_id=${role_id}. Maybe role was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete role with role_id=" + role_id
        });
      });
  };

// Delete all roles from the database.
exports.deleteAll = (req, res) => {
    role.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} roles were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all roles."
        });
      });
  };

//Assign skill to role
exports.assignSkill = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const assignment = {
    skillSkillId: req.body.skillSkillId,
    roleRoleId: req.body.roleRoleId
  };


  role.findByPk(assignment.roleRoleId).then({
    where: { role_id: assignment.roleRoleId }
    }).then(role => {
        role.addSkills([assignment.skillSkillId])
        res.sendStatus(200);
    }).catch(e => console.log(e));

};

//Unassign skill from role
exports.unassignSkill = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const assignment = {
    skillSkillId: req.body.skillSkillId,
    roleRoleId: req.body.roleRoleId,
  };

  role.findByPk(assignment.roleRoleId).then( rolez => {
    rolez.removeSkills(rolez, {through: roleskill}).then(
      res.sendStatus(200)
    )
  }).catch(e => console.log(e));
    


};
