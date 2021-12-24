const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.send(`
    <form action="/create-user" method="POST">
      <label for="username">Your Name</label>
      <input id="username" type="text" name="username" placeholder="Full name">
      <button type="submit">Submit</button>
    </form>
  `);
});

app.get('/current-time', (_req, res) => {
  res.send(`<h1>${new Date().toISOString()}</h1>`);
});

app.post('/create-user', (req, res) => {
  const { username } = req.body;

  const filePath = path.join(__dirname, 'data', 'users.json');
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData.toString());

  existingUsers.push(username);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send(`<h1>Hello ${username}</h1>`);
});

app.get('/users', (_req, res) => {
  const filePath = path.join(__dirname, 'data', 'users.json');
  const fileData = fs.readFileSync(filePath);
  const users = JSON.parse(fileData.toString());

  let responseData = '<h1>User List</h1>';
  responseData += '<ul>';

  for (const user of users) {
    responseData += `<li>${user}</li>`;
  }

  responseData += '</ul>';

  res.send(responseData);
});

app.listen(3000, () => {
  console.log(`Server running at port 3000`);
});
