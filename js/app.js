/* ═══════════════════════════════════════
   APP.JS — Chunaav Saathi
   Tab switching | Timeline | Modal |
   Controlled Chat | Eligibility |
   Journey Mode | Google Translate
═══════════════════════════════════════ */

/* ── State ── */
let currentSection = 'section-home';
let modalActiveIndex = -1;
let simpleTermsOpen = false;
let journeyActive = false;
let journeyStep = 0; // 0-based index into timelineData

/* ══════════════════════════════════════
   TAB NAVIGATION
══════════════════════════════════════ */
function navigateTo(id) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const sec = document.getElementById(id);
  if (sec) { sec.classList.add('active'); currentSection = id; }
  const btn = document.querySelector(`.nav-btn[data-section="${id}"]`);
  if (btn) btn.classList.add('active');
  if (id === 'section-evm') {
    if (typeof initEVM === 'function') initEVM();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => navigateTo(btn.dataset.section));
});

/* ══════════════════════════════════════
   FLOWCHART — render
══════════════════════════════════════ */
function renderFlowchart() {
  const container = document.getElementById('flowchart-container');
  if (!container) return;

  const html = `
    <!-- Node 1: Start -->
    <div class="flow-node" onclick="openModal(0)">
      <div class="flow-icon">📢</div>
      <div class="flow-title">1. Election Announcement</div>
      <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.3rem;">ECI announces the schedule. MCC begins.</p>
    </div>
    
    <div class="flow-vertical-line"></div>
    
    <!-- Branch Point -->
    <div class="flow-branch-label">Choose your path</div>
    
    <div class="flow-branches">
      <div class="flow-horizontal-line" style="width: calc(100% - 400px);"></div>
      
      <!-- VOTER PATH -->
      <div class="flow-branch">
        <h3>Voter Path</h3>
        <div class="flow-node" onclick="alert('Step: Check Eligibility. Must be 18+ and Indian Citizen.')">
          <div class="flow-icon">Step 1</div>
          <div class="flow-title">Check Eligibility</div>
        </div>
        <div class="flow-vertical-line"></div>
        <div class="flow-node" onclick="alert('Step: Register. Fill Form 6 online.')">
          <div class="flow-icon">Step 2</div>
          <div class="flow-title">Register as Voter</div>
        </div>
        <div class="flow-vertical-line"></div>
        <div class="flow-node" onclick="alert('Step: Find Booth. Check voter slip or ECI portal.')">
          <div class="flow-icon">Step 3</div>
          <div class="flow-title">Find Polling Booth</div>
        </div>
      </div>
      
      <!-- CANDIDATE PATH -->
      <div class="flow-branch">
        <h3>Candidate Path</h3>
        <div class="flow-node" onclick="alert('Step: Check Eligibility. Must be 25+ and a registered voter.')">
          <div class="flow-icon">Step 1</div>
          <div class="flow-title">Eligibility to Contest</div>
        </div>
        <div class="flow-vertical-line"></div>
        <div class="flow-node" onclick="alert('Step: File Nomination. Submit papers to Returning Officer.')">
          <div class="flow-icon">Step 2</div>
          <div class="flow-title">File Nomination</div>
        </div>
        <div class="flow-vertical-line"></div>
        <div class="flow-node" onclick="alert('Step: Campaigning. Follow Model Code of Conduct.')">
          <div class="flow-icon">Step 3</div>
          <div class="flow-title">Campaign & MCC</div>
        </div>
      </div>
    </div>
    
    <div class="flow-vertical-line" style="height: 3rem;"></div>
    
    <!-- Merge Point: Silence Period -->
    <div class="flow-node" onclick="openModal(7)">
      <div class="flow-icon">Quiet</div>
      <div class="flow-title">Silence Period</div>
      <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.3rem;">Campaigning stops 48 hours before polling.</p>
    </div>
    
    <div class="flow-vertical-line"></div>
    
    <!-- Polling & Results -->
    <div class="flow-node" onclick="openModal(8)">
      <div class="flow-icon">Voting</div>
      <div class="flow-title">Polling Day & Results</div>
      <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.3rem;">Votes are cast on EVMs and counted.</p>
    </div>
  `;
  container.innerHTML = html;
}

