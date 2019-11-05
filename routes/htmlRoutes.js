var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });


  app.get("/membership", function(req, res) {
    res.render("membership");
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
  app.get("*", function(req, res) {
    res.render("404");
  });
};

