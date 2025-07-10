require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

<<<<<<< HEAD


const dns = require('dns');



app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// GLOBAL URL DB
let urlDatabase = {};
let counter = 1;

// POST SHORTENER
app.post('/api/shorturl', (req, res) => {
  const originalUrl = req.body.url;

=======
let urlDatabase = {};
let counter = 1;

app.post("/api/shorturl", (req, res) => {
  const originalUrl = req.body.url;

  // Validate URL
>>>>>>> 8f27a4a1e62c9f854beb4b3e7ed776550ecf3f29
  try {
    const urlObj = new URL(originalUrl);
    dns.lookup(urlObj.hostname, (err) => {
      if (err) {
<<<<<<< HEAD
        return res.json({ error: 'invalid url' });
      }

      const shortUrl = counter++;
      urlDatabase[shortUrl] = originalUrl;

      return res.json({
        original_url: originalUrl,
        short_url: shortUrl
      });
    });
  } catch {
    return res.json({ error: 'invalid url' });
  }
});

// REDIRECT
app.get('/api/shorturl/:short', (req, res) => {
  const originalUrl = urlDatabase[req.params.short];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.json({ error: 'No short URL found for given input' });
  }
});


=======
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
>>>>>>> 8f27a4a1e62c9f854beb4b3e7ed776550ecf3f29
