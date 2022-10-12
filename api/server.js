const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:5500", 
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5501"]
};
const db = require("./models");

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



db.sequelize.sync({alter: true})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });   


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
require("./routes/staff.routes")(app);
require("./routes/skill.routes")(app);
require("./routes/role.routes")(app);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});