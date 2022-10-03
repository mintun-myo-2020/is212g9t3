

module.exports = (sequelize, Sequelize) => {
    const Skill = sequelize.define("skill", {
      skill_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      skill_name: {
        type: Sequelize.STRING
      },
      skill_status: {
        type: Sequelize.STRING
      },
      competency_level: {
        type: Sequelize.INTEGER
      }
    },
    {timestamps: false});
  
    return Skill;
  };