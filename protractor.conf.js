exports.config = {

	specs: [
		'test/e2e/post_a_status.spec.js'
	],

	jasmineNodeOpts: {
	  showColors: true,
	  defaultTimeoutInterval: 30000
	},

	onPrepare: function(){
		require('./server')
	}
}
