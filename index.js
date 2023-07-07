// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date', (req, res) => {
  const { date } = req.params;
  // Check if the provided date is a valid date string
  if (!Date.parse(date) && !(date.length == 13)) {
    // console.log('oh no')
    // console.log(date.length == 13)
    res.status(400).json({ error: 'Invalid date' });
  }

  const timestamp = Date.parse(date);
  const utcDate = new Date(timestamp).toUTCString();

  res.json({ unix: timestamp, utc: utcDate });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
