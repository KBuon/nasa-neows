// Dependency
var request = require('request');

//Errors
var undefApiKey = new Error("'api_key' is not defined");
var undefCallback = new Error("'callback' function is not defined");
var undefOptions = new Error("'options' is not defined");
var undefDetailed = new Error("'isDetailed' is not defined");
var undefAsteroidID = new Error("'asteroid_id' is not defined");

var apiKeyType = new TypeError("'api_key' must be of type string");
var invalidCallbackType = new TypeError("'callback' must be a function");
var invalidOptionsType = new TypeError("'options' must be of type object");
var invalidDetailedType = new TypeError("'isDetailed' must be of type boolean");
var invalidAsteroidType = new TypeError("'asteroid_id' must be of type string");

// Endpoints 
var baseURL = "https://api.nasa.gov/neo/rest/v1/";
var endpoints = {
	'feed' : baseURL + 'feed?',
	'feedToday' : baseURL + 'feed/today?',
	'stats' : baseURL + 'stats?',
	'browse' : baseURL + '/neo/browse?',
	'asteroid' : baseURL + '/neo/'
};

var client  = function(api_key) {
	if (api_key == undefined){
		throw undefApiKey;
		return;
	} else if (typeof api_key !== 'string'){
		throw apiKeyType;
		return;
	}

	this.api_key = api_key;
};
/*
	var options = {
		'start_date': 'xyz',
		'end_date' : 'xyz',
		'isDetailed' : true | false
	};
*/
client.prototype.getFeed = function(options, callback){
	// Error checking
	if (options == undefined){
		throw undefOptions;
		return;
	} else if (typeof options !== 'object'){
		throw invalidOptionsType;
		return;
	}

	if (callback == undefined){
		throw undefCallback;
		return;
	} else if (typeof callback !== 'function'){
		throw invalidCallbackType;
		return;
	}

	var params = {};

	for (var x in options){
		if (options[x] != null){
			params[x] = options[x];
		}
	}
	params["api_key"] = this.api_key;
	
	request({url: endpoints.feed, qs: params, json: true},
		function(error, response, data){
			callback(error, data);
		});
};

client.prototype.getFeedToday  = function(isDetailed, callback){
	// Error checking
	if (isDetailed == undefined){
		throw undefDetailed;
		return;
	} else if (typeof isDetailed !== 'boolean'){
		throw invalidDetailedType;
		return;
	}

	if (callback == undefined){
		throw undefCallback;
		return;
	} else if (typeof callback !== 'function'){
		throw invalidCallbackType;
		return;
	}

	var params = {
		'detailed' : isDetailed.toString().toLowerCase(),
		'api_key' : this.api_key
	};

	request({url: endpoints.feedToday, qs: params, json: true},
		function(error, response, data){
			callback(error, data);
		});
};

client.prototype.getStats = function(callback){
	// Error checking
	if (callback == undefined){
		throw undefCallback;
		return;
	} else if (typeof callback !== 'function'){
		throw invalidCallbackType;
		return;
	}

	var params = { 
		'api_key' : this.api_key
	};
	
	request({url: endpoints.stats, qs: params, json: true},
		function(error, response, data){
			callback(error, data);
		});
};

client.prototype.browse = function(options, callback){
	// Error checking
	if (options == undefined){
		throw undefOptions;
		return;
	} else if (typeof options !== 'object'){
		throw invalidOptionsType;
		return;
	}

	if (callback == undefined){
		throw undefCallback;
		return;
	} else if (typeof callback !== 'function'){
		throw invalidCallbackType;
		return;
	}

	var params = {};

	for (var x in options){
		params[x] = options[x];
	}
	params["api_key"] = this.api_key;

	request({url: endpoints.browse, qs: params, json:true}, 
		function(error, response, data){
			callback(error, data);
		});
};

client.prototype.getAsteroid = function(asteroid_id, callback){
	// Error checking
	if (asteroid_id == undefined){
		throw undefAsteroidID;
		return;
	} else if (typeof asteroid_id !== 'string'){
		throw invalidAsteroidType;
		return;
	}

	if (callback == undefined){
		throw undefCallback;
		return;
	} else if (typeof callback !== 'function'){
		throw invalidCallbackType;
		return;
	}

	var url = endpoints.asteroid + asteroid_id + '?';
	var params = {
		'api_key' : this.api_key
	};

	request({url:url, qs: params, json: true},
		function(error, response, data){
			callback(error, data);
		});
};

module.exports = client;
