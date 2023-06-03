const express = require('express');
const bodyParser = require("body-parser")
const cors = require('cors')
const client = require('./elasticsearch/client');

const app = express();

app.use(bodyParser.json())

app.use(cors())

const ingestData = require('./data_management/retrieve_and_ingest_data');
const getData = require('./data_management/routeData')

app.use('/ingest_data', ingestData);
app.use('/', getData)

// app.get('/results', (req, res) => {
//     const genres = rq.body.genres;
//     const title = req.body.title;
//     const chapterNumber = req.body.chapterNumber;
//     const numberOfViews = 
// })

const port = 3001;

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));