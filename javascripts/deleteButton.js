
define(["firebase"],function(_firebase) {

 return {
   delete: function(argument) {
     var ref = new Firebase("https://moviehistoryrefactor.firebaseio.com/movie/" + argument);
     ref.remove();
     console.log("ref", argument);
   }
 };

}); 