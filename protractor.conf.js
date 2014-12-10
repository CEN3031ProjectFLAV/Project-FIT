exports.config = {

	specs: [
		'test/e2e/spec.js'
	],

	jasmineNodeOpts: {
	  showColors: true,
	  //defaultTimeoutInterval: 30000
	  enableTimeouts:false
	},

	onPrepare: function(){
		require('./server')
	}
}
