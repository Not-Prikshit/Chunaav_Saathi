"use strict";

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
let flowPath = 'none'; // 'none', 'voter', 'candidate'
let flowStep = 0;
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

function searchBooth() {
  const epic = document.getElementById('epic-input').value.trim();
  if (epic) {
    // Official ECI search portal link
    window.open(`https://electoralsearch.eci.gov.in/`, '_blank');
  } else {
    alert("Please enter your EPIC (Voter ID) number first!");
  }
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => navigateTo(btn.dataset.section));
});

/* ══════════════════════════════════════
   FLOWCHART — Interactive Game
══════════════════════════════════════ */
function renderFlowchart() {
  const container = document.getElementById('flowchart-container');
  if (!container) return;

  if (flowPath === 'none') {
    container.innerHTML = `
      <div class="flow-node" onclick="openModal(0)">
        <div class="flow-icon">📢</div>
        <div class="flow-title">1. Election Announcement</div>
        <p>The ECI announces dates. The journey begins!</p>
      </div>
      <div class="flow-vertical-line"></div>
      <div class="flow-branch">
        <h3>Choose Your Path</h3>
        <div style="display:flex; gap:1.5rem; margin-top:1.5rem; justify-content:center; flex-wrap:wrap;">
          <button class="btn-primary" onclick="startFlowPath('voter')">I am a Voter</button>
          <button class="btn-secondary" onclick="startFlowPath('candidate')">I am a Candidate</button>
        </div>
      </div>
    `;
  } else if (flowPath === 'voter') {
    renderVoterPath(container);
  } else if (flowPath === 'candidate') {
    renderCandidatePath(container);
  }
}

function startFlowPath(path) {
  flowPath = path;
  flowStep = 1;
  renderFlowchart();
}

function resetFlow() {
  flowPath = 'none';
  flowStep = 0;
  renderFlowchart();
}

function renderVoterPath(container) {
  const steps = [
    { title: "Check Eligibility", icon: "🧐", modal: 10, detail: "Are you 18? Indian citizen? Check here." },
    { title: "Register to Vote", icon: "📝", modal: 11, detail: "Fill Form 6 on the ECI portal." },
    { title: "Find Polling Booth", icon: "📍", modal: 12, detail: "Check your voter slip or portal." },
    { title: "Cast Your Vote", icon: "🗳️", modal: 8, detail: "Visit the booth and use the EVM." }
  ];

  let html = `
    <button class="btn-secondary" onclick="resetFlow()" style="margin-bottom:2.5rem; padding: 0.6rem 1.2rem; font-size: 0.95rem; border-radius: 50px;">← Back to Start</button>
    <div class="flow-branch"><h3>Voter's Journey</h3></div>
  `;

  for (let i = 0; i < flowStep; i++) {
    const s = steps[i];
    html += `
      <div class="flow-node highlight" onclick="openModal(${s.modal})">
        <div class="flow-icon">${s.icon}</div>
        <div class="flow-title">${s.title}</div>
        <p>${s.detail}</p>
      </div>
      <div class="flow-vertical-line"></div>
    `;
  }

  if (flowStep < steps.length) {
    html += `<button class="btn-primary" onclick="flowStep++; renderFlowchart()" style="margin-top:1rem;">Next Step: ${steps[flowStep].title}</button>`;
  } else {
    html += `
      <div class="flow-node" onclick="navigateTo('section-home')">
        <div class="flow-icon">🇮🇳</div>
        <div class="flow-title">Jai Hind!</div>
        <p>You've completed the process. Go vote with confidence!</p>
      </div>
    `;
  }
  container.innerHTML = html;
}

function renderCandidatePath(container) {
  const steps = [
    { title: "Eligibility to Contest", icon: "⚖️", modal: 13, detail: "Must be 25+ and a registered voter." },
    { title: "File Nomination", icon: "📁", modal: 14, detail: "Submit papers to the Returning Officer." },
    { title: "Campaigning", icon: "📢", modal: 6, detail: "Follow the Model Code of Conduct." },
    { title: "Election Results", icon: "🏆", modal: 9, detail: "Counting of votes and declaration." }

  ];

  let html = `
    <button class="btn-secondary" onclick="resetFlow()" style="margin-bottom:2.5rem; padding: 0.6rem 1.2rem; font-size: 0.95rem; border-radius: 50px;">← Back to Start</button>
    <div class="flow-branch"><h3>Candidate's Journey</h3></div>
  `;

  for (let i = 0; i < flowStep; i++) {
    const s = steps[i];
    html += `
      <div class="flow-node highlight" onclick="openModal(${s.modal})">
        <div class="flow-icon">${s.icon}</div>
        <div class="flow-title">${s.title}</div>
        <p>${s.detail}</p>
      </div>
      <div class="flow-vertical-line"></div>
    `;
  }

  if (flowStep < steps.length) {
    html += `<button class="btn-primary" onclick="flowStep++; renderFlowchart()" style="margin-top:1rem;">Next Step: ${steps[flowStep].title}</button>`;
  } else {
    html += `
      <div class="flow-node" onclick="navigateTo('section-home')">
        <div class="flow-icon">🇮🇳</div>
        <div class="flow-title">Done!</div>
        <p>Process complete. Good luck with your campaign!</p>
      </div>
    `;
  }
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
  document.getElementById('modal-step-num').textContent = `Phase ${index + 1} of ${timelineData.length}`;

  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('panel-detail').innerHTML = item.detail;
  document.getElementById('panel-why').innerHTML = item.why;
  document.getElementById('panel-example').innerHTML = item.example;
  document.getElementById('panel-violated').innerHTML = item.violated;
  document.getElementById('modal-simple-body').innerHTML = item.simple;
  document.getElementById('modal-simple-body').style.display = 'none';
  document.getElementById('simple-btn').textContent = '🧒 Explain in Simple Terms';

  // Render useful links
  const linksContainer = document.getElementById('panel-links');
  if (linksContainer) {
    if (item.links && item.links.length > 0) {
      linksContainer.innerHTML = item.links.map(l =>
        `<a href="${l.url}" target="_blank" rel="noopener" class="modal-link-chip">🔗 ${l.label}</a>`
      ).join('');
    } else {
      linksContainer.innerHTML = '<p style="opacity:0.5">No links available for this phase.</p>';
    }
  }

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

/* ══════════════════════════════════════
   GOOGLE TRANSLATE
══════════════════════════════════════ */
function doTranslate(lang) {
  if (!lang || lang === '') return;
  localStorage.setItem('cs_lang', lang);

  const triggerTranslate = () => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
      document.getElementById('lang-select').value = lang;
      return true;
    }
    return false;
  };

  if (!triggerTranslate()) {
    setTimeout(() => triggerTranslate(), 1200);
  }
}

