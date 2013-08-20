var inflection = require( 'inflection' ),
    mongoose = require('mongoose');


function resources (app, resourceName) {

  var singularizeName = inflection.singularize(resourceName),
      modelName = inflection.camelize(singularizeName),
      modelClass = mongoose.model(modelName);

  /*
   * get the list of resources
   */
  app.get("/" + resourceName, function (req, res) {
    modelClass.find({}, function  (err, docs) {
      res.send(docs);
    });
  });


  /*
   * create a resource
   */
  app.post("/" + resourceName, function (req, res) {
    // collect information from request
    // TODO only pick whitelist attributes
    var newModel = new modelClass(req.body);

    newModel.save( function (err) {
      res.send(newModel);
    });

  });


  /*
   * get one single resource
   */
  app.get("/" + resourceName + "/:id", function (req, res) {
    modelClass.findOne({}, function  (err, doc) {
      res.send(doc);
    });
  });


  /*
   * update one resource
   */
  app.put("/" + resourceName + "/:id", function (req, res) {
    modelClass.update({_id: req.params.id }, function  (err, doc) {
      doc.content = req.body.content;
      doc.save( function (err) {
        res.send(doc);
      })
    });

  });


  /*
   * delete one resource
   */
  app.delete("/" + resourceName + "/:id", function  (req, res) {
    modelClass.remove({_id: req.params.id.toString()}, function (err) {
      res.send({id: req.params.id })
    })

  });


  /*
   * create a new model
   */
  app.get("/" + resourceName + "/new", function (req, res) {
    res.send(new modelClass())
  });

}

module.exports = {
  resources: resources
};
