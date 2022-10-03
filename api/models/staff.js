

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
      staff_type: {
        type: Sequelize.STRING
      },
      dept: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      designation_id: {
        type: Sequelize.INTEGER
      }
    });
  
    return Staff;
  };