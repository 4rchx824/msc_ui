const pool = require("../model/db_config");

const User = {
    findOne: async (ichat) => {
        let conn;
        try {
            conn = await pool.getConnection();
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
        } finally {
            try {
                if (conn) conn.release();
            } catch (e) {
                console.error(e);
            }
        }
    },

    searchMembers: async (searchType, searchString, pageNumber, count) => {
        let conn;
        try {
            conn = await pool.getConnection();

            let validSearchTypes = ["iChat", "Name"];

            if (!validSearchTypes.includes(searchType))
                throw new Error("INVALID SEARCH TYPE");
            let searchBy = searchType.toLowerCase();

            if (!Number.isInteger(pageNumber))
                throw new Error("INVALID PAGE NUMBER");
            const limit = 10;
            let offset = (pageNumber - 1) * limit;
            searchString = `%${searchString}%`;

            const [rows, fields] = await conn.query(
                `
                SELECT m.member_id, m.ichat, m.name, s.images, s.cards, s.words, s.numbers, s.names
                FROM members m, stats s
                WHERE m.${searchBy} LIKE ?
                AND m.ichat = s.ichat
                ORDER BY
                CASE
                    WHEN s.images IS NOT NULL THEN 0
                    ELSE 1
                END,
                CASE
                    WHEN s.cards IS NOT NULL THEN 0
                    ELSE 1
                END,
                CASE
                    WHEN s.words IS NOT NULL THEN 0
                    ELSE 1
                END,
                CASE
                    WHEN s.numbers IS NOT NULL THEN 0
                    ELSE 1
                END,
                CASE
                    WHEN s.names IS NOT NULL THEN 0
                    ELSE 1
                END,
                m.name ASC
                LIMIT ? OFFSET ?
                `, [searchString, limit, offset]
                // `SELECT m.member_id, m.ichat, m.name, s.images, s.cards, s.words, s.numbers, s.names FROM members m, stats s WHERE m.${searchBy} LIKE ? AND m.ichat = s.ichat ORDER BY m.name ASC LIMIT ? OFFSET ?`,
                // [searchString, limit, offset]
            );

            if (count === true) return Math.ceil(rows.length / limit);

            return rows;
        } catch (e) {
            throw e;
        } finally {
            try {
                if (conn) conn.release();
            } catch (e) {
                console.error(e);
            }
        }
    },

    searchQueryCount: async (searchType, searchString, pageNumber) => {
        let conn;
        try {
            conn = await pool.getConnection();

            let validSearchTypes = ["iChat", "Name"];

            if (!validSearchTypes.includes(searchType))
                throw new Error("INVALID SEARCH TYPE");
            let searchBy = searchType.toLowerCase();

            if (!Number.isInteger(pageNumber))
                throw new Error("INVALID PAGE NUMBER");

            searchString = `%${searchString}%`;

            const [rows, fields] = await conn.query(
                `SELECT COUNT(member_id) as MEMBER_COUNT FROM members m WHERE ${searchBy} LIKE ?`,
                [searchString]
            );

            return Math.ceil(rows[0].MEMBER_COUNT / 10);
        } catch (e) {
            throw e;
        } finally {
            try {
                if (conn) conn.release();
            } catch (e) {
                console.error(e);
            }
        }
    },

    getAdditionalInfo: async (ichat) => {
        let conn;
        try {
            conn = await pool.getConnection();
            if (!ichat.includes("@ichat.sp.edu.sg"))
                ichat += "@ichat.sp.edu.sg";
            const [rows, fields] = await conn.query(
                "SELECT * FROM additional_info WHERE ichat = ?",
                [ichat]
            );

            if (!rows?.length === 0) {
                throw new Error(`MEMBER '${ichat}' DOES NOT EXIST`);
            }

            return rows[0];
        } catch (e) {
            throw e;
        } finally {
            try {
                if (conn) conn.release();
            } catch (e) {
                console.error(e);
            }
        }
    },

    findLevels: async (user) => {
        let user_levels = {
            name: user.name,
            images: User.convertLevel(user.images, "images", "beginner"),
            cards: User.convertLevel(user.cards, "cards", "beginner"),
            words: User.convertLevel(user.words, "words", "beginner"),
            numbers: User.convertLevel(user.numbers, "numbers", "beginner"),
            names: User.convertLevel(user.names, "names", "beginner"),
        };

        return user_levels;
    },

    convertLevel: function (data, category, difficulty) {
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

        data = parseFloat(data)

        let level = "";
        if (data == null) return "UNATTEMPTED";
        if (difficulty == "beginner") level = beginner;


        if (!Object.keys(beginner).includes(category)) return "UNATTEMPTED";
        let attained_level =
            data >= beginner[category].Level_5
                ? 5
                : data >= beginner[category].Level_4
                ? 4
                : data >= beginner[category].Level_3
                ? 3
                : data >= beginner[category].Level_2
                ? 2
                : data >= beginner[category].Level_1
                ? 1
                : 0;

        return attained_level;
    },
};

module.exports = User;
