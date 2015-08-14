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

requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "bootstrap-rating", "dom-access", "deleteButton"], 
  function($, _, _firebase, Handlebars, bootstrap, bootrate, dom, deleteButton) {
  var outputContainer = dom.getOutputElement();
  var myFirebaseRef = new Firebase("https://moviehistoryrefactor.firebaseio.com/");
  myFirebaseRef.child("movie").on("value", function(snapshot) {
    var movies = snapshot.val();
    console.log("movies", movies);
    var storedMovieData = [];
		var poster;

    
    for (var obj in movies) {
      storedMovieData.push(movies[obj]);
    }
    console.log("storedMovieData", storedMovieData);
  $(document).on("click", ".removeButton", function () {
    var deleteTitle = $(this).siblings('h2').text();
    console.log("deleteTitle", deleteTitle);
    var movieHash = _.findKey(movies, {'title': deleteTitle});
    console.log('movies', movies);
    
    console.log('movieHash', movieHash);
      deleteButton.delete(movieHash);
  });
    var toWatchMovieData = _.filter(storedMovieData, { 'viewed': false });
    console.log("to WatchMovieData", toWatchMovieData);
    displayMovieData(toWatchMovieData);
  });

  function displayMovieData (movieArray) {
    require(['hbs!../templates/movie-to-watch'], function(movieTemplate) {
      outputContainer.html("");
      $(outputContainer).prepend(movieTemplate(movieArray));
    });
  }

  //   function to pull movie from OMDB   //
  function getMovie(title) {
    console.log("trying to get movie");
    $.ajax({
      url: "http://www.omdbapi.com/?",
      data: {
        s: title,
      },
    success: function(data) {
      console.log("Movie", data.Search[0].Title);
			
//      poster = data.Poster;
//      $("#poster").html("<img src='" + data.Poster + "' height=100>");
			
		for (var i = 0; i <= data.Search.length; i++) {
			console.log("Movie Names", data.Search[i].Title);
		}
   }
  });
	}
		//Star Rating of Movie
    $('rating').rating({
      extendSymbol: function (rate) {
        $(this).tooltip({
          container: 'body',
          placement: 'bottom',
          title: 'Rate ' + rate
        });
      }
    });


		// Add movie to firebase
	
	$(".addMovies").click(function(){
		
		// Created var for movie
				var newMovie = {
					"Title": $("#movieTitle").val(),
          "Poster": $("#poster").html(),
					};
		});
  
		// Search movies in firebase  ---- Not functioning yet
  $(document).on('click', '#searchButton', function(){
    console.log("search button clicked");
		var title = $("#searchBox").val();
    
  });

	// Search API for Movie Titles -- calls getMovie function//
	$(".findBtn").click(function(){
		console.log("click");
		var title = $("#searchBox").val();
			console.log("title", title);
		
		getMovie(title);
		

});


});
