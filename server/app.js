var express = require('express'),
    env = process.env['ENV'] || 'development',
    configs = require('../config/application')[env],
    app = express(),
    Note = require('./models/note'),
    EncryptText = require('./models/encrypt_text'),
    routes = require('./routes'),
    port = process.env.PORT || 3000,
    username = process.env.USERNAME || configs['username'],
    password = process.env.PASSWORD || configs['password'];

// set up the connection
require('../initializers/mongodb_connection');

// config the app
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.cookieParser());

  // basic auth
  app.use(express.basicAuth(username, password));

  // static public folder
  app.use(express.static('public'))
});

// notes search
app.get('/notes/search', function (req, res) {
  Note.search(req.query.search, function (err, notes) {
    if (err) {
      res.send(err);
    } else {
      res.send(notes);
    }
  })
});


// create encrypt text block
app.post('/encrypt_texts', function (req, res) {
  EncryptText.create(req.body.key, req.body.content, function(err, encryptText){
    res.send(encryptText);
  });
});

app.post('/encrypt_text/decrypt_content', function(req, res) {
  if (req.body.key == null ) {
    res.send({error: "please provide the key to encrypt"});
  } else {
    EncryptText.getContent(req.body.id, req.body.key, function(err, content){
      res.send(err || {content: content});
    });
  }
});

// create resourcful routes for notes
routes.resources(app, 'notes');

// the root path
app.get('/', function (req, res) {
  res.status(200).sendfile("./public/index.html");
});



app.listen(port, function() {
  console.log("Listening on " + port);
});
