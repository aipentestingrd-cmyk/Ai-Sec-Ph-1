(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    console.log('AI-SEC Community loaded');
    initFooterYear();
    initLazyVideos();
    initSmoothScroll();
    initImageFallbacks();
  });

  // Some speaker/recap photos referenced in the markup aren't in the
  // Images folder yet (upcoming events added before the photo is taken).
  // Without this, a missing photo shows the browser's broken-image icon
  // at whatever size the alt text pushes it to — different per browser,
  // which is what was throwing card grids out of alignment. Any <img>
  // that fails to load is swapped for a same-sized placeholder carrying
  // the person's initials, so every card in a row stays the same height.
  //
  // Because this script is `defer`red, most 404s have already happened —
  // and fired and lost — by the time it runs, so a plain 'error' listener
  // attached here would miss them. We sweep for already-broken <img>s
  // first, then keep listening (capturing phase) for any that fail later.
  function initImageFallbacks() {
    document.querySelectorAll('img').forEach((img) => {
      if (img.complete && img.naturalWidth === 0) {
        applyImageFallback(img);
      }
    });

    document.addEventListener(
      'error',
      (e) => {
        if (e.target instanceof HTMLImageElement) applyImageFallback(e.target);
      },
      true
    );
  }

  function applyImageFallback(img) {
    if (img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied = 'true';

    const label = (img.alt || '')
      .replace(/portrait placeholder for/i, '')
      .replace(/photo of/i, '')
      .trim();
    const initials = label
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase() || 'AI';

    const fallback = document.createElement('div');
    fallback.className = `${img.className} img-fallback`.trim();
    fallback.setAttribute('role', 'img');
    fallback.setAttribute('aria-label', img.alt || 'Image unavailable');
    fallback.textContent = initials;
    img.replaceWith(fallback);
  }

  function initFooterYear() {
    const yearEl = document.querySelector('[data-current-year]');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function initLazyVideos() {
    const iframes = document.querySelectorAll('iframe[data-src]');
    if (!iframes.length) return;

    function loadIframe(iframe) {
      iframe.src = iframe.dataset.src;
      iframe.removeAttribute('data-src');
    }

    if (!('IntersectionObserver' in window)) {
      iframes.forEach(loadIframe);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          loadIframe(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: '200px 0px', threshold: 0.1 }
    );

    iframes.forEach((iframe) => observer.observe(iframe));
  }

  function initSmoothScroll() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navbar = document.querySelector('.navbar');

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;

      window.scrollTo({
        top: targetTop,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }
})();