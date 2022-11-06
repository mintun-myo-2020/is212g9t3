const dbConfig = require("../config/db.config.js");
const env = process.env.NODE_ENV;
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(dbConfig[env].DB, dbConfig[env].USER, dbConfig[env].PASSWORD, {
  host: dbConfig[env].HOST,
  dialect: dbConfig[env].dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig[env].pool.max,
    min: dbConfig[env].pool.min,
    acquire: dbConfig[env].pool.acquire,
    idle: dbConfig[env].pool.idle
  }
});

const db = {};
var DataTypes = require('sequelize/lib/data-types');

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

// many to many association between Skill and LJ
const LJSkill = sequelize.define('ljskill', {},
{tableName: 'ljskill', timestamps: false});
db.LearningJourney.belongsToMany(db.Skill, {through: LJSkill})
db.Skill.belongsToMany(db.LearningJourney, {through: LJSkill})

// many to many association between Course and LJ
const LJCourse = sequelize.define('ljcourse', {},
{tableName: 'ljcourse', timestamps: false});
db.LearningJourney.belongsToMany(db.Course, {through: LJCourse})
db.Course.belongsToMany(db.LearningJourney, {through: LJCourse})


// many to many association between Skill and Course
const SkillCourse = sequelize.define('skillcourse', {},
{tableName:'skillcourse',timestamps:false}
);
db.Skill.belongsToMany(db.Course, {through: SkillCourse})
db.Course.belongsToMany(db.Skill, {through: SkillCourse})


// many to many association between Skill and Role

var roleskill = sequelize.define('roleskill',
{},
{tableName: 'roleskill', timestamps: false}
);
db.Skill.belongsToMany(db.Role, {through: roleskill});
db.Role.belongsToMany(db.Skill, {through: roleskill});

// many to many association between LearningJourney and Role
const LJRole = sequelize.define('ljrole', {},
{tableName: 'ljrole', timestamps: false}
);
db.LearningJourney.belongsToMany(db.Role, {through: LJRole});
db.Role.belongsToMany(db.LearningJourney, {through: LJRole});

//staff course
var staffcourse = sequelize.define('staffcourse',
{
  reg_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
},
{tableName: 'staffcourse', timestamps: false}
);
db.Course.belongsToMany(db.Staff, {through: staffcourse});
db.Staff.belongsToMany(db.Course, {through: staffcourse});



module.exports = db;