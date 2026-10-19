/* ==========================================================
   designs.js  -  every Christmas design lives here.
   See README.md ("Add a new design") for how to edit this.
   ========================================================== */

/* ---------- Decorations (SVG). Colors come from the design:
   var(--c1) = accent (red), var(--c2) = green/dark, var(--c3) = gold ---------- */
const FIR = (() => {
  let s = '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M3 3 L90 90" stroke="var(--c2)" stroke-width="3" stroke-linecap="round"/><g stroke="var(--c2)" stroke-width="3.5" stroke-linecap="round">';
  for (let t = 14; t <= 78; t += 10) s += `<path d="M${t} ${t} l15 -7 M${t} ${t} l-7 15"/>`;
  return s + '</g><g fill="var(--c1)"><circle cx="30" cy="34" r="4"/><circle cx="36" cy="40" r="4"/><circle cx="58" cy="62" r="4"/></g></svg>';
})();

const DECOR = {
  fir: FIR,
  holly: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M2 8 C30 10 60 30 75 70" fill="none" stroke="var(--c2)" stroke-width="2.5"/><g fill="var(--c2)"><path d="M20 12 q10 -14 22 -4 q-6 12 -22 4z"/><path d="M38 22 q14 -10 22 4 q-10 10 -22 -4z"/><path d="M52 40 q16 -4 20 12 q-14 4 -20 -12z"/><path d="M14 18 q-4 14 8 22 q8 -12 -8 -22z"/><path d="M32 34 q-6 14 6 24 q10 -12 -6 -24z"/></g><g fill="var(--c1)"><circle cx="30" cy="26" r="5"/><circle cx="38" cy="32" r="5"/><circle cx="33" cy="37" r="5"/></g></svg>',
  snow: '<svg viewBox="0 0 100 100" aria-hidden="true"><g stroke="var(--c2)" stroke-width="2" stroke-linecap="round" fill="none"><g transform="translate(38 38)"><path id="f" d="M-26 0H26M-18 -6L-26 0L-18 6M18 -6L26 0L18 6"/><path d="M-26 0H26M-18 -6L-26 0L-18 6M18 -6L26 0L18 6" transform="rotate(60)"/><path d="M-26 0H26M-18 -6L-26 0L-18 6M18 -6L26 0L18 6" transform="rotate(120)"/></g><g transform="translate(82 70) scale(.4)"><path d="M-26 0H26" /><path d="M-26 0H26" transform="rotate(60)"/><path d="M-26 0H26" transform="rotate(120)"/></g></g></svg>',
  ornament: '<svg viewBox="0 0 100 100" aria-hidden="true"><g stroke="var(--c3)" stroke-width="1.5"><path d="M24 0V28M66 0V16"/></g><rect x="19" y="26" width="10" height="6" fill="var(--c3)"/><circle cx="24" cy="48" r="17" fill="var(--c1)"/><path d="M14 44 a11 11 0 0 1 8 -8" stroke="#fff" stroke-opacity=".6" stroke-width="2.5" fill="none" stroke-linecap="round"/><rect x="62" y="14" width="8" height="5" fill="var(--c3)"/><circle cx="66" cy="31" r="12" fill="var(--c2)"/><path d="M59 28 a8 8 0 0 1 6 -6" stroke="#fff" stroke-opacity=".5" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
  lights: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M0 12 Q30 44 55 24 T100 46" fill="none" stroke="var(--c2)" stroke-width="2"/><g stroke="var(--c2)" stroke-width="2"><path d="M14 27v6M42 33v6M72 38v6"/></g><circle cx="14" cy="38" r="6" fill="var(--c1)"/><circle cx="42" cy="44" r="6" fill="var(--c3)"/><circle cx="72" cy="49" r="6" fill="var(--c1)"/><circle cx="92" cy="52" r="5" fill="var(--c3)"/></svg>',
  star: '<svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="36,8 43,28 64,28 47,40 54,60 36,48 18,60 25,40 8,28 29,28" fill="var(--c3)"/><polygon points="76,50 79,58 88,58 81,63 84,72 76,67 68,72 71,63 64,58 73,58" fill="var(--c1)"/></svg>',
  ribbon: '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M30 30 C6 6 0 34 30 30 C54 20 54 54 30 30Z" fill="var(--c1)"/><path d="M30 30 L14 66 L26 60 L32 76Z M30 30 L52 62 L40 58 L36 74Z" fill="var(--c1)" fill-opacity=".85"/><circle cx="30" cy="30" r="6" fill="var(--c3)"/></svg>'
};

