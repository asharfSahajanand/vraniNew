// Your JavaScript code here

// Initialize variables
let currentQuestionIndex = 0; // Index to track current question
let coin = 0; // Variable to store earned coins
let quizjson = `[{"q_id":1645,"question":"Who was the maid of honor at Monica's wedding?","answer":"Rachel,Phoebe,Janice,Judy","correct":"Rachel","time":"1652710530","coins":100,"sc_id":36,"title":"Hollywood","c_id":9,"c_name":"Entertainment","c_img":"entertainment.png","sc_img":"entertainment.png","totalprice":10000,"entryFee":50,"live":1},{"q_id":1582,"question":"What did Rachel's dad gift her when she was 15?","answer":"Pony,Shopping mall,Boat,2 Kittens","correct":"Boat","time":"1652710530","coins":100,"sc_id":6,"title":"Friends","c_id":9,"c_name":"Entertainment","c_img":"entertainment.png","sc_img":"entertainment.png","totalprice":10000,"entryFee":50,"live":1},{"q_id":1751,"question":"Guess the Hindi movie title: Shrimaan Bharat","answer":"Bharat,Mr. India,Shrimaan,The Great Bharat","correct":"Mr. India","time":"1652710530","coins":100,"sc_id":18,"title":"Guess-The-Movie","c_id":9,"c_name":"Entertainment","c_img":"entertainment.png","sc_img":"entertainment.png","totalprice":10000,"entryFee":50,"live":1}]`;
// Parse quiz data into JSON format
const quizData = {
  data: JSON.parse(quizjson),
};

// DOM elements
const quizContainer = document.getElementById("quiz-container");
const quizTitle = document.getElementById("quiz-title");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("result");

// Display total number of questions
document.getElementById("totalquestion").innerText = quizData.data.length;

// Function to start the quiz
function startQuiz() {
  showQuestion();
}

// Function to shuffle array elements (used for answer options)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to display current question and answers
function showQuestion() {
  const currentQuestion = quizData.data[currentQuestionIndex];
  quizTitle.innerText = currentQuestion.title;
  questionElement.innerText = currentQuestion.question;

  // Split answers and shuffle them
  const shuffledAnswers = [...currentQuestion.answer.split(",")];
  shuffleArray(shuffledAnswers);

  // Clear previous answers
  answersElement.innerHTML = "";

  // Create answer buttons
  var answersDiv = document.createElement("div");
  shuffledAnswers.forEach((answer, index) => {
    var button = document.createElement("div");
    button.innerText = answer;
    button.onclick = () => checkAnswer(answer, index + 1);
    button.id = `${index + 1}`;
    button.classList.add("option"); // Add CSS classes for styling
    button.classList.add("text-left");
    button.classList.add("p-4");

    answersDiv.classList.add("grid");
    answersDiv.classList.add("grid-cols-2");
    answersDiv.classList.add("gap-2");
    answersDiv.classList.add("text-sm");
    answersDiv.classList.add("font-bold");
    answersDiv.appendChild(button);
  });

  answersElement.appendChild(answersDiv);
}

// Function to check the selected answer
function checkAnswer(selectedAnswer, index) {
  const currentQuestion = quizData.data[currentQuestionIndex];
  const buttons = answersElement.getElementsByTagName("div");

  // Disable button clicks after answering
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.pointerEvents = "none";

    // Highlight correct and incorrect answers
    if (buttons[i].innerText === currentQuestion.correct) {
      buttons[i].style.border = "#0d8009 solid 1px";
      buttons[i].style.background = "#13a30025";
    }
    if (buttons[index].innerText !== currentQuestion.correct) {
      document.getElementById(index).style.border = "red solid 1px";
      document.getElementById(index).style.background = "#a3000025";
    }
  }

  // Display result (Correct/Wrong) and update coins
  if (selectedAnswer === currentQuestion.correct) {
    resultElement.innerText = "Correct!";
    coin += parseInt(currentQuestion.coins);
    resultElement.style.color = "green";
  } else {
    resultElement.innerText = "Wrong!";
    resultElement.style.color = "red";
  }

  resultElement.style.display = "none";
  setTimeout(nextQuestion, 1000); // Move to next question after delay
}

// Function to move to the next question
function nextQuestion() {
  resultElement.style.display = "none";
  currentQuestionIndex++;
  let counting = currentQuestionIndex;
  document.getElementById("currentindex").innerText = counting + 1;

  // Show next question or end quiz if all questions are answered
  if (currentQuestionIndex < quizData.data.length) {
    showQuestion();
  } else {
    // End of quiz: Store total coins in local storage and trigger treasureopen() function
    quizContainer.innerHTML = `<input type="hidden" value="${coin}" id="coin">`;
    let getcoin = document.getElementById("coin").value;
    localStorage.setItem("coin", getcoin);
    localStorage.setItem("totalcoin", getcoin);
    localStorage.setItem("totalplayed", 0);
    localStorage.setItem("is_played", 1);
    localStorage.setItem("rewarded", 0);

    closereward();
    // treasureopen(); // Call function to handle end of quiz actions
  }
}

// Start the quiz when the script runs
startQuiz();
