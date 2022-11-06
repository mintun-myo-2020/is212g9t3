

module.exports = (sequelize, Sequelize) => {
    const LearningJourney = sequelize.define("learningjourney", {
      lj_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      lj_name: {
        type: Sequelize.STRING
      }
    },
    {timestamps: false});
  
    return LearningJourney;
  };