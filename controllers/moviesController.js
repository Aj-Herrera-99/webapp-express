const connection = require("../data/db");

const index = (req, res) => {
    // prepariamo la query
    const sql = "SELECT * FROM movies";
    // eseguiamo la query
    connection.query(sql, (err, results) => {
        if (err)
            return res.status(500).json({ error: "Database query failed" });
        res.json(results);
    });
};

const show = (req, res) => {
    // recuperiamo l'id dall' URL
    const id = req.params.id;
    // prepariamo la query per il movie
    const moviesSql = ` 
        SELECT movies.* FROM movies 
        WHERE id = ? 
    `;
    // prepariamo la query per le recensioni del movie
    const reviewsSql = `
        SELECT reviews.* FROM reviews 
        WHERE movie_id = ?
    `;
    // eseguiamo la prima query per il movie
    connection.query(moviesSql
, [id], (err, movieResults) => {
        if (err)
            return res.status(500).json({ error: "Database query failed" });
        if (movieResults.length === 0)
            return res.status(404).json({ error: "movie not found" });

        // recuperiamo il movie
        const movie = movieResults[0];

        // se è andata bene, eseguaimo la seconda query per le recensioni
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err)
                return res.status(500).json({ error: "Database query failed" });
            // aggiungiamo le recensioni del movie
            movie.reviews = reviewsResults;
            res.json(movie);
        });
    });
};

const destroy = (req, res) => {
    // recuperiamo l'id dall' URL
    const id = req.params.id;
    // prepariamo la query
    const sql = "DELETE FROM movies WHERE id = ?";
    // eseguiamo la query
    connection.query(sql, [id], (err, results) => {
        if (err)
            return res.status(500).json({ error: "Database query failed" });
        res.json({ success: true });
    });
};

module.exports = { index, destroy, show };
