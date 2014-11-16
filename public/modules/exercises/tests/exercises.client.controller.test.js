'use strict';

(function() {
	// Exercises Controller Spec
	describe('Exercises Controller Tests', function() {
		// Initialize global variables
		var ExercisesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Exercises controller.
			ExercisesController = $controller('ExercisesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Exercise object fetched from XHR', inject(function(Exercises) {
			// Create sample Exercise using the Exercises service
			var sampleExercise = new Exercises({
				name: 'New Exercise'
			});

			// Create a sample Exercises array that includes the new Exercise
			var sampleExercises = [sampleExercise];

			// Set GET response
			$httpBackend.expectGET('exercises').respond(sampleExercises);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.exercises).toEqualData(sampleExercises);
		}));

		it('$scope.findOne() should create an array with one Exercise object fetched from XHR using a exerciseId URL parameter', inject(function(Exercises) {
			// Define a sample Exercise object
			var sampleExercise = new Exercises({
				name: 'New Exercise'
			});

			// Set the URL parameter
			$stateParams.exerciseId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/exercises\/([0-9a-fA-F]{24})$/).respond(sampleExercise);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.exercise).toEqualData(sampleExercise);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Exercises) {
			// Create a sample Exercise object
			var sampleExercisePostData = new Exercises({
				name: 'New Exercise'
			});

			// Create a sample Exercise response
			var sampleExerciseResponse = new Exercises({
				_id: '525cf20451979dea2c000001',
				name: 'New Exercise'
			});

			// Fixture mock form input values
			scope.name = 'New Exercise';

			// Set POST response
			$httpBackend.expectPOST('exercises', sampleExercisePostData).respond(sampleExerciseResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Exercise was created
			expect($location.path()).toBe('/exercises/' + sampleExerciseResponse._id);
		}));

		it('$scope.update() should update a valid Exercise', inject(function(Exercises) {
			// Define a sample Exercise put data
			var sampleExercisePutData = new Exercises({
				_id: '525cf20451979dea2c000001',
				name: 'New Exercise'
			});

			// Mock Exercise in scope
			scope.exercise = sampleExercisePutData;

			// Set PUT response
			$httpBackend.expectPUT(/exercises\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/exercises/' + sampleExercisePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid exerciseId and remove the Exercise from the scope', inject(function(Exercises) {
			// Create new Exercise object
			var sampleExercise = new Exercises({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Exercises array and include the Exercise
			scope.exercises = [sampleExercise];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/exercises\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleExercise);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.exercises.length).toBe(0);
		}));
	});
}());