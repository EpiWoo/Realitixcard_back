const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DBNAME = 'api-authentication';

const MONGODB_CLIENT = async () => {
    const client = new MongoClient(MONGODB_URI, { useUnifiedTopology: true });
    await client.connect();
    return client;
};

const MONGODB_COLLECTION = (client, collection) => {
    const dbi = client.db(MONGODB_DBNAME);
    return dbi.collection(collection);
};

module.exports = { MONGODB_CLIENT, MONGODB_COLLECTION };