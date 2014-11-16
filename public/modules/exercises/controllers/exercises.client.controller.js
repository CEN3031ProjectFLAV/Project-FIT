'use strict';

// Exercises controller
angular.module('exercises').controller('ExercisesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Exercises',
	function($scope, $stateParams, $location, Authentication, Exercises ) {
		$scope.authentication = Authentication;

		// Create new Exercise
		$scope.create = function() {
			// Create new Exercise object
			var exercise = new Exercises ({
				name: this.name
			});

			// Redirect after save
			exercise.$save(function(response) {
				$location.path('exercises/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Exercise
		$scope.remove = function( exercise ) {
			if ( exercise ) { exercise.$remove();

				for (var i in $scope.exercises ) {
					if ($scope.exercises [i] === exercise ) {
						$scope.exercises.splice(i, 1);
					}
				}
			} else {
				$scope.exercise.$remove(function() {
					$location.path('exercises');
				});
			}
		};

		// Update existing Exercise
		$scope.update = function() {
			var exercise = $scope.exercise ;

			exercise.$update(function() {
				$location.path('exercises/' + exercise._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Exercises
		$scope.find = function() {
			$scope.exercises = Exercises.query();
		};

		// Find existing Exercise
		$scope.findOne = function() {
			$scope.exercise = Exercises.get({ 
				exerciseId: $stateParams.exerciseId
			});
		};
	}
]);