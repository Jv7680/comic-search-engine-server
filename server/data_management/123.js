const express = require('express');
const router = express.Router();
const axios = require('axios');

const fs = require("fs")

const client = require('../elasticsearch/client');
require('log-timestamp');

const URL = `http://locahost:3001/get-data`;

router.get('/earthquakes', async function (req, res) {
  console.log('Loading Application...');
  res.json('Running Application...');

  indexData = async () => {
    try {
      console.log('Retrieving data from the USGS API');

      const EARTHQUAKES = await axios.get(`${URL}`, {
        headers: {
          'Content-Type': ['application/json', 'charset=utf-8'],
        },
      });

      console.log('Data retrieved!');

    //   results = EARTHQUAKES.data.features;

    const results = JSON.parse(fs.readFileSync('comics_data.json', 'utf8'));

      console.log('Indexing data...', results.length);

      results.map(
        async (results) => (
          (comicObject = {
            avatar:results.avatar,
            title:results.title,
            chapterNumber:results.chapterNumber,
            genres:results.genres,
            languages:results.languages,
            status:results.status,
            numberOfViews:results.numberOfViews,
            numberOfReviews:results.numberOfReviews,
            rating:results.rating
          }),
          await client.index({
            index: 'comics',
            body: comicObject,
            // pipeline: 'comic_data_pipeline',
          })
        )
      );

    //   if (EARTHQUAKES.data.length) {
    //     indexData();
    //   } else {
    //     console.log('Data has been indexed successfully!');
    //   }
    } catch (err) {
      console.log(err);
    }

    console.log('Preparing for the next round of indexing...');
  };
  indexData();
});

module.exports = router;