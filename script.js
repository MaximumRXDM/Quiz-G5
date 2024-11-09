const questions = [
    {
        question: "Migraine is a neurological condition that can cause symptoms of several kinds. It is often marked by intense, debilitating headaches. Which of the following food additive is known to cause migraine?",
        choices: ["a. tartrazine", "b. parabens", "c. carrageenan", "d. aspartame"],
        correctAnswer: "d. aspartame",
        answeredCorrectly: false
    },
    {
        question: "Numbness puts pressure on blood vessels and nerves, reducing the feeling of sensitivity. Which of the following food additives is associated with numbness?",
        choices: ["a. MSG", "b. guar gum", "c. cottonseed oil", "d. casein"],
        correctAnswer: "a. MSG",
        answeredCorrectly: false
    },
    {
        question: "The most common cause of dementia is Alzheimer’s disease, a continuous deterioration in thought, behavioral and social skills of an individual. Studies have linked this disease to _____ .",
        choices: ["a. potassium alginate", "b. nitrates", "c. calcium sulfate", "d. aspartame"],
        correctAnswer: "d. aspartame",
        answeredCorrectly: false
    },
    {
        question: "Butylated hydroxytoluene (BHT) and butylated hydroxyanisole (BHA) are widely used preservatives to prevent color, odor, and taste changes in some food products. It is known to cause _____.",
        choices: ["a. heart diseases", "b. diabetes", "c. chronic hives", "d. cancers"],
        correctAnswer: "d. cancers",
        answeredCorrectly: false
    },
    {
        question: "Which of the following food additives is being linked to constipation?",
        choices: ["a. erythorbic acid", "b. guar gum", "c. lycopene", "d. propyl gallate"],
        correctAnswer: "b. guar gum",
        answeredCorrectly: false
    },
    {
        question: "Which of the following can cause serious health problems related to weight gain and diabetes?",
        choices: ["a. sorbic acid", "b. high fructose corn syrup", "c. ethyl maltol", "d. cottonseed oil"],
        correctAnswer: "b. high fructose corn syrup",
        answeredCorrectly: false
    },
    {
        question: "Which of the following is the food additive that has been correlated with early puberty cases in girls?",
        choices: ["a. pectinase", "b. parabens", "c. molecular sieve", "d. calcium aluminosilicate"],
        correctAnswer: "b. parabens",
        answeredCorrectly: false
    },
    {
        question: "Carrageenan functions in different food items as thickeners, emulsifiers, and preservatives. It is thought to have detrimental effects on",
        choices: ["a. skin allergies", "b. heart diseases", "c. digestive health", "d. asthma attacks"],
        correctAnswer: "c. digestive health",
        answeredCorrectly: false
    },
    {
        question: "Trans fat improves shelf-life and product quality in many kinds of processed foods. Several studies have been associated with high trans fat intake and higher risk of",
        choices: ["a. respiratory diseases", "b. neurological diseases", "c. hives", "d. heart diseases"],
        correctAnswer: "d. heart diseases",
        answeredCorrectly: false
    },
    {
        question: "Cottonseed oil helps reduce “bad cholesterol” and increases good cholesterol. The controversy surrounding cottonseed oil consumption is linked to",
        choices: ["a. decreased sperm counts", "b. heart diseases", "c. intestinal ulcers", "d. skin rashes"],
        correctAnswer: "a. decreased sperm counts",
        answeredCorrectly: false
    },
    {
        question: "Monosodium Glutamate (MSG) has been used for decades as a food additive. MSG causes many adverse reactions EXCEPT:",
        choices: ["a. numbness", "b. facial pressure or tightness", "c. diabetes", "d. headache"],
        correctAnswer: "c. diabetes",
        answeredCorrectly: false
    },
    {
        question: "Brain tumor is defined as the mass growth of abnormal cells in the brain. Which of the following food additives is linked to this serious health complication?",
        choices: ["a. poly(vinyl acetate)", "b. catalase", "c. aspartame", "d. allyl cyclohexylpropionate"],
        correctAnswer: "c. aspartame",
        answeredCorrectly: false
    },
    {
        question: "Tartrazine is the most frequently used yellow dye in drinks, sweets, ice cream, and desserts. As a food additive, it has been linked to",
        choices: ["a. asthma attacks", "b. thyroid cancer", "c. brain tumor", "d. heart diseases"],
        correctAnswer: "a. asthma attacks",
        answeredCorrectly: false
    },
    {
        question: "Ulcer is a raw or sore spot in the lining of the intestine that attaches to the stomach. Growth of intestinal ulcers is associated with which of the following food additives?",
        choices: ["a. carrageenan", "b. cottonseed oil", "c. MSG", "d. trans fat"],
        correctAnswer: "d. trans fat",
        answeredCorrectly: false
    },
    {
        question: "Anorexia is an eating disorder with an abnormally low body weight and an excessive fear of weight gain. Which of the following food additives is linked to anorexia?",
        choices: ["a. parabens", "b. MSG", "c. guar gum", "d. cottonseed oil"],
        correctAnswer: "c. guar gum",
        answeredCorrectly: false
    }
];

let currentQuestionIndex = 0;
let timeLeft = 20;
let timer;

function startTimer() {
    timer = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timer);
            showNextQuestion();
        } else {
            document.getElementById('timeLeft').textContent = timeLeft;
            timeLeft--;
        }
    }, 1000);
}

function showNextQuestion() {
    if (currentQuestionIndex >= questions.length) {
        alert('Quiz Finished!');
        return;
    }

    let question = questions[currentQuestionIndex];
    document.getElementById('questionText').textContent = question.question;
    const buttons = document.querySelectorAll('.choices-btn');
    buttons.forEach((button, index) => {
        button.textContent = question.choices[index];
        button.disabled = false;
    });

    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('compensateButton').style.display = 'none';
    document.getElementById('result').textContent = '';

    startTimer();
}

function checkAnswer(choice) {
    let question = questions[currentQuestionIndex];
    if (question.choices[choice] === question.correctAnswer) {
        question.answeredCorrectly = true;
        document.getElementById('result').textContent = "Correct!";
        updateHearts();
    } else {
        question.answeredCorrectly = false;
        document.getElementById('result').textContent = "Incorrect!";
        document.getElementById('compensateButton').style.display = 'block';
    }
    document.querySelectorAll('.choices-btn').forEach(btn => btn.disabled = true);
    document.getElementById('nextButton').style.display = 'block';
}

function updateHearts() {
    let heartsLeft = hearts.length - 1;
    if (heartsLeft >= 0) hearts[heartsLeft].style.display = 'none';
}

function compensate() {
    if (hearts.length > 0) {
        hearts[hearts.length - 1].style.display = 'inline';
        questions[currentQuestionIndex].answeredCorrectly = false;
        document.getElementById('result').textContent = "Compensated!";
        document.getElementById('compensateButton').style.display = 'none';
    }
}

document.getElementById('nextButton').addEventListener('click', function() {
    currentQuestionIndex++;
    timeLeft = 20;
    showNextQuestion();
});

document.getElementById('compensateButton').addEventListener('click', compensate);

document.querySelectorAll('.choices-btn').forEach((button, index) => {
    button.addEventListener('click', () => checkAnswer(index));
});

showNextQuestion();