/* ══════════════════════════════════════
   MODAL — open / close / tabs / simple
══════════════════════════════════════ */
function openModal(index) {
  const item = timelineData[index];
  if (!item) return;
  modalActiveIndex = index;
  simpleTermsOpen = false;

  document.getElementById('modal-icon').textContent = item.icon;
  document.getElementById('modal-step-num').textContent = `Phase ${index + 1} of 10`;
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('panel-detail').innerHTML = item.detail;
  document.getElementById('panel-why').innerHTML = item.why;
  document.getElementById('panel-example').innerHTML = item.example;
  document.getElementById('panel-violated').innerHTML = item.violated;
  document.getElementById('modal-simple-body').innerHTML = item.simple;
  document.getElementById('modal-simple-body').style.display = 'none';
  document.getElementById('simple-btn').textContent = '🧒 Explain in Simple Terms';

  // Reset tabs
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.modal-panel').forEach(p => p.classList.remove('active'));
  document.querySelector('.modal-tab[data-tab="detail"]').classList.add('active');
  document.getElementById('panel-detail').classList.add('active');

  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
  modalActiveIndex = -1;
}

function handleModalOverlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

function switchModalTab(tabKey, el) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.modal-panel').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById(`panel-${tabKey}`).classList.add('active');
}

function toggleSimpleTerms() {
  simpleTermsOpen = !simpleTermsOpen;
  const body = document.getElementById('modal-simple-body');
  const btn = document.getElementById('simple-btn');
  body.style.display = simpleTermsOpen ? 'block' : 'none';
  btn.textContent = simpleTermsOpen ? '✕ Hide Simple Explanation' : '🧒 Explain in Simple Terms';
}

// Close modal on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalActiveIndex >= 0) closeModal();
});

/* ══════════════════════════════════════
   CONTROLLED CHAT
══════════════════════════════════════ */
function renderChatQuestions() {
  const grid = document.getElementById('chat-questions-grid');
  if (!grid) return;
  grid.innerHTML = chatQA.map(item => `
    <div class="chat-q-card" onclick="handlePredefinedQ('${item.key}')"
            aria-label="${item.q}">
      <span class="chat-q-icon">${item.icon}</span>
      <span class="chat-q-text">${item.q}</span>
    </div>
  `).join('');
}

function handlePredefinedQ(key) {
  const item = chatQA.find(q => q.key === key);
  if (!item) return;

  // Smart navigation chips
  if (item.smart) {
    navigateTo(item.smart);
    return;
  }

  // Show answer panel
  const area = document.getElementById('chat-answer-area');
  const body = document.getElementById('chat-answer-body');
  let html = item.answer;
  if (item.image) {
    html += `<img src="${item.image}" alt="${item.imageAlt}" class="chat-answer-img" />`;
  }
  body.innerHTML = html;
  area.style.display = 'block';
  area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearChatAnswer() {
  const area = document.getElementById('chat-answer-area');
  area.style.display = 'none';
  document.getElementById('chat-answer-body').innerHTML = '';
}

/* ══════════════════════════════════════
   ELIGIBILITY CHECKER
══════════════════════════════════════ */
function checkEligibility() {
  const age = parseInt(document.getElementById('elig-age').value, 10);
  const citizen = document.getElementById('elig-citizen').value;
  const result = document.getElementById('elig-result');

  result.style.display = 'block';
  result.className = 'elig-result';

  if (!citizen) {
    result.classList.add('partial');
    result.innerHTML = '⚠️ Please select your citizenship status.';
    return;
  }
  if (isNaN(age) || age <= 0) {
    result.classList.add('partial');
    result.innerHTML = '⚠️ Please enter a valid age.';
    return;
  }

  if (citizen === 'other') {
    result.classList.add('ineligible');
    result.innerHTML = '<strong>Not Eligible.</strong> Only Indian citizens can vote in Indian elections (Article 326 of the Constitution).';
  } else if (age >= 18) {
    result.classList.add('eligible');
    result.innerHTML = `<strong>You are eligible to vote in India!</strong><br>
      <span style="font-size:.88rem;font-weight:400;margin-top:.35rem;display:block;">
      Register at <a href="https://voterportal.eci.gov.in" target="_blank">voterportal.eci.gov.in</a> if you haven't already. 
      Voter Helpline: <strong>1950</strong>
      </span>`;
  } else {
    result.classList.add('ineligible');
    result.innerHTML = `<strong>Not yet eligible.</strong> You will be eligible to vote at age 18.<br>
      <span style="font-size:.88rem;font-weight:400;margin-top:.35rem;display:block;">
      You can pre-register for the voter list 3 months before turning 18 (Form 6 online).
      </span>`;
  }
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Allow Enter key in eligibility form
document.addEventListener('DOMContentLoaded', () => {
  const ageInput = document.getElementById('elig-age');
  if (ageInput) {
    ageInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') checkEligibility();
    });
  }
});

