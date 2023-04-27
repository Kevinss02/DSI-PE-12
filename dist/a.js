import { MongoClient } from 'mongodb';
const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'notes-app';
MongoClient.connect(dbURL).then((client) => {
    const db = client.db(dbName);
    return db.collection('notes').insertOne({
        title: 'Red note',
        body: 'This is a red note',
        color: 'red',
    });
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
