var express = require('express');
var stormpath = require('express-stormpath');
var path = require('path');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: 'apiKey-5P1CL9F4MYL1690TWA7NZBAL2.properties',
  application: 'https://api.stormpath.com/v1/applications/144NUacNjSZrHm3Tj8kbF5',
  secretKey: 'some_long_random_string',
  expandCustomData: true,
  enableForgotPassword: true
});

app.use(stormpathMiddleware);

app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});
app.use('/profile',stormpath.loginRequired,require('./views/profile/profile')());
app.use('/shineLikeAStar', stormpath.groupsRequired(['shineLikeAStar']),require('./views/shineLikeAStar/shineLikeAStar')());
app.listen(3000);