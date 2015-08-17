define(["jquery"],function($) {
  return {

  //function to get posters for movies returned in "getMovie" function

    getPosters: function(searchArray) {
      console.log("trying to get posters");
        var imdbIDArray =  [];
        for (var i = 0; i < searchArray.length; i++) {
          imdbIDArray.push(searchArray[i].imdbID);
        }
        console.log("imdbArray: ", imdbIDArray);
        
        var imdbID = imdbIDArray[0];
          
            $.ajax({
              url: "http://www.omdbapi.com/?",
              data: {
                i: imdbID,
              },
              success: function(data) {
                console.log("poster data??", data.Poster);
              } 
            });

        imdbID = imdbIDArray[1];
          
            $.ajax({
              url: "http://www.omdbapi.com/?",
              data: {
                i: imdbID,
              },
              success: function(data) {
                console.log("poster data??", data.Poster);
              } 
            });
        imdbID = imdbIDArray[2];
          
            $.ajax({
              url: "http://www.omdbapi.com/?",
              data: {
                i: imdbID,
              },
              success: function(data) {
                console.log("poster data??", data.Poster);
              } 
            });

          
        
    }
  };
});