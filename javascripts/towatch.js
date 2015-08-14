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

requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "dom-access"], function($, _, _firebase, Handlebars, bootstrap, dom) {
  var outputContainer = dom.getOutputElement();
  var myFirebaseRef = new Firebase("https://moviehistoryrefactor.firebaseio.com/");
  myFirebaseRef.child("movie").on("value", function(snapshot) {
    var movies = snapshot.val();
    var storedMovieData = [];
    for (var obj in movies) {
      storedMovieData.push(movies[obj]);
    }

    console.log("movies", movies);

    var watchedMovieData = _.filter(storedMovieData, { 'viewed': true });
    console.log("watchedMovieData", watchedMovieData);




    displayMovieData(watchedMovieData);
  });

  function displayMovieData (movieArray) {
    require(['hbs!../templates/movie-watched'], function(movieTemplate) {
      outputContainer.html("");
      $(outputContainer).append(movieTemplate(movieArray));
    });
  }

});