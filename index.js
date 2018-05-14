const express = require('express');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const graphql = require('./graphql/index');
const http = require('http');
const WebSocketServer = require('ws').Server;
const bus = require('./eventbus');

const { userRoutes } = require('./routes');
const { boardRoutes } = require('./routes');
const { listRoutes } = require('./routes');
const { taskRoutes } = require('./routes');

const User = require('./models/user.model');

const app = express();

mongoose.connect('mongodb://root:artemko_2013@ds263109.mlab.com:63109/nodejs-test', (err) => {
  if (err) {
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
  saveUninitialized: true
}))

app.use(passport.initialize());

app.use(passport.session());

require('./config/passport');

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {

  bus.on('assigning', (inf) => {
    const { task, assignees } = inf;
  })

});

app.use(cors());

app.use(expressValidator());

graphql(app);

app.use('/user', userRoutes);

app.use('/board', boardRoutes);

app.use('/list', listRoutes)

app.use('/task', taskRoutes)

app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

server.listen(3001, () => {
  console.log('Server running on 3001 port')
})