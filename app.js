//setup area
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date");
const mongoose = require("mongoose");
const _ = require("lodash");

const port = 3000;

const app = express();

let day = new Date();
const workItems = [];

const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
};

day = day.toLocaleDateString("es-CR", options);

mongoose.connect("mongodb://localhost:27017/todolistDB");

const taskSchema = {
  name: String,
};

const Task = mongoose.model("Task", taskSchema);
const defaultSet = [];

const listSchema = {
  name: String,
  items: [taskSchema]
};

const List = mongoose.model("List", listSchema);

app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

/*****************functionality area********************/

app.get("/", (req, res) => {

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

app.post("/", (req, res) => {
  const item = new Task({ name: req.body.newTask });
  const listName = req.body.listTitle;
  if (item !== "") {
    item.save();
  }

  if(listName === day) {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, (err, foundList) => {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    })
  }
});

app.post("/delete", (req, res) => {
  const checkItemId = req.body.deleteTask;
  const listName = req.body.listName;

  if (listName === day) {
    Task.findByIdAndRemove(checkItemId, (err) => {
      if(!err) {
        console.log("Successfully deleted")
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      {name: listName},
      {$pull: {
        items: {_id: checkItemId}
      }}
      , (err, foundList) => {
        if(!err) {
          res.redirect("/" + listName);
        }
      });
  }
});

app.get("/:customListName", (req,res) => {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, (err, foundList) => {
    if(!err) {
      if(!foundList) {
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultSet
        });

        list.save();

        res.redirect("/" + customListName);
      } else {
        //Show an existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    }
  })

})

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(process.env.PORT || port, () => {
  console.log("The server is running");
});
