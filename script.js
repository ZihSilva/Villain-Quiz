const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

var promise = document.querySelector('audio').play();

if (promise !== undefined) {
  promise.then(_ => {
  }).catch(error => {
  });
}

let questions = [
    {
        question: "Which of the small creatures in the \"Lord of the Rings\" saga said this catchphrase: \“My precious...\"",
        choice1: "Gollum",
        choice2: "Samwise Gamgee",
        choice3: "Galadriel",
        choice4: "Eoin",
        answer: 1,
    },

    {
        question: "Which of the darker magical creatures of Hogwarts said this line: \"Harry Potter, the boy who lived... come to die.\"",
        choice1: "Gilderoy Lockheart",
        choice2: "Bellatrix Lestrange",
        choice3: "Lord Voldemort",
        choice4: "Draco Malfoy",
        answer: 3,
    },

    {
        question: "This very dark lord of the \"Star Wars\" saga showed his other side, albeit still dark when he said this line: \"I am your father!\" Who is he?",
        choice1: "Senator Palpatine",
        choice2: "Darth Vader",
        choice3: "JarJar Binks",
        choice4: "Darth Maul",
        answer: 2,
    },

    {
        question: "In \"The Dark Knight,\" one of Batman's foes said: \"Why so serious?\" Who said it?",
        choice1: "The Penguin",
        choice2: "Two - Face",
        choice3: "The Riddler",
        choice4: "The Joker",
        answer: 4,
    },

    {
        question: "Which animated evil diva said this in a Disney movie: \“I live for furs! I worship furs!?\"",
        choice1: "Pocahontas",
        choice2: "Cruella De Vil",
        choice3: "Ursula",
        choice4: "Belle",
        answer: 2,
    },

    {
        question: "Which of the uncanny X-Men said this: \"You are a god among insects. Never let anyone tell you different.\"",
        choice1: "Professor X",
        choice2: "Toad",
        choice3: "Mystique",
        choice4: "Magneto",
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`


    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question


    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'


        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};
startGame()