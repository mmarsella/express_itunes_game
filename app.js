var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require("./models");
var methodOverride = require("method-override");
var request = require('request');
var session = require("cookie-session");
var morgan = require("morgan");
var loginMiddleware = require("./middleware/loginHelper"); //refers to name of file
var routeMiddleware = require("./middleware/routeHelper");

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
//server-side logger.  Logs requests to the terminal
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));


//ALWAYS create the session BEFORE trying to using ANY MIDDLEWARE that involves req.session
app.use(session({
  maxAge: 3600000,   //milliseconds  (360 seconds/6min) --> life of the cookie
  secret: 'illnevertell', // communication
  name: "chocolate chip" // what we see in the resources tab/cookies --> browser
}));

app.use(loginMiddleware);  // calling the loginhelper on EVERY REQUEST!

 var songIds = ["995535015", "966411602", "823593456", "956689796", "943946671",
                 "982388023", "907242704", "201281527", "656801339", "910038357",
                 "250038575", "878000348",  "794095205",  "1645339",  "400835962",
                 "325618", "169003415",  "51958108",
                 "76532142", "192688540", "684811768", "344799464", "217633921",
                 "192811017", "640047583", "517438248" ];


function getRandomSong(){
  var randNum = Math.floor((Math.random() * songIds.length));
  return songIds[randNum];
}

/*********** LOGIN AND SIGN UP ***************
*********************************************/

app.get("/signup", routeMiddleware.preventLoginSignup, function (req,res){
  res.render("users/signup");
});

app.post("/signup", function (req,res){
  var newUser = req.body.user;
  db.User.create(newUser, function (err,user){
    console.log(user);
    if(user){
      req.login(user);
      res.redirect("/"); //redirect user to homepage
    }else{
      console.log(err);
      res.redirect("/signup");
    }
  });
});

app.get("/login", function (req,res){
  res.render("users/login");
});

app.post("/login", function (req,res){
  db.User.authenticate(req.body.user,
    function (err,user){
      console.log("THE USER: " + user);
      if(!err && user !== null){
        req.login(user);
        res.redirect("/users/" + user._id);
      }else{
        res.redirect("/users");
      }
    });
});

app.get("/logout", function (req,res){
  req.logout();
  res.redirect("/");
});

/********** GAME ROUTES ***************/

//redirects to the game
app.get("/", function(req, res) {
  res.redirect("/randomsong");
});

//GO TO THE GAME
app.get("/randomsong", function (req,res){
  request.get("https://itunes.apple.com/us/lookup?id=" + getRandomSong(), function (err,response,body){
    var songData = JSON.parse(body).results[0];
    var data = {song:songData, score: scoreData};
    var scoreData = {id: req.query.id, name: req.query.name, score: req.query.score};
  res.render("randomsong", data);
  });
});





















app.get('*', function(req,res){
  res.render('404');
});

// start the server
app.listen(3000, function () {
  console.log("Starting a server on localhost:3000");
  });








