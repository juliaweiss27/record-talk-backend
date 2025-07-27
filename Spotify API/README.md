# SpotifyAPI Backend – Project README

Welcome to your Spotify API backend!\
This project authenticates with Spotify and fetches a user’s playlists.\
Use this README to quickly get set up, understand the folder structure, and know what files matter most.

---

## Project Structure

```
SpotifyAPI/
├── server.js              # Main server code (Express backend)
├── package.json           # Node.js dependencies & scripts
├── package-lock.json      # Exact dependency versions (auto-generated)
├── localhost-key.pem      # Local SSL key for HTTPS (for localhost only)
├── localhost-cert.pem     # Local SSL certificate (for localhost only)
├── README.md              # This file!
└── .env                   # (Optional) Environment variables for secrets
```

---

## Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/juliaweiss27/record-talk-backend.git
cd record-talk-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

For local development, create a `.env` file with your Spotify credentials (recommended for secrets):

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
REDIRECT_URI=https://localhost:55028/callback
```

Or, edit them directly in `server.js` (not recommended for production).

### 4. Running Locally

```bash
node server.js
```

- Local server will run at: [**https://localhost:55028**](https://localhost:55028)
- To test login: open [https://localhost:55028/login](https://localhost:55028/login)

### 5. For Deployment (Render or similar)

- Set environment variables for secrets (client id, secret, redirect uri) in your Render dashboard.
- Your backend will be available at `https://record-talk-backend.onrender.com`
- Use this URL (with `/login` and `/callback`) for your Spotify app’s **Redirect URIs**.

---

## Key Files To Know

- **server.js**\
  Main Express server; handles Spotify OAuth login and callback.

- **package.json**\
  All Node.js dependencies; edit this to add packages.

- **localhost-cert.pem / localhost-key.pem**\
  SSL certificate and key for running HTTPS locally. Not needed on Render.

- **README.md**\
  Project instructions (this file).

---

## Common Issues & Fixes

- **Invalid redirect URI:**\
  Make sure your Spotify Developer Dashboard’s redirect URI matches your deployed backend (and local, if testing).

- **502/Timeout on Render:**\
  Use `app.listen(process.env.PORT || 55028)` instead of a fixed port number. Render assigns a dynamic port.

  ```js
  const PORT = process.env.PORT || 55028;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  ```

- **HTTPS locally, HTTP on Render:**\
  Only use HTTPS and your SSL files on localhost. On Render, use HTTP (`app.listen`).

---

## Fast Access

- To start local dev: **Open **``** and **``** in VS Code**
- To debug auth: Check **Spotify Developer Dashboard > App > Redirect URIs**
- To deploy: Push to your GitHub repo, Render auto-deploys

---

## Quick Reference: Useful Commands

```bash
# Start local server
node server.js

# Install dependencies
npm install

# See logs on Render
render.com > your service > Logs
```

---

## Questions or Changes?

- Open `server.js` for backend logic.
- Update secrets in `.env` or Render dashboard.
- Edit this README if you add new features.

---

*Happy building!*\
If you need more help, just ask. I can update this README any time you want.

---

Let me know if you want to **customize this with your actual client id, URL, or any other info**!\
If you want to use environment variables or want a sample `.env` file, just say the word.

