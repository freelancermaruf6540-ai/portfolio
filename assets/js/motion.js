/**
 * Motion & Interactive Engine
 * Handles smooth cursor, scroll detection, intersection reveals,
 * number counter interpolation, and real-time clock.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initScrollReveals();
  initAnimatedCounters();
  initCustomCursor();
  initLiveClock();
  initBackToTop();
  initActiveNavSpy();
});

// --------------------------------------------------------------------------
// 01. Sticky Navigation Scroll State
// --------------------------------------------------------------------------
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// --------------------------------------------------------------------------
// 02. Active Nav Link Spy
// --------------------------------------------------------------------------
function initActiveNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-70px 0px -40% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

// --------------------------------------------------------------------------
// 03. Scroll Reveals with IntersectionObserver
// --------------------------------------------------------------------------
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

// --------------------------------------------------------------------------
// 04. Animated Statistics Counters
// --------------------------------------------------------------------------
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    if (prefersReduced) {
      el.textContent = target < 10 ? `0${target}` : String(target);
      return;
    }

    const duration = 1600;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * target);

      el.textContent = currentVal < 10 && target < 10 ? `0${currentVal}` : String(currentVal);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target < 10 ? `0${target}` : String(target);
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => observer.observe(counter));
}

// --------------------------------------------------------------------------
// 05. Discreet, High-End Custom Cursor
// --------------------------------------------------------------------------
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const circle = document.querySelector('.cursor-circle');

  if (!dot || !circle) return;

  // Disable on coarse pointers (touchscreens/tablets)
  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display = 'none';
    circle.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let circleX = mouseX;
  let circleY = mouseY;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    if (!isMoving) {
      isMoving = true;
      renderCircle();
    }
  }, { passive: true });

  const renderCircle = () => {
    circleX += (mouseX - circleX) * 0.16;
    circleY += (mouseY - circleY) * 0.16;
    circle.style.transform = `translate(${circleX}px, ${circleY}px)`;

    // Keep running smoothly
    requestAnimationFrame(renderCircle);
  };

  // Hover triggers for interactive items
  const addHoverListeners = () => {
    const interactives = document.querySelectorAll('a, button, input, textarea, select, .project-card, .pillar-card, .service-card, .theme-toggle');
    interactives.forEach(item => {
      item.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      item.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  };

  addHoverListeners();
}

// --------------------------------------------------------------------------
// 06. Live Time Indicator (GMT+6)
// --------------------------------------------------------------------------
function initLiveClock() {
  const clockEl = document.getElementById('local-time-clock');
  if (!clockEl) return;

  const updateClock = () => {
    try {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const targetDate = new Date(utc + (3600000 * 6));
      
      let hours = targetDate.getHours();
      const minutes = String(targetDate.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;

      clockEl.textContent = `${hours}:${minutes} ${ampm} (GMT+6)`;
    } catch (e) {
      clockEl.textContent = 'GMT+6 Zone';
    }
  };

  updateClock();
  setInterval(updateClock, 30000);
}

// --------------------------------------------------------------------------
// 07. Back to Top Smooth Handler
// --------------------------------------------------------------------------
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
