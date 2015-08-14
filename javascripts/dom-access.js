define(["jquery"],function($) {
  var $output = $(".modal-content");

  return {
    getOutputElement: function() {
      return $output;
    }
  };
});