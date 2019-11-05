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
        res.send(response.json.results);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  app.get("/api/places", function (req, res) {

    // Geocode an address.
    googleMapsClient.placesNearby({
        language: 'en',
        location: [32.841175, -96.785806],
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
  });


  // Geocode an address.
  // googleMapsClient.places({
  //     // 'south,west|north,east'
  //     locationbias: "rectangular",
  //     rectanglee: '32.841175, -96.785806|32.851711, -96.794661'
  // }, function (err, response) {
  //     if (!err) {
  //         res.send(response.json.results);
  //     }
  // });

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