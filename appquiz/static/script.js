const questions=[
    {
        question:"This is the first question ?",
        answers:[
            {text:"Options 1" ,correct:false},
            {text:"Options 2" ,correct:true},
            {text:"Options 3" ,correct:false},
            {text:"Options 4" ,correct:false},
           

        ]
    },
    {
        question:"This is the second question ?",
        answers:[
            {text:"Options 2.1" ,correct:false},
            {text:"Options 2.2" ,correct:true},
            {text:"Options2. 3" ,correct:false},
            {text:"Options 2.4" ,correct:false},

        ]
    },
    {
        question:"This is the third question ?",
        answers:[
            {text:"Options 3.1" ,correct:false},
            {text:"Options 3.2" ,correct:true},
            {text:"Options 3.3" ,correct:false},
            {text:"Options 3.4" ,correct:false},

        ]
    },
    {

        question:"This is the Forth question ?",
        answers:[
            {text:"Options 4.1" ,correct:false},
            {text:"Options 4.2" ,correct:true},
            {text:"Options 4.3" ,correct:false},
            {text:"Options 4.4" ,correct:false},

        ]
    }
]
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer.buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;


function startQuiz(){
    resetstate();
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetstate();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    questionElement.innerHTML=questionNo + "."+currentQuestion.question;
    currentQuestion.answers.forEach(answers=>{
        const button =document.createElement("button");
        button.innerHTML=answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answers.correct){
            button.dataset.correct= answers.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}
function resetstate(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect =selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled =true;
    });
    nextButton.style.display ='block';
}

function showscore(){
    resetstate();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showscore();
    }
}
nextButton.addEventListener("click",(e)=>{
    if(currentQuestionIndex < questions.length){
       handleNextButton();
    }  
    else{
        startQuiz();
    }
});

startQuiz();
