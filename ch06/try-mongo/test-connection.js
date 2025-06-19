const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config({ path: '../.env' });
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const cluster = process.env.MONGODB_CLUSTER;

const uri = `mongodb+srv://${username}:${password}@${cluster}/myFirstDatabase?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  await client.connect();
  const adminDB = client.db('test').admin();
  const listDatabases = await adminDB.listDatabases();
  console.log(listDatabases);
  return 'oK';
}
run()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
