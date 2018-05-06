const express = require('express');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const cors = require('cors');
const passport  = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const graphql = require('./graphql/index');

const { userController } = require('./routes');
const { boardController } = require('./routes');
const { listController } = require('./routes');
const { taskController } = require('./routes');

const app = express();

mongoose.connect('mongodb://root:artemko_2013@ds263109.mlab.com:63109/nodejs-test', (err) => {
  if(err) {
    console.log(err.message);
  }
})

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cookieParser())

app.use(expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(passport.initialize());

app.use(passport.session());

require('./config/passport');

app.use(cors());

app.use(expressValidator());

graphql(app);

app.use('/user', userController);

app.use('/board', boardController);

app.use('/list', listController)

app.use('/task', listController)

app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

app.listen(3001, () => {
  console.log('Server running on 3001 port')
})