// Your JavaScript code here

// Initialize variables
let currentQuestionIndex = 0; // Index to track current question
let coin = 0; // Variable to store earned coins
let score = 0; // Variable to store score
let quizjson = `[{"q_id":811,"question":"What is the Hindi word for 'Shrimp'?","answer":"Samundriya Bhojan,Jhinga,Mass,Sabji","correct":"Jhinga","time":"1652710530","coins":100,"sc_id":24,"title":"English-Hindi-Translation","c_id":1,"c_name":"Vocabulary","c_img":"vocab.png","totalprice":10000,"entryFee":50,"live":1},{"q_id":810,"question":"What is the Hindi word for 'Sauce'?","answer":"Meetha Aachar,Achar,Chatni,Soup","correct":"Chatni","time":"1652710530","coins":100,"sc_id":24,"title":"English-Hindi-Translation","c_id":1,"c_name":"Vocabulary","c_img":"vocab.png","totalprice":10000,"entryFee":50,"live":1},{"q_id":766,"question":"What is the Hindi word for ' Cardamom'?","answer":"Ajwain,Tej Patta,Ilaichi,Kesar","correct":"Ilaichi","time":"1652710530","coins":100,"sc_id":24,"title":"English-Hindi-Translation","c_id":1,"c_name":"Vocabulary","c_img":"vocab.png","totalprice":10000,"entryFee":50,"live":1},{"q_id":805,"question":"What is the Hindi word for ' Tea'?","answer":"Soup,Sharbat,Pani,Chai","correct":"Chai","time":"1652710530","coins":100,"sc_id":24,"title":"English-Hindi-Translation","c_id":1,"c_name":"Vocabulary","c_img":"vocab.png","totalprice":10000,"entryFee":50,"live":1},{"q_id":763,"question":"What is the Hindi word for 'Clarified Butter'?","answer":"Tel,Ghee,Chatni,Tamatar Chatni","correct":"Ghee","time":"1652710530","coins":100,"sc_id":24,"title":"English-Hindi-Translation","c_id":1,"c_name":"Vocabulary","c_img":"vocab.png","totalprice":10000,"entryFee":50,"live":1},{"q_id":764,"question":"What is the English word for 'Amrit'?","answer":"Nector,Holy Basil,Lime,Water","correct":"Nector","time":"1652710530","coins":100,"sc_id":24,"title":"English-Hindi-Translation","c_id":1,"c_name":"Vocabulary","c_img":"vocab.png","totalprice":10000,"entryFee":50,"live":1},{"q_id":802,"question":"What is the English word for 'Panner'?","answer":"Cheese,Butter,Cream,Cottage cheese","correct":"Cottage cheese","time":"1652710530","coins":100,"sc_id":24,"title":"English-Hindi-Translation","c_id":1,"c_name":"Vocabulary","c_img":"vocab.png","totalprice":10000,"entryFee":50,"live":1},{"q_id":779,"question":"What is the Hindi word for ' Fenugreek seeds'?","answer":"Meethi Bij,Sitaful k bij,Aalsi k bij,Lal Mirch","correct":"Meethi Bij","time":"1652710530","coins":100,"sc_id":24,"title":"English-Hindi-Translation","c_id":1,"c_name":"Vocabulary","c_img":"vocab.png","totalprice":10000,"entryFee":50,"live":1},{"q_id":804,"question":"What is the Hindi word for'Sryup'?","answer":"Pani,Sharbat,Chai,Sharab","correct":"Sharbat","time":"1652710530","coins":100,"sc_id":24,"title":"English-Hindi-Translation","c_id":1,"c_name":"Vocabulary","c_img":"vocab.png","totalprice":10000,"entryFee":50,"live":1},{"q_id":795,"question":"What is the English word for 'Santra'?","answer":"Guava,Orange,Apple,Banana","correct":"Orange","time":"1652710530","coins":100,"sc_id":24,"title":"English-Hindi-Translation","c_id":1,"c_name":"Vocabulary","c_img":"vocab.png","totalprice":10000,"entryFee":50,"live":1},{"q_id":789,"question":"What is the English word for 'Ziddi'?","answer":"Stubborn,Corrupt,Unrepentant,Obstinate","correct":"Stubborn","time":"1652710530","coins":100,"sc_id":24,"title":"English-Hindi-Translation","c_id":1,"c_name":"Vocabulary","c_img":"vocab.png","totalprice":10000,"entryFee":50,"live":1},{"q_id":788,"question":"What is the Hindi word for ' Clove'?","answer":"Long,Hing,Lhsun,Sauf","correct":"Long","time":"1652710530","coins":100,"sc_id":24,"title":"English-Hindi-Translation","c_id":1,"c_name":"Vocabulary","c_img":"vocab.png","totalprice":10000,"entryFee":50,"live":1}]`
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
    answersDiv.classList.add('gap-2');
    answersDiv.classList.add('text-sm');
    answersDiv.classList.add('font-bold');
    answersDiv.appendChild(button);
  });

  answersElement.appendChild(answersDiv);
}

