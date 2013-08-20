var chai = require('chai'),
    assert = chai.assert,
    Note = require('../server/models/note');

// setup connection
require('../initializers/mongodb_connection');

describe('Note', function() {
  it('should have a content property', function() {
    var note = new Note(),
        content = "this is the content";

    note.set('content', content);
    assert.equal(note.get('content'), content);

  });

  it('should not be encryped by default', function() {
    var note = new Note();

    assert.equal(note.encryped, false);

  });

  it('can save and retrieve later (CRUD)', function(done) {
    var note = new Note(),
        content = "mike",
        note2;

    note.set('content', content);
    note.save( function (err) {
      // retrive it back to see
      note2 = Note.findOne({}, function (err, note) {
        assert.equal(note.content, content);
        done();
      });
    });

  });
});
