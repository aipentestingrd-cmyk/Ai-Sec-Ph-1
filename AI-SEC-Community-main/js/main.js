(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    console.log('AI-SEC Community loaded');
    initFooterYear();
    initLazyVideos();
    initSmoothScroll();
  });

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
