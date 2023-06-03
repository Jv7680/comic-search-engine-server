const { Client } = require('@elastic/elasticsearch');
// const config = require('config');

// const elasticConfig = config.get('elastic');

// const client = new Client({
//   cloud: {
//     id: elasticConfig.cloudID,
//   },
//   auth: {
//     // username: elasticConfig.username,
//     // password: elasticConfig.password
//     apiKey: elasticConfig.apiKey
//   },
// });

const client = new Client({
  cloud: {
    id: "Heaven_server:dXMtd2VzdDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ5NThhMzcwM2RkYjc0ODI5YjJhYTY0Zjc1YzNlNzg0OSRiNDEwMGNiNzU0YTc0YzA4YWY3MzJlZWY3ZmNlMmNkNw==",
  },
  auth: {
    // username: elasticConfig.username,
    // password: elasticConfig.password
    apiKey: "OTFXOGU0Z0IzRjVTaWkyV2JGbXM6WksxOFVwa2hUUGEzVzFsSE42b0RFQQ=="
  },
});

client.ping()
  .then(response => console.log("You are connected to Elasticsearch!"))
  .catch(error => console.error("Elasticsearch is not connected."))

module.exports = client