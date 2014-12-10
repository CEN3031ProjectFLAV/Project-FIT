var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/projectfit-test');

//db.db.dropDatabase();


describe('Post status', function(){

	it('Should be able to go to sign up page', function(){
		//Go to homepage
		browser.get('http://localhost:3001')

		//Click 'Sign up' on the nav bar
		element(by.css('nav .register')).click()
		expect(browser.getCurrentUrl()).toContain('signup')

	});


	it('Should be able to complete first sign up page', function(){
		//Fill out form and submit to create a random new account
		var randomInt = Math.floor(Math.random() * 100001) //generate a random number b\w 0 and 500
		element(by.model('credentials.firstName')).sendKeys('testFirstName' + randomInt)
		element(by.model('credentials.lastName')).sendKeys('testLastName' + randomInt)
		element(by.model('credentials.email')).sendKeys('testEmail' + randomInt + '@gmail.com')
		element.all(by.id('username')).get(1).sendKeys('user' + randomInt)
		element.all(by.id('password')).get(1).sendKeys('1234567')
		element(by.css('form .signUpBtn')).click()
		expect(browser.getCurrentUrl()).toContain('signup2')
	});

	it('Should be able to complete 2nd sign up page', function(){
		element(by.id('weight')).sendKeys('20');
		element(by.id('age')).sendKeys('20');
		element(by.id('newUser')).click()
		element(by.id('CreateScheduleLater')).click()
		expect(browser.getCurrentUrl()).toContain('profilepage')
	});


	it('Should be able to post a status', function(){

		browser.sleep(500);
		//Type in a new status and click 'submit query'
		var status = 'My status ' + Math.random()
		element(by.model('listposts.post')).sendKeys(status)
		element(by.css('form .postStatusBtn')).click()
		var statusList = element.all(by.repeater('post in posts'))
		expect(statusList.first().getText()).toContain(status)
	});

	it('Should be able to sign out', function(){
		element(by.id('navDropDown')).click()
		element(by.id('userSignOut')).click()
		expect(browser.getCurrentUrl()).toEqual('http://localhost:3001/#!/')
	});

});


describe('Search for users', function(){

	it('Should be able to sign in', function(){
		
		//Go to homepage
		browser.get('http://localhost:3001')


		var firstNames = ['Lulu', 'Victor', 'Jacob', 'Flo', 'Alicia', 'Alex']
		var lastNames = ['D', 'M', 'C', "B", 'M', 'C']
		var randomInt = Math.floor(Math.random() * 100001) //generate a random number b\w 0 and 500

		for(var i = 0; i < 6; i++){
			//Click 'Sign up' on the nav bar
			element(by.css('nav .register')).click()

			//Fill out form and submit to create a random new account
			element(by.model('credentials.firstName')).sendKeys(firstNames[i])
			element(by.model('credentials.lastName')).sendKeys(lastNames[i] + randomInt)
			element(by.model('credentials.email')).sendKeys('testEmail' + randomInt + '@gmail.com' )
			element.all(by.id('username')).get(1).sendKeys(firstNames[i] + lastNames[i] + randomInt)
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
		element(by.id('username')).sendKeys('LuluD' + randomInt)
		element(by.id('password')).sendKeys('1234567')
		element(by.id('signIn')).click()

		expect(browser.getCurrentUrl()).toContain('profilepage')

	});

	it('Should be able display all users in the database', function(){
		//Search user page
		browser.get('http://localhost:3001/#!/searchusers')

		var userList = element.all(by.repeater('user in users'))
		expect(userList.count()).toBeGreaterThan(5)
	})



	it('Should be able to search user in the database', function(){
		
		//Search for user
		element(by.model('searchKeyword')).sendKeys('vic')
		var userList = element.all(by.repeater('user in users | filter:searchKeyword'))
		expect(userList.count()).toBeGreaterThan(0)

	});

});


describe('Add friend', function(){
	it('Should be able to redirect to friend profile page after added friend', function(){
		element(by.model('searchKeyword')).clear()

		var userList = element.all(by.repeater('user in users'))
		//var friendInfo = userList.get(0).getText()
		element.all(by.id('addFriendBtn')).get(0).click()
		expect(browser.getCurrentUrl()).toContain('friends')

	});

	
	//it('Should be added to the friend list', function(){
	//	browser.get('http://localhost:3000/#!/friends')
	//	var friendList = element.all(by.repeater('user in users'))
	//	var newFriend = friendList.get(0)
	//	expect(browser.getCurrentUrl).toContain(newFriend.getText())
	//});

	/*
	it('View friend profile redirects to friend profile page', function(){
		browser.get('http://localhost:3000/#!/friends')
		element.all(by.id('viewFriendProfile')).get(0).click()
		expect(browser.getCurrentUrl()).toContain('friends')
	})*/


});

