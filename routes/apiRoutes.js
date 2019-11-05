var db = require("../models");
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.NODE_APP_API_KEY,
  Promise: Promise
});

module.exports = function (app) {
  app.post("/api/locate", function (req, res) {
    var queryString;
    queryString += req.body.address + ", ";
    queryString += req.body.city + ", ";
    queryString += req.body.state;

    googleMapsClient.geocode({
        address: queryString
      })
      .asPromise()
      .then((response) => {
        googleMapsClient.placesNearby({
            language: 'en',
            location: [parseFloat(response.json.results[0].geometry.location.lat), parseFloat(response.json.results[0].geometry.location.lng)],
            rankby: 'distance',
            minprice: 1,
            maxprice: 2,
            opennow: true,
            type: 'cafe'
          })
          .asPromise()
          .then(function (response) {
            res.send(response.json.results)
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  });

  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};