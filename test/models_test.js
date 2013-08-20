var chai = require('chai'),
    assert = chai.assert,
    Note = require('../server/models/note');

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
});
