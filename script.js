const questions = [
    { question: "Which of the following food additives is known to cause migraine?", options: ["tartrazine", "parabens", "carrageenan", "aspartame"], answer: 3 },
    { question: "Which food additive is associated with numbness?", options: ["MSG", "guar gum", "cottonseed oil", "casein"], answer: 0 },
    // Add other questions here...
];

let currentQuestionIndex = 0;
let lives = 5;
let timer;
let timeLeft = 20;

const questionContainer = document.getElementById("question-container");
const feedback = document.getElementById("feedback");
const correctAnswerDisplay = document.getElementById("correct-answer");
const nextButton = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");
const completionMessage = document.getElementById("completion-message");
const hearts = [
    document.getElementById("heart1"),
    document.getElementById("heart2"),
    document.getElementById("heart3"),
    document.getElementById("heart4"),
    document.getElementById("heart5")
];

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        displayCompletionMessage();
        return;
    }

    const questionObj = questions[currentQuestionIndex];
    questionContainer.innerHTML = `<p>${questionObj.question}</p>`;
    questionObj.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.onclick = () => checkAnswer(index);
        questionContainer.appendChild(button);
    });
    resetTimer();
    startTimer();
}

function checkAnswer(selectedOption) {
    clearInterval(timer);
    const questionObj = questions[currentQuestionIndex];

    if (selectedOption === questionObj.answer) {
        feedback.innerText = "Correct Answer!";
        feedback.classList.remove("hidden");
        correctAnswerDisplay.querySelector("span").innerText = questionObj.options[questionObj.answer];
        correctAnswerDisplay.classList.remove("hidden");
    } else {
        feedback.innerText = `Incorrect! Correct answer: ${questionObj.options[questionObj.answer]}`;
        feedback.classList.remove("hidden");
        loseLife();
    }

    nextButton.classList.remove("hidden");
}

function loseLife() {
    if (lives > 0) {
        hearts[lives - 1].src = "https://i.ibb.co/JHL8gFr/removal-ai-2480f998-3ae1-42d6-9d62-9051348a91fd-328-3286227-pixel-black-heart-png.png";
        lives--;
    }
}

function startTimer() {
    timeLeft = 20;
    timerDisplay.innerText = `${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            feedback.innerText = `Time's up! Correct answer: ${questions[currentQuestionIndex].options[questions[currentQuestionIndex].answer]}`;
            feedback.classList.remove("hidden");
            correctAnswerDisplay.querySelector("span").innerText = questions[currentQuestionIndex].options[questions[currentQuestionIndex].answer];
            correctAnswerDisplay.classList.remove("hidden");
            nextButton.classList.remove("hidden");
            loseLife();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 20;
    timerDisplay.innerText = `${timeLeft}s`;
}

nextButton.onclick = () => {
    feedback.classList.add("hidden");
    correctAnswerDisplay.classList.add("hidden");
    nextButton.classList.add("hidden");
    currentQuestionIndex++;
    loadQuestion();
};

function displayCompletionMessage() {
    questionContainer.classList.add("hidden");
    feedback.classList.add("hidden");
    timerDisplay.classList.add("hidden");
    nextButton.classList.add("hidden");
    completionMessage.classList.remove("hidden");
}

loadQuestion();
