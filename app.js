let quizzes = [];
let currentQuizIndex = null;

document.getElementById('quiz-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const question = document.getElementById('question').value;
    const answers = Array.from(document.getElementsByClassName('answer')).map(input => input.value);
    const correct = parseInt(document.getElementById('correct').value);
    
    const quiz = {
        question,
        answers,
        correct
    };

    quizzes.push(quiz);
    displayQuizzes();
    this.reset();
});

function displayQuizzes() {
    const quizList = document.getElementById('quizzes');
    quizList.innerHTML = '';
    quizzes.forEach((quiz, index) => {
        const li = document.createElement('li');
        li.textContent = quiz.question;
        li.addEventListener('click', () => startQuiz(index));
        quizList.appendChild(li);
    });
}

function startQuiz(index) {
    currentQuizIndex = index;
    const quiz = quizzes[index];
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';
    const questionElem = document.createElement('div');
    questionElem.innerHTML = `
        <p>${quiz.question}</p>
        ${quiz.answers.map((answer, i) => `<label><input type="radio" name="answer" value="${i + 1}"> ${answer}</label>`).join('<br>')}
    `;
    questionsContainer.appendChild(questionElem);

    document.getElementById('create-quiz').style.display = 'none';
    document.getElementById('quiz-list').style.display = 'none';
    document.getElementById('take-quiz').style.display = 'block';
}

document.getElementById('quiz-take-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const quiz = quizzes[currentQuizIndex];
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    const scoreElem = document.getElementById('score');
    if (selectedAnswer) {
        const score = parseInt(selectedAnswer.value) === quiz.correct ? 1 : 0;
        scoreElem.textContent = `You scored ${score}/1`;
    } else {
        scoreElem.textContent = 'Please select an answer.';
    }
    document.getElementById('take-quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
});

document.getElementById('retake-quiz').addEventListener('click', function () {
    document.getElementById('create-quiz').style.display = 'block';
    document.getElementById('quiz-list').style.display = 'block';
    document.getElementById('result').style.display = 'none';
});
