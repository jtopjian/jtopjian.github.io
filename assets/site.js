// assets/site.js
(function () {
  const cards = Array.from(document.querySelectorAll('[data-app]'));
  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const searchInput = document.querySelector('[data-search]');
  const countTarget = document.querySelector('[data-results-count]');

  if (cards.length === 0) {
    return;
  }

  let activeFilter = 'all';

  function normalize(value) {
    return (value || '').toLowerCase().trim();
  }

  function applyFilters() {
    const query = normalize(searchInput ? searchInput.value : '');
    let visibleCount = 0;

    cards.forEach((card) => {
      const type = normalize(card.dataset.type);
      const terms = normalize(card.dataset.terms);
      const text = normalize(card.textContent);

      const filterMatch = activeFilter === 'all' || type === activeFilter;
      const queryMatch = query.length === 0 || terms.includes(query) || text.includes(query);
      const show = filterMatch && queryMatch;

      card.classList.toggle('hidden', !show);
      if (show) {
        visibleCount += 1;
      }
    });

    if (countTarget) {
      countTarget.textContent = visibleCount + (visibleCount === 1 ? ' app shown' : ' apps shown');
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = normalize(button.dataset.filter || 'all');
      filterButtons.forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  applyFilters();
})();
