'use strict';

/*       
		Need to be able to route the friend controller from the user controllers
        because instead of displaying friends we are displaying all the users here
        All the Friend and user implementation will be in the friend controller
*/



// Friends controller
angular.module('friends').controller('FriendsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Friends', 'Posts',
	function($scope, $stateParams, $location, Authentication, Friends, Posts ) {
		$scope.authentication = Authentication;

		// Create new Friend
		$scope.create = function(user) {
			// Create new Friend object
			$scope.friend = new Friends ({
				user_id: user._id
			});

			// get the list of friends here
			var friends=Friends.query();
			//make sure that no user can have two friends


	/*		friend.$save(function(response) {
				$location.path('friends/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});*/
		};


		// Remove existing Friend
		$scope.remove = function( friend ) {
			if ( friend ) { friend.$remove();

				for (var i in $scope.friends ) {
					if ($scope.friends [i] === friend ) {
						$scope.friends.splice(i, 1);
					}
				}
			} else {
				$scope.friend.$remove(function() {
					$location.path('friends');
				});
			}
		};

		// Update existing Friend
		$scope.update = function() {
			var friend = $scope.friend ;

			friend.$update(function() {
				$location.path('friends/' + friend._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Friends
		$scope.find = function() {

			//Friends is querying the users
			$scope.users = Friends.query();
		};

		// Find existing Friend
		$scope.findOne = function() {
			$scope.friend = Friends.get({ 
				friendId: $stateParams.friendId
			});
		};
	}
]);