

module.exports = (sequelize, Sequelize) => {
    const SkillCourse = sequelize.define("skillcourse", {
      skillSkillId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      courseCourseId: {
        type: Sequelize.INTEGER
      }
    },
    {timestamps: false});
  
    return SkillCourse;
  };