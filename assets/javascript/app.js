// Document ready!

$(document).ready(function () {

    var triviaQuestions = [
        {
            question: "What is the closest galaxy to our own?",
            answers: {
                a: "Canis Major Dwarf.",
                b: "Sagittarius Dwarf Elliptical Galaxy.",
                c: "Andromeda.",
                d: "Virgo Stellar Stream.",
            },
            correct: "a",
            gif: "assets/images/exitspace.gif",
            text: "The correct answer is Canis Major Dwarf."
        },
        {
            question: "What colour is the brown cow?",
            answers: {
                a: "Red.",
                b: "Orange.",
                c: "Purple.",
                d: "Brown.",
            },
            correct: "d",
            gif: "assets/images/exitspace.gif",
            text: "The correct answer is Brown."
        },
        {
            question: "What colour is the sky?",
            answers: {
                a: "Red.",
                b: "Orange.",
                c: "Blue.",
                d: "Brown.",
            },
            correct: "c",
            gif: "assets/images/exitspace.gif",
            text: "The correct answer is Blue."
        }
    ];

    $("#displayTrivia").hide();

    // Create a function
    // Let this function display a question and answers from the object array
    // ... but only if there is no question displayed currently...
    // ... and only display one question at a time.

    function populateQuestion(array) {
        var displayTrivia = $("#displayTrivia");
        var newDiv = $("<div>").addClass("triviaQuestions");
        var wrongAnswerDiv = $("<div>").addClass("wrongAnswerTrivia");
        var rightAnswerDiv = $("<div>").addClass("rightAnswerTrivia");

        var question = false;

        while (!question) {
            question = true;
            for (var i = 0; i < triviaQuestions.length; i++) {
                newDiv.html($("<p>" + triviaQuestions[i].question + "</p>"));
                newDiv.append($("<div>").addClass("questionDiv").val("a").text(triviaQuestions[i].answers.a));
                newDiv.append($("<div>").addClass("questionDiv").val("b").text(triviaQuestions[i].answers.b));
                newDiv.append($("<div>").addClass("questionDiv").val("c").text(triviaQuestions[i].answers.c));
                newDiv.append($("<div>").addClass("questionDiv").val("d").text(triviaQuestions[i].answers.d));
                wrongAnswerDiv.html($("<p>").text(triviaQuestions[i].text));
                wrongAnswerDiv.append($("<img>").attr("src", triviaQuestions[i].gif));
                rightAnswerDiv.html($("<img>").attr("src", triviaQuestions[i].gif));
                displayTrivia.append(newDiv);
                displayTrivia.append(rightAnswerDiv);
                rightAnswerDiv.hide();
                displayTrivia.append(wrongAnswerDiv);
                wrongAnswerDiv.hide();
                console.log("current question index number: " + i);
                i++
                console.log("next question index number: " + i);
                console.log(question);
                return;
            }
        }

    }

    // Create a timer that counts down from 30 seconds.

    var number = 30;
    var intervalId;
    var intervalIsRunning = false;

    var intervalIdQuestions;
    var intervalBetweenQuestions = false;

    $("#timerDisplay").hide(); // Start with the timer hidden.

    $("#startTimer").on("click", startTimer); // Start timer and quiz on button click

    function startTimer() {
        if (!intervalIsRunning) {
            intervalId = setInterval(decrement, 1000); // Count down a second at a time
            intervalIsRunning = true;
        }

        $("#startTimer").hide(); // Hide the timer.
        $("#displayTrivia").show(); // Show the trivia box.
        populateQuestion(); // Populate a question.
        var playerSelect; // This is a variable for the player's answer!

        $(".questionDiv").click(function () {
            playerSelect = $(this).val();
            determineWinLose(playerSelect); // Put the player's answer into the win/lose, see if they won/lost.
        })
    }

    var win = 0;
    var lose = 0;
    var timeOut = 0;

    function determineWinLose(choice) {
        for (var i = 0; i < triviaQuestions.length; i++) {
            if (choice === triviaQuestions[i].correct) {
                $(".rightAnswerTrivia").show().prepend($("<h2>Correct!</h2>"));
                $(".triviaQuestions").hide();
                stop();
                question = false;
                win++;
                console.log("# Wins:" + win);
                // getNextQuestion();
                return false;
            } else {
                $(".wrongAnswerTrivia").show().prepend($("<h2>Not Quite!</h2>"));
                $(".triviaQuestions").hide();
                stop();
                question = false;
                lose++;
                console.log("# Lose: " + lose);
                // getNextQuestion();
                return false;
            }
        }
    }

    function getNextQuestion() {
        if (!intervalBetweenQuestions) {
            intervalIdQuestions = setInterval(nextQuestion, 5000); // Run function after 5 seconds
            intervalBetweenQuestions = true;
        }
    }

    function nextQuestion() {
        $("#displayTrivia").empty();
        populateQuestion();
        number = 31;
        startTimer();
        clearInterval(intervalIdQuestions);
        intervalBetweenQuestions = false;
    }

    function decrement() {
        $("#timerDisplay").show();
        number--;
        $("#countdownTimer").html(number);
        if (number === 0) {
            stop();
            question = false;
            $(".wrongAnswerTrivia").show().prepend($("<h2>Out of Time!</h2>"));
            $(".triviaQuestions").hide();
            timeOut++;
            console.log("# Time Outs: " + timeOut);
            // getNextQuestion();
        }
    }

    function stop() {

        clearInterval(intervalId);
        intervalIsRunning = false;
    }
});