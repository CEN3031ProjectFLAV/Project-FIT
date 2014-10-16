'use strict';

(function() {
	// Goals Controller Spec
	describe('Goals Controller Tests', function() {
		// Initialize global variables
		var GoalsController,
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

			// Initialize the Goals controller.
			GoalsController = $controller('GoalsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Goal object fetched from XHR', inject(function(Goals) {
			// Create sample Goal using the Goals service
			var sampleGoal = new Goals({
				name: 'New Goal'
			});

			// Create a sample Goals array that includes the new Goal
			var sampleGoals = [sampleGoal];

			// Set GET response
			$httpBackend.expectGET('goals').respond(sampleGoals);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.goals).toEqualData(sampleGoals);
		}));

		it('$scope.findOne() should create an array with one Goal object fetched from XHR using a goalId URL parameter', inject(function(Goals) {
			// Define a sample Goal object
			var sampleGoal = new Goals({
				name: 'New Goal'
			});

			// Set the URL parameter
			$stateParams.goalId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/goals\/([0-9a-fA-F]{24})$/).respond(sampleGoal);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.goal).toEqualData(sampleGoal);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Goals) {
			// Create a sample Goal object
			var sampleGoalPostData = new Goals({
				name: 'New Goal'
			});

			// Create a sample Goal response
			var sampleGoalResponse = new Goals({
				_id: '525cf20451979dea2c000001',
				name: 'New Goal'
			});

			// Fixture mock form input values
			scope.name = 'New Goal';

			// Set POST response
			$httpBackend.expectPOST('goals', sampleGoalPostData).respond(sampleGoalResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Goal was created
			expect($location.path()).toBe('/goals/' + sampleGoalResponse._id);
		}));

		it('$scope.update() should update a valid Goal', inject(function(Goals) {
			// Define a sample Goal put data
			var sampleGoalPutData = new Goals({
				_id: '525cf20451979dea2c000001',
				name: 'New Goal'
			});

			// Mock Goal in scope
			scope.goal = sampleGoalPutData;

			// Set PUT response
			$httpBackend.expectPUT(/goals\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/goals/' + sampleGoalPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid goalId and remove the Goal from the scope', inject(function(Goals) {
			// Create new Goal object
			var sampleGoal = new Goals({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Goals array and include the Goal
			scope.goals = [sampleGoal];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/goals\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleGoal);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.goals.length).toBe(0);
		}));
	});
}());