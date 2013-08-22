var chai = require('chai'),
    assert = chai.assert,
    routes = require("../server/routes"),
    express = require("express");

require('./setup');

var app = express();

describe('api routes', function() {

  it('should draw the resources routes', function() {
    routes.resources(app, 'notes');

  });

});
