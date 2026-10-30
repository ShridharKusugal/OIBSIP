/**
 * TEMPORA — TEMPERATURE CONVERTER
 * Oasis Infobyte Internship — Level 1, Task 3
 * Vanilla JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // DOM Elements
  // -------------------------------------------------------------------------
  const tempInput = document.getElementById('temp-input');
  const fromUnitSelect = document.getElementById('from-unit');
  const toUnitSelect = document.getElementById('to-unit');
  const convertBtn = document.getElementById('convert-btn');
  const clearBtn = document.getElementById('clear-btn');
  const swapBtn = document.getElementById('swap-btn');
  const quickClearBtn = document.getElementById('quick-clear-input');

  const inputError = document.getElementById('input-error');
  const resultCard = document.getElementById('result-card');
  const resultPlaceholder = document.getElementById('result-placeholder');
  const resultContent = document.getElementById('result-content');
  const resultNumber = document.getElementById('result-number');
  const resultSymbol = document.getElementById('result-symbol');
  const resultFullName = document.getElementById('result-full-name');
  const resultEquation = document.getElementById('result-equation');
  const resultFormulaText = document.getElementById('result-formula-text');
  const copyResultBtn = document.getElementById('copy-result-btn');
  const copyText = document.getElementById('copy-text');

  // Thermal Gauge Elements
  const tempThumb = document.getElementById('temp-indicator-thumb');
  const tempStateText = document.getElementById('temp-state-text');

  // Meaning & Context Elements
  const meaningCategoryBadge = document.getElementById('meaning-category-badge');
  const meaningDescription = document.getElementById('meaning-description');
  const meaningFeel = document.getElementById('meaning-feel');
  const meaningWater = document.getElementById('meaning-water');
  const meaningReference = document.getElementById('meaning-reference');
  const meaningNoteText = document.getElementById('meaning-note-text');

  // Example cards
  const exampleCards = document.querySelectorAll('.example-card');

  // -------------------------------------------------------------------------
  // Unit Metadata & Constants
  // -------------------------------------------------------------------------
  const UNIT_CONFIG = {
    celsius: {
      name: 'Celsius',
      fullName: 'Degrees Celsius',
      symbol: '°C',
      minVal: -273.15,
      minValMessage: 'Celsius temperature cannot be below absolute zero (-273.15 °C).'
    },
    fahrenheit: {
      name: 'Fahrenheit',
      fullName: 'Degrees Fahrenheit',
      symbol: '°F',
      minVal: -459.67,
      minValMessage: 'Fahrenheit temperature cannot be below absolute zero (-459.67 °F).'
    },
    kelvin: {
      name: 'Kelvin',
      fullName: 'Kelvin',
      symbol: 'K',
      minVal: 0,
      minValMessage: 'Kelvin temperature cannot be below absolute zero (0 K).'
    }
  };

  const FLOATING_TOLERANCE = 0.0001;

  // -------------------------------------------------------------------------
  // Mathematical Conversion Functions
  // -------------------------------------------------------------------------

  /**
   * Converts any supported temperature scale value to Celsius.
   * @param {number} value
   * @param {'celsius'|'fahrenheit'|'kelvin'} fromUnit
   * @returns {number} Temperature in Celsius
   */
  function toCelsius(value, fromUnit) {
    switch (fromUnit) {
      case 'celsius':
        return value;
      case 'fahrenheit':
        return (value - 32) * (5 / 9);
      case 'kelvin':
        return value - 273.15;
      default:
        return value;
    }
  }

  /**
   * Converts a Celsius temperature value into the target temperature scale.
   * @param {number} celsiusValue
   * @param {'celsius'|'fahrenheit'|'kelvin'} toUnit
   * @returns {number} Temperature in destination unit
   */
  function fromCelsius(celsiusValue, toUnit) {
    switch (toUnit) {
      case 'celsius':
        return celsiusValue;
      case 'fahrenheit':
        return (celsiusValue * (9 / 5)) + 32;
      case 'kelvin':
        return celsiusValue + 273.15;
      default:
        return celsiusValue;
    }
  }

  /**
   * Formats numbers to maximum 4 decimal places without trailing zeros
   * and removes floating-point artefacts (e.g. 31.9999999997 -> 32).
   * @param {number} num
   * @returns {string} Formatted number string
   */
  function formatTemperature(num) {
    if (!Number.isFinite(num)) return '';
    // Round to 4 decimal places to eliminate floating point imprecision
    const rounded = Math.round((num + Number.EPSILON) * 10000) / 10000;
    // Format to string, trimming unnecessary zeros
    return Number(rounded.toFixed(4)).toString();
  }

  /**
   * Generates readable formula text for the conversion path.
   */
  function getFormulaExplanation(val, from, to) {
    const formattedVal = formatTemperature(val);
    if (from === to) {
      return `Identical scale selected (${UNIT_CONFIG[from].symbol} → ${UNIT_CONFIG[to].symbol}): No calculation needed.`;
    }

    if (from === 'celsius' && to === 'fahrenheit') {
      return `Formula: (${formattedVal} °C × 9/5) + 32 = °F`;
    }
    if (from === 'fahrenheit' && to === 'celsius') {
      return `Formula: (${formattedVal} °F - 32) × 5/9 = °C`;
    }
    if (from === 'celsius' && to === 'kelvin') {
      return `Formula: ${formattedVal} °C + 273.15 = K`;
    }
    if (from === 'kelvin' && to === 'celsius') {
      return `Formula: ${formattedVal} K - 273.15 = °C`;
    }
    if (from === 'fahrenheit' && to === 'kelvin') {
      return `Formula: (${formattedVal} °F - 32) × 5/9 + 273.15 = K`;
    }
    if (from === 'kelvin' && to === 'fahrenheit') {
      return `Formula: (${formattedVal} K - 273.15) × 9/5 + 32 = °F`;
    }

    return '';
  }

  // -------------------------------------------------------------------------
  // Input Validation
  // -------------------------------------------------------------------------

  /**
   * Validates the input temperature against blank entries, non-numbers,
   * and absolute zero limits for each respective scale.
   * @param {string} rawInput
   * @param {'celsius'|'fahrenheit'|'kelvin'} fromUnit
   * @returns {{ isValid: boolean, error?: string, numericValue?: number }}
   */
  function validateTemperature(rawInput, fromUnit) {
    // 1. Check for empty input
    if (rawInput === null || rawInput === undefined || rawInput.trim() === '') {
      return {
        isValid: false,
        error: 'Please enter a temperature value to convert.'
      };
    }

    // 2. Check for non-numeric value
    const numericValue = Number(rawInput.trim());
    if (isNaN(numericValue) || !Number.isFinite(numericValue)) {
      return {
        isValid: false,
        error: 'Please enter a valid numeric temperature value.'
      };
    }

    // 3. Absolute zero physical bounds
    const config = UNIT_CONFIG[fromUnit];
    if (numericValue < (config.minVal - FLOATING_TOLERANCE)) {
      return {
        isValid: false,
        error: config.minValMessage
      };
    }

    return {
      isValid: true,
      numericValue
    };
  }

  /**
   * Displays an error message and highlights the input.
   * @param {string} message
   */
  function showError(message) {
    inputError.textContent = message;
    inputError.classList.add('active');
    tempInput.classList.add('is-invalid');
    tempInput.focus();
    hideResult();
  }

  /**
   * Clears any active error messages.
   */
  function clearError() {
    inputError.textContent = '';
    inputError.classList.remove('active');
    tempInput.classList.remove('is-invalid');
  }

  // -------------------------------------------------------------------------
  // Thermal Spectrum & Qualitative Classification
  // -------------------------------------------------------------------------
  function updateThermalSpectrum(celsiusVal) {
    let positionPct = 50;
    let stateLabel = 'Comfortable Range';

    // Spectrum bounds: -50 °C (0%) to 120 °C (100%)
    if (celsiusVal <= -273.15 + FLOATING_TOLERANCE) {
      positionPct = 2;
      stateLabel = 'Absolute Zero (0 K / -273.15 °C)';
    } else if (celsiusVal < -50) {
      positionPct = 6;
      stateLabel = 'Cryogenic Cold';
    } else if (celsiusVal <= 0) {
      // -50 to 0 maps to 6% - 30%
      positionPct = 6 + ((celsiusVal + 50) / 50) * 24;
      stateLabel = celsiusVal === 0 ? 'Freezing Point (0 °C)' : 'Subzero / Freezing';
    } else if (celsiusVal <= 26) {
      // 0 to 26 maps to 30% - 55%
      positionPct = 30 + (celsiusVal / 26) * 25;
      stateLabel = celsiusVal >= 18 ? 'Comfortable Room Temperature' : 'Cool / Chilled';
    } else if (celsiusVal <= 42) {
      // 26 to 42 maps to 55% - 72%
      positionPct = 55 + ((celsiusVal - 26) / 16) * 17;
      stateLabel = Math.abs(celsiusVal - 37) <= 1 ? 'Human Body Temperature (~37 °C)' : 'Warm to Hot';
    } else if (celsiusVal < 100) {
      // 42 to 100 maps to 72% - 90%
      positionPct = 72 + ((celsiusVal - 42) / 58) * 18;
      stateLabel = 'Very Hot / Approaching Boiling';
    } else {
      // >= 100
      positionPct = Math.min(98, 90 + ((celsiusVal - 100) / 100) * 8);
      stateLabel = celsiusVal === 100 ? 'Boiling Point of Water (100 °C)' : 'Vaporization / Scalding Steam';
    }

    if (tempThumb) {
      tempThumb.style.left = `${Math.max(2, Math.min(98, positionPct))}%`;
    }
    if (tempStateText) {
      tempStateText.textContent = stateLabel;
    }
  }

  // -------------------------------------------------------------------------
  // Real-World Meaning & Physical Context Analyzer
  // -------------------------------------------------------------------------

  /**
   * Generates comprehensive real-world meaning and contextual physical
   * insights for any converted temperature value.
   * @param {number} celsiusValue
   * @returns {{ category: string, description: string, feel: string, waterState: string, reference: string, note: string }}
   */
  function getTemperatureContext(celsiusValue) {
    if (celsiusValue <= -273.15 + FLOATING_TOLERANCE) {
      return {
        category: 'Absolute Zero (0 K)',
        description: 'The fundamental theoretical lowest bound in physics where all molecular kinetic motion ceases and thermal energy reaches zero. Nothing in the universe can be colder.',
        feel: 'Zero Thermal Energy',
        waterState: 'Rigid Crystalline Ice',
        reference: '0 Kelvin (Universal Floor)',
        note: 'Absolute zero is impossible to breach; entropy of a pure crystal reaches zero.'
      };
    }
    if (celsiusValue < -150) {
      return {
        category: 'Deep Cryogenic Realm',
        description: 'Ultra-cold realm utilized in cryogenics and aerospace. Liquid nitrogen boils at -196 °C (-321 °F), and liquid oxygen liquefies at -183 °C (-297 °F).',
        feel: 'Instant Flash Freeze',
        waterState: 'Vitreous Glassy Ice',
        reference: 'Liquid Nitrogen / Deep Space',
        note: 'Unprotected human exposure destroys cellular structures instantly on contact.'
      };
    }
    if (Math.abs(celsiusValue - (-40)) < 0.01) {
      return {
        category: 'Scale Intersection (-40°)',
        description: 'The unique mathematical crossroads where Celsius and Fahrenheit scales indicate the exact same numerical reading (-40 °C = -40 °F = 233.15 K).',
        feel: 'Bitter Polar Frost',
        waterState: 'Glacial Hard Ice',
        reference: 'Equal Value Coincidence',
        note: 'Severe frostbite danger on exposed skin within 5 minutes of exposure.'
      };
    }
    if (celsiusValue < -40) {
      return {
        category: 'Polar Extreme Subzero',
        description: 'Comparable to the coldest surface temperatures ever documented on Earth (Vostok Station, Antarctica reached -89.2 °C / -128.6 °F) and dry ice sublimation (-78.5 °C).',
        feel: 'Lethal Deep Freeze',
        waterState: 'Rock-hard Frozen Ice',
        reference: 'Antarctica / Dry Ice (-78.5 °C)',
        note: 'Inhaling ambient air can cause airway distress; hypothermia occurs rapidly.'
      };
    }
    if (celsiusValue < -10) {
      return {
        category: 'Severe Winter Freeze',
        description: 'Deep Arctic and Siberian subzero winter conditions. Commercial food storage freezers operate around -18 °C (0 °F) in this exact temperature zone.',
        feel: 'Piercing Winter Chill',
        waterState: 'Solid Ice & Compact Snow',
        reference: 'Deep Freezer Storage (-18 °C)',
        note: 'Heavy multi-layer insulated thermal clothing, windproof outerwear, and face coverings are required.'
      };
    }
    if (celsiusValue < 0) {
      return {
        category: 'Sub-Freezing Winter',
        description: 'Standard temperate winter freezing weather. Open water puddles freeze into ice, snow remains frozen, and frost carpets surfaces.',
        feel: 'Freezing Cold',
        waterState: 'Ice & Snow (Solid)',
        reference: 'Standard Snowfall / Ice Rink',
        note: 'Beware of slick black ice on roadways; insulated winter coat, gloves, and warm hat recommended.'
      };
    }
    if (Math.abs(celsiusValue - 0) < 0.01) {
      return {
        category: 'Water Freezing Landmark',
        description: 'The fundamental thermodynamic baseline where liquid water freezes into ice (0 °C = 32 °F = 273.15 K) at standard sea-level atmospheric pressure.',
        feel: 'Ice Freezing Threshold',
        waterState: 'Phase Transition (Water ⇌ Ice)',
        reference: 'Ice Melting Standard',
        note: 'Universal calibration landmark for thermometers and meteorological measurements worldwide.'
      };
    }
    if (celsiusValue <= 10) {
      return {
        category: 'Chilly & Brisk',
        description: 'Crisp, chilly weather typical of late autumn and early spring mornings. Domestic kitchen refrigerators safely preserve perishable food in this zone (3 °C to 5 °C).',
        feel: 'Chilly & Fresh',
        waterState: 'Cold Liquid',
        reference: 'Food Refrigerator (~4 °C)',
        note: 'Layer up with a warm jacket, fleece, or trench coat when heading outdoors.'
      };
    }
    if (celsiusValue <= 18) {
      return {
        category: 'Cool & Temperate',
        description: 'Mild, brisk weather typical of temperate spring and autumn days. Ideal conditions for vigorous physical sports, running, or outdoor hiking.',
        feel: 'Cool & Refreshing',
        waterState: 'Liquid',
        reference: 'Crisp Spring Morning',
        note: 'A light sweater, pullover, or windbreaker provides comfortable warmth.'
      };
    }
    if (celsiusValue <= 26) {
      return {
        category: 'Room Comfort Zone',
        description: 'The internationally accepted human thermal comfort zone for homes, classrooms, and workplaces (standard room temperature is calibrated around 20–22 °C / 68–72 °F).',
        feel: 'Optimal Living Comfort',
        waterState: 'Ambient Liquid',
        reference: 'Standard Room Temp (~21 °C)',
        note: 'No climate control needed; ideal for lightweight everyday casual wear.'
      };
    }
    if (Math.abs(celsiusValue - 37) <= 1) {
      return {
        category: 'Human Body Baseline',
        description: 'Normal internal human core body temperature (approximately 36.8 °C to 37 °C / 98.2 °F to 98.6 °F), strictly regulated by the hypothalamus.',
        feel: 'Internal Body Warmth',
        waterState: 'Warm Body Fluid',
        reference: 'Normothermia (~37 °C / 98.6 °F)',
        note: 'Internal baseline for human health; when air reaches this level, the body must sweat to cool down.'
      };
    }
    if (celsiusValue <= 34) {
      return {
        category: 'Warm Summer Weather',
        description: 'Pleasantly warm summer conditions. Heated recreational swimming pools and tropical beach resorts typically sit around 28–30 °C (82–86 °F).',
        feel: 'Warm & Balmy',
        waterState: 'Lukewarm Liquid',
        reference: 'Summer Pool / Beach Day',
        note: 'Drink plenty of water; wear light, breathable fabrics and UV sun protection.'
      };
    }
    if (celsiusValue <= 42) {
      return {
        category: 'High Ambient Heat',
        description: 'Very hot summer weather comparable to standard hot-tub hydrotherapy (~38–40 °C). The human body must sweat actively to avoid internal hyperthermia.',
        feel: 'Intense Sweltering Heat',
        waterState: 'Hot Bath Water (~40 °C)',
        reference: 'Hot Tub / Heatwave',
        note: 'High risk of heat exhaustion and muscle cramps during prolonged outdoor exertion.'
      };
    }
    if (celsiusValue <= 60) {
      return {
        category: 'Extreme Desert Heat',
        description: 'Extreme planetary heat approaching the highest natural air temperature ever recorded on Earth (Death Valley reached 56.7 °C / 134 °F). Sauna lower benches operate here.',
        feel: 'Blistering & Oppressive',
        waterState: 'Hot Scalding Liquid',
        reference: 'Death Valley Record (56.7 °C)',
        note: 'Dangerous heatstroke hazard within short outdoor exposure; seek shelter and air conditioning.'
      };
    }
    if (celsiusValue < 100) {
      return {
        category: 'Scalding & Brewing',
        description: 'Scalding hot water zone. Water at 65 °C causes deep burns within seconds. Milk pasteurization occurs at 63–72 °C, and coffee/tea brews ideally at 88–95 °C.',
        feel: 'Painfully Scalding',
        waterState: 'Steaming Hot Liquid',
        reference: 'Hot Coffee / Tea Brewing (~90 °C)',
        note: 'Causes severe contact scalds; culinary proteins in eggs and meat coagulate in this range.'
      };
    }
    if (Math.abs(celsiusValue - 100) < 0.01) {
      return {
        category: 'Water Boiling Landmark',
        description: 'The exact physical boiling and vaporization point of liquid water at standard sea-level atmospheric pressure (100 °C = 212 °F = 373.15 K).',
        feel: 'Vigorous Scalding Steam',
        waterState: 'Phase Transition (Water ⇌ Steam)',
        reference: 'Boiling Water Benchmark',
        note: 'Generates expanding steam; standard threshold for water cooking, sterilization, and steam power.'
      };
    }
    if (celsiusValue <= 250) {
      return {
        category: 'Baking & Cooking Heat',
        description: 'Standard culinary oven and deep-frying temperatures (baking at 180–220 °C / 350–425 °F; frying oil at 175–190 °C). Maillard browning accelerates above 140 °C.',
        feel: 'Oven Roasting Heat',
        waterState: 'Superheated Dry Steam',
        reference: 'Kitchen Oven Baking (~180–200 °C)',
        note: 'Requires insulated oven mitts; food browns, caramelizes, and roasts.'
      };
    }
    if (celsiusValue <= 1000) {
      return {
        category: 'Industrial Thermal Heat',
        description: 'High thermal energy capable of melting softer metals: Lead melts at 327 °C, Zinc at 419 °C, and Aluminum at 660 °C. Typical campfire wood flames burn in this range (600–800 °C).',
        feel: 'Incandescent Glowing Heat',
        waterState: 'Dry Superheated Gas',
        reference: 'Aluminum Melting (660 °C) / Campfire',
        note: 'Materials glow red-hot; intense radiant heat capable of igniting combustible matter.'
      };
    }
    return {
      category: 'Astrophysical / Stellar Heat',
      description: 'Extreme metallurgical and stellar thermal states: molten volcanic lava (800–1200 °C), iron melting point (1538 °C / 2800 °F), and the Sun\'s photosphere surface (~5500 °C).',
      feel: 'Blinding Thermal Radiation',
      waterState: 'Ionized Plasma Precursor',
      reference: 'Molten Iron (1538 °C) / Solar Surface',
      note: 'Molecular bonds dissociate into atoms; emits intense visible and ultraviolet spectrum radiation.'
    };
  }

  /**
   * Updates the "What This Result Means" UI elements with dynamic context.
   * @param {number} celsiusVal
   */
  function updateTemperatureMeaning(celsiusVal) {
    const context = getTemperatureContext(celsiusVal);
    if (!context) return;

    if (meaningCategoryBadge) meaningCategoryBadge.textContent = context.category;
    if (meaningDescription) meaningDescription.textContent = context.description;
    if (meaningFeel) meaningFeel.textContent = context.feel;
    if (meaningWater) meaningWater.textContent = context.waterState;
    if (meaningReference) meaningReference.textContent = context.reference;
    if (meaningNoteText) meaningNoteText.textContent = context.note;
  }

  // -------------------------------------------------------------------------
  // Main Conversion Orchestrator
  // -------------------------------------------------------------------------
  function convertTemperature() {
    clearError();

    const rawValue = tempInput.value;
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;

    // Validate input
    const validation = validateTemperature(rawValue, fromUnit);
    if (!validation.isValid) {
      showError(validation.error);
      return;
    }

    const inputNum = validation.numericValue;

    // Perform two-step conversion via Celsius
    const celsiusValue = toCelsius(inputNum, fromUnit);
    const convertedValue = fromCelsius(celsiusValue, toUnit);

    // Format output
    const formattedResult = formatTemperature(convertedValue);
    const formattedInput = formatTemperature(inputNum);

    const fromConfig = UNIT_CONFIG[fromUnit];
    const toConfig = UNIT_CONFIG[toUnit];

    // Populate UI
    resultNumber.textContent = formattedResult;
    resultSymbol.textContent = toConfig.symbol;
    resultFullName.textContent = toConfig.fullName;
    resultEquation.textContent = `${formattedInput} ${fromConfig.symbol} = ${formattedResult} ${toConfig.symbol}`;
    resultFormulaText.textContent = getFormulaExplanation(inputNum, fromUnit, toUnit);

    updateThermalSpectrum(celsiusValue);
    updateTemperatureMeaning(celsiusValue);

    // Reveal result card with animation
    resultPlaceholder.style.display = 'none';
    resultContent.style.display = 'flex';
  }

  // -------------------------------------------------------------------------
  // Clear Functionality
  // -------------------------------------------------------------------------
  function clearConverter() {
    tempInput.value = '';
    clearError();
    hideResult();
    quickClearBtn.style.display = 'none';
    tempInput.focus();
  }

  function hideResult() {
    resultPlaceholder.style.display = 'flex';
    resultContent.style.display = 'none';
    resultNumber.textContent = '--';
    resultSymbol.textContent = '--';
    resultFullName.textContent = '--';
    resultEquation.textContent = '--';
    resultFormulaText.textContent = '--';

    if (meaningCategoryBadge) meaningCategoryBadge.textContent = '--';
    if (meaningDescription) meaningDescription.textContent = '--';
    if (meaningFeel) meaningFeel.textContent = '--';
    if (meaningWater) meaningWater.textContent = '--';
    if (meaningReference) meaningReference.textContent = '--';
    if (meaningNoteText) meaningNoteText.textContent = '--';
  }

  // -------------------------------------------------------------------------
  // Swap Units
  // -------------------------------------------------------------------------
  function swapUnits() {
    const currentFrom = fromUnitSelect.value;
    const currentTo = toUnitSelect.value;

    fromUnitSelect.value = currentTo;
    toUnitSelect.value = currentFrom;

    // If there is an existing valid input, re-calculate automatically
    if (tempInput.value.trim() !== '') {
      convertTemperature();
    }
  }

  // -------------------------------------------------------------------------
  // Copy to Clipboard
  // -------------------------------------------------------------------------
  function copyResultToClipboard() {
    if (resultContent.style.display === 'none') return;

    const summaryText = resultEquation.textContent;
    navigator.clipboard.writeText(summaryText).then(() => {
      copyText.textContent = 'Copied!';
      setTimeout(() => {
        copyText.textContent = 'Copy';
      }, 2000);
    }).catch(() => {
      // Fallback
      copyText.textContent = 'Copied!';
      setTimeout(() => {
        copyText.textContent = 'Copy';
      }, 2000);
    });
  }

  // -------------------------------------------------------------------------
  // Event Listeners
  // -------------------------------------------------------------------------

  // Convert button click
  convertBtn.addEventListener('click', convertTemperature);

  // Clear button click
  clearBtn.addEventListener('click', clearConverter);

  // Swap button click
  swapBtn.addEventListener('click', swapUnits);

  // Quick clear icon in input
  quickClearBtn.addEventListener('click', () => {
    tempInput.value = '';
    quickClearBtn.style.display = 'none';
    clearError();
    tempInput.focus();
  });

  // Copy result button
  copyResultBtn.addEventListener('click', copyResultToClipboard);

  // Enter key submission & auto-clear error on typing
  tempInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      convertTemperature();
    }
  });

  tempInput.addEventListener('input', () => {
    const rawVal = tempInput.value;
    if (rawVal.trim() !== '') {
      quickClearBtn.style.display = 'flex';
      clearError();
      // If input is a valid temperature, live-update result and real-world meaning
      const validation = validateTemperature(rawVal, fromUnitSelect.value);
      if (validation.isValid) {
        convertTemperature();
      }
    } else {
      quickClearBtn.style.display = 'none';
      clearError();
      hideResult();
    }
  });

  // Re-calculate or re-validate when dropdown options change
  fromUnitSelect.addEventListener('change', () => {
    if (tempInput.value.trim() !== '') {
      convertTemperature();
    }
  });

  toUnitSelect.addEventListener('change', () => {
    if (tempInput.value.trim() !== '') {
      convertTemperature();
    }
  });

  // Quick conversion example cards
  exampleCards.forEach((card) => {
    const btn = card.querySelector('.btn-use-example');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const val = card.getAttribute('data-val');
        const from = card.getAttribute('data-from');
        const to = card.getAttribute('data-to');

        tempInput.value = val;
        fromUnitSelect.value = from;
        toUnitSelect.value = to;
        quickClearBtn.style.display = 'flex';

        convertTemperature();

        // Smooth scroll up to converter card
        document.getElementById('converter').scrollIntoView({ behavior: 'smooth' });
      });
    }
  });
});
