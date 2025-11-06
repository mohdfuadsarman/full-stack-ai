const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
  secret: 'express-cat-secret',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  req.session.visits = (req.session.visits || 0) + 1;
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Welcome Page</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <div class="container">
        <h1>Welcome to the Cat Lounge</h1>
        <p>You have visited this page <strong>${req.session.visits}</strong> time(s).</p>
        <img src="/my-cat.jpeg" alt="My Cat" class="cat-img">
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Express app running at http://localhost:${PORT}`);
});
