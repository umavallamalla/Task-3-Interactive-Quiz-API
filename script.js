// Navigation active link highlight
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Quiz Data
const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    answer: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["Python Script", "JQuery", "Django", "NodeJS"],
    answer: 2
  },
  {
    question: "Which language connects web pages to databases?",
    options: ["HTML", "PHP", "CSS", "All of these"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <h3>${q.question}</h3>
    ${q.options.map((opt, i) => `
      <label class="option-card">
        <input type="radio" name="answer" value="${i}">
        <span>${opt}</span>
      </label>
    `).join('')}
  `;
}

nextBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Please select an answer!");
    return;
  }

  if (parseInt(selected.value) === quizData[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    quizContainer.innerHTML = `<h3>You scored ${score} out of ${quizData.length}</h3>`;
    nextBtn.style.display = "none";
  }
});

loadQuestion();

// API Section – Random Joke
const jokeBtn = document.getElementById("joke-btn");
const jokeText = document.getElementById("joke");

jokeBtn.addEventListener("click", () => {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      jokeText.textContent = `${data.setup} — ${data.punchline}`;
    })
    .catch(() => {
      jokeText.textContent = "Oops! Couldn't fetch a joke right now.";
    });
});

// Feedback Form
document.getElementById("feedbackForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("feedbackResult").textContent = "✅ Thank you for your feedback!";
  this.reset();
});