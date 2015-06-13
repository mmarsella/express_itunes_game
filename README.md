# iTunes Song Guessing Game With Express

The goal of this project is to modify your itunes guessing game to have a server side component. 

### Requirements

The guessing game will now save the users high score.  That can either be total number of correct answers, or highest guessing percentage.  Whatever you prefer, but guessing percentage is a little more complicated because you need to save correct guesses and incorrect guesses in the database.  The high scores should have full CRUD capability.

You will need the following routes:

* GET /scores
* POST /scores
* PUT /scores/:id
* GET /scores/new
* GET /scores/:id/edit
* DELETE /scores/:id
* GET /randomsong  (optionally /randomsong?id=myscoreid&name=name&score=score)

The routes with /scores should be the normal crud capabilities.  The route for /randomsong is explained below.


### Random Song Route Requirements


* __IMPORTANT__ The randomsong route will return an html page to the user with a random song.  The random song should already be on the page when the page loads (In other words, the request to get the song will be made on the server side in express).
* Using javascript on the client side, play the random song as before, allow the user to guess the name of the song, title or artist, and then display if the guess is right or wrong.
* Have a button in your UI to play the next song once you have finished a guess.  The next song logic will be a little tricky:
	* If the user does not have a score yet, when the user clicks next song make a post request to /scores?nextsong=true that creates a new song in the database then redirects to /randomsong?id=myscoreid
	* If the user has a score already, when he clicks next song, make a put request to /scores/:id to update the score, then redirect to /randomsong?id=myscoreid
	* If a POST is sent to /scores or a put sent to /scores/:id and no nextsong query param is provided, then the redirect logic should act normally.  In other words, it should redirect to a show page, or an index page.
	
### Score data

You should at least save the following for a score document:

1. Players name
2. high score
3. Date of score (BONUS but date objects can get complicated so this is a good challenge).

## Styling

__Style your app__.  Make navigating around easy.  Make the different crud pages for scores look nice.  And of course, make the guessing game portion look as beautiful as before.

##BONUS
1. Use bootstrap or some other css library to do your styling.
2. Add a field to mongo for the date of the score. The date should be updated on each score update.
2. Instead of reloading a new page after every song, use javascript to both submit the new score and load a new song from the itunes api via jsonp.


## Steps For Completing Assignment

1. Start by only working on the crud app.  __DO NOT DO ANYTHING RELATED TO DOWNLOADING A SONG, PLAYING A SONG, OR GUESSING A SONG TO START__.  The resource we are creating is a score.  Other people wanted to call it a player or user, that is fine as long as the routes and model names match that as well.  __TEST!!__ that all pieces of your CRUD app work at this point.
2. Make an api call to the itunes api in your app.js file.  Create a route called /randomsong.  Its only job at this point is to make a request to the itunes api for a random song (the random song should come from a list of itunes ids just like in our first itunes guessing game).  When you get the response back, return an html page via ejs with an audio tag that has the song url in the src attribute.  Also, store all song data like artist, track name, album art, etc. in a div on the page that you hide so that the user does not see it when the song plays.
3. Add __client side__ javascript in the public js folder to play the random song.
4. In your random song ejs file, add an input tag for the user's guess.
5. __In your client side javascript in the public folder__, write some code to capture the user's guess on submit.  In the on submit code, prevent default then check if the user's guess is correct or incorrect, and display the result to the user by manipulating the DOM.  How is your javascript code going to know what the correct answer is?  An easy way is to get the values out of the DOM from the hidden div that you created in step 2.  __At this point, your app should be able to do most of what it did in your first itunes guessing game__
6.  Next, work on storing the guess score automatically.  We needed to get the CRUD part done and tested first to make this portion of the code simpler.  We need to do a few things at this point to get us ready:
    1. Add a input field to your randomsong's ejs file.  The input field should capture the user's name before the song starts playing (the name will be used to create a new score).
    2. In the randomsong's ejs file, add a hidden form that sends a post to /songs to create a new song when the user clicks on a refresh icon, or play again.  The post request should contain 3 fields (all type=hidden): score[name], score[score], and nextsong=true.  The next song field in the form will not be saved to your database, it will just be used in the app.post method shortly.
    3. In the client side javascript, add an onsubmit event for the play again form you created one step prior to this. In the onsubmit event, populate the score[name] field in the form to be the name you capture before the song started playing and the user's score that they just made (0 or 1).  This only supports the first time a user has played the game.  We'll get to continuous play in a litlte bit.  __DO NOT PREVENT DEFAULT__ in the on submit.  You want it to be submitted to your sever so that the score is created and saved in mongo.
7. Now you should have a itunes song guessing game that allows the user to enter his or her name, play a random song, start a new game (and without the user knowing, saves his or her score of 1 or 0 for the first play).  Now we are going to work on updating the score.


## HINTS

* Since we are no longer making client side requests to the itunes api, jsonp is not necessary.
* The response from the server for the /randomsong route can preload a form to submit the score.   Your client side javascript can handle updating the values once you know if the song is correctly guessed or not.
* __Start with the basic crud first__.  Since we haven't done a lot of client side javascript along with server side code, the randomsong route may seem challenging.  Don't work on it first!  Frist make the basic CRUD for scores.
* For POST /scores and PUT /scores/:id, you will need to redirect to a randomsong?id=songid when the POST or PUT is coming from the random song page.  To achieve this, use a hidden field in your submit form that has a name=nextsong and a value=true.  If the value is not found in the body, then redirect to your normal crud page.
