const express = require('express');
const request = require('request');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');

const client_id = '7b637bfb43a44a99b8dc308d4c0da47f';
const client_secret = '7e9b94fcb1d842d386878f7b760351d6';
const redirect_uri = 'https://localhost:55028/callback';

const app = express();
app.use(cookieParser());

const stateKey = 'spotify_auth_state';

const generateRandomString = length => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

app.get('/login', (req, res) => {
  res.send("Login route works!");
  console.log("🔥 /login route was called");
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = 'user-read-private user-read-email playlist-read-private';
  const authQueryParameters = querystring.stringify({
  response_type: 'code',
  client_id: client_id,
  scope: scope,
  redirect_uri: redirect_uri,
  state: state
});

console.log("Redirecting to:", 'https://accounts.spotify.com/authorize?' + authQueryParameters);

res.redirect('https://accounts.spotify.com/authorize?' + authQueryParameters);

});

app.get('/callback', (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (!state || state !== storedState) {
    return res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
  }

  res.clearCookie(stateKey);

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: { code, redirect_uri, grant_type: 'authorization_code' },
    headers: {
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const { access_token } = body;
      request.get({
        url: 'https://api.spotify.com/v1/me/playlists',
        headers: { Authorization: 'Bearer ' + access_token },
        json: true
      }, (err, resp, playlists) => {
        res.send(playlists);
      });
    } else {
      res.redirect('/#' + querystring.stringify({ error: 'invalid_token' }));
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello from HTTPS server on port 55028!');
});

const sslOptions = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
};

const PORT = process.env.PORT || 55028; //can also use 5500
app.listen(PORT, () => {
  console.log(`✅ Listening on port ${PORT}`);
});


