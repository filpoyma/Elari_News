'use strict';
var fs = require('file-system');
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const REQUEST_PERIOD = 100; //ms
const WAITING_TIME = 6000; //ms
const API_PREFIX = 'http://slowpoke.desigens.com';

router.get('/', async function (req, res) {

  let news = null;
  let phrases = null;

  fetch(`${API_PREFIX}/json/1/7000`)
    .then(response => response.json())
    .then((news) => newsResolve(news));
  fetch(`${API_PREFIX}/json/2/3000`)
    .then(response => response.json())
    .then((phrases) => phResolve(phrases));

  const timerInterval = setInterval(() => checkData(), REQUEST_PERIOD);
  const timerTimeout = setTimeout(() => { notRespond() }, WAITING_TIME);

  function newsResolve(thisnews) {
    news = thisnews;
  }

  function phResolve(thisph) {
    phrases = thisph;
  }

  function checkData() {
    if (news !== null) {
      clearInterval(timerInterval);
      clearTimeout(timerTimeout);
      if (phrases === null) {
        phrases = ['Не дождались фраз'];
        addError(phrases.join(','));
      }
      sendNews(news, phrases);
    }
  }

  function notRespond() {
    clearInterval(timerInterval);
    news = [{title: 'Не дождались новостей'}];
    phrases = ['Не дождались фраз'];
    const dataErr = `${news[0].title} / ${phrases[0]}`;
    addError(dataErr);
    sendNews(news, phrases);
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

function addError(data){
  data = `${new Date()} ${data} \n`;
  fs.appendFile('./log/resrrors.log', data, function (err) {
    if (err) throw err;
    //console.log('resp err');
  });
}

module.exports = router;
