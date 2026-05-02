// ════════════════════════════════
// QUIZ DATA
// ════════════════════════════════

const questions = [
  {
    q: "What is the minimum age to vote in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correct: 1,
    explanation: "Article 326 of the Indian Constitution grants the right to vote to every citizen aged 18 or above."
  },
  {
    q: "What does EVM stand for?",
    options: ["Electric Voting Machine", "Electronic Vote Meter", "Electronic Voting Machine", "Electoral Vote Marker"],
    correct: 2,
    explanation: "EVM stands for Electronic Voting Machine, used in Indian general elections since 1999."
  },
  {
    q: "What is NOTA on the EVM?",
    options: ["Name on the Application", "None of the Above", "National Official Tally Agent", "No Other Than Approved"],
    correct: 1,
    explanation: "NOTA (None of the Above) was introduced by Supreme Court order in 2013. It lets voters reject all candidates but does not cancel the election."
  },
  {
    q: "Which card is the official voter ID issued by ECI?",
    options: ["Aadhaar Card", "PAN Card", "EPIC Card", "Driving Licence"],
    correct: 2,
    explanation: "EPIC (Elector's Photo Identity Card) is issued by the Election Commission of India for voter identification."
  },
  {
    q: "What is the Model Code of Conduct (MCC)?",
    options: [
      "A law passed by Parliament",
      "ECI guidelines for parties and candidates during elections",
      "A voter registration form",
      "Rules for counting EVM votes"
    ],
    correct: 1,
    explanation: "MCC is a set of ECI guidelines that all political parties and candidates must follow from election announcement until results."
  }
];

// ════════════════════════════════
// QUIZ STATE
// ════════════════════════════════

let currentQuestion = 0;
let score = 0;
let answered = false;

// ════════════════════════════════
// QUIZ RENDER
// ════════════════════════════════

function renderQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  renderQuestion();
}

function renderQuestion() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  answered = false;
  const q = questions[currentQuestion];
  const qNum = currentQuestion + 1;
  const total = questions.length;
  const pct = Math.round((qNum / total) * 100);

  container.innerHTML = `
    <div class="quiz-meta">
      <span class="quiz-counter">Question ${qNum} of ${total}</span>
    </div>
    <div class="progress-bar-wrap">
      <div class="progress-bar-fill" id="quiz-progress" style="width: ${pct}%"></div>
    </div>
    <p class="quiz-question">${q.q}</p>
    <div class="quiz-options" id="quiz-options">
      ${q.options.map((opt, i) => `
        <button
          class="quiz-option"
          id="opt-${i}"
          onclick="selectOption(${i})"
          aria-label="Option ${i + 1}: ${opt}"
        >${opt}</button>
      `).join('')}
    </div>
    <div id="quiz-feedback"></div>
  `;
}

function selectOption(chosen) {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  const options = document.querySelectorAll('.quiz-option');

  // Disable all
  options.forEach(btn => btn.disabled = true);

  // Mark correct / wrong
  options[q.correct].classList.add('correct');
  if (chosen !== q.correct) {
    options[chosen].classList.add('wrong');
  } else {
    score++;
  }

  // Show explanation + next button
  const feedback = document.getElementById('quiz-feedback');
  const isLast = currentQuestion === questions.length - 1;

  feedback.innerHTML = `
    <div class="quiz-explanation">${q.explanation}</div>
    <button class="quiz-next-btn" onclick="${isLast ? 'showResult()' : 'nextQuestion()'}" id="quiz-next-btn">
      ${isLast ? 'See Results' : 'Next'}
    </button>
  `;
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const container = document.getElementById('quiz-container');
  let msg = '';
  if (score === 5) {
    msg = 'Perfect! You are election-ready';
  } else if (score >= 3) {
    msg = 'Great effort! Explore the Timeline to learn more.';
  } else {
    msg = 'Keep learning! Check the How to Vote section.';
  }

  // Get restart label (language-aware if app.js loaded)
  const restartLabel = (typeof currentLang !== 'undefined' && currentLang === 'hi')
    ? 'फिर से शुरू करें'
    : 'Restart Quiz';

  container.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-score-big">${score}/${questions.length}</div>
      <div class="quiz-score-label">You scored ${score} out of ${questions.length}</div>
      <p class="quiz-score-msg">${msg}</p>
      <button class="quiz-restart-btn" id="quiz-restart-btn" onclick="renderQuiz()">${restartLabel}</button>
    </div>
  `;
}
