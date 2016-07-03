app.controller('TwitterController', function($scope, $q, twitterService) {
      $scope.tweets = []; //array of tweets

      twitterService.initialize();

      //using OAuth authorization, this grabs most recent 20 from user
      $scope.refreshTimeline = function(maxId) {
          twitterService.getLatestTweets(maxId).then(function(data) {
              $scope.tweets = $scope.tweets.concat(data);
          }, function() {
              $scope.rateLimitError = true;
          });
      }

      //popup window to connect
      $scope.connectButton = function() {
          twitterService.connectTwitter().then(function() {
              if (twitterService.isReady()) {
                  //if authorized, hide connect button, show tweets
                  $('#connectButton').fadeOut(function() {
                      $('#getTimelineButton, #signOut').fadeIn();
                      $scope.refreshTimeline();
                      $scope.connectedTwitter = true;
                  });
              } else {

              }
          });
      }

      //Sign out clears OAuth cache so user has to reauthenticate
      $scope.signOut = function() {
          twitterService.clearCache();
          $scope.tweets.length = 0;
          $('#getTimelineButton, #signOut').fadeOut(function() {
              $('#connectButton').fadeIn();
              $scope.$apply(function() {
                  $scope.connectedTwitter = false
              })
          });
      }

      //if the user is returning, hide sign in button and display tweets
      if (twitterService.isReady()) {
          $('#connectButton').hide();
          $('#getTimelineButton, #signOut').show();
          $scope.connectedTwitter = true;
          $scope.refreshTimeline();
      }
  });
