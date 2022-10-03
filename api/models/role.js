

module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
      role_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      role_name: {
        type: Sequelize.STRING
      }
    },
    {timestamps: false});
  
    return Role;
  };