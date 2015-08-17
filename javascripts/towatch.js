requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'rating2': '../bower_components/bootstrap-rating/bootstrap-rating.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'rating2': ['bootstrap'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "dom-access", "rating2"], function($, _, _firebase, Handlebars, bootstrap, dom, rating2) {
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




    displayMovieData(watchedMovieData, movies);
  });

  function displayMovieData (movieArray, movies) {
    require(['hbs!../templates/movie-watched'], function(movieTemplate) {
      outputContainer.html("");
      $(outputContainer).append(movieTemplate(movieArray));
        
        // Add stars to the watched movie

     $('.rating').rating();

     $('.rating').on('change', function () {
          var rate = $(this).closest('.rating').rating('rate');
            console.log(rate);
          //variable to get title/key
          var ratingTitle = $(this).attr('title');
            console.log(ratingTitle);
          var titleKey = _.findKey(movies, {'Title': ratingTitle});
            console.log(titleKey);
          var ref = new Firebase('https://moviehistoryrefactor.firebaseio.com/' + titleKey);
          ref.update({rating: rate});


     //    var userRating = $(this).attr('value');
     //      console.log(userRating);
     // // Capture a variable that gets title/key
     //    var ratingTitle = $(this).parent().child('p').html();
     //      console.log(ratingTitle);
     //      console.log("movies :", movies);
     //    var titleKey = _.findKey(movies, {'Title': ratingTitle});
     //      console.log(titleKey);
     //    var ref = new Firebase('https://moviehistoryrefactor.firebaseio.com/' + titleKey);
     //     ref.update({rating: userRating});
     });

    });
  
  }

});