define(["jquery"],function($) {
  return {
    
    //function to pull movie from OMDB   //
    getMovie: function(title) {
      console.log("trying to get movie");
      $.ajax({
        url: "http://www.omdbapi.com/?",
        data: {
          s: title,
        },
        success: function(data) {
          
          console.log("data from getMovie function", data);
          return data;
        } 
      });
    }
  
  

      
    
  };
});