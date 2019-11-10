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

    let questionNum = 0;
    let playerSelect;
    let correct;
    console.log("correct at start of everything: " + correct);
    let countDown = 1000 * 5;

    function populateQuestion() {
        const displayTrivia = $("#displayTrivia");

        for (let i = 0; i < triviaQuestions.length; i++) {
            let myTime = i * countDown;
            setTimeout(function () {
                // Builds questions
                const currentObject = triviaQuestions[i];
                const question = currentObject.question;
                const answers = currentObject.answers;
                const gif = currentObject.gif;
                const text = currentObject.text;
                correct = currentObject.current;
                console.log("correct in if loop of propogateQuestion: " + correct);

                buildQuestion(question, answers, displayTrivia);
                buildAnswers(gif, displayTrivia);

                if (i === triviaQuestions.length - 1) {
                    stopTimer();
                    clearInterval(intervalId);
                    setTimeout(function () {
                        console.log("Game over!")
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
        var newDiv = $("<div>").addClass("triviaQuestions");
        newDiv.html($("<p>" + qus + "</p>"));
        newDiv.append($("<div>").addClass("questionDiv").val("a").text(ans.a));
        newDiv.append($("<div>").addClass("questionDiv").val("b").text(ans.b));
        newDiv.append($("<div>").addClass("questionDiv").val("c").text(ans.c));
        newDiv.append($("<div>").addClass("questionDiv").val("d").text(ans.d));
        targetDiv.append(newDiv);
        $(".questionDiv").on("click", function () {
            playerSelect = $(this).val();
            console.log(playerSelect);
            console.log("val of questionNum in buildQuestion on click event function: " + questionNum);
            stopTimer();
            calculateScore(playerSelect);
            resetTimer();
        })
    }

    function buildAnswers(gif, targetDiv) { // Just do one, in correct/incorrect can do the text
        var answerDiv = $("<div>").addClass("answerTrivia");
        answerDiv.html($("<img>").attr("src", gif));
        targetDiv.append(answerDiv);
        answerDiv.hide();
    }

    function gameOver(displayDiv) {
        displayDiv.html($("<p>").addClass("gameOver").text("Game over!"));
        calculateScore();
    }

    function calculateScore(choice) {
        console.log("Calculating Score Later");
        if (choice === correct) {
            console.log("Answer is right!");
        } else {
            console.log("Answer is not right!")
        }
    }

    $("#timerDisplay").hide();

    $("#startTimer").on("click", startTimer); // Start timer and quiz on button click

    function startTimer() {
        $("#startTimer").hide(); // Hide the timer.
        $("#displayTrivia").show(); // Show the trivia box.
        $("#timerDisplay").show();
        populateQuestion(); // Populate a question.
        runTimer();
    }

    var number = 5;
    // Run first interval, and call first interval off. Deals with question times.
    var intervalId;
    var intervalIsRunning = false;

    function resetTimer() {
        number = 5;
        runTimer();
    }

    function runTimer() {
        if (!intervalIsRunning) {
            intervalId = setInterval(decrement, 1000);
            intervalIsRunning = true; // When the function is run, set intervalIsRunning to true.
        }
    }

    function decrement() { // Count down from number to zero
        number--;
        $("#countdownTimer").html(number);
        if (number === 0) {
            stopTimer();
            question = false;
            console.log("Time Up!");
            // getNextQuestion();
        }
    }

    function stopTimer() { // Stop the timer running, clear the interval.
        clearInterval(intervalId);
        intervalIsRunning = false;
    }
});