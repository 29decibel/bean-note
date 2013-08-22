var express = require('express'),
    env = process.env['ENV'] || 'development',
    configs = require('../config/application')[env],
    app = express(),
    Note = require('./models/note'),
    routes = require('./routes'),
    port = process.env.PORT || 3000;

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

// notes search
app.get('/notes/search', function (req, res) {
  Note.search(req.query.search, function (notes) {
    res.send(notes);
  })
});

// create routes
routes.resources(app, 'notes');

// the root path
app.get('/', function (req, res) {
  res.status(200).sendfile("./public/index.html");
});



app.listen(port, function() {
  console.log("Listening on " + port);
});
