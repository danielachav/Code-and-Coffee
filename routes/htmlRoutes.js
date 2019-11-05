var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/user/:id", function (req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function (dbResponse) {
      res.render("example", {
        user: dbResponse
      });
    });
  });


  app.get("/members", function (req, res) {
    db.User.findAll({}).then(function (dbResponse) {
      res.render("members", {
        members: dbResponse
      });
    });
  });
  app.get("/community", function(req, res) {
    res.render("community");
  });
  app.get("/members", function(req, res) {
    db.User.findAll({}).then(function(data){
      res.render("members", {users: data});
    })
  });
  app.get("/messages", function(req, res) {
    res.render("messages");
  });
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

