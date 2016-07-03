//main module
  var app = angular.module('twitterApp', ['ngSanitize','twitterApp.services']);



//additional function for splash page
  $(function(){
     setTimeout(function() {
        $("#splash").fadeOut("slow", function() {
           $(".wrapper").show();
        });
     }, 5000);
  });
