'use strict';

(function() {
	// Searchusers Controller Spec
	describe('Searchusers Controller Tests', function() {
		// Initialize global variables
		var SearchusersController,
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

			// Initialize the Searchusers controller.
			SearchusersController = $controller('SearchusersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Searchuser object fetched from XHR', inject(function(Searchusers) {
			// Create sample Searchuser using the Searchusers service
			var sampleSearchuser = new Searchusers({
				name: 'New Searchuser'
			});

			// Create a sample Searchusers array that includes the new Searchuser
			var sampleSearchusers = [sampleSearchuser];

			// Set GET response
			$httpBackend.expectGET('searchusers').respond(sampleSearchusers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.searchusers).toEqualData(sampleSearchusers);
		}));

		it('$scope.findOne() should create an array with one Searchuser object fetched from XHR using a searchuserId URL parameter', inject(function(Searchusers) {
			// Define a sample Searchuser object
			var sampleSearchuser = new Searchusers({
				name: 'New Searchuser'
			});

			// Set the URL parameter
			$stateParams.searchuserId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/searchusers\/([0-9a-fA-F]{24})$/).respond(sampleSearchuser);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.searchuser).toEqualData(sampleSearchuser);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Searchusers) {
			// Create a sample Searchuser object
			var sampleSearchuserPostData = new Searchusers({
				name: 'New Searchuser'
			});

			// Create a sample Searchuser response
			var sampleSearchuserResponse = new Searchusers({
				_id: '525cf20451979dea2c000001',
				name: 'New Searchuser'
			});

			// Fixture mock form input values
			scope.name = 'New Searchuser';

			// Set POST response
			$httpBackend.expectPOST('searchusers', sampleSearchuserPostData).respond(sampleSearchuserResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Searchuser was created
			expect($location.path()).toBe('/searchusers/' + sampleSearchuserResponse._id);
		}));

		it('$scope.update() should update a valid Searchuser', inject(function(Searchusers) {
			// Define a sample Searchuser put data
			var sampleSearchuserPutData = new Searchusers({
				_id: '525cf20451979dea2c000001',
				name: 'New Searchuser'
			});

			// Mock Searchuser in scope
			scope.searchuser = sampleSearchuserPutData;

			// Set PUT response
			$httpBackend.expectPUT(/searchusers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/searchusers/' + sampleSearchuserPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid searchuserId and remove the Searchuser from the scope', inject(function(Searchusers) {
			// Create new Searchuser object
			var sampleSearchuser = new Searchusers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Searchusers array and include the Searchuser
			scope.searchusers = [sampleSearchuser];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/searchusers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSearchuser);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.searchusers.length).toBe(0);
		}));
	});
}());