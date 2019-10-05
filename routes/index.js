'use strict'

const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async function (req, res, next) {
  let dataNews = null;
  let dataPhrases = null;
  const respNews = await fetch('http://slowpoke.desigens.com/json/1/7000');
  const respPhrases = await fetch('http://slowpoke.desigens.com/json/2/3000');
  const dataRespNews = await respNews.json();
  const dataRespPhrases = await respPhrases.json();
  const data = {
    news: dataRespNews[Math.floor(Math.random() * dataRespNews.length)],
    phrases: dataRespPhrases[Math.floor(Math.random() * dataRespPhrases.length)]
  }
  res.render('index.hbs', {data});
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
