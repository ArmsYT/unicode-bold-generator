const STYLE_MAPPERS = {
  boldUnicode(text) {
    const map = {
      a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡',
      i: '𝐢', j: '𝐣', k: '𝐤', l: '𝐥', m: '𝐦', n: '𝐧', o: '𝐨', p: '𝐩',
      q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭', u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱',
      y: '𝐲', z: '𝐳',
      A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇',
      I: '𝐈', J: '𝐉', K: '𝐊', L: '𝐋', M: '𝐌', N: '𝐍', O: '𝐎', P: '𝐏',
      Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓', U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗',
      Y: '𝐘', Z: '𝐙',
      '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒',
      '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
    };
    return Array.from(text).map((char) => map[char] || char).join('');
  },

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
    label: 'Mixed Unicode',
    mapper: STYLE_MAPPERS.mixedUnicode,
    bold: false
  },
  {
    label: 'Regional Flags',
    mapper: STYLE_MAPPERS.regionalFlags,
    bold: false
  },
  {
    label: 'Bold Unicode',
    mapper: STYLE_MAPPERS.boldUnicode,
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
    option.textContent = style.mapper(style.label);
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
