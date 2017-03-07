var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);

var bodyParser = require('body-parser');

var users = [];

app.use(bodyParser.urlencoded( {
  extended:true
}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));


var dataFromDatabase = {username: "Ann", url: "http://i1104.photobucket.com/albums/h331/bearcreek58/A-layingjpg.jpg", about: "Is exhausted"};

app.get('/home', function(request, response) {
  response.render('home', {userData: dataFromDatabase})
})

app.get('/register', function(request, response) {
  response.render('register')
})

app.get('/login', function(request, response) {
  response.render('login')
})

app.post('/register', function(request, response) {
  users.push({username: request.body.username, password: request.body.password})
  response.send("you have been successfully registered");
})

app.post('/login', function(request, response) {
  for(i = 0; i < users.length; i++) {
    if(users[i].username === request.body.username) {
      if(users[i].password === request.body.password) {
        // response.send("you have successfully logged in!")
        response.render('home', dataFromDatabase)
      }
      else {
        response.redirect('/login')
      }
    }
  }
})



server.listen(3000, function() {
  console.log('server is listening on port 3000');
})
