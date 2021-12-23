const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/current-time', (req, res, next) => {
  res.send(`<h1>${new Date().toISOString()}</h1>`);
});

app.listen(3000, () => {
  console.log(`Server running at port 3000`);
});
