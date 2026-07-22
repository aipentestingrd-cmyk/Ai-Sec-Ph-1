(() => {
  'use strict';

  const toggleBtn = document.querySelector('[data-nav-toggle]');
  const menu = document.getElementById('primary-nav');
  const navbar = document.querySelector('.navbar');

  if (!toggleBtn || !menu) return;

  const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  // Desktop CTA is hidden below 768px — mirror it inside the mobile dropdown.
  if (!menu.querySelector('.navbar__cta--mobile')) {
    const desktopCta = document.querySelector('.navbar__cta');
    const mobileCta = document.createElement('a');
    mobileCta.href = desktopCta ? desktopCta.getAttribute('href') : '#';
    mobileCta.className = 'btn btn-primary navbar__cta--mobile';
    mobileCta.textContent = 'Register Now';
    menu.appendChild(mobileCta);
  }

  function isOpen() {
    return menu.classList.contains('is-open');
  }

  function openMenu() {
    menu.classList.add('is-open');
    toggleBtn.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', onKeydown);
    const focusable = menu.querySelectorAll(FOCUSABLE_SELECTOR);
    if (focusable.length) focusable[0].focus();
  }

  function closeMenu({ restoreFocus = false } = {}) {
    menu.classList.remove('is-open');
    toggleBtn.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKeydown);
    if (restoreFocus) toggleBtn.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      closeMenu({ restoreFocus: true });
      return;
    }
    if (e.key !== 'Tab') return;

    const focusable = Array.from(menu.querySelectorAll(FOCUSABLE_SELECTOR));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  toggleBtn.addEventListener('click', () => {
    isOpen() ? closeMenu() : openMenu();
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu();
  });

  // Sticky navbar: subtle bg change past 50px of scroll
  if (navbar) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
        ticking = false;
      });
    });
  }

  // Active nav link: match against current page filename
  const currentFile = location.pathname.split('/').pop() || 'index.html';
  menu.querySelectorAll('a[href]').forEach((link) => {
    const linkFile = link.getAttribute('href').split('/').pop();
    const isCurrent = linkFile === currentFile;
    link.classList.toggle('is-active', isCurrent);
    if (isCurrent) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
})();