function restoreLanguagePreference() {
  const saved = localStorage.getItem('cs_lang');
  const select = document.getElementById('lang-select');
  if (saved && saved !== 'en' && select) {
    select.value = saved;
    setTimeout(() => doTranslate(saved), 2000);
  }
}

/* ══════════════════════════════════════
   FLOATING AI CHATBOT & API KEY
══════════════════════════════════════ */
let chatbotOpen = false;
let voiceRecognition = null;
let isRecording = false;

/**
 * Toggles the chatbot window visibility.
 */
function toggleChatbot() {
  chatbotOpen = !chatbotOpen;
  const win = document.getElementById('chatbot-window');
  if (!win) return;
  if (chatbotOpen) {
    win.classList.add('active');
    document.getElementById('chatbot-input').focus();
  } else {
    win.classList.remove('active');
    if (isRecording && voiceRecognition) {
      voiceRecognition.stop();
      isRecording = false;
    }
  }
}

async function sendChatbotMsg() {
  const input = document.getElementById('chatbot-input');
  const text = input.value.trim();
  if (!text) return;

  const container = document.getElementById('chatbot-messages');
  const userDiv = document.createElement('div');
  userDiv.className = 'chatbot-msg user';
  userDiv.innerHTML = `<div class="chatbot-msg-bubble">${text}</div>`;
  container.appendChild(userDiv);
  input.value = '';

  const botDiv = document.createElement('div');
  botDiv.className = 'chatbot-msg bot';
  botDiv.innerHTML = `<span class="chatbot-msg-avatar" style="font-size:1.8rem; line-height:1; display:flex; align-items:flex-end; padding-bottom:0.5rem;">🤖</span><div class="chatbot-msg-bubble typing">Thinking...</div>`;
  container.appendChild(botDiv);
  container.scrollTop = container.scrollHeight;

  const reply = await askGemini(text);
  botDiv.querySelector('.chatbot-msg-bubble').classList.remove('typing');
  botDiv.querySelector('.chatbot-msg-bubble').innerHTML = reply.replace(/\n/g, '<br>');
  container.scrollTop = container.scrollHeight;
}

/* ══════════════════════════════════════
   VOICE INPUT (SPEECH RECOGNITION)
══════════════════════════════════════ */
function toggleVoiceInput() {
  const btn = document.getElementById('chatbot-voice-btn');
  const input = document.getElementById('chatbot-input');

  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert("Speech recognition is not supported in your browser.");
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!voiceRecognition) {
    voiceRecognition = new SpeechRecognition();
    voiceRecognition.continuous = false;
    voiceRecognition.interimResults = false;
    voiceRecognition.lang = 'en-IN'; // Supports English (India) and Hindi

    voiceRecognition.onstart = () => {
      isRecording = true;
      btn.innerHTML = '🛑';
      btn.classList.add('recording');
      input.placeholder = "Listening...";
    };

    voiceRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      input.value = transcript;
      sendChatbotMsg(); // Auto-send
    };

    voiceRecognition.onerror = (event) => {
      console.error("Speech Error:", event.error);
      stopRecording();
    };

    voiceRecognition.onend = () => {
      stopRecording();
    };
  }

  if (isRecording) {
    voiceRecognition.stop();
  } else {
    voiceRecognition.start();
  }

  function stopRecording() {
    isRecording = false;
    btn.innerHTML = '🎙️';
    btn.classList.remove('recording');
    input.placeholder = "Ask about elections...";
  }
}


/* ══════════════════════════════════════
   DRAGGABLE CHATBOT
   Allows user to drag the chatbot window
══════════════════════════════════════ */
function makeDraggable(el, handle) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  handle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    el.classList.add('dragging');
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    // Set new position
    let newTop = el.offsetTop - pos2;
    let newLeft = el.offsetLeft - pos1;

    // Boundary checks
    const pad = 20;
    if (newTop < pad) newTop = pad;
    if (newLeft < pad) newLeft = pad;
    if (newTop + el.offsetHeight > window.innerHeight - pad) newTop = window.innerHeight - el.offsetHeight - pad;
    if (newLeft + el.offsetWidth > window.innerWidth - pad) newLeft = window.innerWidth - el.offsetWidth - pad;

    el.style.top = newTop + "px";
    el.style.left = newLeft + "px";
    el.style.bottom = 'auto';
    el.style.right = 'auto';
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    el.classList.remove('dragging');
  }
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
(function init() {
  renderFlowchart();
  renderChatQuestions();
  navigateTo('section-home');
  restoreLanguagePreference();

  const chatWin = document.getElementById('chatbot-window');
  const chatHeader = chatWin.querySelector('.chatbot-header');
  if (chatWin && chatHeader) {
    makeDraggable(chatWin, chatHeader);
  }
})();
