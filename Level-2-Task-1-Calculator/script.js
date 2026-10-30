/**
 * ==============================================================================
 * Responsive Calculator Web Application
 * Oasis Infobyte Internship — Level 2, Task 1
 * 
 * Author: Shridhar Kusugal
 * Technologies: HTML5, CSS3, Vanilla JavaScript (No libraries, No eval())
 * ==============================================================================
 * 
 * Overview of Architecture:
 * 1. State Management: Encapsulated calculator state (previous operand, current
 *    operand, pending operation, error state, and reset flags).
 * 2. Pure Calculation Engine: Direct arithmetic functions using switch-case logic
 *    (strictly avoiding eval() for security, predictability, and performance).
 * 3. Accurate Precision Handler: Eliminates classic IEEE 754 floating-point errors
 *    (e.g., 0.1 + 0.2 = 0.30000000000000004 -> 0.3).
 * 4. Display & Formatting: Localized thousands-separator formatting for whole
 *    numbers while preserving live fractional inputs.
 * 5. Interactive Features: Keyboard binding, visual key-press feedback, calculation
 *    history log, theme switcher, clipboard copy, and Web Audio click effects.
 */

// Wrap all logic in an IIFE (Immediately Invoked Function Expression) to avoid global scope pollution
(function () {
  'use strict';

  /* ----------------------------------------------------------------------------
   * 1. DOM Element Selectors
   * ---------------------------------------------------------------------------- */
  const previousOperandTextElement = document.getElementById('previous-operand');
  const currentOperandTextElement = document.getElementById('current-operand');
  const currentOperatorTextElement = document.getElementById('current-operator');
  const displayContainer = document.querySelector('.display-primary');

  // Keypad & Action Buttons
  const numberButtons = document.querySelectorAll('[data-number]');
  const operatorButtons = document.querySelectorAll('[data-operator]');
  const clearButton = document.querySelector('[data-action="clear"]');
  const deleteButton = document.querySelector('[data-action="delete"]');
  const equalsButton = document.querySelector('[data-action="calculate"]');
  const negateButton = document.querySelector('[data-action="negate"]');
  const percentButton = document.querySelector('[data-action="percent"]');

  // Utility Controls (Theme, Sound, Copy, History)
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const iconSun = document.querySelector('.icon-sun');
  const iconMoon = document.querySelector('.icon-moon');
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const iconSoundOn = document.querySelector('.icon-sound-on');
  const iconSoundOff = document.querySelector('.icon-sound-off');
  const copyBtn = document.getElementById('copy-btn');
  const copyTooltip = document.getElementById('copy-tooltip');
  const historyToggleBtn = document.getElementById('history-toggle-btn');
  const historyPanel = document.getElementById('history-panel');
  const closeHistoryBtn = document.getElementById('close-history-btn');
  const clearHistoryBtn = document.getElementById('clear-history-btn');
  const historyList = document.getElementById('history-list');

  /* ----------------------------------------------------------------------------
   * 2. Calculator State Object
   * ---------------------------------------------------------------------------- */
  const state = {
    previousOperand: '',
    currentOperand: '0',
    operation: undefined,
    shouldResetScreen: false,
    hasError: false,
    history: []
  };

  /* Settings State */
  let soundEnabled = false;
  let audioCtx = null;

  /* ----------------------------------------------------------------------------
   * 3. Audio Synthesizer (Web Audio API - Zero External Files)
   * ---------------------------------------------------------------------------- */
  function playClickSound(freq = 600, duration = 0.03) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio playback failed or not allowed by browser policy
    }
  }

  /* ----------------------------------------------------------------------------
   * 4. Precision Arithmetic & Helper Functions
   * ---------------------------------------------------------------------------- */
  /**
   * Fixes JavaScript floating-point inaccuracies like (0.1 + 0.2 = 0.30000000000000004)
   * by rounding to at most 10 decimal digits.
   */
  function cleanFloat(number) {
    return Math.round((number + Number.EPSILON) * 1e10) / 1e10;
  }

  /**
   * Formats a raw number string into localized format with comma separators.
   * Preserves trailing decimals while typing (e.g. "12." or "12.05").
   */
  function formatDisplayNumber(numberStr) {
    if (state.hasError) return numberStr;
    if (numberStr == null || numberStr === '') return '';

    const stringNumber = numberStr.toString();
    const isNegative = stringNumber.startsWith('-');
    const cleanNumberStr = isNegative ? stringNumber.slice(1) : stringNumber;

    const parts = cleanNumberStr.split('.');
    const integerDigits = parseFloat(parts[0]);
    const decimalDigits = parts[1];

    let integerDisplay = '';
    if (isNaN(integerDigits)) {
      integerDisplay = '0';
    } else {
      integerDisplay = integerDigits.toLocaleString('en-US');
    }

    const prefix = isNegative ? '-' : '';
    if (decimalDigits != null) {
      return `${prefix}${integerDisplay}.${decimalDigits}`;
    } else {
      return `${prefix}${integerDisplay}`;
    }
  }

  /* ----------------------------------------------------------------------------
   * 5. Core Calculator Engine (Strictly No eval())
   * ---------------------------------------------------------------------------- */

  /**
   * Resets all calculator state back to clean initial condition.
   */
  function clearAll() {
    state.previousOperand = '';
    state.currentOperand = '0';
    state.operation = undefined;
    state.shouldResetScreen = false;
    state.hasError = false;
    updateDisplay();
    playClickSound(400, 0.05);
  }

  /**
   * Deletes the last entered character from the current operand.
   */
  function deleteDigit() {
    if (state.hasError) {
      clearAll();
      return;
    }

    if (state.shouldResetScreen) {
      state.currentOperand = '0';
      state.shouldResetScreen = false;
      updateDisplay();
      return;
    }

    if (state.currentOperand.length === 1 || 
       (state.currentOperand.length === 2 && state.currentOperand.startsWith('-'))) {
      state.currentOperand = '0';
    } else {
      state.currentOperand = state.currentOperand.slice(0, -1);
    }
    updateDisplay();
    playClickSound(500, 0.03);
  }

  /**
   * Appends a digit or decimal point to the current operand.
   */
  function appendNumber(number) {
    // If screen shows an error, reset automatically on new input
    if (state.hasError) {
      state.hasError = false;
      state.currentOperand = '0';
      state.shouldResetScreen = false;
    }

    // If an operation was just completed, clear current number
    if (state.shouldResetScreen) {
      state.currentOperand = '';
      state.shouldResetScreen = false;
    }

    // Prevent duplicate decimal points in a single number
    if (number === '.' && state.currentOperand.includes('.')) {
      return;
    }

    // Handle initial leading zero
    if (state.currentOperand === '0' && number !== '.') {
      state.currentOperand = number;
    } else if (state.currentOperand === '' && number === '.') {
      state.currentOperand = '0.';
    } else {
      // Limit maximum digits to 15 to prevent display overflow
      if (state.currentOperand.replace(/[-.]/g, '').length >= 15) {
        return;
      }
      state.currentOperand += number;
    }

    updateDisplay();
    playClickSound(700, 0.02);
  }

  /**
   * Toggles the sign of the current number (+ / -).
   */
  function toggleNegate() {
    if (state.hasError || state.currentOperand === '0' || state.currentOperand === '') {
      return;
    }
    if (state.currentOperand.startsWith('-')) {
      state.currentOperand = state.currentOperand.slice(1);
    } else {
      state.currentOperand = '-' + state.currentOperand;
    }
    updateDisplay();
    playClickSound(650, 0.03);
  }

  /**
   * Calculates percentage of the current operand (divides by 100).
   */
  function applyPercentage() {
    if (state.hasError || state.currentOperand === '') return;
    const current = parseFloat(state.currentOperand);
    if (isNaN(current)) return;

    // If chaining after an operator (e.g., 200 + 10%), calculate 10% of 200
    if (state.previousOperand !== '' && state.operation !== undefined) {
      const prev = parseFloat(state.previousOperand);
      if (!isNaN(prev)) {
        const percentValue = cleanFloat((prev * current) / 100);
        state.currentOperand = percentValue.toString();
        updateDisplay();
        playClickSound(750, 0.03);
        return;
      }
    }

    // Standalone percentage: divide by 100
    const result = cleanFloat(current / 100);
    state.currentOperand = result.toString();
    updateDisplay();
    playClickSound(750, 0.03);
  }

  /**
   * Sets the active arithmetic operator (+, -, ×, ÷).
   * Supports chaining consecutive operations (e.g. 5 + 5 + 5).
   */
  function chooseOperation(operation) {
    if (state.hasError) return;

    // If an operation was already selected and user immediately clicks another,
    // update the operator without recalculating
    if (state.shouldResetScreen && state.previousOperand !== '') {
      state.operation = operation;
      updateDisplay();
      playClickSound(620, 0.03);
      return;
    }

    // If previous operand already exists, calculate intermediate result
    if (state.previousOperand !== '') {
      compute(false);
    }

    state.operation = operation;
    state.previousOperand = state.currentOperand;
    state.shouldResetScreen = true;
    updateDisplay();
    playClickSound(620, 0.03);
  }

  /**
   * Executes the arithmetic calculation safely with explicit switch-case logic.
   * @param {boolean} recordHistory - Whether to push calculation into history drawer.
   */
  function compute(recordHistory = true) {
    if (state.hasError || state.operation === undefined || state.previousOperand === '') {
      return;
    }

    const prev = parseFloat(state.previousOperand);
    const current = parseFloat(state.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    let computation;

    switch (state.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
      case '*':
        computation = prev * current;
        break;
      case '÷':
      case '/':
        // Handle Division by Zero gracefully
        if (current === 0) {
          state.hasError = true;
          state.currentOperand = 'Cannot divide by zero';
          state.previousOperand = '';
          state.operation = undefined;
          state.shouldResetScreen = true;
          updateDisplay();
          playClickSound(220, 0.15); // Low alert tone
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    // Clean floating-point precision
    const cleanResult = cleanFloat(computation);

    // Save calculation to history
    if (recordHistory) {
      const expressionStr = `${formatDisplayNumber(state.previousOperand)} ${state.operation} ${formatDisplayNumber(state.currentOperand)} =`;
      addToHistory(expressionStr, cleanResult.toString());
    }

    state.currentOperand = cleanResult.toString();
    state.operation = undefined;
    state.previousOperand = '';
    state.shouldResetScreen = true;
    updateDisplay();
    playClickSound(850, 0.04);
  }

  /* ----------------------------------------------------------------------------
   * 6. Display Rendering & UI Updates
   * ---------------------------------------------------------------------------- */
  function updateDisplay() {
    // Current operand display
    if (state.hasError) {
      currentOperandTextElement.textContent = state.currentOperand;
      displayContainer.classList.add('has-error');
    } else {
      currentOperandTextElement.textContent = formatDisplayNumber(state.currentOperand);
      displayContainer.classList.remove('has-error');
    }

    // Previous operand & operator display
    if (state.operation != null && state.previousOperand !== '') {
      previousOperandTextElement.textContent = formatDisplayNumber(state.previousOperand);
      currentOperatorTextElement.textContent = ` ${state.operation}`;
    } else {
      previousOperandTextElement.textContent = '';
      currentOperatorTextElement.textContent = '';
    }

    // Highlight active operator button
    operatorButtons.forEach(btn => {
      if (state.operation && btn.dataset.operator === state.operation && !state.shouldResetScreen) {
        btn.classList.add('is-active-op');
      } else {
        btn.classList.remove('is-active-op');
      }
    });
  }

  /* ----------------------------------------------------------------------------
   * 7. Calculation History Log
   * ---------------------------------------------------------------------------- */
  function addToHistory(expression, result) {
    state.history.unshift({ expression, result, timestamp: Date.now() });
    if (state.history.length > 20) {
      state.history.pop();
    }
    renderHistory();
  }

  function renderHistory() {
    if (state.history.length === 0) {
      historyList.innerHTML = '<li class="history-empty">No calculations recorded yet</li>';
      return;
    }

    historyList.innerHTML = '';
    state.history.forEach(item => {
      const li = document.createElement('li');
      li.className = 'history-item';
      li.setAttribute('tabindex', '0');
      li.setAttribute('title', 'Click to restore this result');
      li.innerHTML = `
        <div class="history-expr">${item.expression}</div>
        <div class="history-val">${formatDisplayNumber(item.result)}</div>
      `;

      // Clicking an item in history loads it into current operand
      li.addEventListener('click', () => {
        state.currentOperand = item.result;
        state.hasError = false;
        state.shouldResetScreen = true;
        updateDisplay();
        toggleHistoryPanel(false);
        playClickSound(700, 0.03);
      });

      historyList.appendChild(li);
    });
  }

  function toggleHistoryPanel(forceOpen) {
    const isOpen = historyPanel.classList.contains('is-open');
    const shouldOpen = forceOpen !== undefined ? forceOpen : !isOpen;

    if (shouldOpen) {
      historyPanel.classList.add('is-open');
      historyPanel.setAttribute('aria-hidden', 'false');
    } else {
      historyPanel.classList.remove('is-open');
      historyPanel.setAttribute('aria-hidden', 'true');
    }
  }

  /* ----------------------------------------------------------------------------
   * 8. Theme Toggle & Sound Toggle
   * ---------------------------------------------------------------------------- */
  function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('oibsip_calc_theme', newTheme);

    if (newTheme === 'light') {
      iconSun.classList.add('hide');
      iconMoon.classList.remove('hide');
    } else {
      iconSun.classList.remove('hide');
      iconMoon.classList.add('hide');
    }
    playClickSound(550, 0.02);
  }

  function toggleSound() {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      iconSoundOn.classList.remove('hide');
      iconSoundOff.classList.add('hide');
      playClickSound(800, 0.04);
    } else {
      iconSoundOn.classList.add('hide');
      iconSoundOff.classList.remove('hide');
    }
  }

  /* ----------------------------------------------------------------------------
   * 9. Clipboard Copy Feature
   * ---------------------------------------------------------------------------- */
  async function copyToClipboard() {
    if (state.hasError) return;
    try {
      await navigator.clipboard.writeText(state.currentOperand);
      copyTooltip.classList.add('show');
      setTimeout(() => {
        copyTooltip.classList.remove('show');
      }, 1500);
      playClickSound(900, 0.02);
    } catch (err) {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement('textarea');
      textarea.value = state.currentOperand;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      copyTooltip.classList.add('show');
      setTimeout(() => copyTooltip.classList.remove('show'), 1500);
    }
  }

  /* ----------------------------------------------------------------------------
   * 10. Visual Button Animation for Physical Keyboard Press
   * ---------------------------------------------------------------------------- */
  function triggerButtonEffect(key) {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      const btnKey = btn.dataset.key;
      if (btnKey === key || 
         (key === 'Enter' && btn.dataset.action === 'calculate') ||
         (key === '=' && btn.dataset.action === 'calculate') ||
         (key === 'Escape' && btn.dataset.action === 'clear')) {
        btn.classList.add('is-pressed');
        setTimeout(() => btn.classList.remove('is-pressed'), 120);
      }
    });
  }

  /* ----------------------------------------------------------------------------
   * 11. Event Listeners (UI & Keyboard Integration)
   * ---------------------------------------------------------------------------- */
  
  // Numbers & Decimal
  numberButtons.forEach(btn => {
    btn.addEventListener('click', () => appendNumber(btn.dataset.number));
  });

  // Operators (+, -, ×, ÷)
  operatorButtons.forEach(btn => {
    btn.addEventListener('click', () => chooseOperation(btn.dataset.operator));
  });

  // Action Buttons
  equalsButton.addEventListener('click', () => compute(true));
  clearButton.addEventListener('click', clearAll);
  deleteButton.addEventListener('click', deleteDigit);
  negateButton.addEventListener('click', toggleNegate);
  percentButton.addEventListener('click', applyPercentage);

  // Utility Buttons
  themeToggleBtn.addEventListener('click', toggleTheme);
  soundToggleBtn.addEventListener('click', toggleSound);
  copyBtn.addEventListener('click', copyToClipboard);

  // History Controls
  historyToggleBtn.addEventListener('click', () => toggleHistoryPanel());
  closeHistoryBtn.addEventListener('click', () => toggleHistoryPanel(false));
  clearHistoryBtn.addEventListener('click', () => {
    state.history = [];
    renderHistory();
    playClickSound(450, 0.04);
  });

  // Full Physical Keyboard Support
  window.addEventListener('keydown', (event) => {
    const key = event.key;

    // Digits (0 - 9)
    if (/^[0-9]$/.test(key)) {
      appendNumber(key);
      triggerButtonEffect(key);
      return;
    }

    // Decimal Point (.)
    if (key === '.') {
      appendNumber('.');
      triggerButtonEffect('.');
      return;
    }

    // Arithmetic Operators
    if (key === '+') {
      chooseOperation('+');
      triggerButtonEffect('+');
      return;
    }
    if (key === '-') {
      chooseOperation('-');
      triggerButtonEffect('-');
      return;
    }
    if (key === '*') {
      chooseOperation('×');
      triggerButtonEffect('*');
      return;
    }
    if (key === '/') {
      event.preventDefault(); // Prevent browser quick-find shortcut
      chooseOperation('÷');
      triggerButtonEffect('/');
      return;
    }

    // Equals (Enter or =)
    if (key === 'Enter' || key === '=') {
      event.preventDefault(); // Prevent re-triggering focused button
      compute(true);
      triggerButtonEffect('Enter');
      return;
    }

    // Delete Last Digit (Backspace)
    if (key === 'Backspace') {
      deleteDigit();
      triggerButtonEffect('Backspace');
      return;
    }

    // Clear All (Escape or 'c' / 'C')
    if (key === 'Escape' || key.toLowerCase() === 'c') {
      clearAll();
      triggerButtonEffect('Escape');
      return;
    }

    // Percentage (%)
    if (key === '%') {
      applyPercentage();
      triggerButtonEffect('%');
      return;
    }

    // Toggle Sign Negation (F9 or Alt+Minus)
    if (key === 'F9') {
      toggleNegate();
      triggerButtonEffect('F9');
      return;
    }
  });

  /* ----------------------------------------------------------------------------
   * 12. Initialization
   * ---------------------------------------------------------------------------- */
  function init() {
    // Restore Saved Theme
    const savedTheme = localStorage.getItem('oibsip_calc_theme');
    if (savedTheme === 'light') {
      document.body.setAttribute('data-theme', 'light');
      iconSun.classList.add('hide');
      iconMoon.classList.remove('hide');
    }

    clearAll();
    renderHistory();
    console.log('Precision Calculator initialized successfully (Oasis Infobyte Level 2 Task 1).');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