const MOTIFS = {
  star: '<svg viewBox="0 0 80 30" aria-hidden="true"><path d="M4 15H30M50 15H76" stroke="var(--c3)" stroke-width="1.5"/><polygon points="40,3 43.5,11.5 52,12 45.5,18 47.5,27 40,22 32.5,27 34.5,18 28,12 36.5,11.5" fill="var(--c3)"/></svg>',
  diamond: '<svg viewBox="0 0 80 30" aria-hidden="true"><path d="M4 15H34M46 15H76" stroke="var(--c3)" stroke-width="1.5"/><path d="M40 8L47 15L40 22L33 15Z" fill="var(--c1)"/></svg>',
  holly: '<svg viewBox="0 0 80 30" aria-hidden="true"><g fill="var(--c2)"><path d="M40 16 q-8 -12 -22 -6 q8 12 22 6z"/><path d="M40 16 q8 -12 22 -6 q-8 12 -22 6z"/></g><g fill="var(--c1)"><circle cx="37" cy="19" r="4"/><circle cx="43" cy="19" r="4"/><circle cx="40" cy="14" r="4"/></g></svg>',
  flake: '<svg viewBox="0 0 80 30" aria-hidden="true"><path d="M4 15H28M52 15H76" stroke="var(--c2)" stroke-width="1.5"/><g stroke="var(--c2)" stroke-width="2" stroke-linecap="round" transform="translate(40 15)"><path d="M-11 0H11"/><path d="M-11 0H11" transform="rotate(60)"/><path d="M-11 0H11" transform="rotate(120)"/></g></svg>'
};

/* ---------- Fonts (system fonts only: no downloads, works offline) ---------- */
const F = {
  serif:  { body: 'Georgia, "Times New Roman", serif',                          greet: '"Snell Roundhand", "Segoe Script", "Brush Script MT", "Lucida Handwriting", cursive', greetSize: '2.3em', greetStyle: 'normal' },
  hand:   { body: '"Bradley Hand", "Segoe Print", "Ink Free", "Chalkboard SE", cursive', greet: '"Bradley Hand", "Segoe Print", "Ink Free", cursive',      greetSize: '1.9em', greetStyle: 'normal' },
  round:  { body: '"Trebuchet MS", "Avenir Next", Verdana, sans-serif',          greet: '"Chalkboard SE", "Marker Felt", "Comic Sans MS", "Trebuchet MS", sans-serif', greetSize: '1.8em', greetStyle: 'normal' },
  palatino:{ body: '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif', greet: '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif', greetSize: '1.9em', greetStyle: 'italic' }
};

const DOTS = { image: 'radial-gradient(rgba(184,146,74,.30) 1px, transparent 1.4px)', size: '20px 20px' };
const SNOW = { image: 'radial-gradient(rgba(255,255,255,.95) 2px, transparent 3px), radial-gradient(rgba(255,255,255,.9) 1.5px, transparent 2.5px)', size: '56px 56px, 38px 38px' };
const PLAIN = { image: 'none', size: 'auto' };

/* ---------- The designs ----------
   Each design lists SAFE options. The generator picks one item from each
   list, so every combination is guaranteed to look good together.
   corners: [top-left, top-right, bottom-left, bottom-right]; '' = empty. */
