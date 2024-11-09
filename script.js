const questions = [
    { question: "Which of the following food additives is known to cause migraine?", options: ["tartrazine", "parabens", "carrageenan", "aspartame"], answer: 3 },
    { question: "Which food additive is associated with numbness?", options: ["MSG", "guar gum", "cottonseed oil", "casein"], answer: 0 },
    { question: "Studies have linked Alzheimer’s disease to _____ .", options: ["potassium alginate", "nitrates", "calcium sulfate", "aspartame"], answer: 3 },
    { question: "BHT and BHA are known to cause _____ .", options: ["heart diseases", "diabetes", "chronic hives", "cancers"], answer: 3 },
    { question: "Which food additive is linked to constipation?", options: ["erythorbic acid", "guar gum", "lycopene", "propyl gallate"], answer: 1 },
    { question: "Which can cause serious health issues related to weight gain and diabetes?", options: ["sorbic acid", "high fructose corn syrup", "ethyl maltol", "cottonseed oil"], answer: 1 },
    { question: "Which additive has been linked to early puberty cases in girls?", options: ["pectinase", "parabens", "molecular sieve", "calcium aluminosilicate"], answer: 1 },
    { question: "Carrageenan is thought to have detrimental effects on _____ .", options: ["skin allergies", "heart diseases", "digestive health", "asthma attacks"], answer: 2 },
    { question: "High trans fat intake has been associated with _____ .", options: ["respiratory diseases", "neurological diseases", "hives", "heart diseases"], answer: 3 },
    { question: "The controversy around cottonseed oil is linked to _____ .", options: ["decreased sperm counts", "heart diseases", "intestinal ulcers", "skin rashes"], answer: 0 },
    { question: "MSG causes adverse reactions EXCEPT _____ .", options: ["numbness", "facial pressure or tightness", "diabetes", "headache"], answer: 2 },
    { question: "Which food additive is linked to brain tumors?", options: ["poly(vinyl acetate)", "catalase", "aspartame", "allyl cyclohexylpropionate"], answer: 2 },
    { question: "Tartrazine is linked to _____ .", options: ["asthma attacks", "thyroid cancer", "brain tumor", "heart diseases"], answer: 0 },
    { question: "Intestinal ulcers are associated with which food additive?", options: ["carrageenan", "cottonseed oil", "MSG", "trans fat"], answer: 0 },
    { question: "Which additive is linked to anorexia?", options: ["parabens", "MSG", "guar gum", "cottonseed oil"], answer: 1 },
];

let currentQuestionIndex = 0;
let lives = 3;

const questionContainer = document.getElementById("question-container");
const feedback = document.getElementById("feedback");
const finalScore = document.getElementById("final-score");
const scoreDisplay = document.getElementById("score");
const hearts = [document.getElementById("heart1"), document.getElementById("heart2"), document.getElementById("heart3")];

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        displayFinalScore();
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
}

function checkAnswer(selectedOption) {
    const questionObj = questions[currentQuestionIndex];
    
    if (selectedOption === questionObj.answer) {
        feedback.classList.add("hidden");
        currentQuestionIndex++;
        loadQuestion();
    } else {
        feedback.classList.remove("hidden");
        shakeIncorrectButton(selectedOption);
        loseLife();
    }
}

function shakeIncorrectButton(selectedOption) {
    const optionButtons = document.querySelectorAll(".option-btn");
    optionButtons[selectedOption].classList.add("shake");
    setTimeout(() => optionButtons[selectedOption].classList.remove("shake"), 500);
}

function loseLife() {
    if (lives > 0) {
        hearts[lives - 1].src = "https://ibb.co/9WXBS3y"; // Change heart to empty heart image
        lives--;
    }
}

function displayFinalScore() {
    questionContainer.classList.add("hidden");
    feedback.classList.add("hidden");
    finalScore.classList.remove("hidden");
    
    // Calculate the score based on remaining lives
    const score = lives * 10; // e.g., 10 points per remaining life
    scoreDisplay.innerText = score;
}

loadQuestion();
