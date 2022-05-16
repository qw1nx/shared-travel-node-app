const mongoose = require('mongoose');
// CHANGE THE DB NAME
const dbName = 'trip';

const connectionString = `mongodb://localhost:27017/${dbName}`;

module.exports = async (app) => {
    try{
        mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database Connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database err');
            console.error(err);
        });
    } catch (err) {
        console.log('Error connectiong to database');
        process.exit(1);
    }
}

