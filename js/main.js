// ===== NAVBAR TOGGLE =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.navbar__toggle');
  const navLinks = document.querySelector('.navbar__links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // ===== ACTIVE NAV LINK =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ===== AUDIO PLAYER =====
  let currentAudio = null;
  let currentBtn = null;

  document.querySelectorAll('.track__play-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const track = btn.closest('.track');
      const audioSrc = track.dataset.src;

      if (!audioSrc) return;

      // If clicking the same track, toggle play/pause
      if (currentBtn === btn && currentAudio) {
        if (currentAudio.paused) {
          currentAudio.play();
          btn.innerHTML = pauseIcon();
        } else {
          currentAudio.pause();
          btn.innerHTML = playIcon();
        }
        return;
      }

      // Stop any currently playing track
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        if (currentBtn) currentBtn.innerHTML = playIcon();
        const prevFill = currentBtn.closest('.track').querySelector('.track__progress-fill');
        if (prevFill) prevFill.style.width = '0%';
      }

      // Play new track
      currentAudio = new Audio(audioSrc);
      currentBtn = btn;
      currentAudio.play();
      btn.innerHTML = pauseIcon();

      const progressFill = track.querySelector('.track__progress-fill');
      const progressBar = track.querySelector('.track__progress');

      currentAudio.addEventListener('timeupdate', () => {
        if (currentAudio.duration) {
          const pct = (currentAudio.currentTime / currentAudio.duration) * 100;
          if (progressFill) progressFill.style.width = pct + '%';
        }
      });

      currentAudio.addEventListener('ended', () => {
        btn.innerHTML = playIcon();
        if (progressFill) progressFill.style.width = '0%';
        currentAudio = null;
        currentBtn = null;
      });

      // Click on progress bar to seek
      if (progressBar) {
        progressBar.addEventListener('click', (e) => {
          if (!currentAudio || currentBtn !== btn) return;
          const rect = progressBar.getBoundingClientRect();
          const pct = (e.clientX - rect.left) / rect.width;
          currentAudio.currentTime = pct * currentAudio.duration;
        });
      }
    });
  });

  // ===== CONTACT FORM =====
  // Pure-frontend: submit opens the user's email client with the form
  // contents pre-populated as a mailto: draft. No backend / no Formspree.
  // Honest UX: the user sees and sends the actual email themselves.
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const SUBJECT_LABELS = {
      general: 'General Inquiry',
      music:   'Music / Booking',
      synth:   'Synth Commission',
      design:  'Design Collaboration',
      food:    'Culinary / Event',
    };
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(contactForm));
      const name    = (data.name    || '').trim();
      const email   = (data.email   || '').trim();
      const subject = SUBJECT_LABELS[data.subject] || 'Inquiry';
      const message = (data.message || '').trim();
      const body =
        'From: ' + name + ' <' + email + '>\n' +
        'Topic: ' + subject + '\n\n' +
        message + '\n';
      const mailto =
        'mailto:contact@21stcenturyartisan.com' +
        '?subject=' + encodeURIComponent('[Website] ' + subject) +
        '&body='    + encodeURIComponent(body);
      window.location.href = mailto;
    });
  }
});

// ===== SVG ICONS =====
function playIcon() {
  return `<svg viewBox="0 0 24 24"><polygon points="6,3 20,12 6,21"/></svg>`;
}

function pauseIcon() {
  return `<svg viewBox="0 0 24 24"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>`;
}
