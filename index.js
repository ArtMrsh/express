const express = require('express');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const cors = require('cors');

const { userController } = require('./routes');
const { boardController } = require('./routes');

const app = express();

mongoose.connect('mongodb://root:artemko_2013@ds263109.mlab.com:63109/nodejs-test', (err) => {
  if(err) {
    console.log(err)
  }
})

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