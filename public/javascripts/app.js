var editor = new wysihtml5.Editor("wysihtml5-editor", {
  toolbar:     "wysihtml5-editor-toolbar",
  stylesheets: ["http://yui.yahooapis.com/2.9.0/build/reset/reset-min.css", "stylesheets/editor.css"],
  parserRules: wysihtml5ParserRules
});


// define a app module
var app = angular.module('app',[]);
app.controller("Main", function ($scope, $q, $http) {

    $scope.generate = function(e){
      e.preventDefault();
      var value = $("#wysihtml5-editor").val();

      $http.post("/generate",{ contents: value, title: $scope.title }).success( function  (data) {
        console.log(data);
      }).error( function (error) {
        console.log(error);
      });
    }
});
