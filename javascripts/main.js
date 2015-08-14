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

requirejs(["jquery", "lodash", "firebase", "hbs", "bootstrap", "dom-access", "deleteButton"], 
  function($, _, _firebase, Handlebars, bootstrap, dom, deleteButton) {
  var outputContainer = dom.getOutputElement();
  var myFirebaseRef = new Firebase("https://moviehistoryrefactor.firebaseio.com/");
  myFirebaseRef.child("movie").on("value", function(snapshot) {
    var movies = snapshot.val();
    console.log("movies", movies);
    var storedMovieData = [];
    
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
    var watchedMovieData = _.filter(storedMovieData, { 'viewed': true });
    displayMovieData(watchedMovieData);
  });

  function displayMovieData (movieArray) {
    require(['hbs!../templates/movie-to-watch'], function(movieTemplate) {
      outputContainer.html("");
      $(outputContainer).prepend(movieTemplate(movieArray));
    });
  }


    function getMovie(title) {
    console.log("trying to get movie");
    $.ajax({
      url: "http://www.omdbapi.com/?",
      data: {
        t: title,
      },
    success: function(data) {
      console.log("Movie", data);
      var yearRel = $("#year").val(data.Year);
      var actors = $("#actors").val(data.Actors);
      var poster = data.Poster;
      
      }
    });
  }
  
  $(document).on('click', '#searchButton', function(){
    console.log("search button clicked");
    var title = $("#searchBox").val();
    getMovie(title);
  });





});
















