var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    encryptTextSchema,
    encryptText,
    EncryptText = {},
    crypto = require('crypto');

// TODO delegate this to another object
// to enable the model has CRUD methods
encryptTextSchema = new Schema({
  content:   { type: String },
  createdAt: { type: Date ,default: Date.now },
  updatedAt: { type: Date ,default: Date.now }
});



// make the Note model
// this mongoose model is internal use only
encryptText = mongoose.model('EncryptText', encryptTextSchema);


/*
 * create encrypt content
 */
EncryptText.create = function (key, content, callback) {
  var text = new encryptText(),
      cipher = crypto.createCipher('aes-256-cbc', key),
      encryptedContent;

  encryptContent = cipher.update(content, 'utf8', 'base64');
  text.set('content', encryptContent += cipher.final('base64'));
  text.save(callback);
};


/*
 * get the decrypt content
 */
EncryptText.getContent = function (id, key, callback) {
  encryptText.findOne({_id: id}, function (err, doc) {
    if (err) {
      callback(err)
    } else {
      var decipher = crypto.createDecipher('aes-256-cbc', key),
          decryptContent;

      try{
        decryptContent = decipher.update(doc.get('content'), 'base64', 'utf8');
        decryptContent += decipher.final('utf8');
        callback(null, decryptContent);
      } catch(e) {
        callback({error: "given key is not correct !"});
      }
    }
  });
};


module.exports = EncryptText;
