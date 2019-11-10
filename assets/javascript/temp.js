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
            question: "Which planet in our solar system has the longest day?",
            answers: {
                a: "Pluto",
                b: "Venus",
                c: "Mercury",
                d: "Earth",
            },
            correct: "b",
            gif: "assets/images/venus.gif",
            text: "The correct answer is Venus, which completes one rotation every 243 Earth days."
        },
        {
            question: "Approximately how old is the universe?",
            answers: {
                a: "21.6 Billion Years.",
                b: "9.4 Billion Years.",
                c: "17.9 Billion Years.",
                d: "13.8 Billion Years.",
            },
            correct: "d",
            gif: "assets/images/universehands.gif",
            text: "The correct answer is 13.8 Billion Years."
        },
        {
            question: "Which of the following is not one of Jupiter's moons?",
            answers: {
                a: "Juno",
                b: "Callisto",
                c: "Ganymede",
                d: "Io",
            },
            correct: "a",
            gif: "assets/images/jupiter.gif",
            text: "The correct answer is Juno."
        },
        {
            question: "Who was the first person to walk on the moon?",
            answers: {
                a: "Buzz Aldrin",
                b: "Charles 'Pete' Conrad",
                c: "Neil Armstrong",
                d: "Alan Shepard",
            },
            correct: "c",
            gif: "assets/images/moondog.gif",
            text: "The correct answer is Neil Armstrong."
        },
        {
            question: "Which of the following is a periodic comet, one that returns to our solar system?",
            answers: {
                a: "Hyakutake",
                b: "McNaught",
                c: "Lovejoy",
                d: "Halley",
            },
            correct: "d",
            gif: "assets/images/comet.gif",
            text: "The correct answer is Halley, which returns to the inner solar system once every 76 years."
        },
        {
            question: "What is the name of the black hole at the center of the Milky Way?",
            answers: {
                a: "Messier 82",
                b: "Sagittarius A",
                c: "Hercules A",
                d: "Centaurus A",
            },
            correct: "b",
            gif: "assets/images/blackhole.gif",
            text: "The correct answer is Sagittarius A."
        }
    ];

    $("#displayTrivia").hide();

    var questionNum = 0;

    var correctAnswer;
    var rightText;

    function populateQuestion() {
        var displayTrivia = $("#displayTrivia");
        var newDiv = $("<div>").addClass("triviaQuestions");
        var answerDiv = $("<div>").addClass("answerTrivia");

        var question = false;

        while (!question) {
            console.log("Question number in while loop: " + questionNum);
            question = true;

            for (var i = 0; i < triviaQuestions.length; i++) {
                console.log("Question number in FOR loop: " + questionNum);
                console.log(triviaQuestions[i]);
                if (questionNum < triviaQuestions.length) {
                    var triviaQ = triviaQuestions[i + questionNum];
                    correctAnswer = triviaQ.correct;
                    rightText = triviaQ.text;
                    console.log("The current correct answer is: " + correctAnswer);
                    newDiv.html($("<p>" + triviaQ.question + "</p>"));
                    newDiv.append($("<div>").addClass("questionDiv").val("a").text(triviaQ.answers.a));
                    newDiv.append($("<div>").addClass("questionDiv").val("b").text(triviaQ.answers.b));
                    newDiv.append($("<div>").addClass("questionDiv").val("c").text(triviaQ.answers.c));
                    newDiv.append($("<div>").addClass("questionDiv").text(triviaQ.answers.d).val("d"));
                    answerDiv.append($("<img>").attr("src", triviaQ.gif));
                    displayTrivia.append(newDiv);
                    displayTrivia.append(answerDiv);
                    answerDiv.hide();
                    questionNum++;
                    return;
                } else {
                    stop();
                    displayTrivia.html($("<div>").append($("<h2>").text("You completed the quiz!")).append($("<p>").text("Total correct: " + win)).append($("<p>").text("Total incorrect: " + lose)).append($("<p>").text("Total timed out: " + timeOut)));
                    $("#restartQuiz").show();
                    resetQuiz();
                }
            }
            questionNum++;
        }
    }

    function resetQuiz() {
        $("#restartQuiz").click(function () {
            questionNum = 0;
            win = 0;
            lose = 0;
            timeOut = 0;
            question = false;
            $("#displayTrivia").empty();
            $("#restartQuiz").hide();
            startTimer();
        })
    }

    // Create a timer that counts down from 30 seconds.

    var number = 30;
    var intervalId;
    var intervalIsRunning = false;

    var intervalIdQuestions;
    var intervalBetweenQuestions = false;

    $("#timerDisplay").hide(); // Start with the timer hidden.
    $("#restartQuiz").hide(); // Start with restart button hidden

    $("#startTimer").on("click", startTimer); // Start timer and quiz on button click

    function startTimer() {
        if (!intervalIsRunning) {
            intervalId = setInterval(decrement, 1000); // Count down a second at a time
            intervalIsRunning = true;
        }
        $("#timerDisplay").show();
        $("#startTimer").hide(); // Hide the timer.
        $("#displayTrivia").show(); // Show the trivia box.
        populateQuestion(); // Populate a question.
        var playerSelect; // This is a variable for the player's answer!

        $(".questionDiv").click(function () {
            playerSelect = $(this).val();
            console.log(playerSelect);
            determineWinLose(playerSelect); // Put the player's answer into the win/lose, see if they won/lost.
        })
    }

    var win = 0;
    var lose = 0;
    var timeOut = 0;

    function determineWinLose(choice) {
        var answerDiv = $(".answerTrivia").show();
        if (choice === correctAnswer) {
            answerDiv.prepend($("<h2>Correct!</h2>"));
            $(".triviaQuestions").hide();
            stop();
            question = false;
            win++;
            getNextQuestion();
            return false;
        } else {
            answerDiv.prepend($("<p>").text(rightText));
            answerDiv.prepend($("<h2>Not Quite!</h2>"));
            $(".triviaQuestions").hide();
            stop();
            question = false;
            lose++;
            getNextQuestion();
            return false;
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
        number = 30;
        startTimer();
        clearInterval(intervalIdQuestions);
        intervalBetweenQuestions = false;
    }

    function decrement() {
        number--;
        $("#countdownTimer").html(number);
        if (number === 0) {
            stop();
            question = false;
            $(".answerTrivia").show().prepend($("<h2>Out of Time!</h2>"));
            $(".triviaQuestions").hide();
            timeOut++;
            getNextQuestion();
        }
    }

    function stop() {

        clearInterval(intervalId);
        intervalIsRunning = false;
    }
});
