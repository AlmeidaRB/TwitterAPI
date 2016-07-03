//main module
  var app = angular.module('twitterAPI', ['ngSanitize','twitterAPI.services']);



//additional function for splash page
  $(function(){
     setTimeout(function() {
        $("#splash").fadeOut("slow", function() {
           $(".wrapper").show();
        });
     }, 5000);
  });
