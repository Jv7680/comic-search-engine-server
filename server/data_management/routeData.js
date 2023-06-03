const express = require('express');
const router = express.Router();
const fs = require("fs")

router.get('/get-data', async function (req, res) {
    const results = JSON.parse(fs.readFileSync('comics_data.json', 'utf8'));
    res.json(results)
});

module.exports = router;
