const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/cube-db';

exports.initilize = async () => {
    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}