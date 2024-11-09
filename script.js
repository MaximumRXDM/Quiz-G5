const questions = [
    { question: "Migraine is a neurological condition that can cause symptoms of several kinds. It is often marked by intense, debilitating headaches. Which of the following food additives is known to cause migraine?", options: ["tartrazine", "parabens", "carrageenan", "aspartame"], answer: 3 },
    { question: "Numbness puts pressure on blood vessels and nerves, reducing the feeling of sensitivity. Which of the following food additives is associated with numbness?", options: ["MSG", "guar gum", "cottonseed oil", "casein"], answer: 0 },
    { question: "The most common cause of dementia is Alzheimer’s disease, a continuous deterioration in thought, behavioral, and social skills of an individual. Studies have linked this disease to _____ .", options: ["potassium alginate", "nitrates", "calcium sulfate", "aspartame"], answer: 3 },
    { question: "Butylated hydroxytoluene (BHT) and butylated hydroxyanisole (BHA) are widely used preservatives used to prevent color, odor, and taste changes in some food products. It is known to cause _____ .", options: ["heart diseases", "diabetes", "chronic hives", "cancers"], answer: 3 },
    { question: "Which of the following food additives is being linked to constipation?", options: ["erythorbic acid", "guar gum", "lycopene", "propyl gallate"], answer: 1 },
    { question: "Which of the following can cause serious health problems related to weight gain and diabetes?", options: ["sorbic acid", "high fructose corn syrup", "ethyl maltol", "cottonseed oil"], answer: 1 },
    { question: "Which of the following is the food additive that has been correlated with early puberty cases in girls?", options: ["pectinase", "parabens", "molecular sieve", "calcium aluminosilicate"], answer: 1 },
    { question: "Carrageenan functions in different food items as thickeners, emulsifiers, and preservatives. It is thought to have detrimental effects on _____ .", options: ["skin allergies", "heart diseases", "digestive health", "asthma attacks"], answer: 2 },
    { question: "Trans fat improves shelf-life and product quality in many kinds of processed foods. Several studies have associated high trans fat intake with a higher risk of _____ .", options: ["respiratory diseases", "neurological diseases", "hives", "heart diseases"], answer: 3 },
    { question: "Cottonseed oil helps reduce “bad cholesterol” and increases good cholesterol. The controversy surrounding cottonseed oil consumption is linked to _____ .", options: ["decreased sperm counts", "heart diseases", "intestinal ulcers", "skin rashes"], answer: 1 },
    { question: "Monosodium Glutamate (MSG) has been used for decades as a food additive. MSG causes many adverse reactions EXCEPT _____ .", options: ["numbness", "facial pressure or tightness", "diabetes", "headache"], answer: 2 },
    { question: "Brain tumor is defined as the mass growth of abnormal cells in the brain. Which of the following food additives is linked to this serious health complication?", options: ["poly(vinyl acetate)", "catalase", "aspartame", "allyl cyclohexylpropionate"], answer: 2 },
    { question: "Tartrazine is the most frequently used yellow dye in drinks, sweets, ice cream, and desserts. As a food additive, it has been linked to _____ .", options: ["asthma attacks", "thyroid cancer", "brain tumor", "heart diseases"], answer: 0 },
    { question: "Ulcer is a raw or sore spot in the lining of the intestine that is attached to the stomach. Growth of intestinal ulcers is associated with which of the following food additives?", options: ["carrageenan", "cottonseed oil", "MSG", "trans fat"], answer: 3 },
    { question: "Anorexia is an eating disorder with an abnormally low body weight and an excessive fear of weight gain. Which of the following food additives is linked to anorexia?", options: ["parabens", "MSG", "guar gum", "cottonseed oil"], answer: 1 }
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
    questionContainer.innerHTML = `<p id="question">${questionObj.question}</p>`;
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
        nextButton.classList.remove("hidden");
    } else {
        feedback.innerText = `Incorrect!`;
        feedback.classList.remove("hidden");
        loseLife();
        nextButton.classList.add("hidden");
    }
}

function loseLife() {
    if (lives > 0) {
        hearts[lives - 1].src = "https://i.ibb.co/JHL8gFr/removal-ai-2480f998-3ae1-42d6-9d62-9051348a91fd-328-3286227-pixel-black-heart-png.png";
        lives--;
    }
}

function nextQuestion() {
    feedback.classList.add("hidden");
    correctAnswerDisplay.classList.add("hidden");
    nextButton.classList.add("hidden");
    currentQuestionIndex++;
    loadQuestion();
}

function displayCompletionMessage() {
    completionMessage.classList.remove("hidden");
    questionContainer.classList.add("hidden");
    hearts.forEach((heart) => heart.classList.add("hidden"));
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(-1); // Automatically treat as wrong answer when time runs out
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 20;
    timerDisplay.innerText = `${timeLeft}s`;
}

loadQuestion();
