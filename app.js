//setup area
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date");

const port = 3000;

const app = express();

let items = [];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//functionality area

app.get("/", function(req, res) {

  let day = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  day = day.toLocaleDateString("es-CR", options);

  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.post("/", function(req, res) {
  let item = req.body.newTask;
  if (item !== "") {
    items.push(item);
  }

  res.redirect("/");
});

app.post("/work", function(req,res) {
  let item = req.body.newTask;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function(req, res) {
  res.render("about");
})

app.listen(port, function() {
  console.log("Server running on port 3000");
});
