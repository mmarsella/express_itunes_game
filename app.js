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
    user.score = 0;
    user.save();
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

app.post("/login", function (req,res){
  db.User.authenticate(req.body.user,
    function (err,user){
      console.log("THE USER: " + user);
      if(!err && user !== null){
        req.login(user);
        res.redirect("/ready");
      }else{
        console.log("THE ERROR:",err);
        res.redirect("404");
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
  res.redirect("/ready");
});

app.get("/ready", function (req,res){
    db.User.findById(req.session.id, function (err,user){
    if(err){
      console.log(err);
    }else{
     res.render("ready",{user:user});
    }
  });
});

//GO TO THE GAME
app.get("/randomsong", function (req,res){
  db.User.findById(req.session.id, function (err,user){
    if(err){
      console.log(err);
    }else{
  request.get("https://itunes.apple.com/us/lookup?id=" + getRandomSong(), function (err,response,body){
     var song = JSON.parse(body).results[0];
     res.render("randomsong",{user:user,song:song});
      });
    }
  });
});

//update user score once they guess
app.put("/songs",function (req,res){
  console.log("REQ BODY:",req.body.score);
  db.User.findById(req.session.id, function (err,user){
    if(err){
      console.log(err);
    }else{
      console.log("HELLO!");
      // is this the proper way to be using a put?  w/o findByIdAndUpdate?? it works....
      user.score = user.score + parseInt(req.body.score.score);
      user.save();
      res.redirect("/randomsong");
    }
  });
});

// HIGH SCORE PAGE
app.get("/scores", function (req,res){

  db.User.find({}, function (err,users){
    if(err){
      console.log(err);
    }else{
      db.User.findById(req.session.id,function (err,user){
        res.render("index",{users:users, user:user});
      });
    }
  });
});

//To create a new high score
app.get("/scores/new", function (req,res){
  res.render("new");
});

//SHOW specific high score --> necessary??
app.put("/scores/:id", function (req,res){
  // db.Score.findByIdAndUpdate(req.params.id, {name:req.body.name,score:req.body.score}, function (err, score){
  //   if(err){
  //     res.render("404");
  //   }else{
      res.redirect("/scores");
  //   }
  // });
});

//add a score reset button
//delete a high score  --> would it still be CRUD'ish if I change the score back to 0??
app.delete("/scores", function (req,res){
  db.User.findById(req.session.id, function (err,user){
      if(err){
        res.render("404");
      }else{
        user.score = 0;
        user.save();
        res.redirect("/scores");
      }
  });
});

app.get('*', function(req,res){
  res.render('404');
});

// start the server
app.listen(3000, function () {
  console.log("Starting a server on localhost:3000");
  });

/**** TO DO FOR WED OCT 6 ******/

//1) Allow song to play w/o reset (Maybe AJAX?)
//2) Delete/reset score
//3) Show user score






