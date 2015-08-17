define(["jquery", "main"],function($, main) {
    
    function displaySearchedMovieData(movieArray) {
      require(['hbs!../templates/searchedMovies'], function(movieTemplate) {
        
        $("#movieDataPanel").prepend(movieTemplate(movieArray));
      });
    }
    

  return {


  //function to get posters for movies returned in "getMovie" function

    getPosters: function(searchArray) {
      console.log("trying to get posters");
        var imdbIDArray =  [];
        for (var i = 0; i < searchArray.length; i++) {
          imdbIDArray.push({imdbID: "http://img.omdbapi.com/?i=" + searchArray[i].imdbID + "&apikey=44da9985"});
        }
        console.log("imdbIDArray: ", imdbIDArray);
        displaySearchedMovieData(imdbIDArray);

    }      
        
    };
});

