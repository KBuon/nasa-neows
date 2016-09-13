# nasa-neows
Node.js wrapper for NASA's Near Earth Object Web Service (NeoWS)

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


## Rate Limits
nasa-neows utilizes the ```DEMO_KEY``` api key which will limit you to 30 requests per hour and 50 requests per day. You can register for your own API key [here](https://api.nasa.gov/index.html#apply-for-an-api-key), which will bump your limit up to 1000 requests per hour, and no daily limit. [See more on NASA's rate limiting](https://api.nasa.gov/api.html#web-service-rate-limits).
