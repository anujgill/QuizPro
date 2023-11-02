const questions = [
    {
        question:"Who was the famous ancient Indian emperor known for his role in the spread of Buddhism and his support of the Third Buddhist Council?",
        answers:[
            {text:"Chandragupta Maurya",correct:false},
            {text:"Harsha",correct:false},
            {text:"Ashoka",correct:true},
            {text:"Samudragupta",correct:false},
        ]
    },
    {
        question:"The concept of \"ahimsa,\" or non-violence, was promoted by which ancient Indian leader and thinker??",
        answers:[
            {text:"Mahavira",correct:true},
            {text:"Mahatma Gandhi",correct:false},
            {text:"Adi Shankaracharya",correct:false},
            {text:"Guru Nanak",correct:false},
        ]
    },
    {
        question:"Who is considered the author of the ancient Indian treatise on statecraft and military strategy known as the \"Arthashastra\"?",
        answers:[
            {text:"Kautilya (Chanakya)",correct:true},
            {text:"Kalidasa",correct:false},
            {text:"Panini",correct:false},
            {text:"Valmiki",correct:false},
        ]
    },
    {
        question:"Who was the founder of the Mauryan dynasty and the first emperor of a unified India?",
        answers:[
            {text:"Bindusara",correct:false},
            {text:"Chandragupta Maurya",correct:true},
            {text:"Ashoka",correct:false},
            {text:"Kanishka",correct:false},
        ]
    },
    {
        question:"What ancient Indian text, attributed to the sage Vyasa, is one of the longest epic poems in the world and includes the Bhagavad Gita?",
        answers:[
            {text:"Rigveda",correct:false},
            {text:"Ramayana",correct:false},
            {text:"Mahabharata",correct:true},
            {text:"Upanishads",correct:false},
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