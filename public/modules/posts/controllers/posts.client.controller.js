'use strict';

// Posts controller
angular.module('posts').controller('PostsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Posts',
	function($scope, $stateParams, $location, Authentication, Posts ) {
		$scope.authentication = Authentication;

		// Create new Post
		this.create = function() {
			// Create new Post object
			var post = new Posts ({
				post: this.post
			});

			// Redirect after save
			post.$save(function(response) {
				//$location.path('posts/' + response._id);

				// Clear form fields
				$scope.post = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			this.post='';
			this.find();
		};

		// Remove existing Post
		this.remove = function( post ) {
			if ( post ) { post.$remove();

				for (var i in $scope.posts ) {
					if ($scope.posts [i] === post ) {
						$scope.posts.splice(i, 1);
					}
				}
			} else {
				$scope.post.$remove(function() {
					$location.path('posts');
				});
			}
		};

		// Update existing Post
		this.update = function() {
			var post = $scope.post ;

			post.$update(function() {
				$location.path('posts/' + post._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Posts
		this.find = function() {
			$scope.posts = Posts.query();
		};

		// Find existing Post
		this.findOne = function() {
			$scope.post = Posts.get({ 
				postId: $stateParams.postId
			});
		};
	}
]);