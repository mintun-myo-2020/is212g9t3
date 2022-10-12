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

//one to many association between Staff and LJ
db.Staff.hasMany(db.LearningJourney)

// one to many association between Role and LJ 
db.Role.hasMany(db.LearningJourney)

// many to many association between Course and LJ
db.LearningJourney.belongsToMany(db.Course, {through: 'ljcourse'})
db.Course.belongsToMany(db.LearningJourney, {through: 'ljcourse'})


// many to many association between Skill and Course
db.Skill.belongsToMany(db.Course, {through: 'skillcourse'})
db.Course.belongsToMany(db.Skill, {through: 'skillcourse'})

// many to many association between Skill and Role
db.Skill.belongsToMany(db.Role, {through: 'roleskill'})
db.Role.belongsToMany(db.Skill, {through: 'roleskill'})

module.exports = db;