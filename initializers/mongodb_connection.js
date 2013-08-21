var configs = require('../config/application'),
    mongoose = require('mongoose'),
    env = process.env['ENV'] || "development",
    mongodbUrl = process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL ||
                  configs[env]["mongodb-connection"] ;


// connect the mongodb
mongoose.connect(mongodbUrl);
