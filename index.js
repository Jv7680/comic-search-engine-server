const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(cors());

const client = require('./server/elasticsearch/client');

app.get("/", (req, res) => {
    res.json({ message: "API Comic Searching" });
});

const ingestData = require('./server/data_management/retrieve_and_ingest_data');
const getData = require('./server/data_management/routeData');

app.use('/ingest-data', ingestData);

app.use('/', getData)

app.post('/search', (req, res) => {
    const genres = req.body.genres;
    const minRate = req.body.minRate;
    const maxRate = req.body.maxRate;
    const minChapterNumber = req.body.minChapterNumber;
    const page = req.body.page;

    //const status = req.body.status;

    //sort type
    var sortType = []
    if (req.body.sortType === 1) {
        sortType = {
            chapterNumber: {
                order: "desc",
            },
        }
    }
    else if (req.body.sortType === 2) {
        sortType = {
            chapterNumber: {
                order: "asc",
            },
        }
    }
    else if (req.body.sortType === 3) {
        sortType = {
            numberOfViews: {
                order: "desc",
            },
        }
    }
    else if (req.body.sortType === 4) {
        sortType = {
            numberOfViews: {
                order: "asc",
            },
        }
    }
    else if (req.body.sortType === 5) {
        sortType = {
            numberOfReviews: {
                order: "desc",
            },
        }
    }
    else if (req.body.sortType === 6) {
        sortType = {
            numberOfReviews: {
                order: "asc",
            },
        }
    }
    else if (req.body.sortType === 7) {
        sortType = {
            rating: {
                order: "desc",
            },
        }
    }


    // title
    var searchTitle = []

    if (req.body.title) {
        searchTitle = {
            match_phrase: {
                title: req.body.title,
            }
        }
    }
    else {
        searchTitle = {
            match_all: {},
        }
    }

    const objectSearch = {
        index: 'comics',
        body: {
            query: {
                bool: {
                    must: [
                        searchTitle
                    ],
                    filter: [
                        {
                            range: {
                                rating: {
                                    gt: minRate,
                                    lte: maxRate
                                }
                            }
                        },
                        {
                            range: {
                                chapterNumber: {
                                    gt: minChapterNumber
                                }
                            }
                        }
                    ]
                }
            },
            sort: [
                sortType,
            ],

            from: (page - 1) * 12,
            size: 12,
        },
    }

    genres.forEach(element => {
        objectSearch.body.query.bool.must.push({
            match: {
                genres: element,
            }
        })
    });

    async function sendESRequest() {
        try {
            const body = await client.search(objectSearch);
            res.json({
                total: body.hits.total.value,
                data: body.hits.hits
            });
        }
        catch (e) {
            console.log(e)
        }

    }

    sendESRequest();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

