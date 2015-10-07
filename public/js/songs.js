$(function() {

   //The user input
  var input;
  var winCount = 0;
  var trackName = $("#track").text();
  var artist = $("artist").text();
  var album = $("album").text();
  console.log("track: " + trackName);

  // Link the button.  On click... play audio
$("#button").on("click", function(){
  $("#answer").attr("style","display: none");  
  console.log("BUTTON CLICKED");
  $("audio")[0].play();
  console.log(artist);
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
$("#hiddenForm").on("submit", function (e){
  e.preventDefault();
  $("#scoreName").val(trackName);  // assign trackname to hidden input
  $("#scoreScore").val(winCount);
});

/******* CHART ***********/

var scoreArray = $('.score').map(function() {return $(this).val(); });

var nameArray = $('.name').map(function() {return $(this).val(); });
// Pass user data into a bar chart for scores and names
// labels = names



var data = {
    labels: nameArray,
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(0,255,0,0.3)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: scoreArray
        },
        // {
        //     label: "My Second dataset",
        //     fillColor: "rgba(151,187,205,0.5)",
        //     strokeColor: "rgba(151,187,205,0.8)",
        //     highlightFill: "rgba(151,187,205,0.75)",
        //     highlightStroke: "rgba(151,187,205,1)",
        //     data: [28, 48, 40, 19, 86, 27, 90]
        // }
    ]
};

// Get the context of the canvas element we want to select
var ctx = document.getElementById("myChart").getContext("2d");
var myNewChart = new Chart(ctx).Bar(data);




});  //END OF ONLOAD
