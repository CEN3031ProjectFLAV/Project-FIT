describe('Post status', function(){
	it('Create an account and post a status', function(){
		
		//Go to homepage
		browser.get('http://localhost:3001')

		//Click 'Sign up' on the nav bar
		element(by.css('nav .register')).click()
		//Issue loading the page when using browser.pause() 

		//Fill out form and submit to create a random new account
		var randomInt = Math.floor(Math.random() * 10001) //generate a random number b\w 0 and 500
		element(by.model('credentials.firstName')).sendKeys('testFirstName' + randomInt)
		element(by.model('credentials.lastName')).sendKeys('testLastName' + randomInt)
		element(by.model('credentials.email')).sendKeys('testEmail' + randomInt + '@gmail.com')
		element(by.model('credentials.gender')).sendKeys('female')
		element.all(by.id('username')).get(1).sendKeys('user' + randomInt)
		element.all(by.id('password')).get(1).sendKeys('1234567')
		element(by.css('form .signUpBtn')).click()

		//Click 'Profile' on the nav bar
		element(by.css('nav .profilepage')).click()

		//Type in a new status and click 'submit query'
		var status = 'My status ' + Math.random()		
		element(by.model('listposts.post')).sendKeys(status)
		element(by.css('form .postStatusBtn')).click()
		var statusList = element.all(by.repeater('post in posts'))
		expect(statusList.first().getText()).toContain(status)

	})
})