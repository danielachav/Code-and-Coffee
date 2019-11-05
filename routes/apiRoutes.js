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
        app.get("/api/places", function (req, res) {

            // Geocode an address.
            describe('places client library', function () {
                var googleMaps = require('./models');

                it('gets places for a text query', function (done) {

                    googleMaps.findPlace({
                      input: 'coffee',
                      inputtype: 'textquery',
                      language: 'en',
                      location: [{
                        'geometry/viewport/northeast/lat': "-96.794661",
                        'geometry/viewport/northeast/lng': "32.851711",
                        'geometry/viewport/southwest/lat': "32.8410175",
                        'geometry/viewport/southwest/lng': "-96.785806",
                      }],
                      fields: [
                        'formatted_address', 'geometry', 'geometry/location', 'geometry/location/lat',
                        'geometry/location/lng', 'geometry/viewport', 'geometry/viewport/northeast',
                        'geometry/viewport/northeast/lat', 'geometry/viewport/northeast/lng',
                        'geometry/viewport/southwest', 'geometry/viewport/southwest/lat',
                        'geometry/viewport/southwest/lng', 'icon', 'id', 'name',
                        'permanently_closed', 'photos', 'place_id', 'types',
                        'opening_hours', 'price_level', 'rating', 'plus_code'
                      ]

                    })
                  }


                })
              .asPromise()
              .then(function (response) {
                expect(response.json.candidates.length).toBeGreaterThan(0);
              })
              .then(done, fail);
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