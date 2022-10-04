const dbConfig = require("../config/db.config.js");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Staff = require("./staff.model")(sequelize, Sequelize);
db.LearningJourney = require("./learning_journey.model")(sequelize, Sequelize);
db.Course = require("./course.model")(sequelize, Sequelize);
db.Skill = require("./skill.model")(sequelize, Sequelize);
db.Role = require("./role.model")(sequelize, Sequelize);

module.exports = db;