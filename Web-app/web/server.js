const express = require('express');
const app = express();

const port = 3000;
const base = `${__dirname}`;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${base}/index.html`);
});

app.get('/home', (req, res) => {
  res.sendFile(`${base}/home.html`);
});

app.get('/reg', (req, res) => {
  res.sendFile(`${base}/register.html`);
});

app.get('/led', (req, res) => {
  res.sendFile(`${base}/led-control.html`);
});

app.get('/send-command', (req, res) => {
  res.sendFile(`${base}/send-command.html`);
});

app.get('/send-command1', (req, res) => {
  res.sendFile(`${base}/send-command1.html`);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});