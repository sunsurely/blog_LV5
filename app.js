const express = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.set('port', process.env.PORT);

app.get('/api', (req, res) => {
  res.send('환영합니다!');
});

app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '포트로 서버가 열렸습니다!');
});
