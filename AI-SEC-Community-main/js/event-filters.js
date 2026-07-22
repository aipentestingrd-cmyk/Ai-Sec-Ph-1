(() => {
  'use strict';

  const typeButtons = document.querySelectorAll('[data-filter-type]');
  const formatButtons = document.querySelectorAll('[data-filter-format]');
  if (!typeButtons.length && !formatButtons.length) return;

  const grid = document.querySelector('[data-events-grid]');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('[data-type][data-format]'));
  if (!cards.length) return;

  const countEl = document.querySelector('[data-events-count]');
  const FADE_DURATION = 250; // mirrors --transition-base in tokens.css

  let noResultsEl = grid.querySelector('[data-no-results-message]');
  if (!noResultsEl) {
    noResultsEl = document.createElement('p');
    noResultsEl.setAttribute('data-no-results-message', '');
    noResultsEl.className = 'events-empty-message';
    noResultsEl.textContent = 'No events match your filters.';
    noResultsEl.hidden = true;
    grid.appendChild(noResultsEl);
  }

  let currentType = 'all';
  let currentFormat = 'all';

  function setActive(buttons, datasetKey, value) {
    buttons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset[datasetKey] === value);
    });
  }

  function showCard(card) {
    if (card.style.display === 'none') {
      card.style.display = '';
      void card.offsetWidth; // force reflow so the fade-in transition runs
    }
    card.classList.remove('is-filtered-out');
  }

  function hideCard(card) {
    card.classList.add('is-filtered-out');
    window.setTimeout(() => {
      if (card.classList.contains('is-filtered-out')) card.style.display = 'none';
    }, FADE_DURATION);
  }

  function applyFilters() {
    let visible = 0;
    cards.forEach((card) => {
      const matchesType = currentType === 'all' || card.dataset.type === currentType;
      const matchesFormat = currentFormat === 'all' || card.dataset.format === currentFormat;
      if (matchesType && matchesFormat) {
        visible += 1;
        showCard(card);
      } else {
        hideCard(card);
      }
    });

    noResultsEl.hidden = visible !== 0;
    if (countEl) countEl.textContent = `Showing ${visible} of ${cards.length} events`;
  }

  typeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentType = btn.dataset.filterType;
      setActive(typeButtons, 'filterType', currentType);
      applyFilters();
    });
  });

  formatButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentFormat = btn.dataset.filterFormat;
      setActive(formatButtons, 'filterFormat', currentFormat);
      applyFilters();
    });
  });

  setActive(typeButtons, 'filterType', currentType);
  setActive(formatButtons, 'filterFormat', currentFormat);
  applyFilters();
})();