/* ============================================================
   ELITE CLUB — EMSI CFC | script.js
   Handles: Navbar scroll, mobile menu, smooth scroll,
            FAQ accordion, form submit, particles, scroll reveal
============================================================ */

// ============================================================
// NAVBAR — Scroll & Mobile
// ============================================================
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// Active nav link highlight
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (navLink) {
      if (scrollPos >= top && scrollPos < bottom) {
        document.querySelectorAll('.nav-links a').forEach(l => l.style.color = '');
        navLink.style.color = 'var(--gold)';
      }
    }
  });
}

// ============================================================
// SMOOTH SCROLL
// ============================================================
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// All internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});

// ============================================================
// FAQ ACCORDION
// ============================================================
function toggleFaq(item) {
  const isActive = item.classList.contains('active');

  // Close all
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('active');
  });

  // Open clicked if it wasn't already open
  if (!isActive) {
    item.classList.add('active');
  }
}

// ============================================================
// FORM SUBMIT
// ============================================================
function handleFormSubmit(e) {
  e.preventDefault();

  const form    = document.getElementById('joinForm');
  const btn     = form.querySelector('.btn-primary');
  const success = document.getElementById('formSuccess');

  // Simulate sending
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

  setTimeout(() => {
    btn.style.display = 'none';
    success.classList.add('show');
    form.reset();

    // Optional: scroll to success message
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1800);
}

// ============================================================
// FLOATING PARTICLES (Hero Section)
// ============================================================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 40;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random size between 1px and 4px
    const size = Math.random() * 3 + 1;
    particle.style.width  = `${size}px`;
    particle.style.height = `${size}px`;

    // Random horizontal position
    particle.style.left = `${Math.random() * 100}%`;

    // Random animation duration and delay
    const duration = Math.random() * 12 + 8;
    const delay    = Math.random() * 10;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay   = `${delay}s`;

    // Slightly vary the color
    const isGold = Math.random() > 0.3;
    particle.style.background = isGold
      ? `rgba(212, 175, 55, ${Math.random() * 0.7 + 0.3})`
      : `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;

    container.appendChild(particle);
  }
}

createParticles();

// ============================================================
// SCROLL REVEAL ANIMATION
// ============================================================
function initScrollReveal() {
  // Add reveal class to animatable elements
  const targets = document.querySelectorAll(
    '.pole-card, .event-card, .board-card, .value-card, .partner-logo-card, ' +
    '.contact-card, .faq-item, .timeline-card, .ach-num-card, ' +
    '.about-card-main, .about-card-accent, .partner-main-card, .join-perks, .join-form'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger siblings if they have data-delay
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
}

initScrollReveal();

// ============================================================
// COUNTER ANIMATION (Achievements Numbers)
// ============================================================
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // Ease out
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('.ach-num, .stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const text   = entry.target.textContent;
        const num    = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d]/g, '');
        animateCounter(entry.target, num, suffix);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

initCounters();

// ============================================================
// SECTION HEADER ANIMATIONS
// ============================================================
function initSectionHeaders() {
  const headers = document.querySelectorAll('.section-header');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  headers.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(25px)';
    header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(header);
  });
}

initSectionHeaders();

// ============================================================
// CLOSE MOBILE MENU ON OUTSIDE CLICK
// ============================================================
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// ============================================================
// KEYBOARD ACCESSIBILITY — FAQ
// ============================================================
document.querySelectorAll('.faq-item').forEach(item => {
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFaq(item);
    }
  });
});

// ============================================================
// FOOTER YEAR (auto-update)
// ============================================================
const yearEls = document.querySelectorAll('.footer-bottom p');
yearEls.forEach(el => {
  el.innerHTML = el.innerHTML.replace('2026', new Date().getFullYear());
});
