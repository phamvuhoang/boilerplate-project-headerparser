// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//User stories:
//I can get the IP address, preferred languages (from header Accept-Language) and system infos (from header User-Agent) for my device.
//Example usage:
//[base_url]/api/whoami
//Example output:
//{"ipaddress":"159.20.14.100","language":"en-US,en;q=0.5","software":"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:50.0) Gecko/20100101 Firefox/50.0"}

//{"headers":{"connection":"close","x-forwarded-for":"125.234.97.66,::ffff:10.10.11.98,::ffff:10.10.10.10","x-forwarded-proto":"https,http,http","x-forwarded-port":"443,80,80","host":"trail-adapter.glitch.me","x-amzn-trace-id":"Root=1-5c36e986-6cea57aa98c52f2cb7131628","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8","accept-encoding":"gzip, deflate, br","accept-language":"vi,en-US;q=0.9,en;q=0.8","if-none-match":"W/\"2f7-rYNpC2J9jnoBgZvtTKW28vJ4lB0\"","x-request-id":"19aa3c640fcd2fff","x-glitch-routing":"d1f9e57a-a31f-4102-aef2-911c5cc0cf1e:1085","x-forwarded-host":"trail-adapter.glitch.me"}}

app.get('/api/whoami', function(req, res) {
  res.json({
    ipaddress: req.get('x-forwarded-for'),
    language: req.get('accept-language'),
    software: req.get('user-agent'),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
