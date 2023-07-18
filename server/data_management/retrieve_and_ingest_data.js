const express = require("express");
const router = express.Router();
const axios = require("axios");

const fs = require("fs");

const client = require("../elasticsearch/client");
require("log-timestamp");

const URL = `http://localhost:3001/get-data`;

router.get("/search", async function (req, res) {
  console.log("Loading Application...");

  indexData = async () => {
    try {
      console.log("Retrieving data from the USGS API");

      const EARTHQUAKES = await axios.get(`${URL}`, {
        headers: {
          "Content-Type": ["application/json", "charset=utf-8"],
        },
      });

      console.log("Data retrieved!");

      // results = EARTHQUAKES.data;

      const results = JSON.parse(fs.readFileSync("comics_data.json", "utf8"));

      console.log("Indexing data...", results.length);

      results.map(
        async (results) => (
          (comicObject = {
            avatar: results.avatar,
            title: results.title,
            chapterNumber: results.chapterNumber,
            genres: results.genres,
            languages: results.languages,
            status: results.status,
            numberOfViews: results.numberOfViews,
            numberOfReviews: results.numberOfReviews,
            rating: results.rating,
          }),
          await client.index({
            index: "comics",
            body: comicObject,
            // pipeline: "comic_data_pipeline",
            pipeline: "comics_data",
          })
        )
      );
      res.json("okela");
    } catch (err) {
      console.log(err);
    }

    console.log("Preparing for the next round of indexing...");
  };

  indexData();
});

module.exports = router;
