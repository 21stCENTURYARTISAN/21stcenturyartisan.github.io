// 21st Century Artisan · GUR site — single-page; minimal JS.

document.addEventListener('DOMContentLoaded', () => {
  // Smooth-scroll anchor behaviour is handled by `html { scroll-behavior: smooth }`.
  initLightbox();
});

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
