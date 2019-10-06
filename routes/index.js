'use strict';
const fs = require('file-system');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const REQUEST_PERIOD = 100; //ms
const WAITING_TIME = 6000; //ms
const API_PREFIX = 'http://slowpoke.desigens.com';


router.get('/', async function (req, res) {
  res.render('index.hbs');
});

router.get('/:id', async function (req, res) {

  let news = null;
  let phrases = null;

  fetch(`${API_PREFIX}/json/1/7000`)
    .then(response => response.json())
    .then((news) => newsResolve(news));
  fetch(`${API_PREFIX}/json/2/3000`)
    .then(response => response.json())
    .then((phrases) => phResolve(phrases));

  function newsResolve(thisnews) {
    news = thisnews;
  }

  function phResolve(thisph) {
    phrases = thisph;
  }

  const timerInterval = setInterval(() => checkNews(news, phrases), REQUEST_PERIOD);
  const timerTimeout = setTimeout(() => {
    notRespond(news, phrases)
  }, WAITING_TIME);


  function checkNews(news, phrases) {
    if (news !== null) {
      clearInterval(timerInterval);
      clearTimeout(timerTimeout);
      sendNews(news, checkPhrases(phrases));
    }
  }

  function checkPhrases(phrases) {
    if (phrases === null) {
      phrases = ['Не дождались фраз'];
      addError(phrases[0]);
    }
    return phrases;
  }

  function notRespond(news, phrases) {
    clearInterval(timerInterval);
    news = [{title: 'Не дождались новостей'}];
    addError(news[0].title);
    sendNews(news, checkPhrases(phrases));
  }

  function sendNews(dataNws, dataPhs) {
    const data = {
      news: dataNws[Math.floor(Math.random() * dataNws.length)],
      phrases: dataPhs[Math.floor(Math.random() * dataPhs.length)]
    };
    //console.log('send News Data', data);
    res.render('index.hbs', {data});
  }
});

function addError(err) {
  const data = `${new Date()} ${err} \n`;
  if (!fs.existsSync('./log')) {
    fs.mkdir('./log')
  }
  fs.appendFile('./log/resrrors.log', data, function (err) {
    if (err) throw err;
    //console.log('resp err');
  });
}

module.exports = router;
