const questions = [
    {
        question:"Solve the equation for x: 2x^2 + 3x - 5 = 0.",
        answers:[
            {text:"x = -2, x = 5/2",correct:false},
            {text:" x = -1, x = 5",correct:false},
            {text:" x = -1/2, x = 5/2",correct:true},
            {text:"x = -2, x = 5",correct:false},
        ]
    },
    {
        question:"What is the derivative of f(x) = 3x^4 - 2x^3 + 5x^2 - 7x + 9 with respect to x?",
        answers:[
            {text:"12x^3 - 6x^2 + 10x - 7",correct:true},
            {text:"3x^3 - 2x^2 + 5x - 7",correct:false},
            {text:"12x^3 - 6x^2 + 5x - 7",correct:false},
            {text:" 3x^3 - 2x^2 + 10x - 7",correct:false},
        ]
    },
    {
        question:"If the probability of event A is 0.4 and the probability of event B is 0.3, what is the probability of both events A and B occurring if they are independent?",
        answers:[
            {text:"0.12",correct:true},
            {text:"0.15",correct:false},
            {text:"0.2",correct:false},
            {text:"0.7",correct:false},
        ]
    },
    {
        question:"If a right triangle has a hypotenuse of length 10 and one side of length 6, what is the length of the other side?",
        answers:[
            {text:"6",correct:false},
            {text:"8",correct:false},
            {text:"4",correct:true},
            {text:"5",correct:false},
        ]
    },
    {
        question:"Solve the following trigonometric equation for x in the interval [0, 2π]: 2sin(x) - √3 = 0.",
        answers:[
            {text:" x = π/6, x = 5π/6",correct:false},
            {text:" x = π/3, x = 2π/3",correct:true},
            {text:"x = π/4, x = 3π/4",correct:false},
            {text:"x = π/2, x = π",correct:false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion() {
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
        button.addEventListener("click",selectAnswer);
    });
}

function resetState() {
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
        button.disabled=true;
    });
    nextButton.style.display="block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

startQuiz();    