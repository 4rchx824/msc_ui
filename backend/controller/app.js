var express = require("express");
const app = express();
var bodyParser = require("body-parser");
const User = require("../model/user");
const CCA = require("../model/cca");
const allowedOrigins = require("../config/allowedOrigins");
require("dotenv").config();
var cors = require("cors");

app.use(bodyParser.json());
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Content-Type", "application/json;charset=UTF-8");
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use("/cca", require("../routes/cca"))

app.get("/", async (req, res) => {
    res.status(200).send("success");
});

app.post("/search", async (req, res) => {
    try {
        const { searchType, searchString, page } = req.body;
        let results = await User.searchMembers(searchType, searchString, page);

        res.status(200).send({ results });
    } catch (e) {
        console.error(e);
        res.status(500).send({ err: e.message });
    }
});

app.post("/search/count", async (req, res) => {
    try {
        const { searchType, searchString, page } = req.body;

        let results = await User.searchQueryCount(
            searchType,
            searchString,
            page
        );

        res.status(200).send({ results: results });
    } catch (e) {
        console.error(e);
        res.status(500).send({ err: e.message });
    }
});

app.get("/:ichat/stats", async (req, res) => {
    try {
        let user = await User.findOne(req.params.ichat);
        
        if (!user) return res.status(404).send({err: "INVALID_USER"})
        if (req.query.levels == "true") user = await User.findLevels(user);

        res.status(200).send(user);
    } catch (e) {
        console.error(e);
        res.status(500).send({ err: e.message });
    }
});

app.get("/:ichat/mastered", async (req, res) => {
    try {
        let user = await User.findOne(req.params.ichat);
        let { ichat, name, images, cards, words, numbers, names } =
            await User.findLevels(user);

        let mastered = {
            ichat: ichat,
            name: name,
            images: images === 5 ? true : false,
            cards: cards === 5 ? true : false,
            words: words === 5 ? true : false,
            numbers: numbers === 5 ? true : false,
            names: names === 5 ? true : false,
        };

        res.status(200).send(mastered);
    } catch (e) {
        console.error(e);
        res.status(500).send({ err: e.message });
    }
});

app.get("/:ichat/ranking", async (req, res) => {
    try {
        let leaderboard = await CCA.getLeaderboard();
        let user;

        let ichat = !req.params.ichat.includes("@ichat.sp.edu.sg") ? req.params.ichat + "@ichat.sp.edu.sg" : req.params.ichat

        for (const l of leaderboard) {
            if (l.ichat == ichat) {
                user = l;
                break;
            }
        }

        let ranking = "Unranked"
        if (user != undefined) ranking = leaderboard.indexOf(user) + 1

        res.status(200).send({
            member_name: user?.name,
            ranking: ranking
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({ err: e.message });
    }
});

app.get("/:ichat/additional_information", async (req, res) => {
    try {
        let additional = await User.getAdditionalInfo(req.params.ichat);

        res.status(200).send(additional);
    } catch (e) {
        console.error(e);
        res.status(500).send({ err: e.message });
    }
});


module.exports = app;
