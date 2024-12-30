const express = require('express');
//const morgan = require('morgan');
const app = express();

// Middleware to capture the real IP
app.use((req, res, next) => {
  const forwardedFor = req.headers['x-forwarded-for'];

  console.log(`use: ${forwardedFor}`);

  // Verifica se existe o cabeçalho X-Forwarded-For e pega o último IP na lista
  if (forwardedFor) {
    // O forwardedFor é uma string de IPs separados por vírgula. Pegamos o último.
    
    const ips = forwardedFor.split(',');
    req.forwardedIp = ips[ips.length - 1].trim();  // Pega o último IP e remove espaços extras
    //console.log(`use: dentro do if, req.ip = ${req.ip}`)
  }

  next();
});

// Middleware to log all requisitions
//app.use(morgan(':remote-addr :method :url :status :response-time ms'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET route
app.get('*', (req, res) => {
  console.log(`GET Request from IP: ${req.ip}, FORWARDED IP: ${req.forwardedIp}, URL: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  res.send('GET request logged');
});

// POST route
app.post('*', (req, res) => {
  console.log(`POST Request from IP: ${req.ip}, FORWARDED IP: ${req.forwardedIp}, URL: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  res.send('POST request logged');
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

