const express = require("express");
const router = express.Router();
const CCA = require("../model/cca");

router.get("/leaderboard", async (req, res) => {
    try {
        let leaderboard = await CCA.getLeaderboard();
        let counter = 1;
        for (const l of leaderboard) {
            l.standing = counter;
            counter++;
        }
        res.status(200).send(leaderboard);
    } catch (e) {
        console.error(e);
        res.status(500).send({ err: e.message });
    }
});

router.get("/stats", async (req, res) => {
    try {
        let stats = await CCA.getStats();

        res.status(200).send(stats);
    } catch (e) {
        console.error(e);
        res.status(500).send({ err: e.message });
    }
});

module.exports = router;
