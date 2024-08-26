let startBtn = document.querySelector(".start-btn"),
landingPage = document.querySelector(".landing-page"),
instructionCard = document.querySelector(".instruction"),
instructionExit = document.querySelectorAll(".instruction button")[0],
startQuizBtn = document.querySelectorAll(".instruction button")[1],
wrapper = document.querySelector(".quiz-wrapper"),
nextBtn = document.querySelector(".btn button"),
resultCard = document.querySelector(".result-card"),
time = document.querySelectorAll(".Timer p")[1],
progressBar = document.querySelector(".inner"),
questionElement = document.querySelector(".question-container"),
answerContainer = document.querySelector(".option-container"),
currentQuestionNum = document.querySelector(".current-question"),
totalQuestion = document.querySelector(".total-question"),
totalScore = document.querySelector(".total-score .value"),
yourScore = document.querySelector(".user-score .value"),
unattempted = document.querySelector(".unattempted .value"),
attempted = document.querySelector(".attempted .value"),
wrong = document.querySelector(".wrong .value"),
replayQuiz = document.querySelectorAll(".score-btn button")[0],
exitQuiz = document.querySelectorAll(".score-btn button")[1];

let currentQuestion = 0;
let userAnswers = [];
let timer,
  progressInterval,
  width = 1,
  score = 0,
  attemptQuestion = 0,
  unattemptedQuestion = 0,
  wrongQuestion = 0;


const handleStartBtn = () => {
  instructionCard.style.transform = "scale(1)"
  instructionCard.style.transform = "translate(-12%)"
  instructionCard.style.width = "320px"
  instructionCard.style.opacity = "1"
  landingPage.style.width = "0"
  landingPage.style.transform = "scale(0)"
  startBtn();
};

startBtn.onclick = handleStartBtn;


const handleInstructionExit = () => {
  instructionCard.style.transform = "scale(0)"
  instructionCard.style.width = "0"
  landingPage.style.width = "350px"
  landingPage.style.transform = "scale(1)"
  instructionExit();
};

instructionExit.onclick = handleInstructionExit;


const handleStartQuizBtn = () => {
  wrapper.style.transform = "scale(1)"
  wrapper.style.transform = "translate(-15%)"
  wrapper.style.width = "320px"
  instructionCard.style.transform = "scale(0)"
  instructionCard.style.width = "0"
  startQuiz();
};

startQuizBtn.onclick = handleStartQuizBtn;
  

const handleReplayQuiz = () => {
  resultCard.style.width = "0"
  resultCard.style.transform = "scale(0)"
  wrapper.style.transform = "scale(1)"
  wrapper.style.transform = "translate(-15%)"
  wrapper.style.width = "320px"
  currentQuestion = 0
  score = 0,
  attemptQuestion = 0,
  unattemptedQuestion = 0,
  wrongQuestion = 0;
  startQuiz();
};

replayQuiz.onclick = handleReplayQuiz;


const handleExitQuiz = () => {
  resultCard.style.width = "0"
  resultCard.style.transform = "scale(0)"
  currentQuestion = 0
  score = 0,
  attemptQuestion = 0,
  unattemptedQuestion = 0,
  wrongQuestion = 0;
  landingPage.style.transform = "scale(1)"
  landingPage.style.width = "350px"
  exitQuiz();
};

exitQuiz.onclick = handleExitQuiz;


// The questions...

const questions = [  
  { question: "1.) How do you write 'Hello World' in an alert box?",    
    options: ["A.) msgBox('Hello World')", "B.) alertBox('Hello World')", "C.) alert('Hello World')", "D.) msg('Hello World')"],
    answer: "2"
  },
  {
    question: "2.) Inside which HTML element do we put the JavaScript?",
    options: ["A.) script tag", "B.) javascript tag", "C.) js tag", "D.) scripting tag"],
    answer: "0"
  },
  {
    question: "3.) How do you create a function in JavaScript?",
    options: ["A.) function(myFunction)()", "B.) function = myFunction()", "C.) function:myFunction()", "D.) function myFunction()"],
    answer: "3"
  },
  {
    question: "4.) How do you call a function named 'myFunction'?",
    options: ["A.) call myFunction()", "B.) call function myFunction()", "C.) myFunction()", "D.) myFunction(function)"],
    answer: "2"
  },
  {
    question: "5.) Which event occurs when the user clicks on an HTML element?",
    options: ["A.) onmouseover", "B.) onclick", "C.) onchange", "D.) onmouseclick"],
    answer: "1"
  },
  {
    question: "6.) How to write an IF statement in JavaScript?",
    options: ["A.) if (i == 5)", "B.) if i = 5", "C.) if i == 5 then", "D.) if i = 5 then"],
    answer: "0"
  },
  {
    question: "7.) How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    options: ["A.) if (i <> 5)", "B.) if i =! 5 then", "C.) if i <> 5", "D.) if (i != 5)"],
    answer: "3"
  },
  {
    question: "8.) How does a FOR loop start?",
    options: ["A.) for (i = 0; i <= 5; i++)", "B.) for i = 1 to 5", "C.) for (i <= 5; i++)", "D.) for (i = 0; i <= 5)"],
    answer: "0"
  },
  {
    question: "9.) How can you add a comment in a JavaScript?",
    options: ["A.) !--This is a comment--", "B.) 'This is a comment", "C.) This is a comment\\", "D.) //This is a comment"],
    answer: "3"
  },
  {
    question: "10.) How to insert a comment that has more than one line?",
    options: ["A.) !--This comment has more than one line--", "B.) /*This comment has more than one line*/", "C.) /This comment has more than one line/", "D.) \\This comment has more than one line\\"],
    answer: "1"
  }
];