// Function to check the selected answer
function checkAnswer(selectedAnswer, index) {
  const currentQuestion = quizData.data[currentQuestionIndex];
  const buttons = answersElement.getElementsByTagName("div");

  // Disable button clicks after answering and highlight correct/incorrect answers
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.pointerEvents = "none";

    if (buttons[i].innerText === currentQuestion.correct) {
      buttons[i].style.border = "#0d8009 solid 1px";
      buttons[i].style.background = "#13a30025"; // Green background for correct answer
    }
    if (buttons[index].innerText !== currentQuestion.correct) {
      document.getElementById(index).style.border = "red solid 1px";
      document.getElementById(index).style.background = "#a3000025"; // Red background for wrong answer
    }
  }

  // Update result text and score based on answer
  if (selectedAnswer === currentQuestion.correct) {
    resultElement.innerText = "Correct!";
    coin += parseInt(currentQuestion.coins);
    score += 10; // Increase score by 10 for each correct answer
    resultElement.style.color = "green";
  } else {
    resultElement.innerText = "Wrong!";
    resultElement.style.color = "red";
  }

  resultElement.style.display = "none";
  setTimeout(nextQuestion, 1000); // Move to next question after delay
}

// Function to handle when time is up
function timesup() {
  // Prepare data for storing in local storage and redirecting to result page
  quizContainer.innerHTML = `<input type="hidden" value="${coin}" id="coin">`;
  let getcoin = document.getElementById("coin").value;
  let oldplayed = localStorage.totalplayed || 0;
  let oldcoin = localStorage.totalcoin || 0;

  // Update local storage with current quiz results
  localStorage.setItem("totalcoin", Number(getcoin) + Number(oldcoin));
  localStorage.setItem("coin", Number(getcoin));
  localStorage.setItem("score", score);
  localStorage.setItem("totalplayed", Number(oldplayed) + 1);

  // Redirect to result page
  location.href = "/result.html";
}

// Set a timer for the quiz (60 seconds in this case)
setTimeout(timesup, 60000);

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
    // End of quiz: Store total coins, score, and update local storage
    quizContainer.innerHTML = `<input type="hidden" value="${coin}" id="coin">`;
    let getcoin = document.getElementById("coin").value;
    let oldcoin = localStorage.totalcoin || 0;
    let oldplayed = localStorage.totalplayed || 0;

    localStorage.setItem("coin", Number(getcoin));
    localStorage.setItem("totalcoin", Number(getcoin) + Number(oldcoin));
    localStorage.setItem("score", score);
    localStorage.setItem("totalplayed", Number(oldplayed) + 1);

    // Redirect to result page
    location.href = "/result.html";
  }
}

// Start the quiz when the script runs
startQuiz();
