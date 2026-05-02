/**
 * EVM.JS — Logic for Electronic Voting Machine Simulator
 */

let ballotActivated = false;
let votingInProgress = false;

function initEVM() {
  renderBUCandidates();
  updateCUDisplay("SYSTEM READY", false, true);
}

function renderBUCandidates() {
  const container = document.getElementById('bu-candidates-list');
  if (!container) return;

  container.innerHTML = evmCandidates.map((cand, index) => `
    <div class="candidate-row">
      <div class="cand-num">${index + 1}</div>
      <div class="cand-info">
        <div class="cand-label">${cand.label}</div>
      </div>
      <div class="cand-symbol">${cand.symbol}</div>
      <div class="cand-btn-cell">
        <div class="cand-led" id="cand-led-${cand.id}"></div>
        <button class="bu-btn" onclick="castVote(${cand.id})" id="bu-btn-${cand.id}" disabled aria-label="Vote for ${cand.label}">
          ${index + 1}
        </button>
      </div>
    </div>
  `).join('');
}

function updateCUDisplay(text, busy, ready) {
  const statusEl = document.getElementById('cu-status');
  const ledBusy = document.getElementById('led-busy');
  const ledReady = document.getElementById('led-ready');

  if (statusEl) statusEl.textContent = text;
  
  if (ledBusy) {
    if (busy) ledBusy.classList.add('led-on');
    else ledBusy.classList.remove('led-on');
  }

  if (ledReady) {
    if (ready) ledReady.classList.add('led-on');
    else ledReady.classList.remove('led-on');
  }
}

function activateBallot() {
  if (votingInProgress) return;
  
  ballotActivated = true;
  updateCUDisplay("BALLOT ENABLED", false, true);
  
  // Enable all BU buttons
  evmCandidates.forEach(cand => {
    const btn = document.getElementById(`bu-btn-${cand.id}`);
    if (btn) btn.disabled = false;
  });

  // Play a short click sound
  playBeep(440, 0.1);
}

function castVote(candidateId) {
  if (!ballotActivated || votingInProgress) return;

  const candidate = evmCandidates.find(c => c.id === candidateId);
  if (!candidate) return;

  votingInProgress = true;
  ballotActivated = false;

  // Disable all buttons
  evmCandidates.forEach(cand => {
    const btn = document.getElementById(`bu-btn-${cand.id}`);
    if (btn) btn.disabled = true;
  });

  // LED on for the chosen candidate
  const candLed = document.getElementById(`cand-led-${candidateId}`);
  if (candLed) candLed.classList.add('led-on');

  // CU Status
  updateCUDisplay("VOTING...", true, false);

  // Play long beep
  playBeep(880, 1.0);

  // Trigger VVPAT
  showVVPAT(candidate);

  // Reset after 7 seconds (matching VVPAT display)
  setTimeout(() => {
    if (candLed) candLed.classList.remove('led-on');
    updateCUDisplay("VOTE RECORDED", false, false);
    
    setTimeout(() => {
      votingInProgress = false;
      updateCUDisplay("SYSTEM READY", false, true);
    }, 2000);
  }, 7000);
}

function showVVPAT(candidate) {
  const slip = document.getElementById('vvpat-slip');
  const symbol = document.getElementById('vvpat-symbol');
  const name = document.getElementById('vvpat-name');
  const num = document.getElementById('vvpat-num');

  if (!slip || !symbol || !name || !num) return;

  symbol.textContent = candidate.symbol;
  name.textContent = candidate.label;
  num.textContent = `SLIP NO: ${Math.floor(Math.random() * 90000) + 10000}`;

  // Print animation
  slip.classList.remove('dropping');
  slip.classList.add('printing');

  // Wait 7 seconds then drop
  setTimeout(() => {
    slip.classList.remove('printing');
    slip.classList.add('dropping');
  }, 7000);
}

/**
 * Web Audio Beep
 */
function playBeep(freq, duration) {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.warn("Audio Context not supported or blocked", e);
  }
}
