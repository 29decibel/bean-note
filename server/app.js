var express = require('express'),
    env = process.env['ENV'] || 'development',
    configs = require('../config/application')[env],
    app = express(),
    Note = require('./models/note'),
    routes = require('./routes');

// set up the connection
require('../initializers/mongodb_connection');

// config the app
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser());

  // basic auth for now
  app.use(express.basicAuth(configs['username'], configs['password']));

  // static public folder
  app.use(express.static('public'))
});


// create routes
routes.resources(app, 'notes');

// the root path
app.get('/', function (req, res) {
  res.status(200).sendfile("./public/index.html");
});

console.log("Listen port 3000");
app.listen(3000);