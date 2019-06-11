
var interval_id;
var seconds_count = 45;
var correct_answers = 0;
var incorrect_answers = 0;
var unanswered = 0;
var $start_game_button = $("<button id='start_game'>").text("Start");
var $end_game_button = $("<button id='end_game'>").text("Done");

var questions = [
    {
        question: "What is the fastest event?",
        correct: "downhill",
        answers: ["downhill", "super-g", "giant slalom", "slalom"]
    },
    {
        question: "Where is the Hannenkam?",
        correct: "Austria",
        answers: ["France", "Italy", "Austria", "Croatia"]
    },
    {
        question: "What is the name of the championship trophy?",
        correct: "Crystal Globe",
        answers: ["Peaks Honor", "Snow Cup", "Stenmark Prize", "Crystal Globe"]
    },
    {
        question: "What country has a team but does not host an event?",
        correct: "England",
        answers: ["Germany", "Slovakia", "England", "Finland"]
    },
    {
        question: "Who has the most trophies?",
        correct: "Ingemar Stenmark",
        answers: ["Ingemar Stenmark", "Alberto Tomba", "Lindsey Vonn", "Bode Miller"]
    },
    {
        question: "Where is an event hosted in the USA?",
        correct: "Beaver Creek",
        answers: ["Winter Park", "Steamboat", "Taos", "Beaver Creek"]
    },
    {
        question: "What event requires a face guard?",
        correct: "slalom",
        answers: ["slalom", "giant slalom", "super-g", "downhill"]
    }
];


function display_questions() {

    for (i = 0; i < questions.length; i++) {
        $("#main_content").append("<p>" + questions[i].question + "<br></p>");
        for (j = 0; j < questions[i].answers.length; j++) {
            var $radio_button = $("<input type = 'radio' />");
            $radio_button.attr({
                    name: "question_" + i,
                    value: questions[i].answers[j]
            });
            $("#main_content").append($radio_button);
            $("#main_content").append("<label>" + questions[i].answers[j] + "</label>");
            $("#main_content").append(" ");
        }
    }
}



function display_stats() {
    $("#sub_heading").html("<h3>Done!</h3>");

    for (i = 0; i < questions.length; i++){
        var result = $("input[name=   'question_" + i + "']:checked").val();
        if (result === questions[i].correct)
            correct_answers++;
        else if (result === undefined)
            unanswered++;
        else
            incorrect_answers++;
    }
    
    $("#main_content").html("<h3>Correct answers: " + correct_answers + "<br></h3>");
    $("#main_content").append("<h3>Incorrect answers: " + incorrect_answers + "<br></h3>");
    $("#main_content").append("<h3>Unanswered: " + unanswered + "</h3>");
    $("#done_button").empty();
}

function run_timer() {
    $("#sub_heading").html("<h2> Time Remaining: " + seconds_count + " seconds</h2>");
    clearInterval(interval_id);
    interval_id = setInterval(decrement, 1000);
}

function decrement() {
    $("#sub_heading").html("<h2> Time Remaining: " + --seconds_count + " seconds</h2>");

    if (seconds_count <= 0) {
        clearInterval(interval_id);
        display_stats();
    }
}

$("#sub_heading").append($start_game_button);

$("#start_game").on("click", function () {
    run_timer();
    display_questions();
    $("#done_button").append($end_game_button);
});

$("#done_button").on("click", "#end_game", function () {
    clearInterval(interval_id);
    display_stats();
});


// id: "ans_" + j,
// var label = $("<label for='ans_" + j + "'>" + questions[i].answers[j] + "</label>")           
// var label = $("<label>" + questions[i].answers[j] + "</label>")   