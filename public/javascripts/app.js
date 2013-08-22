
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
      this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
};


// define a app module
var app = angular.module('app',[]);
app.controller("Main", function ($scope, $q, $http) {
  var editor = new wysihtml5.Editor("wysihtml5-editor", {
        toolbar:     "wysihtml5-editor-toolbar",
        stylesheets: ["http://yui.yahooapis.com/2.9.0/build/reset/reset-min.css", "stylesheets/editor.css"],
        parserRules: wysihtml5ParserRules
      }),
      currentNote = null,
      updateTimer = null;


  $scope.notes = [];

/*
 *  editor.on('change', function () {
 *    if (updateTimer !== null) {
 *      clearTimeout(updateTimer);
 *      updateTimer = setTimeout(updateNote, 3000);
 *    }
 *
 *  });
 */

  // register blur event
  editor.on('blur', function () {
    updateNote();
  });

  function updateNote () {
    if (currentNote) {
      // update attributes
      currentNote.content = editor.getValue();
      currentNote.excerpt = getTitle(currentNote.content);

      saveNote(currentNote);
    }
  }

  function getTitle (content) {
    var candidates = content.replace(/<\/?[^>]+(>|$)/g, "\n").split("\n"),
        title = "Empty Note",
        i = 0,
        candidateTitle;

    if (candidates.length > 0) {
      while(i < candidates.length){
        if (candidates[i] !== undefined) {
          candidateTitle = candidates[i].replace(/^\s+|\s+$/g, '');
          if (candidateTitle !== '' && candidateTitle.length > 0) {
            return candidateTitle;
          }
        }
        i += 1;
      }
    }

    return title;
  }


  function activeNote (note) {
    currentNote = note;
    editor.setValue(note.content);
    for (var i=0; i < $scope.notes.length; i++) {
      $scope.notes[i].active = false;
    };

    currentNote.active = true;

    // let the editor focus
    editor.focus();
  }


  function saveNote (note) {
    $http.put("/notes/" + note._id, {content: note.content, excerpt: note.excerpt }).success( function (data) {
    });
  }

  function createNote () {
    $http.post("/notes", {excerpt: "New Note" }).success( function (data) {
      $scope.notes.splice(0, 0, data);
      // $scope.notes.push(data);
      activeNote(data);
    });
  }

  function deleteNote (note) {
    var index = $scope.notes.indexOf(note);
    if (index >= 0) {
      console.log("remove one");
      $scope.notes.remove(index);
      $http.delete("/notes/" + note._id).success( function (data) {
        console.log("delete success ....");
      });

      if ($scope.notes.length > 0) {
        if (index + 1 >= $scope.notes.length ) {
          // active next note
          activeNote($scope.notes[index - 1]);
        } else {
          // active next note
          activeNote($scope.notes[index]);
        }
      } else {
        createNote();
      }
    }
  }


  // load all notes
  $http.get("/notes").success( function (data) {
    $scope.notes = data;
    activeNote(data[0]);
  });

  $scope.chooseNote = function (note) {
    activeNote(note);
  };

  $scope.newNote = function () {
    createNote();
  };

  $scope.deleteNote = function (note) {
    if (confirm("are your sure want to delete this note?\n" + note.excerpt) === true) {
      deleteNote(note);
    }
  };

});
