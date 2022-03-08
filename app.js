const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
  var today = new Date();
  var currentDay = today.getDate();
  var day = "";

  switch (currentDay) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Thuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      console.log("An error ocurred. Invalid day");
      break;
  }

  res.render("list",{
    kindOfDay: day
  });
})

app.listen(port, function () {
  console.log("Server running on port 3000");
})
