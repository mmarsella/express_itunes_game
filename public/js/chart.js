$(function() {
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