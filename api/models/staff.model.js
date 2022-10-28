

module.exports = (sequelize, Sequelize) => {
    const Staff = sequelize.define("staff", {
      staff_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      staff_fname: {
        type: Sequelize.STRING
      },
      staff_lname: {
        type: Sequelize.STRING
      },
      dept: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.INTEGER
      }
    },
    {timestamps: false});
  
    return Staff;
  };