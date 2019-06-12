


var instruments = ["oboe", "piano", "bassoon", "piccolo", "flute", "cymbal", "tympani", "cello", "viola", "violin"];


function display_buttons() {
    instruments.forEach(function (item) {
        var $button = $("<button>").attr("data-instrument", item);
        $button.text(item);
        $("#instrument_buttons").append($button);
    });
}

display_buttons();

$("#instrument_buttons").on("click", "button", function () {

    $("#gif_display").empty();

    console.log($(this).attr("data-instrument"));
    var $instrument = $(this).attr("data-instrument");

    // my api key rlRqjccJB8HqG3sPhUDloKcGMFiVcLPd
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        $instrument + "&api_key=rlRqjccJB8HqG3sPhUDloKcGMFiVcLPd&limit=3";

    $.get({ url: queryURL, }).then(function (response) {
        console.log(queryURL);
        console.log(response);
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