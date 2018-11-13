const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const reg = new RegExp('\\.js$', 'i');

//path to models
const models_path = path.resolve('server/models');

//connect to DB
mongoose.connect('mongodb://localhost:27017/books_api', { useNewUrlParser:true });
mongoose.connection.on('connected', () => console.log(`MongoDB connected to Author API Database!`));

fs.readdirSync(models_path).forEach(file => {
    if (reg.test(file)) {
        require(path.join(models_path, file));
    }
});