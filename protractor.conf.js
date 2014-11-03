exports.config = {
	framework:'mocha',

	specs: [
		'test/e2e/post_a_status.spec.js'
	],

	mochaOpts:{
		enableTimeouts:false
	},


	onPrepare: function(){
		require('./server')
	}


}