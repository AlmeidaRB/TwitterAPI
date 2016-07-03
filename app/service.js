angular.module('twitterApp.services', []).factory('twitterService', function($q) {

    var authorizationResult = false;

    return {
        initialize: function() {
            //pit in my public key of the application here to kick off Oauth
            OAuth.initialize('y66bzByuMneV1Dis54uenKdJ1ZY', {
                cache: true
            });
            //this creates an authorization result when the page loads, aka returning user that HASN'T signed out won't have to sign back in.
            authorizationResult = OAuth.create("twitter");
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup("twitter", {
                cache: true
            }, function(error, result) {
                // cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error

                }
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getLatestTweets: function(maxId) {
            //create a deferred object using Angular's $q service
            //**this is a new service to me, had to research this**
            var deferred = $q.defer();
            var url = '/1.1/statuses/home_timeline.json';
            if (maxId) {
                url += '?max_id=' + maxId;
            }
            var promise = authorizationResult.get(url).done(function(data) {
                // when the data is retrieved resolve the deferred object
                deferred.resolve(data);
            }).fail(function(err) {
                deferred.reject(err);
            });
            //return promise of deferred object
            return deferred.promise;
        }
    }
});
