var should = require('should');
var nasa = require('../main.js');
var client = new nasa('DEMO_KEY');

describe('setup', function(){
	it('should check initialization', function(done){
		(function(){
			var client = new nasa();
		}).should.throw();
		
		(function(){
			var client = new nasa(new String('DEMO_KEY'));
		}).should.throw();

		(function(){
			var client = new nasa(null);
		}).should.throw();

		(function(){
			var client = new nasa('DEMO_KEY');
		}).should.not.throw();

		(function(){
			var client = new nasa(new
			String('DEMO_KEY').toString());
		}).should.not.throw();

		done();
	});
});

describe('get feed', function(){
	it('test options arg', function(done){
		(function(){
			client.getFeed();
		}).should.throw();

		(function(){
			client.getFeed(null);
		}).should.throw();

		(function(){
			client.getFeed(null, null);
		}).should.throw();	
	
		// options cannot be empty; 
		(function(){
			var options = {};
			client.getFeed(options, function(error, data){
				if (error) return done(error);
			});
		}).should.throw();		
		
		(function(){
			client.getFeed(true, function(error, data){
				if (error) return done(error);
			});
		}).should.throw();
		done();
	});

	it('test callback arg', function(done){
		var options = {
			'start_date': '2016-09-18', 
			'end_date': '2016-09-20',
			'detailed': 'true'
		};

		(function(){
			client.getFeed(options, null);
		}).should.throw();

		(function(){
			client.getFeed(options, function(){});
		}).should.throw();

		(function(){
			client.getFeed(options, function(error){
				if (error) return done(error);
			});
		}).should.throw();

		(function(){
			client.getFeed(options, function(error, resp, data){
				if (error) return done(error);
			});
		}).should.throw();

		(function(){
			client.getFeed(options, function(error, data){
				if (error) return done(error);
			});
		}).should.not.throw();	

		done();
	});
});

describe('get feed today', function(){
	it('test setup', function(done){
		(function(){
			client.getFeedToday();
		}).should.throw();

		(function(){
			client.getFeedToday(null);
		}).should.throw();

		(function(){
			client.getFeedToday(null, null);
		}).should.throw();
		
		(function(){
			client.getFeedToday(true, function(error, data){
				if (error) return done(error);
			});
		}).should.not.throw();
	
		done();
	});

	it('test isDetailed', function(done){
		(function(){
			client.getFeedToday(true, function(error, data){
				if (error) return done(error);
			});
		}).should.not.throw();
		
		(function(){
			client.getFeedToday(new Boolean(new
			String("true").toString()), function(error, data){
				if (error) return done(error);
			});
		}).should.throw();

		(function(){
			client.getFeedToday((new Boolean(new
			String("true").toString())).valueOf(), function(error, data){
				if (error) return done(error);
			});
		}).should.not.throw();

		(function(){
			client.getFeedToday((new Boolean("true")).valueOf(),
			function(error, data){
				if (error) return done(error);
			});
		}).should.not.throw();

		(function(){
			client.getFeedToday(new Boolean("true"),
			function(error, data){
				if (error) return done(error);
			}).should.throw();
		});

		(function(){
			client.getFeedToday("true", function(error, data){
				if (error) return done(error);
			});		
		}).should.throw();

		done();
	});

	it('test callback', function(done){
		(function(){
			client.getFeedToday(true, null);
		}).should.throw();

		(function(){
			client.getFeedToday(true, function(error){
				if (error) return done(error);
			});
		}).should.throw();

		(function(){
			client.getFeedToday(true, function(error, data, other){
				if (error) return done(error);
			});
		}).should.throw();

		(function(){
			client.getFeedToday(true, function(error, data){
				if (error) return done(error);
			}).should.not.throw();
		});
		done();	
	});
});

describe('get stats', function(){
	it('setup', function(done){
		(function(){
			client.getStats();
		}).should.throw();

		(function(){
			client.getStats(null);
		}).should.throw();

		(function(){
			client.getStats(function(){});
		}).should.throw();

		(function(){
			client.getStats(function(error, data){
				if (error) return done(error);
			});
		}).should.not.throw();
		done();
	});

	it('test callback', function(done){
		(function(){
			client.getStats(function(error){});
		}).should.throw();
		done();
	});
});

describe('browse', function(){
	it('setup', function(done){
		(function(){
			client.browse({'page':'0', 'size':'20'},
			function(error, data){
				if (error) return done(error);
			});
		}).should.not.throw();

		(function(){
			client.browse(null, function(error, data){
				if (error) return done(error);
			});		
		}).should.throw();
		done();
	});

	it('test options', function(done){
		(function(){
			client.browse({}, function(error, data){
				if (error) return done(error);
			});
		}).should.throw();

		done();
	});

	it('test callback', function(done){
		(function(){
			client.browse({'page':'0', 'size':'20'},
			function(error, data){
				if (error) return done(error);
			});
		}).should.not.throw();

		(function(){
			client.browse({'page':'0', 'size': '20'}, function(){});
		}).should.throw();

		done();	
	});
});

describe('get asteroid', function(){
	it('setup', function(done){
		(function(){
			client.getAsteroid();
		}).should.throw();

		(function(){
			client.getAsteroid(null, null);
		}).should.throw();

		(function(){
			client.getAsteroid(null);
		}).should.throw();

		done();
	});

	it('test asteroid_id', function(done){
		(function(){
			client.getAsteroid("1", function(error, data){
				if (error) return done(error);
			});
		}).should.not.throw();

		(function(){
			client.getAsteroid(new String("1").toString(),
			function(error, data){
				if (error) return done(error);
			});
		}).should.not.throw();

		(function(){
			client.getAsteroid(1, function(error, data){
				if (error) return done(error);
			});
		}).should.throw();
		
		done();
	});

	it('test callback', function(done){
		(function(){
			client.getAsteroid("1", null);
		}).should.throw();

		(function(){
			client.getAsteroid("1", function(error){
				if (error) return done(error);
			});
		}).should.throw();

		(function(){
			client.getAsteroid("1", function(error, data){
				if (error) return done(error);
			});
		}).should.not.throw();

		done();
	});

});
