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

requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "dom-access", "deleteButton", "searchFunctions", "getPosters", "rating2"], 
  function($, _, _firebase, Handlebars, bootstrap, dom, deleteButton, search, posters, rating2) {
  var searchResults;
  var outputContainer = dom.getOutputElement();
  var myFirebaseRef = new Firebase("https://moviehistoryrefactor.firebaseio.com/");
    var storedMovieData = [];
		var poster;
  myFirebaseRef.child("movie").on("value", function(snapshot) {
    var movies = snapshot.val();
    console.log("movies", movies);

    
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

    displayWishlistMovieData(toWatchMovieData);
  });

  function displayWishlistMovieData (movieArray) {
    require(['hbs!../templates/movie-to-watch'], function(movieTemplate) {
      outputContainer.html("");
      $(outputContainer).prepend(movieTemplate(movieArray));

    });

    console.log("storedMovieData", storedMovieData);

  }

  
		// Add movie to firebase
	
	$(".addMovies").click(function(){
		
		$.ajax({
      url: "http://www.omdbapi.com/?",
      data: {
        t: title,
      },
    success: function(data) {
      console.log("Movie", data);
			
			
			//  Not sure how to take this information and put it into the modal
			
			
//			poster = data.Poster;
//      $("#poster").html("<img src='" + data.Poster + "' height=100>");
				var movTitle = $("#title").val(data.Search[i].Title);
				var yearRel = $("#year").val(data.Search[i].Year);

		
		}
		});
	});
  

function searchDisplayWishlistMovieData (movieArray) {
      require(['hbs!../templates/movie-to-watch'], function(movieTemplate) {
        console.log("searchDisplayMovieData called");
        $("#movieDataPanel").append(movieTemplate(movieArray));
      });
    }
function searchDisplayMovieData (movieArray) {
      require(['hbs!../templates/movie-watched'], function(movieTemplate) {
        console.log("searchDisplayWishlistMovieData called", movieArray);
        $("#movieDataPanel").append(movieTemplate(movieArray));
      });
    }
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
    console.log("storedMovieData", storedMovieData);
	// Search API and firebase for Movie Titles -- calls getMovie function//
	$("#searchButton").click(function(){
		console.log("search button clicked");
    $("#movieDataPanel").html("");
    
    //search api for multiple results
		var title = $("#searchBox").val();
			console.log("title", title);
		
		var searchResults;
    function getMovie(title) {
      console.log("trying to get movie");
      $.ajax({
        url: "http://www.omdbapi.com/?",
        data: {
          s: title,
        },
        success: function(data) {
          
          searchResults = data;
          console.log("searchResults", searchResults);
         posters.getPosters(searchResults.Search);
        } 
      });

    //search firebase
      

      title = toTitleCase(title);
      console.log("title case title", title);

      var nonAPIWishlistMovies = _.filter(storedMovieData, { 'Title': title,
                                                             'viewed': false });
      console.log("nonAPIWatchedMovies", nonAPIWishlistMovies);
      var nonAPIWatchedMovies = _.filter(storedMovieData, { 'Title': title,
                                                             'viewed': true });
      searchDisplayMovieData(nonAPIWatchedMovies);
      searchDisplayWishlistMovieData(nonAPIWishlistMovies);
    }
    getMovie(title);
 
  




  });

  



});
