const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const headerText = document.querySelector("h1")
const subHeaderText = document.querySelector("h2")
const subSubHeader = document.querySelector("h3")
const scores = document.getElementById("scores")
const scoreUpElement = document.getElementById("score-up")
const scoreUp = parseInt(scoreUpElement.textContent, 0) //retrieves value of score counter/sets as 0
const div = document.getElementById("pic")
let shuffledQuestions, currentQuestionIndex //declare variables whose values can be changed by functions



// const progressBarFull = document.querySelector("progressBarFull")
// declaring global variables

startButton.addEventListener("click", startQuiz) //on click, start quiz
nextButton.addEventListener("click", () => {
    currentQuestionIndex++ //increment index on click
    setNextQ() //set next question
})


function startQuiz(){
    scoreUpElement.textContent = 0 //setting score counter to 0 when quiz is started
    scoreUpElement.classList.remove("hide")
    startButton.classList.add("hide")
    headerText.classList.add("hide")
    subHeaderText.classList.add("hide")
    subSubHeader.classList.remove("hide")
    scores.classList.remove("hide") //hide specific elements when quiz has started
    shuffledQuestions = questions.sort(() => Math.random() - .5) //function to shuffle questions
    currentQuestionIndex = 0 //counter for index of questions
    questionContainerElement.classList.remove("hide")
    setNextQ() //next question function
}

function setNextQ(){ //next question function
    resetState() //goes to reset state function
    showQuestion(shuffledQuestions[currentQuestionIndex]) //runs next question based on shuffled index
}

function resetState(){
    nextButton.classList.add("hide") //hides the next button
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild) //removes answer buttons when quiz not started
    }
}


function showQuestion(question){ //takes question
    questionElement.innerText = question.question //changes text to question
    question.answers.forEach(answer => {       //creates button for each answer in question in question array
        const button = document.createElement("button") 
        button.innerText = answer.text  //changes button text to answer values
        button.classList.add("btn")     
        if (answer.correct) { //if the answer = correct, then...
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button) //append button to button element div
    })
}


function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    processResults(correct)
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove("hide")}
        else{
            const scoreUp = parseInt(scoreUpElement.textContent, 0) //when run out of questions: 
            startButton.innerText = "Restart quiz?"
            startButton.classList.remove("hide")
            subSubHeader.classList.add("hide")
            
            if (scoreUp >= 6){
                scoreUpElement.innerText = "You got: "+ scoreUp + " " + " - you passed!"
                // let img = document.createElement("img")
                // img.src = "https://pbs.twimg.com/media/E9z5V8tUUAQM_V-.jpg"
                // let div = document.getElementById("pic")
                // div.appendChild(img)
                // img.style.width = "400px"
                // img.style.borderRadius = "10px"
                // img.style.margin = "20px"
            }
            if (scoreUp <= 5){
                scoreUpElement.innerText = "You got: " +scoreUp + " " + " - try again."
                // let img = document.createElement("img")
                // img.src = "https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg"
                // let div = document.getElementById("pic")
                // div.appendChild(img)
                // img.style.width = "400px"
                // img.style.borderRadius = "10px"
                // img.style.margin = "20px"
                
                
            }
        }
}

function processResults(isCorrect){
    if (!isCorrect){   //if the answer is not correct, do nothing
        return
    }

    const scoreUp = parseInt(scoreUpElement.textContent, 0)
    scoreUpElement.textContent = scoreUp + 1 + " / " + questions.length //change text of score as correct question answered
}  


function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add("correct")
    }else{
        element.classList.add("wrong") //changes style based on whether answer is correct or incorrect
    }
}

function clearStatusClass(element){
    element.classList.remove("correct")
    element.classList.remove("wrong")   //clears all classes/styles
}


const questions = [ //array of questions and answers
    {
        question: "What does CPU stand for?",
        answers: [
            {text: "Central Processing Unit", correct: true},
            {text: "Central Process Unit", correct: false},
            {text: "Computer Personal Unit", correct: false},
            {text: "Central Processor Unit", correct: false}
        ]
    },
    {
        question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
        answers: [
            {text: "Static", correct: false},
            {text: "Public", correct: false},
            {text: "Final", correct: true},
            {text: "Private", correct: false}
        ]
    },
    {
        question: "The logo for Snapchat is a bell.",
        answers: [
            {text: "True", correct: true},
            {text: "False", correct: false}
        ]
    },
    {
        question: "how many possible answers does this question have?",
        answers: [
            {text: "One", correct: false},
            {text: "Two", correct: false},
            {text: "Three", correct: true}
        ]
    },
    {
        question: "On Twitter, what is the character limit for a tweet?",
        answers: [
            {text: "100", correct: false},
            {text: "140", correct: true},
            {text: "120", correct: false},
            {text: "160", correct: false}
        ]
    },
    {
        question: "In web design, what does CSS stand for?",
        answers: [
            {text: "Computer Style Sheet", correct: false},
            {text: "Corrective Style Sheet", correct: false},
            {text: "Counter Strike: Source", correct: false},
            {text: "Cascading Style Sheet", correct: true}
        ]
    },
    {
        question: "Linux was first created as an alternative to Windows XP",
        answers: [
            {text: "False", correct: true},
            {text: "True", correct: false}
        ]
    },
    {
        question: "What is the code name for the mobile operating system Android 7.0?",
        answers: [
            {text: "Ice Cream Sandwich", correct: false},
            {text: "Jelly Bean", correct: false},
            {text: "Nougat", correct: true},
            {text: "Marshmallow", correct: false}
        ]
    },
    {
        question: "Which programming language shares its name with an island in Indonesia?",
        answers: [
            {text: "Java", correct: true},
            {text: "Jakarta", correct: false},
            {text: "C", correct: false},
            {text: "Python", correct: false}
        ]
    }
]