function startQuiz() {
    // Display the first question and its options
    displayQuestion(currentQuestion);

    // Start the timer
    timer = setInterval(updateTimer, 1000);

    // Update the progress bar
    updateProgress();

    nextBtn.innerHTML = "Next ---&#10095";
    displayQuestion();
};


function displayQuestion(questionIndex) {
  updateProgress();
    // Get the question and options from the questions array
    let question = questions[questionIndex].question;
    let options = questions[questionIndex].options;

    // Display the question and options in their respective containers
    questionElement.innerHTML = question;

    for (let i = 0; i < options.length; i++) {
        let option = `<option onclick = checkAnswer(${i})>${options[i]}</option>`

        answerContainer.insertAdjacentHTML("beforeend",option);        
    };
};


function checkAnswer(selectedIndex) {

    // Get the selected answer from the user
    attemptQuestion++;
    answerContainer.style.pointerEvents="none"
    clearInterval(timer);
    let selectedAnswer = questions[currentQuestion].options[selectedIndex];

    // Get the correct answer from the questions array
    let correctAnswer = questions[currentQuestion].options[questions[currentQuestion].answer];
      
    // Compare the selected answer to the correct answer
    if (selectedAnswer === correctAnswer) {
      score++;
     setTimeout( () => {
       document.querySelectorAll("option")[selectedIndex].style.backgroundColor = "#37BB1169"
       document.querySelectorAll("option")[selectedIndex].style.color = "#fff"
       document.querySelectorAll("option")[selectedIndex].style.borderColor = "green"
     }, 100);
     nextBtn.style.display = "block";

        userAnswers[currentQuestion] = selectedIndex;

        // Display the correct answer and highlight it in green
        
    } else {
      wrongQuestion++;
       setTimeout( () => {
       document.querySelectorAll("option")[selectedIndex].style.backgroundColor = "#B6141469"
       document.querySelectorAll("option")[selectedIndex].style.color = "#fff"
       document.querySelectorAll("option")[selectedIndex].style.borderColor = "red"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.backgroundColor="#37BB1169"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.color="#fff"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.borderColor="green"
     }, 100);
    };
    nextBtn.style.display = "block";
};


function nextQuestion() {
    // Check if the user has answered all questions
    answerContainer.style.pointerEvents="initial"
    time.innerHTML="15"
    updateProgress()
    timer = setInterval(updateTimer, 1000);
    answerContainer.innerHTML = ""
    if (currentQuestion === questions.length - 1) {
      resultCard.style.width = "320px"
      resultCard.style.transform = "scale(1)"
      resultCard.style.transform = "translate(-15%)"
      totalScore.innerHTML = questions.length
      yourScore.innerHTML = score
      attempted.innerHTML = attemptQuestion
      unattempted.innerHTML = unattemptedQuestion
      wrong.innerHTML = wrongQuestion
      wrapper.style.width = "0"
      wrapper.style.transform = "scale(0)"
        endQuiz();
    } else {
        // If there are more questions, update the currentQuestion variable and display the next question and its options
        currentQuestion++;
        currentQuestionNum.innerHTML = currentQuestion + 1
        displayQuestion(currentQuestion);
    };
    nextBtn.style.display = "none";
};


function updateTimer() {
    // Decrement the timer by 1 second
    let remainingTime = parseInt(time.innerHTML) - 1;

    // Update the timer display
    time.innerHTML = remainingTime > 9 ? remainingTime : "0" + remainingTime;

    // Update the progress bar
    
    // If the timer reaches 0, display next btn
    if (remainingTime === 0) {
      unattemptedQuestion++;
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.backgroundColor = "#37BB1169"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.color = "#fff"
      document.querySelectorAll("option")[questions[currentQuestion].answer].style.borderColor = "green"
      answerContainer.style.pointerEvents = "none"
      clearInterval(timer)
      nextBtn.style.display = "block"
    };
};


function updateProgress() {
 progressBar.style.width = (currentQuestion + 1)/questions.length * 100 + "%";
};


function endQuiz() {
    // Stop the timer
    clearInterval(timer);
    // Hide the question and option containers  
};


nextBtn.onclick = nextQuestion;

totalQuestion.innerHTML = questions.length;
currentQuestionNum.innerHTML=currentQuestion + 1;

