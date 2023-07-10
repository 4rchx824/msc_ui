var express = require("express");
const app = express();
var bodyParser = require("body-parser");
const User = require("../model/user");
require("dotenv").config();
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    res.status(200).send("success");
});

app.get("/member/:ichat/stats", async (req, res) => {
    try {
        let user = await User.findOne(req.params.ichat);
        if (req.query.levels == "true") user = await User.findLevels(user)

        res.status(200).send(user);
    } catch (e) {
        console.error(e)
        res.status(500).send({ err: e.message });
    }
});

module.exports = app;
