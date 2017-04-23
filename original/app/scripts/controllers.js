'use strict';

angular.module('confusionApp')
        .controller('NavController', ['$scope', '$location', function($scope, $location) {
           $scope.isActive = function(viewLocation) {
             return viewLocation === $location.path();
           }
        }])
        .controller('MenuController', ['$scope', 'menuFactory', '$timeout', function($scope, menuFactory, $timeout) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.showMenu = false;
            $scope.message = "Loading...";

            menuFactory.getDishes().on("value",

               function(snapshot) {
                 $timeout(function() {
                   $scope.dishes = snapshot.val();
                   $scope.showMenu = true;
                 }, 0);
               },
               function(errorObject){
                 $timeout(function() {
                   $scope.message = "The read failed: " + errorObject.code;
                 }, 0);
               }
            );

            // menuFactory.getDishes().query(
            //   function(response){
            //     $scope.dishes = response;
            //     $scope.showMenu = true;
            //   },
            //
            //   function(response){
            //     $scope.message = "Error" + response.status + " " + response.statusText;
            //   }
            // );

            $scope.select = function(setTab) {
                $scope.tab = setTab;

                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };

            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {


            $scope.sendFeedback = function() {

                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                }
                else {
                    $scope.invalidChannelSelection = false;

                    feedbackFactory.getFeedback().update($scope.feedback);

                    $scope.feedbackForm.$setPristine();
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', '$timeout', function($scope, $stateParams, menuFactory, $timeout) {


            $scope.showDish = false;
            $scope.message = "Loading...";
            $scope.filterkey = '';
            menuFactory.getDishes().child($stateParams.id).on("value",
              function(snapshot) {
                $timeout(function() {
                  $scope.dish = snapshot.val();
                  $scope.showDish = true;
                });
              },
              function(errorObject) {
                $timeout(function () {
                  $scope.message = "The read failed: " + errorObject.code;
                }, 0);
              }
            );

            // menuFactory.getDishes().get({id:parseInt($stateParams.id, 10)}).
            //   $promise.then(
            //
            //     function(response){
            //       $scope.dish = response;
            //       $scope.showDish = true;
            //     },
            //
            //     function(response){
            //       $scope.message = "Error" + response.status + " " + response.statusText;
            //     }
            //   );

              $scope.filterComment = function (filterKey){
                  $scope.filterKey = filterKey;

                  if($scope.filterKey === "date" | $scope.filterKey === "author" | $scope.filterKey === "rating" | $scope.filterKey === "-date" | $scope.filterKey === "-author" | $scope.filterKey === "-rating")
                      return $scope.filterKey;
                  else
                      return "";
              }

        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

            $scope.mycomment = {rating:5, comment:"", author:"", date:""};

            $scope.submitComment = function () {

                $scope.mycomment.date = new Date().toISOString();

                $scope.dish.comments.push($scope.mycomment);
                console.log($scope.dish.id);
                console.log($scope.dish);
                menuFactory.getDishes().child($scope.dish.id.toString()).update(angular.fromJson(angular.toJson($scope.dish)));

                $scope.commentForm.$setPristine();

                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', '$timeout', function($scope, menuFactory, corporateFactory, $timeout){

            $scope.showDish = false;
            $scope.showPromo = false;
            $scope.showLeader = false;
            $scope.message = "Loading...";

            menuFactory.getDishes().child('0').on("value",
              function(snapshot){
                $timeout(function() {
                  $scope.featuredDish = snapshot.val();
                  $scope.showDish = true;
                }, 0);
              },
              function(errorObject){
                $timeout(function() {
                  $scope.message = "The read failed: " + errorObject.code;
                }, 0);
              }
            );
            // Attach an asynchronous callback to read the data at the reference
            menuFactory.getPromotion().child('0').on("value",
              function(snapshot){
                $timeout(function() {
                  $scope.promotions = snapshot.val();
                  $scope.showPromo = true;
                }, 0);
              },
              function(errorObject){
                $timeout(function() {
                  $scope.message = "The read failed: " + errorObject.code;
                }, 0);
              }
            );

            corporateFactory.getLeaders().child('3').on("value",
              function(snapshot) {
                $timeout(function() {
                  $scope.executiveChief = snapshot.val();
                  $scope.showLeader = true;
                }, 0);
              },
              function(errorObject) {
                $timeout(function() {
                  $scope.message = "The read failed: " + errorObject.code;
                }, 0);
              }
            );
            //
            // corporateFactory.getLeaders().get({id:3})
            // .$promise.then(
            //   function(response){
            //     $scope.executiveChief = response;
            //     $scope.showLeader = true;
            //   },
            //
            //   function(response){
            //     $scope.message = "Error" + response.status + " " + response.statusText;
            //   }
            // );

        }])

        .controller('AboutController', ['$scope', 'corporateFactory', '$timeout', function($scope, corporateFactory, $timeout){

            $scope.message = "Loading...";
            $scope.showLeader = false;

            corporateFactory.getLeaders().on("value",
              function(snapshot) {
                $timeout(function() {
                  $scope.leaders = snapshot.val();
                  $scope.showLeader = true;
                }, 0);
              },
              function(errorObject) {
                $timeout(function () {
                  $scope.message = "The read failed: " + errorObject.code;
                }, 0);
              }
            );
            // corporateFactory.getLeaders().query(
            //   function(response){
            //     $scope.leaders = response;
            //     $scope.showLeader = true;
            //   },
            //
            //   function(response){
            //     $scope.message = "Error" + response.status + " " + response.statusText;
            //   }
            // );
        }])
        // implement the IndexController and About Controller here
;
