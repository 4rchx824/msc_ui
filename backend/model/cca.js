const User = require("./user");
const pool = require("../model/db_config");
const CCA = {
    getLeaderboard: async () => {
        let conn;
        try {
            conn = await pool.getConnection();

            const [rows, fields] = await conn.query(
                ` 
                SELECT m.ichat, m.name, s.images, s.cards, s.words, s.numbers, s.names, 

                CAST 
                (
                    (
                        IF(s.images IS NULL, 0, s.images) + 
                        IF(s.cards IS NULL, 0, s.cards) + 
                        IF(s.words IS NULL, 0, s.words) + 
                        IF(s.numbers IS NULL, 0, s.numbers) + 
                        IF(s.names IS NULL, 0, s.names)
                    ) / 5 
                    AS DECIMAL(10, 2)
                )
                AS avg_score
                FROM members m, stats s
                WHERE s.ichat = m.ichat
                AND 
                (
                    s.images IS NOT NULL
                    OR s.cards IS NOT NULL
                    OR s.words IS NOT NULL
                    OR s.numbers IS NOT NULL
                    OR s.names IS NOT NULL
                )
                ORDER BY avg_score DESC LIMIT 15;
                `
            );

            let new_rows = [];
            for (const r of rows) {
                let levels = await User.findLevels(r);
                let avg =
                    (levels.images +
                        levels.cards +
                        levels.words +
                        levels.numbers +
                        levels.names) /
                    5;

                let obj = {
                    ...r,
                    avg_level: avg,
                };

                new_rows.push(obj);
            }

            new_rows.sort((a, b) => {
                if (isNaN(a.avg_level)) {
                    return 1;
                } else if (isNaN(b.avg_level)) {
                    return -1;
                }

                return b.avg_level - a.avg_level;
            });

            return new_rows;
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

    getStats: async () => {
        let conn;
        try {
            conn = await pool.getConnection();

            const [rows, fields] = await conn.query(
                ` 
                SELECT 
                    CAST(AVG(images) AS DECIMAL(10, 2)) as images, 
                    CAST(AVG(cards) AS DECIMAL(10, 2)) as cards, 
                    CAST(AVG(words) AS DECIMAL(10, 2)) as words, 
                    CAST(AVG(numbers) AS DECIMAL(10, 2)) as numbers, 
                    CAST(AVG(names) AS DECIMAL(10, 2)) as names 
                FROM stats;
                `
            );

            let levels = await User.findLevels(rows[0])

            return levels;
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
};

module.exports = CCA;
