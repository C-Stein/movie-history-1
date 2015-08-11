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

requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap"], function($, _, _firebase, Handlebars, bootstrap) {

  var myFirebaseRef = new Firebase("https://movie-database.firebaseio.com/");
  myFirebaseRef.child("movie").on("value", function(snapshot) {
  console.log(snapshot.val());
});
});