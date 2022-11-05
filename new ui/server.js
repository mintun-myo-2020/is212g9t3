const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:5500", 
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5501"]
};
const db = require("../new ui/api/models");

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
require("../new ui/api/routes/staff.routes")(app);
require("../new ui/api/routes/skill.routes")(app);
require("../new ui/api/routes/role.routes")(app);
require("../new ui/api/routes/course.routes")(app);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});