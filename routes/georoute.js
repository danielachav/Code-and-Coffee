var db = require("../models");
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.NODE_APP_API_KEY,
    Promise: Promise
});

module.exports = function (app) {
    // Get all examples
    app.get("/api/locate", function (req, res) {
        console.log(process.env.NODE_APP_API_KEY)
        googleMapsClient.geocode({
                address: '1600 Amphitheatre Parkway, Mountain View, CA'
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
        googleMapsClient.places({
            // 'south,west|north,east'
            rectangle: '32.841175, -96.785806|32.851711, -96.794661'
        }, function (err, response) {
            if (!err) {
                res.send(response.json.results);
            }
        });
    });

};