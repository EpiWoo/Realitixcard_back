const COLLECTION = 'cards';

//const exec = require('child_process').exec;
const router = require('express').Router();
const { param } = require('express-validator');
const { ObjectId } = require('mongodb');

const AuthUtils = require('../utils/auth-utils');
const CardsUtils = require('../utils/cards-utils');
const MongoDBUtils = require('../utils/mongodb-utils');
const ValidatorUtils = require('../utils/validator-utils');

// [GET]: get id (Not functional)
router.get('/fetch-by-id-:id',
    param('id').customSanitizer(id => ObjectId(id)),
    AuthUtils.parseAndValidateToken,
    async (request, response) => {

        const id = request.params.id;

        try {

            const result = await MongoDBUtils.fetchOne(COLLECTION, { _id: id });

            if (result === null)
                return response.status(404).json(result);

            return response.json(result);

        } catch (e) {

            return response.status(500).json(e.stack);
        }
    });

// [GET] get all cards by user id (cards send)
router.get('/fetch-all-cards-by-user-id',
    AuthUtils.parseAndValidateToken,
    async (request, response) => {

        try {
            const data = request.body;

            const result = await MongoDBUtils.fetchList(COLLECTION, { user_id: ObjectId(data.user_id) });

            return response.json(result);

        } catch (e) {
            
            return response.status(500).json(e.stack);
        }
    });

// [GET] get all cards by to user id (cards receive)

router.get('/fetch-all-cards-by-to-user-id',
    AuthUtils.parseAndValidateToken,
    async (request, response) => {

        try {
            const data = request.body;

            const result = await MongoDBUtils.fetchList(COLLECTION, { to_user_id: ObjectId(data.to_user_id) });

            return response.json(result);

        } catch (e) {
            
            return response.status(500).json(e.stack);
        }
    });

// [GET] : get all collection
router.get('/fetch-list',
    AuthUtils.parseAndValidateToken,
    async (request, response) => {

        try {

            const listOfCards = await MongoDBUtils.fetchList(COLLECTION);

            return response.json(listOfCards);

        } catch (e) {

            return response.status(500).json(e.stack);
        }
    });


// [POST] store a new card
router.post('/store',
    AuthUtils.parseAndValidateToken,
    ValidatorUtils.schema.cards(),
    async (request, response) => {

        const errors = ValidatorUtils.validate(request);

        if (!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });

        try {

            const data = request.body;

            const result = await MongoDBUtils.insertOne(COLLECTION, {
                title: data.title,
                description: data.description,
                user_id: ObjectId(data.user_id),
                to_user_id: ObjectId(data.to_user_id)
            });

            return response.json(result);

        } catch (e) {

            return response.status(500).json(e.stack);
        }
    });

// [PATCH] update card by id
router.patch('/update-by-id-:id',
    param('id').customSanitizer(id => ObjectId(id)),
    AuthUtils.parseAndValidateToken,
    ValidatorUtils.schema.cards(),
    async (request, response) => {

        const id = request.params.id;

        const errors = ValidatorUtils.validate(request);

        if (!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });

        try {

            const data = request.body;

            const result = await MongoDBUtils.updateOne(COLLECTION, { _id: id },{
                title: data.title,
                description: data.description,
                user_id: data.user_id,
                to_user_id: data.to_user_id
            });

            return response.json(result);

        } catch (e) {

            return response.status(500).json(e.stack);
        }
    });

// [DELETE] delete by id
router.delete('/delete-by-id-:id',
    param('id').customSanitizer(id => ObjectId(id)),
    AuthUtils.parseAndValidateToken,
    async (request, response) => {

        const id = request.params.id;

        try {

            const result = MongoDBUtils.deleteOne(COLLECTION, { _id: id });

            return response.json(result);

        } catch (e) {

            return response.status(500).json(e.stack);
        }
    });

module.exports = router;
