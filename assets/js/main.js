// Ambient particles
const particleContainer = document.getElementById('particles');
if (particleContainer) {
  const particleCount = window.innerWidth < 600 ? 18 : 34;
  for (let i = 0; i < particleCount; i++) {
    const s = document.createElement('div');
    s.className = 'spark';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.bottom = (-10 - Math.random() * 20) + 'vh';
    s.style.animationDuration = (8 + Math.random() * 10) + 's';
    s.style.animationDelay = (Math.random() * 10) + 's';
    s.style.opacity = 0.3 + Math.random() * 0.5;
    const scale = 0.6 + Math.random() * 1.2;
    s.style.transform = `scale(${scale})`;
    particleContainer.appendChild(s);
  }
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Highlight current page in nav (matches data-page on <body>)
document.addEventListener('DOMContentLoaded', () => {
  const current = document.body.getAttribute('data-page');
  if (!current) return;
  document.querySelectorAll('nav a[data-page]').forEach(a => {
    if (a.getAttribute('data-page') === current) {
      a.classList.add('active');
    }
  });
});
