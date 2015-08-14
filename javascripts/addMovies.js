requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'rating': '..bower_components/bootstrap-star-rating/js/star-rating.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'rating': ['bootstrap'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "searchMovieData", "rating"], 
 function($, _, _firebase, Handlebars, bootstrap, searchMovie, rating) {
 
 var myFirebaseRef = new Firebase("https://moviehistoryrefactor.firebaseio.com/");
   myFirebaseRef.child("movie").on("value", function(snapshot) {
   console.log(snapshot.val());

 });

   var watched;
   $('.btn').click(function(){
     watched = $(this).val();
     watched = (watched === "true");
     console.log(watched);
   });


 $(document).on('click', '#submitMovie', function(){
   var movieName = $('.movieName').val();
   var rating = parseInt($('#rating').val());
     searchMovie.queryMovies(movieName, function(movies) {
       var movieObj = movies;
       movieObj.rating = rating;
       movieObj.viewed = watched;
       movieObj.poster = "http://img.omdbapi.com/?" + movieObj.imdbID;
       console.log(movieObj);
       console.log("data", movies);
       $.ajax({
         url: "https://moviehistoryrefactor.firebaseio.com/",
         method: "POST",
         data: JSON.stringify(movieObj)
       }).done(function(movieObj) {
         console.log(movieObj);
       });
     });
 });
});

