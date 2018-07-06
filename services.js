'use strict';

const fs = require('fs');

const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const hello = (request, response) => {
  response.status(200).send('Welcome');
};

const newPoll = (request, response) => {
  const newPoll = request.body;
  let polls = [];
  try {
    const file = fs.readFileSync('data/db.json');
    polls = JSON.parse(file);
    polls.push(Object.assign(newPoll, {id: generateId()}));
    fs.writeFileSync('data/db.json', JSON.stringify(polls));
    response.status(200).send(polls);
  } catch (error) {
    response.status(500).send({
      message: 'Can not create new Poll',
      stack: error
    });
  }
};

const vote = (request, response) => {
  const pollId = request.params.poll_id;
  const option = request.params.option;
  let polls = [];
  try {
    const file = fs.readFileSync('data/db.json');
    polls = JSON.parse(file);
    const newPolls = polls.map(poll => {
      if (poll.id === pollId) {
        poll.options[ option ].votes++;
      }
      return poll;
    });
    fs.writeFileSync('data/db.json', JSON.stringify(newPolls));
    response.status(200).send(newPolls);
  } catch (error) {
    response.status(500).send({
      message: 'Can not create vote',
      stack: error
    });
  }
};

const getPollsList = (request, response) => {
  let polls = [];
  try {
    const file = fs.readFileSync('data/db.json');
    polls = JSON.parse(file);
    response.status(200).send(polls);
  } catch (error) {
    response.status(500).send({
      message: 'Can not read polls list',
      stack: error
    });
  }
};

module.exports = {hello, newPoll, vote, getPollsList};
