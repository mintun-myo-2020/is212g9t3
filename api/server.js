const express = require("express");
const cors = require("cors");

const app = express();

// var corsOptions = {
//   origin: ["http://localhost:5500", 
//     "http://127.0.0.1:5500",
//     "http://127.0.0.1:5501","http://localhost:8080"],
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// };

const db = require("./models");

db.sequelize.sync({alter: true})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });   


app.use(cors());

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
require("./routes/course.routes")(app);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});