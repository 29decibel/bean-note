var express = require('express'),
    app = express(),
    Note = require('./models/note'),
    routes = require('./routes');

// set up the connection
require('../initializers/mongodb_connection');

// config the app
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser());
});

routes.resources(app, 'notes');

console.log("Listen port 3000");
app.listen(3000);
