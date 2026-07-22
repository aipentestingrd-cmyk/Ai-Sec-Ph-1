(() => {
  'use strict';

  const el = document.querySelector('[data-countdown]');
  if (!el) return;

  const targetDate = new Date(el.dataset.countdown);
  if (Number.isNaN(targetDate.getTime())) return;

  const daysEl = el.querySelector('[data-countdown-days]');
  const hoursEl = el.querySelector('[data-countdown-hours]');
  const minsEl = el.querySelector('[data-countdown-mins]');
  const secsEl = el.querySelector('[data-countdown-secs]');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      el.classList.add('countdown--closed');
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      const label = el.querySelector('[data-countdown-status]');
      if (label) label.textContent = 'Registration is now closed';
      window.clearInterval(timerId);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minsEl) minsEl.textContent = pad(mins);
    if (secsEl) secsEl.textContent = pad(secs);
  }

  tick();
  const timerId = window.setInterval(tick, 1000);
})();