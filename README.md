# nasa-neows
Node.js wrapper for NASA's Near Earth Object Web Service (NeoWS)

## Installation
```
npm install nasa-neows
```

## Public Methods
```
  getFeed(startDate, endDate, callback); //startDate is optional
  getFeedToday(params, callback); //params is optional
  getStats(callback);
  browse(params, callback); // params is optional
  getAsteroid(asteroid_id, callback);
```

## Usage

<b>with default configurations</b>

```
var client = require('nasa-neows');

client.getFeed(null, "2016-04-10", function (error, data) {
    if (error){
      console.log( error);
    } else {
      console.log(data);
    }
});

```



## Rate Limits
nasa-neows utilizes the ```DEMO_KEY``` api key which will limit you to 30 requests per hour and 50 requests per day. You can register for your own API key [here](https://api.nasa.gov/index.html#apply-for-an-api-key), which will bump your limit up to 1000 requests per hour, and no daily limit. [See more on NASA's rate limiting](https://api.nasa.gov/api.html#web-service-rate-limits).
