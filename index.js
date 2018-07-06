'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').load();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const services = require('./services');

app.get('/', services.hello);
app.post('/poll', services.newPoll);
app.post('/vote', services.vote);
app.get('/polls', services.getPollsList);
app.get('/reset', services.reset);

app
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
