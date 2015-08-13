requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "dom-access"], 
  function($, _, _firebase, Handlebars, bootstrap, dom) {
  var outputContainer = dom.getOutputElement();
  var myFirebaseRef = new Firebase("https://moviehistoryrefactor.firebaseio.com/");
  myFirebaseRef.child("movie").child("movie").on("value", function(snapshot) {
    var movies = snapshot.val();
    var storedMovieData = [];
    console.log(storedMovieData);
    
    for (var obj in movies) {
      storedMovieData.push(movies[obj]);
    }
    var watchedMovieData = _.filter(storedMovieData, { 'viewed': true });
    displayMovieData(watchedMovieData);
  });

  function displayMovieData (movieArray) {
    require(['hbs!../templates/movie-to-watch'], function(movieTemplate) {
      outputContainer.html("");
      $(outputContainer).prepend(movieTemplate(movieArray));
    });
  }

  $(document).on("click", ".removeButton", function () {
      $(this).parent().parent().parent().remove();
  });
});
















