require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

let urlDatabase = {};
let counter = 1;

app.post("/api/shorturl", (req, res) => {
  const originalUrl = req.body.url;

  // Validate URL
  try {
    const urlObj = new URL(originalUrl);
    dns.lookup(urlObj.hostname, (err) => {
      if (err) {
        return res.json({ error: "invalid url" });
      } else {
        const shortUrl = counter++;
        urlDatabase[shortUrl] = originalUrl;

        return res.json({
          original_url: originalUrl,
          short_url: shortUrl
        });
      }
    });
  } catch (err) {
    return res.json({ error: "invalid url" });
  }
});

app.get("/api/shorturl/:short_url", (req, res) => {
  const shortUrl = req.params.short_url;
  const originalUrl = urlDatabase[shortUrl];

  if (originalUrl) {
    return res.redirect(originalUrl);
  } else {
    return res.status(404).json({ error: "No short URL found for given input" });
  }
});
