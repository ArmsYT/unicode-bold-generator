const STYLE_MAPPERS = {
  mixedUnicode(text) {
    const map = {
      a: 'α', b: 'в', c: 'ϲ', d: '∂', e: 'ε', f: 'ғ', g: 'ɢ', h: 'н',
      i: 'ι', j: 'נ', k: 'κ', l: 'ℓ', m: 'м', n: 'и', o: 'ο', p: 'ρ',
      q: 'զ', r: 'я', s: 'ѕ', t: 'τ', u: 'υ', v: 'ν', w: 'ω', x: 'χ',
      y: 'γ', z: 'ζ',
      A: 'Α', B: 'Β', C: 'Ϲ', D: 'D', E: 'Ε', F: 'Ғ', G: 'Ɠ', H: 'Η',
      I: 'Ι', J: 'J', K: 'Κ', L: 'L', M: 'Μ', N: 'Ν', O: 'Ο', P: 'Ρ',
      Q: 'Q', R: 'R', S: 'Ѕ', T: 'Τ', U: 'U', V: 'V', W: 'W', X: 'Χ',
      Y: 'Υ', Z: 'Ζ'
    };

    return Array.from(text).map((char) => map[char] || char).join('');
  },

  regionalFlags(text) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const flags = {
      a: '🇦', b: '🇧', c: '🇨', d: '🇩', e: '🇪', f: '🇫', g: '🇬', h: '🇭',
      i: '🇮', j: '🇯', k: '🇰', l: '🇱', m: '🇲', n: '🇳', o: '🇴', p: '🇵',
      q: '🇶', r: '🇷', s: '🇸', t: '🇹', u: '🇺', v: '🇻', w: '🇼', x: '🇽',
      y: '🇾', z: '🇿'
    };

    return Array.from(text).map((char) => {
      const lower = char.toLowerCase();

      if (flags[lower]) {
        return `${flags[lower]}\u200b`;
      }

      if (char === ' ') {
        return ' ';
      }

      if (letters.includes(lower)) {
        return `${flags[lower]}\u200b`;
      }

      return char;
    }).join('');
  }
};

const styles = [
  {
    name: 'вιεиνεиυε',
    mapper: STYLE_MAPPERS.mixedUnicode,
    bold: false
  },
  {
    name: '🇵​🇴​🇹​🇴​🇸',
    mapper: STYLE_MAPPERS.regionalFlags,
    bold: false
  }
];

const styleSelect = document.getElementById('styleSelect');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const copyBtn = document.getElementById('copyBtn');

function populateStyles() {
  styleSelect.innerHTML = '';

  styles.forEach((style, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = style.name;
    styleSelect.appendChild(option);
  });
}

function updateOutput() {
  const selectedStyle = styles[parseInt(styleSelect.value, 10)] || styles[0];
  const currentText = inputText.value || '';
  outputText.value = selectedStyle.mapper(currentText);
  outputText.style.fontWeight = selectedStyle.bold ? '700' : '400';
}

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(outputText.value);
    copyBtn.textContent = 'Copié !';
    setTimeout(() => {
      copyBtn.textContent = 'Copier';
    }, 1200);
  } catch (error) {
    console.error(error);
    copyBtn.textContent = 'Erreur';
    setTimeout(() => {
      copyBtn.textContent = 'Copier';
    }, 1200);
  }
});

styleSelect.addEventListener('change', updateOutput);
inputText.addEventListener('input', updateOutput);

populateStyles();
updateOutput();
