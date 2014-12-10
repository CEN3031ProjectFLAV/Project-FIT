var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/projectfit-test');


describe('Search for users', function(){

	it('Should be able to displays all users in the database', function(){
		
		//Go to homepage
		browser.get('http://localhost:3001')


		var firstNames = ['Lulu', 'Victor', 'Jacob', 'Flo', 'Alicia', 'Alex']
		var lastNames = ['D', 'M', 'C', "B", 'M', 'C']

		for(var i = 0; i < 6; i++){

			//browser.driver.manage().window().setSize(1280, 1024)

			//Click 'Sign up' on the nav bar
			element(by.css('nav .register')).click()

			//Fill out form and submit to create a random new account
			element(by.model('credentials.firstName')).sendKeys(firstNames[i])
			element(by.model('credentials.lastName')).sendKeys(lastNames[i])
			element(by.model('credentials.email')).sendKeys('testEmail' + '@gmail.com')
			element.all(by.id('username')).get(1).sendKeys(firstNames[i] + lastNames[i])
			element.all(by.id('password')).get(1).sendKeys('1234567')
			element(by.css('form .signUpBtn')).click()

			element(by.id('newUser')).click()
			element(by.id('CreateScheduleLater')).click()

			//browser.pause()

			//Tell the browser to sleep for 0.5 second before click on nav bar for it to fully load. Or else Element not clickable error occurs
			browser.sleep(500)
			element(by.id('navDropDown')).click()
			element(by.id('userSignOut')).click()
		}

		//Sign in
		element(by.id('username')).sendKeys('LuluD')
		element(by.id('password')).sendKeys('1234567')
		element(by.id('signIn')).click()


		//Search user page
		browser.get('http://localhost:3001/#!/searchusers')

		var userList = element.all(by.repeater('user in users'))
		expect(userList.count()).toBe(5)

	})

	it('Should be able to search user in the database', function(){
		
		//Search for user
		element(by.model('searchKeyword')).sendKeys('vic')
		var userList = element.all(by.repeater('user in users | filter:searchKeyword'))
		expect(userList.count()).toBe(1)

	})

	afterEach(function(){
		//Clear database
		db.db.dropDatabase()
	})

	//TODO: test for adding friend function

})