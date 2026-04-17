const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14,
  rootMargin: '0px 0px -40px 0px'
});

revealItems.forEach((item) => revealObserver.observe(item));

const toTopButton = document.getElementById('toTop');

const toggleToTop = () => {
  if (window.scrollY > 480) {
    toTopButton.classList.add('visible');
  } else {
    toTopButton.classList.remove('visible');
  }
};

window.addEventListener('scroll', toggleToTop, { passive: true });
toggleToTop();

toTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const checkboxes = document.querySelectorAll('.check-card input[type="checkbox"]');

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    const text = checkbox.closest('label')?.querySelector('span');
    if (!text) return;
    text.style.opacity = checkbox.checked ? '0.65' : '1';
    text.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
  });
});

const headerLinks = document.querySelectorAll('.nav a, .hero-actions a, .btn-soft');

headerLinks.forEach((link) => {
  link.addEventListener('mouseenter', () => {
    link.style.transform = 'translateY(-1px)';
  });

  link.addEventListener('mouseleave', () => {
    link.style.transform = '';
  });
});
