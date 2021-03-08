const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://webapp:N4xte1IM39mOgEw1@cluster0.rilz1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';


const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
const db =  client.db(MONGODB_DB_NAME)

console.log('conneceted');
