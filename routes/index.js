'use strict'

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const REQUEST_PERIOD = 100; //ms
const WAITING_TIME = 6000; //ms
const API_PREFIX = 'http://slowpoke.desigens.com';

router.get('/', async function (req, res, next) {

    let news = null;
    let phrases = null;
console.log('zzzz')
    fetch(`${API_PREFIX}/json/1/7000`)
        .then(response => response.json())
        .then((news) => newsResolve(news));
    fetch(`${API_PREFIX}/json/2/3000`)
        .then(response => response.json())
        .then((phrases) => {
            phResolve(phrases)
        });

    const timerInterval = setInterval(() => checkData(), REQUEST_PERIOD);
    const timerTimeout = setTimeout(() => {
        notRespond();
    }, WAITING_TIME);


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
            if (phrases === null) phrases = ['Не дождались фраз'];
            sendNews(news, phrases);
        }
    }

    function notRespond() {
        clearInterval(timerInterval);
        news = [{title:'Не дождались новостей'}];
        phrases = ['Не дождались фраз'];
        sendNews(news, phrases);
    }

    function sendNews(dataNws, dataPhs) {
        const data = {
            news: dataNws[Math.floor(Math.random() * dataNws.length)],
            phrases: dataPhs[Math.floor(Math.random() * dataPhs.length)]
        };
        console.log('send News Data', data);
        res.render('index.hbs', {data});
    }
});


// fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
//   .then(response => response.json())
//   .then(commits => alert(commits[0].author.login));


//новости: http://slowpoke.desigens.com/json/1/7000
//  фразы: http://slowpoke.desigens.com/json/2/3000

// router.get('/', sessionChecker, (req, res) => {
//     res.redirect('/entries');
// });

// route for user signup
// router.route('/signup')
//     .get( (req, res) => {
//         if (req.session.user)
//             res.redirect('/entries');
//          else
//             res.render('auth/signup.hbs');
//     })
//     .post(async (req, res) => {
//         const {name, email, password} = req.body;
//       try {
//             const user = new User({
//                 name: name,
//                 email: email,
//                 password: password
//             });
//             await user.save();
//             req.session.user = user;
//             res.redirect('/entries');
//         }
//         catch (err) {
//             if (err.name == 'ValidationError') {
//                 console.error('Error Validating!', err);
//                 return res.render('auth/signup', { error: JSON.stringify(err.errors) });
//             } else {
//                 return res.render('auth/signup', { error: JSON.stringify(err.errmsg) });
//             }
//         }
//     });
//
//
// // route for user Login
// router.route('/login')
//     .get(sessionChecker, (req, res) => {
//         res.redirect('/entries');
//     })
//     .post(async (req, res) => {
//         const { name, password } = req.body;
//         const user = await User.findOne({ name });
//         if (!user) {
//             res.redirect('/login');
//             console.log('**********wrong user')
//         } else if (user.password !== password) {
//           console.log('***********wrong password');
//             console.log(user.password, password);
//             res.redirect('/login');
//         } else {
//             req.session.user = user;
//             res.redirect('/entries');
//         }
//     });
//
// // route for user logout
// router.get('/logout', async (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         try {
//             // res.clearCookie('user_sid');
//             await req.session.destroy();
//             res.redirect('/');
//         }
//         catch (error) {
//             next(error);
//         }
//     } else {
//         res.redirect('/login');
//     }
// });


module.exports = router;
