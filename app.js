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

app.get("/", (req, res) => {

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

app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.post("/", (req, res) => {
  let item = req.body.newTask;
  if (item !== "") {
    items.push(item);
  }

  res.redirect("/");
});

app.post("/work", (req,res) => {
  let item = req.body.newTask;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", (req, res) => {
  res.render("about");
})

app.listen(process.env.PORT || port, () => {
  console.log("The server is running");
});
