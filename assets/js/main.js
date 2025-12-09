
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal, .reveal-delayed");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealEls.forEach(el => observer.observe(el));
});


function initNewsFilters() {
  const yearButtons = document.querySelectorAll('[data-news-filter-year]');
  const typeButtons = document.querySelectorAll('[data-news-filter-type]');
  const cards = document.querySelectorAll('.news-archive-grid .news-card');

  let activeYear = 'all';
  let activeType = 'all';

  function applyFilters() {
    cards.forEach(card => {
      const year = card.getAttribute('data-year');
      const type = card.getAttribute('data-type');
      const matchYear = activeYear === 'all' || year === activeYear;
      const matchType = activeType === 'all' || type === activeType;
      card.style.display = (matchYear && matchType) ? '' : 'none';
    });
  }

  yearButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      yearButtons.forEach(b => b.classList.remove('chip-active'));
      btn.classList.add('chip-active');
      activeYear = btn.getAttribute('data-news-filter-year');
      applyFilters();
    });
  });

  typeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      typeButtons.forEach(b => b.classList.remove('chip-active'));
      btn.classList.add('chip-active');
      activeType = btn.getAttribute('data-news-filter-type');
      applyFilters();
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  try {
    initNewsFilters();
  } catch (e) {
    console && console.warn && console.warn('News filters not initialised:', e);
  }
});
