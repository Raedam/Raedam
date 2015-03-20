var isLoggedIn;

module.exports = function (app, passport) {
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });
  app.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile.ejs', {
      user : req.user
    });
  });
  app.get('/payment', isLoggedIn, function (req, res) {
    res.render('payment.ejs');
  });
// LOGOUT
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
// AUTHENTICATE (FIRST LOGIN)
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });
// process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
  }));
// SIGNUP 
// show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });
// process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
    failureFlash : true
  }));
// facebook 
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));
// twitter 
  app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));
// google
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));
//AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT)
// locally
  app.get('/connect/local', function (req, res) {
    res.render('connect-local.ejs', { message: req.flash('loginMessage') });
  });
  app.post('/connect/local', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/connect/local',
    failureFlash : true
  }));
// facebook
  app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
  app.get('/connect/facebook/callback',
    passport.authorize('facebook', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));
// twitter
  app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));
  app.get('/connect/twitter/callback',
    passport.authorize('twitter', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));
// google
  app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));
  app.get('/connect/google/callback',
    passport.authorize('google', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));
// UNLINK ACCOUNTS 
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function () {
      res.redirect('/profile');
    });
  });
  app.get('/unlink/facebook', isLoggedIn, function (req, res) {
    var user            = req.user;
    user.facebook.token = undefined;
    user.save(function () {
      res.redirect('/profile');
    });
  });
  app.get('/unlink/twitter', isLoggedIn, function (req, res) {
    var user           = req.user;
    user.twitter.token = undefined;
    user.save(function () {
      res.redirect('/profile');
    });
  });
  app.get('/unlink/google', isLoggedIn, function (req, res) {
    var user          = req.user;
    user.google.token = undefined;
    user.save(function () {
      res.redirect('/profile');
    });
  });
};
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}