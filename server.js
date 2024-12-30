const express = require('express');
//const morgan = require('morgan');
const app = express();

// Middleware to capture the real IP
app.use((req, res, next) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  console.log(`use : ${forwardedFor}`)
  if (forwardedFor) {
    req.ip = forwardedFor.split(',')[0];
  }
  next();
});

// Middleware to log all requisitions
//app.use(morgan(':remote-addr :method :url :status :response-time ms'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET route
app.get('*', (req, res) => {
  console.log(`GET Request from IP: ${req.ip}, URL: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  const forwardedFor = req.headers['x-forwarded-for'];
  console.log(`use : ${forwardedFor}`)
  res.send('GET request logged');
});

// POST route
app.post('*', (req, res) => {
  console.log(`POST Request from IP: ${req.ip}, URL: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  res.send('POST request logged');
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

