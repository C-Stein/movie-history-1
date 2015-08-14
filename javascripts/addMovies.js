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

requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "searchMovieData"], 
 function($, _, _firebase, Handlebars, bootstrap, searchMovie) {
 
 var myFirebaseRef = new Firebase("https://movie-database.firebaseio.com/");
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
       movieObj.poster = "http://img.omdbapi.com/?i=" + movieObj.imdbID + "&apikey=8513e0a1";
       console.log(movieObj);
       console.log("data", movies);
       $.ajax({
         url: "https://moviehistoryrefsctor.firebaseio.com/movie.json",
         method: "POST",
         data: JSON.stringify(movieObj)
       }).done(function(movieObj) {
         console.log(movieObj);
       });
     });
  });



});













