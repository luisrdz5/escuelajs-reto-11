const express = require('express');
const app = express();

const { config } = require('./config');
const authApi = require('./routes/auth');
const platziStore = require('./routes');
const responseTime = require('response-time')


app.get('/', (req, res) => {
  let userInfo = req.header("user-agent");
  res.send(`UserInfo: ${userInfo}`);
});
app.use(express.json());
app.use(responseTime());
authApi(app);
platziStore(app);


app.listen(config.port, err => {
  if (err) {
    console.error("Error: ", err);
    return;
  }
  console.log(`Listening http://localhost:${config.port}`);
});