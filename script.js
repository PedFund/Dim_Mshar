const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const revealItems = document.querySelectorAll('.reveal');
const sections = [...document.querySelectorAll('main section[id]')];

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const setActiveLink = () => {
  const position = window.scrollY + 140;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const relatedLink = document.querySelector(`.site-nav a[href="#${id}"]`);

    if (!relatedLink) return;

    if (position >= top && position < bottom) {
      navLinks.forEach((link) => link.classList.remove('active'));
      relatedLink.classList.add('active');
    }
  });
};

window.addEventListener('scroll', setActiveLink, { passive: true });
window.addEventListener('load', () => {
  setActiveLink();
  document.body.classList.add('loaded');
});