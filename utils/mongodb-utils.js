const { MONGODB_CLIENT, MONGODB_COLLECTION } = require('../config/mongodb-config');

class MongoDBUtils {

    static async fetchOne(collection_name, criteria = {}) {

        const client = await MONGODB_CLIENT();
        const collection = MONGODB_COLLECTION(client, collection_name);

        const result = await collection.findOne(criteria);
        await client.close();

        return result;
    }

    static async fetchList(collection_name, criteria = {}) {

        const client = await MONGODB_CLIENT();
        const collection = MONGODB_COLLECTION(client, collection_name);

        const result = await collection.find(criteria).toArray();
        await client.close();

        return result;
    }

    static async insertOne(collection_name, document) {

        const client = await MONGODB_CLIENT();
        const collection = MONGODB_COLLECTION(client, collection_name);

        const result = await collection.insertOne(document);
        await client.close();

        return result;
    }

    static async updateOne(collection_name, filter, document) {

        const client = await MONGODB_CLIENT();
        const collection = MONGODB_COLLECTION(client, collection_name);

        const result = await collection.updateOne(filter, document);
        await client.close();

        return result;
    }

    static async deleteOne(collection_name, filter) {

        const client = await MONGODB_CLIENT();
        const collection = MONGODB_COLLECTION(client, collection_name);

        const result = await collection.deleteOne(filter);
        await client.close();

        return result;
    }
}

module.exports = MongoDBUtils;