


var instruments = ["oboe", "piano", "bassoon", "piccolo", "flute", "cymbal", "tympani", "cello", "viola", "violin"];


function display_buttons() {
    $("#instrument_buttons").empty();
    instruments.forEach(function (item) {
        var $button = $("<button>").attr("data-instrument", item);
        $button.text(item);
        $("#instrument_buttons").append($button);
    });
}


  //  On Click event associated with the add-to-do function
  $("#submit").on("click", function(event) {
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
        $instrument + "&api_key=rlRqjccJB8HqG3sPhUDloKcGMFiVcLPd&limit=3";

    $.get({ url: queryURL, }).then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var instrument_div = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);

            var instrument_image = $("<img>");
            instrument_image.attr("src", results[i].images.fixed_height.url);


            instrument_div.append(p);
            instrument_div.append(instrument_image);

            $("#gif_display").prepend(instrument_div);
        }
    });
});


//     <img src="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif"
// \ data-still="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" 
// data-animate="https://media3.giphy.com/media/W6LbnBigDe4ZG/200.gif" 
// data-state="still" 
// class="gif">

    

  $("#gif_display").on("click","img", function() {
      alert("image clicked");
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    // var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    // if (state === "still") {
    //   $(this).attr("src", $(this).attr("data-animate"));
    //   $(this).attr("data-state", "animate");
    // } else {
    //   $(this).attr("src", $(this).attr("data-still"));
    //   $(this).attr("data-state", "still");
    // }
  });

display_buttons();
