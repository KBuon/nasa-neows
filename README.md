# nasa-neows
Node.js wrapper for NASA's Near Earth Object Web Service (NeoWS)

## Status
[![Build
Status](https://travis-ci.org/KBuon/nasa-neows.svg?branch=master)](https://travis-ci.org/KBuon/nasa-neows)

## Installation
```
npm install nasa-neows
```

## Usage
<b>Initialization</b>
```
var nasa = require('nasa-neows');
var client = new nasa("api_key_goes_here"); 
// If you dont have an api_key you can use the demo key which is ```DEMO_KEY``
// please see the "Rate Limits" for more info.
```

<b>Callback:</br></b>
The callback function requires two arguments, ```error``` and ```data```. If
the request fails, the ```error``` will be an ```Error``` object. Otherwise,
the ```data``` argument will contain the JSON that is returned by the API.

<b>Retrives a list of Near Earth Objects within a date range, the max range in one query is seven days.</b>
```
client.getFeed(options, callback);
```

Argument(s):
* ```options```: options is an object type containing start_date(optional), end_date(required), detailed(required).
```
var options = {
  'start_date': '2016-09-13', //If not using start_date, set to null
  'end_date': '2016-09-14',
  'detailed': 'true'
};
```

<b>Retrieves a list of Near Earth Objects for today</b>
```
client.getFeedToday(isDetailed, callback);
```

Argument(s):
* ```isDetailed```: boolean variable used to determine whether the JSON returned is filled with basic/detailed information

<b>Retrives current Near Earth Object statistics</b>
```
client.getStats(callback);
```

<b>Retrieve a paginated list of Near Earth Objects</b>
```
client.browse(options, callback);
```

Argument(s):
* ```options```: options is an object type containing the page number (string) and size (string) of page.
```
var options = {
  'page': '0',
  'size': '20'
};
```

<b>Retrieves Near Earth Objects with a given id</b>
```
client.getAsteroid(asteroid_id, callback);
```

Argument(s):
* ```asteroid_id```:[string] ID of asteroid

## Rate Limits
nasa-neows utilizes the ```DEMO_KEY``` api key which will limit you to 30 requests per hour and 50 requests per day. You can register for your own API key [here](https://api.nasa.gov/index.html#apply-for-an-api-key), which will bump your limit up to 1000 requests per hour, and no daily limit. [See more on NASA's rate limiting](https://api.nasa.gov/api.html#web-service-rate-limits).
