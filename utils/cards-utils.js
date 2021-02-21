const cryptoRandomString = require("crypto-random-string");

class CardsUtils {

    static generateUID = async (collection) => {
        const uniqueId = cryptoRandomString({ length: 10, type: 'url-safe' });
        const cards = await collection.findOne({ uniqueId: uniqueId });
        return cards ? this.generateUID(collection) : uniqueId;
    }
}

module.exports = CardsUtils;