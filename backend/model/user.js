const pool = require("../model/db_config");

const User = {
    findOne: async (ichat) => {
        try {
            let conn = await pool.getConnection();
            if (!ichat.includes("@ichat.sp.edu.sg"))
                ichat += "@ichat.sp.edu.sg";
            const [rows, fields] = await conn.query(
                "SELECT m.name, s.images, s.cards, s.words, s.numbers, s.names, s.LAST_UPDATED FROM members m, stats s WHERE s.ichat = m.ichat AND m.ichat = ?",
                [ichat]
            );

            if (!rows?.length === 0) {
                throw new Error(`MEMBER '${ichat}' DOES NOT EXIST`);
            }

            return rows[0];
        } catch (e) {
            throw e;
        }
    },

    findLevels: async (user) => {
        let beginner = {
            images: {
                Level_1: 20,
                Level_2: 35,
                Level_3: 50,
                Level_4: 75,
                Level_5: 100,
            },
            cards: {
                Level_1: 12,
                Level_2: 24,
                Level_3: 36,
                Level_4: 46,
                Level_5: 52,
            },
            names: {
                Level_1: 6,
                Level_2: 9,
                Level_3: 12,
                Level_4: 15,
                Level_5: 18,
            },
            numbers: {
                Level_1: 16,
                Level_2: 32,
                Level_3: 48,
                Level_4: 64,
                Level_5: 80,
            },
            words: {
                Level_1: 10,
                Level_2: 15,
                Level_3: 20,
                Level_4: 25,
                Level_5: 30,
            },
        };

        let user_images = user.images == null ? "UNATTEMPTED" : user.images;
        let user_cards = user.cards == null ? "UNATTEMPTED" : user.cards;
        let user_words = user.words == null ? "UNATTEMPTED" : user.words;
        let user_numbers = user.numbers == null ? "UNATTEMPTED" : user.numbers;
        let user_names = user.names == null ? "UNATTEMPTED" : user.names;

        let vars = [
            { v: user_images, cat: "images" },
            { v: user_cards, cat: "cards" },
            { v: user_words, cat: "words" },
            { v: user_numbers, cat: "numbers" },
            { v: user_names, cat: "names" },
        ];

        for (const v of vars) {
            if (v.v !== "UNATTEMPTED") v.v = v.v >= beginner[v.cat].Level_5
            ? 5
            : v.v >= beginner[v.cat].Level_4
            ? 4
            : v.v >= beginner[v.cat].Level_3
            ? 3
            : v.v >= beginner[v.cat].Level_2
            ? 2
            : v.v >= beginner[v.cat].Level_1
            ? 1
            : 0;
        }

        let user_levels = {
            name: user.name,
            images: user_images,
            cards: user_cards,
            words: user_words,
            numbers: user_numbers,
            names: user_names,
        };

        return user_levels;
    },
};

module.exports = User;
