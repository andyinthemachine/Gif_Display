


var instruments = ["oboe", "piano", "bassoon", "piccolo", "flute", "cymbal", "tympani", "cello", "viola", "violin"];


function display_buttons() {
  $("#instrument_buttons").empty();
  instruments.forEach(function (item) {
    var $button = $("<button>").attr("data-instrument", item);
    $button.text(item);
    $("#instrument_buttons").append($button);
  });
}

$("#submit").on("click", function (event) {
  event.preventDefault();

  var $new_instrument = $("#instrument_text").val().trim();
  instruments.push($new_instrument);

  // console.log($new_instrument);
  $("#instrument_text").val("");

  display_buttons();

});


$("#instrument_buttons").on("click", "button", function () {

  $("#gif_display").empty();

  console.log($(this).attr("data-instrument"));
  var $instrument = $(this).attr("data-instrument");

  // my api key rlRqjccJB8HqG3sPhUDloKcGMFiVcLPd
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    $instrument + "&api_key=rlRqjccJB8HqG3sPhUDloKcGMFiVcLPd&limit=5";



  $.get({ url: queryURL, }).then(function (response) {
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var $instrument_div = $("<div>");
      var $p = $("<p>").text("Rating: " + results[i].rating);

      // var $radio_button = $("<input type = 'radio' />");
      // $radio_button.attr({
      //         name: "question_" + i,
      //         id: "ans_" + i,
      //         value: questions[i].answers[j]
      // });

      var $instrument_image = $("<img>");
      $instrument_image.attr({
        "src": results[i].images.fixed_height_still.url,
        "data-still": results[i].images.fixed_height_still.url,
        "data-animate": results[i].images.fixed_height.url,
        "data-state": "still"
      });

  
      $instrument_div.append($p);
      $instrument_div.append($instrument_image);

      $("#gif_display").prepend($instrument_div);
    }
  });
});


  $("#gif_display").on("click","img", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

display_buttons();
