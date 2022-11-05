

module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("course", {
      course_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      course_name: {
        type: Sequelize.STRING
      },
      course_desc: {
        type: Sequelize.STRING
      },
      course_status: {
        type: Sequelize.STRING
      },
      course_type: {
        type: Sequelize.STRING
      },
      course_category: {
        type: Sequelize.STRING
      }
    },
    {timestamps: false});
  
    return Course;
  };