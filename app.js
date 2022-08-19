//setup area
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date");
const path = require("path");
const mongoose = require("mongoose");

const port = 3000;

const app = express();

mongoose.connect("mongodb://localhost:27017/todolistDB");

const taskSchema = {
  name: String,
};

const Task = mongoose.model("Task", taskSchema);

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

/*****************functionality area********************/

app.get("/", (req, res) => {
  let day = new Date();
  const workItems = [];

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  day = day.toLocaleDateString("es-CR", options);

  Task.find({}, (err, foundTasks) => {
    if (err) {
      console.log(err);
    } else {
      res.render("list", {
        listTitle: day,
        newListItems: foundTasks,
      });
    }
  });
});

app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    //newListItems: workItems,
  });
});

app.post("/", (req, res) => {
  const item = new Task({ name: req.body.newTask });
  if (item !== "") {
    item.save();
  }

  res.redirect("/");
});

app.post("/work", (req, res) => {
  const item = req.body.newTask;
  //workItems.push(item);
  res.redirect("/work");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(process.env.PORT || port, () => {
  console.log("The server is running");
});
