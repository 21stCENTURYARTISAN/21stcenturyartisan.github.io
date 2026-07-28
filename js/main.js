// 21st Century Artisan · GUR site - single-page; minimal JS.

document.addEventListener('DOMContentLoaded', () => {
  // Smooth-scroll anchor behaviour is handled by `html { scroll-behavior: smooth }`.
  initLightbox();
  initSynthFullscreen();
  initCountdown();
  initMailChooser();
});

/* ─── Mail chooser ───────────────────────────────────────────
   The OS "how do you want to open this?" picker can't be made to route
   Gmail to a compose window from a web page, and a bare mailto: does
   nothing when no mail handler is registered. So we own the picker: any
   [data-mail-email] link opens this in-page dialog, and each option routes
   to a guaranteed-working target - Gmail / Outlook web compose (pre-filled),
   the default mail app via mailto:, or copy-to-clipboard. The link's href
   stays a Gmail compose URL as the no-JS fallback. */
function initMailChooser() {
  const modal = document.getElementById('mailChooser');
  const triggers = document.querySelectorAll('[data-mail-email]');
  if (!modal || !triggers.length) return;

  const toEl      = document.getElementById('mcTo');
  const optGmail  = modal.querySelector('[data-mc="gmail"]');
  const optOutlook= modal.querySelector('[data-mc="outlook"]');
  const optDefault= modal.querySelector('[data-mc="default"]');
  const optCopy   = modal.querySelector('[data-mc="copy"]');
  const closeBtn  = modal.querySelector('.mc-close');

  let lastTrigger = null;
  let copyTimer = null;
  const enc = s => encodeURIComponent(s || '');

  function open(email, subject, body, trigger) {
    lastTrigger = trigger || null;
    toEl.textContent = email;

    const to = encodeURIComponent(email), su = enc(subject), bd = enc(body);
    optGmail.href   = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${bd}`;
    optOutlook.href = `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${su}&body=${bd}`;

    let mt = `mailto:${email}`;
    const q = [];
    if (subject) q.push('subject=' + su);
    if (body)    q.push('body=' + bd);
    if (q.length) mt += '?' + q.join('&');
    optDefault.href = mt;

    optCopy.dataset.email = email;
    optCopy.textContent = 'Copy email address';
    optCopy.classList.remove('is-copied');

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus({ preventScroll: true });
  }

  function close() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    lastTrigger?.focus({ preventScroll: true });
  }

  triggers.forEach(t => {
    t.addEventListener('click', e => {
      e.preventDefault();
      open(t.getAttribute('data-mail-email'),
           t.getAttribute('data-mail-subject'),
           t.getAttribute('data-mail-body'),
           t);
    });
  });

  // Gmail/Outlook open a new tab, default app navigates via mailto: - close after.
  [optGmail, optOutlook, optDefault].forEach(o =>
    o.addEventListener('click', () => setTimeout(close, 0)));

  optCopy.addEventListener('click', async () => {
    const email = optCopy.dataset.email;
    let ok = true;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.setAttribute('readonly', '');
        ta.style.position = 'absolute';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    } catch (err) { ok = false; }
    optCopy.textContent = ok ? 'Copied!' : email;
    optCopy.classList.toggle('is-copied', ok);
    if (copyTimer) clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      optCopy.textContent = 'Copy email address';
      optCopy.classList.remove('is-copied');
    }, 1600);
  });

  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => {
    if (!modal.hidden && e.key === 'Escape') close();
  });
}

/* ─── Launch countdown ───────────────────────────────────────
   Ticks the DAYS:HRS:MIN:SEC digits once per second toward the
   data-launch ISO date on #countdown. When the target passes, the
   clock is swapped for the "it's live" message. Local-time based -
   the launch date is read as midnight in the visitor's own zone,
   which is what a "launching September 1" promise reads as to them. */
function initCountdown() {
  const root = document.getElementById('countdown');
  if (!root) return;

  const target = new Date(root.getAttribute('data-launch')).getTime();
  if (Number.isNaN(target)) return;

  const clock = document.getElementById('cdClock');
  const done  = document.getElementById('cdDone');
  const elDays = document.getElementById('cdDays');
  const elHrs  = document.getElementById('cdHours');
  const elMin  = document.getElementById('cdMins');
  const elSec  = document.getElementById('cdSecs');

  const pad = n => String(n).padStart(2, '0');

  let timer = null;
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      // Launch reached - reveal the live message, retire the ticking clock.
      if (clock) clock.hidden = true;
      if (done)  done.hidden = false;
      root.classList.add('is-live');
      if (timer) clearInterval(timer);
      return;
    }
    const secs = Math.floor(diff / 1000);
    elDays.textContent = String(Math.floor(secs / 86400));
    elHrs.textContent  = pad(Math.floor((secs % 86400) / 3600));
    elMin.textContent  = pad(Math.floor((secs % 3600) / 60));
    elSec.textContent  = pad(secs % 60);
  }

  tick();
  timer = setInterval(tick, 1000);
}

/* ─── Browser-synth iframe fullscreen ────────────────────────
   The iframe carries allow="autoplay; fullscreen", so the AudioContext
   keeps running across the fullscreen transition. We request fullscreen on
   the iframe element itself so the synth fills the entire screen. */
function initSynthFullscreen() {
  const btn   = document.getElementById('synthFsBtn');
  const frame = document.getElementById('synthFrame');
  if (!btn || !frame) return;

  // Safari uses webkit-prefixed methods; iOS Safari only supports
  // webkitEnterFullscreen on <video>, not <iframe>, so we degrade to
  // window.open(frame.src) on platforms that can't fullscreen an iframe.
  const canFs =
    !!(frame.requestFullscreen || frame.webkitRequestFullscreen ||
       frame.mozRequestFullScreen || frame.msRequestFullscreen);

  btn.addEventListener('click', async () => {
    try {
      if (canFs) {
        const req = frame.requestFullscreen ||
                    frame.webkitRequestFullscreen ||
                    frame.mozRequestFullScreen ||
                    frame.msRequestFullscreen;
        await req.call(frame);
      } else {
        // iOS / older browsers: open the demo in a new tab so the user can
        // rotate to landscape and use the native browser chrome.
        window.open(frame.src, '_blank', 'noopener');
      }
    } catch (err) {
      // If fullscreen is blocked (e.g., user gesture lost), fall back to a new tab.
      window.open(frame.src, '_blank', 'noopener');
    }
  });
}

/* ─── Screenshot lightbox ────────────────────────────────────
   Each .shot figure has data-lightbox="<idx>". Click / Enter / Space
   opens the lightbox; ← / → cycle; click stage or × closes. */
function initLightbox() {
  const lb     = document.getElementById('lightbox');
  const lbImg  = document.getElementById('lbImg');
  const lbCap  = document.getElementById('lbCap');
  if (!lb || !lbImg || !lbCap) return;

  const shots = Array.from(document.querySelectorAll('.shot[data-lightbox]'))
    .map(el => ({
      src:  el.querySelector('img').getAttribute('src'),
      alt:  el.querySelector('img').getAttribute('alt') || '',
      cap:  (el.querySelector('figcaption')?.textContent || '').trim(),
      trigger: el,
    }));
  if (!shots.length) return;

  let current = -1;

  function show(i) {
    current = ((i % shots.length) + shots.length) % shots.length;
    const s = shots[current];
    lbImg.src = s.src;
    lbImg.alt = s.alt;
    lbCap.textContent = s.cap;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    // Move focus into the dialog so Esc and arrow keys work without a mouse.
    lb.querySelector('.lb-close')?.focus({ preventScroll: true });
  }
  function close() {
    if (lb.hidden) return;
    lb.hidden = true;
    document.body.style.overflow = '';
    // Return focus to the shot the user opened, for keyboard users.
    shots[current]?.trigger?.focus({ preventScroll: true });
    current = -1;
  }
  function next(d) { show(current + d); }

  shots.forEach((s, i) => {
    s.trigger.addEventListener('click', () => show(i));
    s.trigger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(i); }
    });
  });

  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', e => { e.stopPropagation(); next(-1); });
  lb.querySelector('.lb-next').addEventListener('click', e => { e.stopPropagation(); next( 1); });

  // Click backdrop or the stage figure to close; clicks on the image itself also close.
  lb.addEventListener('click', e => {
    if (e.target === lb || e.target.classList.contains('lb-stage') || e.target === lbImg) close();
  });

  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape')      close();
    else if (e.key === 'ArrowLeft')  next(-1);
    else if (e.key === 'ArrowRight') next( 1);
  });
}
