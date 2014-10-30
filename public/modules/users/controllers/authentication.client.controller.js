'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home

		/*
			TODO : Make sure a user is a user when they fill out second page of signup.
		 	Currently, completing the first sign up page makes a user a saved user and the following
		 	'if' statement will automatically redirect the now-saved user to the homepage.
		*/

		
		//if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/signup2');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/profilepage');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
		
}


]);