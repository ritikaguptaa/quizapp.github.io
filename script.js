const questions = [
    {
        question: "Which of the following are some common RDBMS in use?",
        answers: [
            {text: "Oracle", correct: false},
            {text: "MySQL", correct: false},
            {text: "HeidiSQL", correct: false},
            {text: "All of the above", correct: true},
        ]
    },
    {
        question: "What command is used to create a new table in SQL?",
        answers: [
            {text: "Create Table", correct: true},
            {text: "Generate Table", correct: false},
            {text: "Build Table", correct: false},
            {text: "None of the above", correct: false },
        ]
    },
    {
        question: "What does BLOB in SQL stand for?",
        answers: [
            {text: "Binary Large Objects", correct: true},
            {text: "Big Large Objects", correct: false},
            {text: "Binary Language for Objects", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "What are rows of a relation known as?",
        answers: [
            {text: "Degree", correct: false},
            {text: "Tuple", correct: true},
            {text: "Entity", correct: false},
            {text: "None", correct: false},
        ]
    },
    {
        question: "Which of the following commands are a part of Data Control Language?",
        answers: [
            {text: "Revoke", correct: false},
            {text: "Grant", correct: false},
            {text: "Both A & B", correct: true},
            {text: "None of the abopve", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();