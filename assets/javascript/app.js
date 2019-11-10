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

    var questionNum = 0;
    let countDown = 3000;

    function populateQuestion() {
        var displayTrivia = $("#displayTrivia");
        // var newDiv = $("<div>").addClass("triviaQuestions");
        // var wrongAnswerDiv = $("<div>").addClass("wrongAnswerTrivia");
        // var rightAnswerDiv = $("<div>").addClass("rightAnswerTrivia");

        for (let i = 0; i < triviaQuestions.length; i++) {
            let myTime = i * countDown;
            clearInterval(myVar);
            setTimeout(function () {
                console.log(triviaQuestions[i]);

                // Builds questions
                const currentObject = triviaQuestions[questionNum];
                const question = currentObject.question;
                const answers = currentObject.answers;

                buildQuestion(question, answers, displayTrivia);

                if (i === triviaQuestions.length - 1) {
                    setTimeout(function () {
                        // console.log("Game over!")
                        gameOver(displayTrivia);
                    }, 3000)
                }
                questionNum++;
            }, myTime);
        };
    }

    function buildQuestion(qus, ans, targetDiv) {
        // Build my question and answers from my object array values
        targetDiv.empty();
        var newDiv = $("<div>");
        newDiv.html($("<p>" + qus + "</p>"));
        newDiv.append($("<div>").addClass("questionDiv").val("a").text(ans.a));
        newDiv.append($("<div>").addClass("questionDiv").val("b").text(ans.b));
        newDiv.append($("<div>").addClass("questionDiv").val("c").text(ans.c));
        newDiv.append($("<div>").addClass("questionDiv").val("d").text(ans.d));
        targetDiv.append(newDiv);
        $(".questionDiv").on("click", function () {
            playerSelect = $(this).val();
            console.log(playerSelect);
            console.log(questionNum);
        })
        console.log(newDiv);
    }

    var seconds = 5;
    var myVar = setInterval(function () {
        myTimer();
    }, 3000);

    function resetTimer() {
        seconds = 5;
    }

    function myTimer() {
        $("#countdownTimer").html = seconds < 10 ? `00:0${seconds--}` : `00:${seconds--}`;
        if (seconds === -1) {
            resetTimer();
            populateQuestion();
        }
    }

    function gameOver(displayDiv) {
        displayDiv.html($("<p>").addClass("gameOver").text("Game over!"));
        calculateScore();
    }

    function calculateScore() {
        console.log("Calculating Score Later");
    }

    // Create a timer that counts down from n seconds.

    // var number = 5;

    // var intervalId;
    // var intervalIsRunning = false;


    // function run() {
    //     if (!intervalIsRunning) {
    //         intervalId = setInterval(decrement, 1000); // Set intervalID to an interval passing decfrement function, and 1000 ms
    //         intervalIsRunning = true; // When the function is run, set intervalIsRunning to true.
    //     }
    // }

    // function decrement() {
    //     number--;
    //     $("#countdownTimer").html(number);

    //     if (number === 0) {
    //         stop();
    //         alert("Time Up!");
    //     }
    // }

    // function stop() {

    //     clearInterval(intervalId);
    //     intervalIsRunning = false; // Now when this is stopped, you must set interval to false.
    // }

    $("#timerDisplay").hide(); // Start with the timer hidden.

    // $("#startTimer").on("click", populateQuestion); // Start timer and quiz on button click
    $("#startTimer").on("click", startTimer); // Start timer and quiz on button click

    function startTimer() {

        $("#startTimer").hide(); // Hide the timer.
        $("#displayTrivia").show(); // Show the trivia box.
        $("#timerDisplay").show();
        populateQuestion(); // Populate a question.
        // var playerSelect; // This is a variable for the player's answer!

        // $(".questionDiv").click(function () {
        //     playerSelect = $(this).val();
        //     console.log(playerSelect);
        //     determineWinLose(playerSelect); // Put the player's answer into the win/lose, see if they won/lost.
        // })
    }

    // var win = 0;
    // var lose = 0;
    // var timeOut = 0;

    // function determineWinLose(choice) {
    //     if (choice === correctAnswer) {
    //         $(".rightAnswerTrivia").show().prepend($("<h2>Correct!</h2>"));
    //         $(".triviaQuestions").hide();
    //         stop();
    //         question = false;
    //         win++;
    //         console.log("# Wins:" + win);
    //         getNextQuestion();
    //         return false;
    //     } else {
    //         $(".wrongAnswerTrivia").show().prepend($("<h2>Not Quite!</h2>"));
    //         $(".triviaQuestions").hide();
    //         stop();
    //         question = false;
    //         lose++;
    //         console.log("# Lose: " + lose);
    //         getNextQuestion();
    //         return false;
    //     }
    // }

    // function getNextQuestion() {
    //     if (!intervalBetweenQuestions) {
    //         intervalIdQuestions = setInterval(nextQuestion, 5000); // Run function after 5 seconds
    //         intervalBetweenQuestions = true;
    //     }
    // }

    // function nextQuestion() { // Will need some way of checking that we have asked all questions to display the Final Results and allow for a reset of the game without page reload
    //     $("#displayTrivia").empty();
    //     number = 5;
    //     startTimer();
    //     clearInterval(intervalIdQuestions);
    //     intervalBetweenQuestions = false;
    // }

    // function decrement() {
    //     $("#timerDisplay").show();
    //     number--;
    //     $("#countdownTimer").html(number);
    //     if (number === 0) {
    //         stop();
    //         question = false;
    //         $(".wrongAnswerTrivia").show().prepend($("<h2>Out of Time!</h2>"));
    //         $(".triviaQuestions").hide();
    //         timeOut++;
    //         console.log("# Time Outs: " + timeOut);
    //         getNextQuestion();
    //     }
    // }

    // function stop() {

    //     clearInterval(intervalId);
    //     intervalIsRunning = false;
    // }
});



        //         wrongAnswerDiv.html($("<p>").text(triviaQuestions[i + questionNum].text));
        //         wrongAnswerDiv.append($("<img>").attr("src", triviaQuestions[i + questionNum].gif));
        //         rightAnswerDiv.html($("<img>").attr("src", triviaQuestions[i + questionNum].gif));
        //         displayTrivia.append(newDiv);
        //         displayTrivia.append(rightAnswerDiv);
        //         rightAnswerDiv.hide();
        //         displayTrivia.append(wrongAnswerDiv);
        //         wrongAnswerDiv.hide();

        //     } else {
        //         stop();
        //         displayTrivia.append($("<div>").text("You completed the quiz."));
        //     }
        // }
        // 