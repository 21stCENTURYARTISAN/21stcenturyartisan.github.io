// SoundCloud custom player — uses SC Widget API with our own UI
document.addEventListener('DOMContentLoaded', () => {
  const scTracks = document.querySelectorAll('.sc-track');
  let activeWidget = null;
  let activeBtn = null;

  scTracks.forEach(trackEl => {
    const iframe = trackEl.querySelector('iframe');
    const btn = trackEl.querySelector('.sc-play');
    const progressFill = trackEl.querySelector('.track__progress-fill');
    const progressBar = trackEl.querySelector('.track__progress');
    const durationEl = trackEl.querySelector('.track__duration');
    const widget = SC.Widget(iframe);

    let duration = 0;
    let isPlaying = false;

    widget.bind(SC.Widget.Events.READY, () => {
      widget.getDuration(d => {
        duration = d;
        const mins = Math.floor(d / 60000);
        const secs = Math.floor((d % 60000) / 1000).toString().padStart(2, '0');
        durationEl.textContent = mins + ':' + secs;
      });
    });

    widget.bind(SC.Widget.Events.PLAY_PROGRESS, data => {
      if (progressFill && data.relativePosition) {
        progressFill.style.width = (data.relativePosition * 100) + '%';
      }
    });

    widget.bind(SC.Widget.Events.FINISH, () => {
      isPlaying = false;
      btn.innerHTML = playIcon();
      if (progressFill) progressFill.style.width = '0%';
      if (activeWidget === widget) {
        activeWidget = null;
        activeBtn = null;
      }
    });

    btn.addEventListener('click', () => {
      // If clicking the same track, toggle
      if (activeWidget === widget) {
        if (isPlaying) {
          widget.pause();
          isPlaying = false;
          btn.innerHTML = playIcon();
        } else {
          widget.play();
          isPlaying = true;
          btn.innerHTML = pauseIcon();
        }
        return;
      }

      // Stop any other playing track
      if (activeWidget) {
        activeWidget.pause();
        activeWidget.seekTo(0);
        if (activeBtn) activeBtn.innerHTML = playIcon();
        // Reset previous progress
        const prevTrack = activeBtn.closest('.sc-track');
        if (prevTrack) {
          const prevFill = prevTrack.querySelector('.track__progress-fill');
          if (prevFill) prevFill.style.width = '0%';
        }
      }

      // Play this track
      widget.play();
      isPlaying = true;
      btn.innerHTML = pauseIcon();
      activeWidget = widget;
      activeBtn = btn;
    });

    // Seek on progress bar click
    if (progressBar) {
      progressBar.addEventListener('click', e => {
        if (activeWidget !== widget || !duration) return;
        const rect = progressBar.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        widget.seekTo(pct * duration);
      });
    }
  });

  function playIcon() {
    return '<svg viewBox="0 0 24 24"><polygon points="6,3 20,12 6,21"/></svg>';
  }

  function pauseIcon() {
    return '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>';
  }
});
