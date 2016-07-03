
  var app = angular.module('twitterApp', ['ngSanitize','twitterApp.services']);


  $(function(){
     setTimeout(function() {
        $("#splash").fadeOut("slow", function() {
           $(".wrapper").show();
        });
     }, 5000);
  });
