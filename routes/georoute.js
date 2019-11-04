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