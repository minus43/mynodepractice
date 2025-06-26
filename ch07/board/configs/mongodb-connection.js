const { MongoClient } = require('mongodb');

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const cluster = process.env.MONGODB_CLUSTER;

const uri = `mongodb+srv://${username}:${password}@${cluster}/board`;

module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
};
