const express = require('express');
const { userController } = require('./routes');
const { boardController } = require('./routes');
const app = express();
const expressValidator = require('express-validator');
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.use(expressValidator());

app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

app.use('/user', userController);

app.use('/board', boardController);

app.listen(3001, () => {
  console.log('Server running on 3001 port')
})