var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    noteSchema,
    Note;

// TODO delegate this to another object
// to enable the model has CRUD methods
noteSchema = new Schema({
  content: {type: String },
  format: {type: String, default: 'html'},
  encryped: {type: Boolean , default: false},
  excerpt: { type: String }
});



// make the Note model
Note = mongoose.model('Note', noteSchema);



module.exports = Note;
