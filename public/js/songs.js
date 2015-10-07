$(function() {
  $("audio")[0].play();  // PLAY A SONG WHEN THE PAGE LOADS

   //The user input
  var input;
  var winCount = 0;
  var trackName = $("#track").text();
  var artist = $("artist").text();
  var album = $("album").text();
  console.log("track: " + trackName);

  // Link the button.  On click... play audio
$("#button").on("click", function(e){
  // e.preventDefault();  // FORM WILL NOT SUBMIT!!!
  $("#answer").attr("style","display: none");  
  console.log("BUTTON CLICKED");
  console.log(artist);
  $("#scoreName").val(trackName);  // assign trackname to hidden input
  $("#scoreScore").val(winCount);
  });

  //USERS GUESS
$("#form").on("submit", function(e){
  e.preventDefault();
  input = $("#input").val();
  if($("#input").val().length !== 0)
  {
    console.log("INPUT RECEIVED");
    checkWin(input);
    // Clears the value of the input after checkWin()
    $("#input").val("");
    var user = $("#user").val();
    $("#name").val(user);
  }
    // Sets the audio tag src to empty string... stops  
    // $("audio").attr("src","");
    $("audio")[0].pause();
});

function checkWin(input)
{
  // check answer - case insensitive
  if(input.toLowerCase() === trackName.toLowerCase())
  {
    $("#answer").attr("style","");
    $("#guess").text("Correct!!!");
    $("#score").val(1);
    winCount = 1;
  }
  else
  { 
    $("#answer").attr("style","");
    $("#guess").text("WRONG!!!");
    $("#score").val(0);
    winCount = 0;

  }
}

//HIDDEN FORM
// $("#hiddenForm").on("submit", function (e){

// });






});  //END OF ONLOAD
