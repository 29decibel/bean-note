var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    noteSchema,
    Note,
    textSearch = require("mongoose-text-search");

// TODO delegate this to another object
// to enable the model has CRUD methods
noteSchema = new Schema({
  content:   { type: String },
  format:    { type: String, default: 'html'},
  encryped:  { type: Boolean , default: false},
  excerpt:   { type: String },
  createdAt: { type: Date ,default: Date.now },
  updatedAt: { type: Date ,default: Date.now }
});



// enable full text searh
noteSchema.plugin(textSearch);

noteSchema.pre('save', function (next) {
  var note = this;

  // update the updatedAt
  note.set('updatedAt', new Date() );
  next();
  // if (!note.isModified('content')) return next();
})

// build index
noteSchema.index({
  content:"text"
}, {
  name: "content_index"
});


// make the Note model
Note = mongoose.model('Note', noteSchema);

Note.search = function (searchText, callback) {
  // do the search
  Note.textSearch(searchText.toString(), function (err, output) {
    if (err) {
      throw err;
    } else {
      callback(output.results);
    }
  });
};


module.exports = Note;
