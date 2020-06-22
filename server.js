// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Used to allow us to return the client IP. NOTE: this uses express's X-Forwarded-* Headers, which are
// easily spoofed. AKA, unreliable to get the REAL IP of a client. Although enough for this challenge.
app.enable('trust proxy');

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  // raw
  var ip = req.ip;
  var lang = req.get('accept-language');
  var os = req.headers['user-agent'];
  
  // parsed
  lang = lang.substring(0, lang.indexOf(","));
  os = os.substring(os.indexOf("(") + 1,os.indexOf(")")); 
  res.json({ip: ip, lang: lang, os: os});
});

// Simple in-memory store
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
]

app.get("/dreams", (request, response) => {
  response.send(dreams)
})

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", (request, response) => {
  dreams.push(request.query.dream)
  response.sendStatus(200)
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
