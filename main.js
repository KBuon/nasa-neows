// ============================================================================
// Author: Kuntharith Buon
// Description: Node.js wrapper for NASA's Near Earth Object Web Service (NeoWS)
// ============================================================================

// Dependency
var request = require('request');

// Errors
var callbackUndefinedError = new Error("Callback function is not defined.");
var invalidDateType = new TypeError("endDate must be of type string");
var invalidDatePatternError = new Error("Please use following format for date: yyyy-mm-dd");
var invalidAsteroidType = new TypeError("asteroid_id must be of type string");

var baseURL = "https://api.nasa.gov/neo/rest/v1/";
var endpoints = {
	'feed' : baseURL + 'feed?',
	'feedToday' : baseURL + 'feed/today?',
	'stats' : baseURL + 'stats?',
	'browse' : baseURL + '/neo/browse?',
	'asteroid' : baseURL + '/neo/'
};

// Default Parameters
var parameters = {
	'detailed' : 'true',
	'api_key' : 'DEMO_KEY'
};

// Public  
module.exports = {
	// Requires end_date (string) argument
	getFeed : function(startDate, endDate, callback) {
		if (endDate == undefined || typeof endDate !== 'string'){
			throw invalidDateType;
			return;
		}

		if(!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(endDate)){
			throw invalidDatePatternError;
			return;
		}
		var params;

		if (startDate != undefined){
			params = { 
				'start_date' : startDate,
				'end_date' : endDate,
				'detailed' : 'true',
				'api_key' : 'DEMO_KEY'
			};
		}
		else {
			 params = {
				'end_date' : endDate,
				'detailed' : 'true',
				'api_key' : 'DEMO_KEY'
			};
		}
		request({url : endpoints.feed,
			 qs: params,
			 json: true}, function(error, response, data) {
				callback (error, data);
			 });
	},
	getFeedToday : function(params, callback) {
		params = (params == undefined || typeof params === 'undefined') ? parameters : params;

		// Error Check: callback must be defined
		if (callback == undefined || typeof callback !== 'function') {
			throw callbackUndefinedError;
			return;
		}

		request({url : endpoints.feedToday,
			 qs : parameters,
			 json : true}, function (error, response, data) {
				callback(error, data);
			 });
	},
	getStats : function(callback) {
		// Error Check: callback must be defined
		if (callback == undefined || typeof callback != 'function'){
			throw callbackUndefinedError;
			return;
		}
		
		var params = {
			'api_key' : parameters.api_key
		};

		request({url : endpoints.stats, qs: params, json : true}, function (error,
		response, data) {
			callback(error, data);
		});
	},
	// Utilize default parameters if user does not define
	browse : function(params, callback) {
		params = (params == undefined || typeof params === 'undefined') ? { 
			'page' : '0',
			'size' : '20',
			'api_key' : parameters.api_key
		} : params;

		// Error Check : callback must be defined
		if (callback == undefined || typeof callback !== 'function') {
			throw callbackUndefinedError;
			return;
		}

		request({url : endpoints.browse, 
			 qs : params,
			 json: true}, function (error, response, data) {
				callback(error, data);
			 });
	},
	// Requires asteroid_id (string) argument
	getAsteroid : function(asteroid_id, callback) {
		if (asteroid_id == undefined || typeof asteroid_id !== 'string'){
			throw invalidAsteroidType;
			return;
		}
		var url = endpoints.asteroid + asteroid_id + '?';
		var params = {
			'api_key' : 'DEMO_KEY'
		};

		request({url: url,
			 qs: params,
			 json : true}, function (error, response, data) {
				callback(error, data);
			 });
	}
};