/* Journey Mode removed */

/* ══════════════════════════════════════
   GOOGLE TRANSLATE
══════════════════════════════════════ */
function doTranslate(lang) {
  if (!lang || lang === '') return;
  localStorage.setItem('cs_lang', lang);

  // Try programmatic trigger first
  const triggerTranslate = () => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
      // Update our dropdown to match
      document.getElementById('lang-select').value = lang;
      return true;
    }
    return false;
  };

  if (!triggerTranslate()) {
    // GT not loaded yet — wait and retry
    setTimeout(() => triggerTranslate(), 1200);
  }
}

function restoreLanguagePreference() {
  const saved = localStorage.getItem('cs_lang');
  const select = document.getElementById('lang-select');
  if (saved && saved !== 'en' && select) {
    select.value = saved;
    // Delay to allow GT widget to initialise
    setTimeout(() => doTranslate(saved), 2000);
  }
}

/* ══════════════════════════════════════
   FLOATING AI CHATBOT
══════════════════════════════════════ */
let chatbotOpen = false;
let voiceRecognition = null;
let isRecording = false;

function toggleChatbot() {
  chatbotOpen = !chatbotOpen;
  const win = document.getElementById('chatbot-window');
  const fabIcon = document.getElementById('chatbot-fab-icon');
  if (chatbotOpen) {
    win.classList.add('active');
    fabIcon.textContent = '✕';
    document.getElementById('chatbot-input').focus();
  } else {
    win.classList.remove('active');
    fabIcon.textContent = '💬';
    // Stop voice if recording
    if (isRecording && voiceRecognition) {
      voiceRecognition.stop();
      isRecording = false;
      document.getElementById('chatbot-voice-btn').classList.remove('recording');
    }
  }
}

function addChatMsg(text, sender) {
  const container = document.getElementById('chatbot-messages');
  const avatar = sender === 'bot' ? 'Bot' : 'User';
  const div = document.createElement('div');
  div.className = `chatbot-msg ${sender}`;
  div.innerHTML = `
    <span class="chatbot-msg-avatar">${avatar}</span>
    <div class="chatbot-msg-bubble">${text}</div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}

async function sendChatbotMsg() {
  const input = document.getElementById('chatbot-input');
  const text = input.value.trim();
  if (!text) return;

  // Show user message
  addChatMsg(text, 'user');
  input.value = '';

  // Show typing indicator
  const typingDiv = addChatMsg('Thinking...', 'bot');
  typingDiv.querySelector('.chatbot-msg-bubble').classList.add('typing');

  // Call Gemini
  const reply = await askGemini(text);

  // Replace typing with actual response
  typingDiv.querySelector('.chatbot-msg-bubble').classList.remove('typing');
  typingDiv.querySelector('.chatbot-msg-bubble').innerHTML = formatBotReply(reply);
  document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;
}

function formatBotReply(text) {
  // Basic markdown-like formatting
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

function toggleVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('Voice input is not supported in this browser. Please use Chrome or Edge.');
    return;
  }

  const btn = document.getElementById('chatbot-voice-btn');

  if (isRecording && voiceRecognition) {
    voiceRecognition.stop();
    isRecording = false;
    btn.classList.remove('recording');
    return;
  }

  voiceRecognition = new SpeechRecognition();
  voiceRecognition.lang = 'hi-IN'; // Default Hindi, falls back to English
  voiceRecognition.interimResults = false;
  voiceRecognition.maxAlternatives = 1;
  // Also accept English
  voiceRecognition.lang = navigator.language || 'en-IN';

  isRecording = true;
  btn.classList.add('recording');

  voiceRecognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('chatbot-input').value = transcript;
    isRecording = false;
    btn.classList.remove('recording');
    // Auto-send after voice input
    sendChatbotMsg();
  };

  voiceRecognition.onerror = (event) => {
    console.error('Voice error:', event.error);
    isRecording = false;
    btn.classList.remove('recording');
    if (event.error === 'not-allowed') {
      alert('Microphone access denied. Please allow microphone permission.');
    }
  };

  voiceRecognition.onend = () => {
    isRecording = false;
    btn.classList.remove('recording');
  };

  voiceRecognition.start();
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
(function init() {
  renderFlowchart();
  renderChatQuestions();
  navigateTo('section-home');
  restoreLanguagePreference();
})();
