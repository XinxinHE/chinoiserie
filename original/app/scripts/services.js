(function() {
'use strict';
angular.module('confusionApp')
        .constant("config", {
            apiKey: "AIzaSyAsklPoeRGajCk4Hf93jxLlSmqdRQ5VLEg",
            authDomain: "chinoiserie-b2b07.firebaseapp.com",
            databaseURL: "https://chinoiserie-b2b07.firebaseio.com",
            projectId: "chinoiserie-b2b07",
            storageBucket: "chinoiserie-b2b07.appspot.com",
            messagingSenderId: "566054299112"
        })
        .service('menuFactory', ['config', function(config) {

          // Initialize firebase
          // Check if firebase app has already initialized
          if (!firebase.apps.length) {
            firebase.initializeApp(config);
          }

          this.getDishes = function(){
            // Get a data reference to dishes data
            return firebase.database().ref('dishes');
            // return $resource(baseURL + "dishes/:id", null, {'update':{method:'PUT'}});
          };

          this.getPromotion = function(){
            return firebase.database().ref('promotions');
            // return $resource(baseURL + "promotions/:id", null, {'update':{method:'PUT'}});
          };
        }])

        .factory('corporateFactory', ['config', function(config) {

            if (!firebase.apps.length) {
              firebase.initializeApp(config);
            }

            var corpfac = {};

            corpfac.getLeaders = function(){
              return firebase.database().ref('leadership');
              // return $resource(baseURL + "leadership/:id", null, {'update':{method:'PUT'}});
            };

            return corpfac;

        }])

        .factory('feedbackFactory', ['config', function(config){

            if (!firebase.apps.length) {
              firebase.initializeApp(config);
            }

            var feedbackfac = {};

            feedbackfac.getFeedback = function(){
              return firebase.database().ref('feedback');
              //return $resource(baseURL + 'feedback', null, {'update':{method:'POST'}});
            };

            return feedbackfac;
        }]);
}());