const DESIGNS = [
  { id: 'classic', name: 'Classic Christmas',
    palettes: [
      { paper: '#f8f1e0', ink: '#2c2a25', c1: '#a8323a', c2: '#1f4a37', c3: '#b8924a' },
      { paper: '#fbf4e4', ink: '#2a2622', c1: '#9b2d30', c2: '#2d5a3f', c3: '#b08a3e' } ],
    fonts: [F.serif], backgrounds: [PLAIN, DOTS],
    borders: ['3px double var(--c2)', '2px solid var(--c1)'],
    corners: [['fir','fir','fir','fir'], ['holly','holly','holly','holly'], ['fir','holly','holly','fir']],
    motifs: ['holly', 'diamond'],
    closings: ['Merry Christmas and Happy New Year!'], signoffs: ['With love,'] },

  { id: 'cozy', name: 'Cozy Christmas',
    palettes: [
      { paper: '#f6e7cf', ink: '#3d2b1f', c1: '#a63d40', c2: '#6b4a2f', c3: '#d9a441' },
      { paper: '#f4e2c6', ink: '#38281c', c1: '#9c3a3a', c2: '#4f6b4a', c3: '#d4973a' } ],
    fonts: [F.hand], backgrounds: [PLAIN, DOTS],
    borders: ['2px dashed var(--c3)', 'none'],
    corners: [['lights','lights','',''], ['lights','lights','lights','lights'], ['lights','','','ornament']],
    motifs: ['star', 'holly'],
    closings: ['Wishing you a warm and merry Christmas!'], signoffs: ['With love,'] },

  { id: 'cute', name: 'Cute Christmas',
    palettes: [
      { paper: '#fff7ec', ink: '#3a2a2c', c1: '#d8505a', c2: '#2f7d5b', c3: '#f0b441' },
      { paper: '#fff4e6', ink: '#35282a', c1: '#c9434f', c2: '#3a8a68', c3: '#eeaa3a' } ],
    fonts: [F.round], backgrounds: [PLAIN, DOTS],
    borders: ['4px dotted var(--c1)', '3px dashed var(--c2)'],
    corners: [['ornament','ornament','star','star'], ['ornament','snow','snow','ornament'], ['star','ornament','ornament','star']],
    motifs: ['star', 'flake'],
    closings: ['Merry Christmas and a very happy New Year!'], signoffs: ['With lots of love,'] },

  { id: 'elegant', name: 'Elegant Christmas',
    palettes: [
      { paper: '#fbf8f0', ink: '#1f2a25', c1: '#8f2d36', c2: '#1f4a37', c3: '#b8924a' },
      { paper: '#faf6ec', ink: '#242622', c1: '#7f2a33', c2: '#2a4a3a', c3: '#a9833d' } ],
    fonts: [F.palatino], backgrounds: [PLAIN],
    borders: ['1px solid var(--c3)', '4px double var(--c3)'],
    corners: [['ribbon','','','ribbon'], ['','','',''], ['fir','','','fir']],
    motifs: ['diamond', 'star'],
    closings: ['Merry Christmas and a Happy New Year.'], signoffs: ['Warmly,'] },

  { id: 'winter', name: 'Winter Christmas',
    palettes: [
      { paper: '#f2f7f8', ink: '#22343d', c1: '#a8323a', c2: '#2e5b4a', c3: '#b8924a' },
      { paper: '#eef4f7', ink: '#1f313b', c1: '#a8323a', c2: '#3f6f8a', c3: '#a9a9b8' } ],
    fonts: [F.serif, F.palatino], backgrounds: [SNOW, PLAIN],
    borders: ['2px solid var(--c2)', '1px solid var(--c2)'],
    corners: [['snow','snow','snow','snow'], ['fir','snow','snow','fir'], ['snow','fir','fir','snow']],
    motifs: ['flake', 'holly'],
    closings: ['Merry Christmas and Happy New Year!'], signoffs: ['With love,'] }
];
