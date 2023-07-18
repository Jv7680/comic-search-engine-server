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
    id: "commic-search-engine:YXNpYS1zb3V0aGVhc3QxLmdjcC5lbGFzdGljLWNsb3VkLmNvbTo0NDMkNGQwMmEwNjNiOTQzNDA2MmFhNzJhMGEzOTNjMTc3ZjAkYjU3NDBiN2QyMjk2NDk2MmJlYzM3NDhhMThlNGEzOTA=",
  },
  auth: {
    // username: "elastic",
    // password: "eYaL4CbMaUaUqrr3CdSdebzE"
    apiKey: "azJranFZMEJ2UnBSMWJSRFVJbVI6cDRrdVl1am1RVXFYV1d5WnNIVnFDdw=="
  },
});

client.ping()
  .then(response => console.log("You are connected to Elasticsearch!"))
  .catch(error => console.error("Elasticsearch is not connected."))

module.exports = client