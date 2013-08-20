var configs = require('../config/application'),
    mongoose = require('mongoose');

// connect the mongodb
mongoose.connect(configs["development"]["mongodb-connection"]);
