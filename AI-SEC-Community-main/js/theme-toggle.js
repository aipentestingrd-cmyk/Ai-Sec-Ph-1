(() => {
  'use strict';

  const STORAGE_KEY = 'ai-sec-theme';
  const ICONS = { dark: '☾', light: '☀' };
  const root = document.documentElement;

  function getStoredTheme() {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      /* localStorage unavailable (private mode, disabled) — theme just won't persist */
    }
  }

  function updateToggleButtons(theme) {
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(theme === 'light'));
      btn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
      const icon = btn.querySelector('span') || btn;
      icon.textContent = ICONS[theme];
    });
  }

  function applyTheme(theme, { animate = false } = {}) {
    if (animate) {
      root.classList.add('theme-transition');
      window.setTimeout(() => root.classList.remove('theme-transition'), 300);
    }
    root.setAttribute('data-theme', theme);
    updateToggleButtons(theme);
  }

  // Dark is the brand default — only a saved preference overrides it.
  // prefers-color-scheme is intentionally ignored here.
  const initialTheme = getStoredTheme() === 'light' ? 'light' : 'dark';
  applyTheme(initialTheme);

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next, { animate: true });
      storeTheme(next);
    });
  });
})();