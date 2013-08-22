var chai = require('chai'),
    assert = chai.assert,
    Note = require('../server/models/note');

require('./setup');

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
      note2 = Note.findOne({_id: note._id }, function (err, note) {
        assert.equal(note.content, content);

        // test delete
        Note.remove({_id: note._id }, function (err) {
          Note.findOne({_id: note._id }, function (err, note) {
            assert.equal(note, null);
            done();
          })
        })
      });
    });

  });


  it('can do the full text search on the notes', function(done) {
    // create a couple of notes
    var contents = [
      ~~ (Math.random() * 100000000),
      ~~ (Math.random() * 100000000),
      ~~ (Math.random() * 100000000)
    ];

    var ready = 0;

    for (var i=0; i < contents.length; i++) {
      new Note({content: contents[i]}).save( function (err) {
        ready += 1;
        if (ready === 3) {
          // do the search
          Note.search(contents[1], function (notes) {
            assert.equal(notes.length, 1);
            assert.equal(notes[0].obj.content, contents[1]);

            done();
          });
        }
      });
    };

  });


});
