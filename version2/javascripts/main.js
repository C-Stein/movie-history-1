requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'bootstrap-rating': '../bower_components/bootstrap-rating/bootstrap-rating.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'bootstrap-rating': ['bootstrap'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

 
requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "addMovies", "watched", "wishlist", "dom-access", "bootstrap-rating"], 
 function($, _, _firebase, Handlebars, bootstrap, add, movies, watched, dom, bsrating){


var target = dom.getDom();
  console.log(target);


});