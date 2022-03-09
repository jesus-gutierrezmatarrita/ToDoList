//setup area
const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();

var items = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//functionality area

app.get("/", function (req, res) {
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("es-CR", options);

  res.render("list",{kindOfDay: day, newListItems: items});
  })

app.post("/", function (req, res) {
  var item = req.body.newTask;
  if(item !== "") {
    items.push(item);
  }


  res.redirect("/");
})

app.listen(port, function () {
  console.log("Server running on port 3000");
})
