/* script.js - form handling, letter building, and export. All in the browser. */
(() => {
  const $ = (id) => document.getElementById(id);
  const form = $('letterForm'), letter = $('letter');
  const state = { to: '', msg: '', from: '', photo: '', photoSmall: '', design: -1, sig: null };
  let statusTimer;

  // Decorative lights in the hero
  const bulbs = $('bulbs'), cols = ['#a8323a', '#d9b25c', '#f7f0e1', '#d9b25c'];
  for (let i = 0; i < 12; i++) {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const x = 25 + i * 50, y = 14 + (i % 3 === 1 ? 12 : 6);
    c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', 5);
    c.setAttribute('fill', cols[i % 4]); bulbs.appendChild(c);
  }

  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const say = (t) => { const s = $('status'); s.textContent = t; clearTimeout(statusTimer); statusTimer = setTimeout(() => (s.textContent = ''), 3000); };

  $('msg').addEventListener('input', (e) => ($('count').textContent = e.target.value.length));

  // Pick a design by index, so the same look can be rebuilt from a shared link.
  const pickI = (a) => Math.floor(Math.random() * a.length);
  const lists = (d) => [d.palettes, d.fonts, d.backgrounds, d.borders, d.corners, d.motifs, d.closings, d.signoffs];
  function buildSig(di, ix) {
    const d = DESIGNS[di];
    return { d, di, ix, pal: d.palettes[ix[0]], font: d.fonts[ix[1]], bg: d.backgrounds[ix[2]], border: d.borders[ix[3]],
      corners: d.corners[ix[4]], motif: d.motifs[ix[5]], closing: d.closings[ix[6]], signoff: d.signoffs[ix[7]] };
  }
  function nextDesign() {
    let i;
    do { i = Math.floor(Math.random() * DESIGNS.length); } while (DESIGNS.length > 1 && i === state.design);
    state.design = i;
    state.sig = buildSig(i, lists(DESIGNS[i]).map(pickI));
  }

  function greeting() { return `Merry Christmas, ${state.to}!`; }

  // Draw the letter. User text is only ever set with textContent (never innerHTML).
  function render() {
    const s = state.sig, st = letter.style;
    st.setProperty('--paper', s.pal.paper); st.setProperty('--ink', s.pal.ink);
    st.setProperty('--c1', s.pal.c1); st.setProperty('--c2', s.pal.c2); st.setProperty('--c3', s.pal.c3);
    st.setProperty('--body-font', s.font.body); st.setProperty('--greet-font', s.font.greet);
    st.setProperty('--greet-size', s.font.greetSize); st.setProperty('--greet-style', s.font.greetStyle);
    st.setProperty('--pattern', s.bg.image); st.setProperty('--psize', s.bg.size);
    st.setProperty('--frame', s.border);
    letter.dataset.design = s.d.id;

    ['tl', 'tr', 'bl', 'br'].forEach((pos, i) => {
      const el = letter.querySelector('.decor.' + pos);
      el.innerHTML = DECOR[s.corners[i]] || ''; // built-in SVG only, never user input
    });
    letter.querySelector('.motif').innerHTML = MOTIFS[s.motif];
    letter.querySelector('.greet').textContent = greeting();

    const body = letter.querySelector('.body');
    body.replaceChildren();
    state.msg.trim().split(/\n\s*\n/).forEach((para) => {
      const p = document.createElement('p'); p.textContent = para.trim(); body.appendChild(p);
    });
    const fig = letter.querySelector('.photo');
    fig.hidden = !state.photo;
    if (state.photo) { $('letterPhoto').src = state.photo; fig.style.setProperty('--tilt', (Math.random() * 4 - 2).toFixed(1) + 'deg'); }
    letter.querySelector('.closing').textContent = s.closing;
    const hasFrom = !!state.from;
    letter.querySelector('.signoff').textContent = hasFrom ? s.signoff : '';
    letter.querySelector('.from').textContent = hasFrom ? state.from : '';
    letter.querySelector('.signoff').hidden = letter.querySelector('.from').hidden = !hasFrom;
    $('share').hidden = !navigator.share;
    if (!$('linkBox').hidden) refreshLink();
  }

  function plainText() {
    let t = `${greeting()}\n\n${state.msg.trim()}\n\n${state.sig.closing}`;
    if (state.from) t += `\n\n${state.sig.signoff}\n${state.from}`;
    return t + '\n';
  }

  // Optional photo: resized in the browser (max 1200px) and kept in memory only.
  function shrink(img, max, q) {
    const k = Math.min(1, max / Math.max(img.width, img.height));
    const cv = document.createElement('canvas'); cv.width = Math.round(img.width * k); cv.height = Math.round(img.height * k);
    const ctx = cv.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height); ctx.drawImage(img, 0, 0, cv.width, cv.height);
    return cv.toDataURL('image/jpeg', q);
  }
  const hint = $('photoHint'), HINT = hint.textContent;
  function clearPhoto() { state.photo = ''; state.photoSmall = ''; $('photo').value = ''; $('photoPrev').hidden = true; $('photoThumb').removeAttribute('src'); hint.textContent = HINT; }
  $('photo').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return clearPhoto();
    if (!file.type.startsWith('image/')) { clearPhoto(); hint.textContent = 'That file is not an image. Please choose a JPG, PNG or WebP.'; return; }
    if (file.size > 20 * 1024 * 1024) { clearPhoto(); hint.textContent = 'That photo is too large (20 MB max). Please choose a smaller one.'; return; }
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
      state.photo = shrink(img, 1000, 0.78);
      state.photoSmall = shrink(img, 160, 0.30);
      $('photoThumb').src = state.photo; $('photoPrev').hidden = false; hint.textContent = HINT;
      URL.revokeObjectURL(url);
      if (!$('previewSection').hidden) render(); // keep an existing letter in sync
    };
    img.onerror = () => { URL.revokeObjectURL(url); clearPhoto(); hint.textContent = 'Could not read that image. Try a different file.'; };
    img.src = url;
  });
  $('photoRemove').addEventListener('click', () => { clearPhoto(); if (!$('previewSection').hidden) render(); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    state.to = $('to').value.trim(); state.msg = $('msg').value; state.from = $('from').value.trim();
    if (!state.to || !state.msg.trim()) return;
    nextDesign(); render();
    $('previewSection').hidden = false;
    $('previewSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  $('again').addEventListener('click', () => { nextDesign(); render(); say('New design ready. Your message is unchanged.'); });
  $('edit').addEventListener('click', () => { $('formSection').scrollIntoView({ behavior: 'smooth' }); $('msg').focus(); });
  $('print').addEventListener('click', () => window.print());

  $('copy').addEventListener('click', async () => {
    const text = plainText();
    try { await navigator.clipboard.writeText(text); say('Letter copied.'); }
    catch {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); say('Letter copied.'); } catch { say('Could not copy. Please select the text and copy it.'); }
      ta.remove();
    }
  });

  $('download').addEventListener('click', () => {
    const name = state.to.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'friend';
    const url = URL.createObjectURL(new Blob([plainText()], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = `christmas-letter-for-${name}.txt`;
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    say('Download started.');
  });

  $('share').addEventListener('click', async () => {
    try { await navigator.share({ title: 'A Christmas letter for ' + state.to, text: plainText() }); }
    catch (err) { if (err.name !== 'AbortError') say('Sharing is not available. Try Copy Text instead.'); }
  });

  /* ---------- Share link: the whole letter is packed into the part of the web
     address after the # sign. Browsers never send that part to any server. ---------- */
  const b64u = (buf) => { const b = new Uint8Array(buf); let s = ''; for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode.apply(null, b.subarray(i, i + 0x8000)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
  const unb64u = (t) => { t = t.replace(/-/g, '+').replace(/_/g, '/'); while (t.length % 4) t += '='; const s = atob(t), b = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) b[i] = s.charCodeAt(i); return b; };
  const pipe = (bytes, Stream) => new Response(new Blob([bytes]).stream().pipeThrough(new Stream('deflate-raw'))).arrayBuffer();
  async function encode(obj) {
    const raw = new TextEncoder().encode(JSON.stringify(obj));
    return window.CompressionStream ? 'c' + b64u(await pipe(raw, CompressionStream)) : 'r' + b64u(raw);
  }
  async function decode(code) {
    const bytes = unb64u(code.slice(1));
    let raw;
    if (code[0] === 'c' && window.DecompressionStream) raw = new Uint8Array(await pipe(bytes, DecompressionStream));
    else if (code[0] === 'r') raw = bytes;
    else throw new Error('bad link');
    return JSON.parse(new TextDecoder().decode(raw));
  }
  // Everything from a link is untrusted: check and trim it before use.
  function fromPayload(o) {
    if (!o || o.v !== 1) throw new Error('bad link');
    const t = String(o.t || '').slice(0, 60).trim(), m = String(o.m || '').slice(0, 4000), f = String(o.f || '').slice(0, 60).trim();
    if (!t || !m.trim()) throw new Error('bad link');
    const di = Number.isInteger(o.d) && DESIGNS[o.d] ? o.d : 0;
    const ix = lists(DESIGNS[di]).map((a, k) => (Array.isArray(o.x) && Number.isInteger(o.x[k]) && o.x[k] >= 0 && o.x[k] < a.length ? o.x[k] : 0));
    const p = typeof o.p === 'string' && o.p.length < 400000 && /^data:image\/jpeg;base64,[A-Za-z0-9+\/=]+$/.test(o.p) ? o.p : '';
    return { t, m, f, di, ix, p };
  }

  async function refreshLink() {
    const withPhoto = !!state.photoSmall && $('incPhoto').checked;
    $('photoOpt').hidden = !state.photoSmall;
    const o = { v: 1, t: state.to, m: state.msg.trim(), f: state.from, d: state.sig.di, x: state.sig.ix };
    if (withPhoto) o.p = state.photoSmall;
    const url = location.href.split('#')[0].split('?')[0] + '#l=' + await encode(o);
    $('linkUrl').value = url;
    $('linkNote').textContent = url.length > 8000
      ? `This link is long (${Math.round(url.length / 1024)} KB) and some apps may cut it off.` + (withPhoto ? ' Untick the photo for a much shorter link.' : '')
      : 'Ready to send.';
  }
  $('getLink').addEventListener('click', async () => { $('linkBox').hidden = false; await refreshLink(); $('linkBox').scrollIntoView({ behavior: 'smooth', block: 'nearest' }); });
  $('incPhoto').addEventListener('change', refreshLink);
  $('copyLink').addEventListener('click', async () => {
    const box = $('linkUrl');
    try { await navigator.clipboard.writeText(box.value); say('Link copied.'); }
    catch { box.select(); try { document.execCommand('copy'); say('Link copied.'); } catch { say('Could not copy. Please select the link and copy it.'); } }
  });
  if (navigator.share) $('sendLink').hidden = false;
  $('sendLink').addEventListener('click', async () => {
    try { await navigator.share({ title: 'A Christmas letter for ' + state.to, text: 'I made a Christmas letter for you.', url: $('linkUrl').value }); }
    catch (err) { if (err.name !== 'AbortError') say('Sharing is not available. Use Copy Link instead.'); }
  });

  // Opened from a link? Show only the letter.
  const m = location.hash.match(/^#l=([cr][A-Za-z0-9_-]+)$/);
  if (location.hash.startsWith('#l=')) {
    document.body.classList.add('viewer');
    (m ? decode(m[1]).then(fromPayload) : Promise.reject(new Error('bad link')))
      .then((v) => {
        Object.assign(state, { to: v.t, msg: v.m, from: v.f, photo: v.p, design: v.di });
        state.sig = buildSig(v.di, v.ix);
        render();
        $('previewSection').hidden = false;
        document.title = 'A Christmas letter for ' + v.t;
      })
      .catch(() => { $('broken').hidden = false; });
  }
  window.addEventListener('hashchange', () => location.reload());
})();
