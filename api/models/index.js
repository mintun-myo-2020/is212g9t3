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
const LJCourse = sequelize.define('ljcourse', {},
{tableName: 'ljcourse', timestamps: false});
db.LearningJourney.belongsToMany(db.Course, {through: LJCourse})
db.Course.belongsToMany(db.LearningJourney, {through: LJCourse})


// many to many association between Skill and Course
db.Skill.belongsToMany(db.Course, {through: 'skillcourse'})
db.Course.belongsToMany(db.Skill, {through: 'skillcourse'})


// many to many association between Skill and Role
const Roleskill = sequelize.define('roleskill', {},
{tableName: 'roleskill', timestamps: false}
);
db.Skill.belongsToMany(db.Role, {through: Roleskill});
db.Role.belongsToMany(db.Skill, {through: Roleskill});

// many to many association between LearningJourney and Role
const LJRole = sequelize.define('ljrole', {},
{tableName: 'ljrole', timestamps: false}
);
db.LearningJourney.belongsToMany(db.Role, {through: LJRole});
db.Role.belongsToMany(db.LearningJourney, {through: LJRole});




module.exports = db;