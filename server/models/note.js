var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    noteSchema,
    Note;

noteSchema = new Schema({
  content: {type: String },
  format: {type: String, default: 'html'},
  encryped: {type: Boolean , default: false}
});

// make the Note model
Note = mongoose.model('Note', noteSchema);


module.exports = Note;
