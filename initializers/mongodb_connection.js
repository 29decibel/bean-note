var configs = require('../config/application'),
    mongoose = require('mongoose'),
    env = process.env['ENV'] || "development";

// connect the mongodb
mongoose.connect(configs[env]["mongodb-connection"]);
