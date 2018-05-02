const express = require('express');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const cors = require('cors');
const passport  = reqiure('passport');
const cookieParser = require('cookie-parser');

const { userController } = require('./routes');
const { boardController } = require('./routes');

const app = express();

mongoose.connect('mongodb://root:artemko_2013@ds263109.mlab.com:63109/nodejs-test', (err) => {
  if(err) {
    console.log(err);
  }
})

app.use(express.json());

app.use(cookieParser())

app.use(expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());

app.use(passport.expressSession())

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