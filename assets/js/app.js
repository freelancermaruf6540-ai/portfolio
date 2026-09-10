/**
 * Main Application Logic
 * Theme Management (Dark & Light), Project Filtering, Case Study Modal,
 * Accessible Mobile Drawer, and Production-Ready Contact Form.
 */

// Production Configuration Placeholder
const CONTACT_FORM_CONFIG = {
  // To connect a backend, enter your endpoint URL below (e.g., Formspree: "https://formspree.io/f/YOUR_FORM_ID")
  endpoint: "",
  recipientEmail: "freelancermaruf6540@gmail.com"
};

document.addEventListener('DOMContentLoaded', () => {
  initThemeManager();
  initProjectFiltering();
  initCaseStudyModal();
  initContactForm();
  initMobileDrawer();
});

// --------------------------------------------------------------------------
// 01. Theme Engine (Dark & Custom Light Mode)
// --------------------------------------------------------------------------
function initThemeManager() {
  const THEME_STORAGE_KEY = 'maruf-theme';
  const toggleButtons = document.querySelectorAll('.theme-toggle');

  const getSavedTheme = () => localStorage.getItem(THEME_STORAGE_KEY);

  const getSystemTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  };

  const applyTheme = (theme, save = true) => {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch (e) {
        console.warn('localStorage access denied for theme preference');
      }
    }

    // Update ARIA labels and states on toggle buttons
    const isLight = theme === 'light';
    toggleButtons.forEach(btn => {
      btn.setAttribute('aria-label', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
      btn.setAttribute('title', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
    });

    // Refresh lucide icons if needed
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  };

  // Initial determination
  const initialTheme = getSavedTheme() || getSystemTheme();
  applyTheme(initialTheme, false);

  // Toggle handler
  const handleToggle = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  };

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', handleToggle);
  });

  // Listen for system changes if no manual preference has been set
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!getSavedTheme()) {
        applyTheme(e.matches ? 'light' : 'dark', false);
      }
    });
  }
}

// --------------------------------------------------------------------------
// 02. Project Filtering Engine
// --------------------------------------------------------------------------
function initProjectFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            if (card.style.opacity === '0') {
              card.style.display = 'none';
            }
          }, 200);
        }
      });
    });
  });
}

// --------------------------------------------------------------------------
// 03. Interactive Case Study Modal (Accessible & Focus-Trapped)
// --------------------------------------------------------------------------
function initCaseStudyModal() {
  const modalBackdrop = document.getElementById('case-study-modal');
  if (!modalBackdrop) return;

  const modalContainer = modalBackdrop.querySelector('.modal-container');
  const modalBody = modalBackdrop.querySelector('.modal-body');
  const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
  let lastFocusedElement = null;

  const getFocusableElements = () => {
    return modalBackdrop.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
  };

  const openModal = (projectId, triggerElement) => {
    lastFocusedElement = triggerElement || document.activeElement;

    const data = typeof PROJECTS_DATA !== 'undefined' 
      ? PROJECTS_DATA.find(p => p.id === projectId) 
      : null;

    if (!data) return;

    modalBody.innerHTML = `
      <div class="modal-header-tag">${data.categoryLabel} · ${data.year}</div>
      <h2 class="modal-title">${data.title}</h2>
      <p class="modal-subtitle">${data.subtitle}</p>

      <div class="modal-image-wrap">
        <img src="${data.image}" alt="${data.title}" />
      </div>

      <!-- Strategic Results & Delivery Metrics -->
      <div class="modal-metrics-bar">
        ${data.results.map(res => `
          <div class="modal-metric-item">
            <div class="modal-metric-val">${res.metric}</div>
            <div class="modal-metric-lbl">${res.label}</div>
          </div>
        `).join('')}
      </div>

      <!-- 3-Pillar Deep Breakdown -->
      <div class="modal-grid-pillars">
        <div class="modal-pillar-box">
          <div class="modal-pillar-title">01 The Challenge</div>
          <p class="modal-pillar-text">${data.challenge}</p>
        </div>
        <div class="modal-pillar-box">
          <div class="modal-pillar-title">02 The Approach</div>
          <p class="modal-pillar-text">${data.approach}</p>
        </div>
        <div class="modal-pillar-box">
          <div class="modal-pillar-title">03 The Solution</div>
          <p class="modal-pillar-text">${data.solution}</p>
        </div>
      </div>

      <!-- Client / Sector Endorsement -->
      ${data.testimonial ? `
        <div class="modal-quote-card">
          <div class="modal-quote-text">"${data.testimonial.quote}"</div>
          <div class="modal-quote-author">${data.testimonial.author}</div>
          <div class="modal-quote-role">${data.testimonial.position} · ${data.testimonial.company}</div>
        </div>
      ` : ''}

      <!-- Tech Stack & Tools -->
      <div style="margin-top: 2rem;">
        <div style="font-family: var(--font-primary); font-size: 0.75rem; color: var(--gold-light); text-transform: uppercase; margin-bottom: 0.75rem; letter-spacing: 0.1em; font-weight: 700;">Technologies &amp; Methodologies Deployed</div>
        <div class="capability-tags">
          ${data.tools.map(tool => `<span class="capability-tag">${tool}</span>`).join('')}
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 50);
    }
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  };

  // Open triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-case-study]');
    if (trigger) {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-open-case-study');
      openModal(projectId, trigger);
    }
  });

  // Close triggers
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Keyboard navigation & Focus Trap
  window.addEventListener('keydown', (e) => {
    if (!modalBackdrop.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = getFocusableElements();
      if (!focusables.length) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  });
}

// --------------------------------------------------------------------------
// 04. Contact Form (Truthful, Accessible, Production-Ready)
// --------------------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const feedbackEl = document.getElementById('contact-feedback');

  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');

  const nameError = document.getElementById('form-name-error');
  const emailError = document.getElementById('form-email-error');
  const messageError = document.getElementById('form-message-error');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const clearErrors = () => {
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.classList.remove('has-error');
        input.removeAttribute('aria-invalid');
      }
    });
    [nameError, emailError, messageError].forEach(err => {
      if (err) {
        err.classList.remove('visible');
        err.textContent = '';
      }
    });
  };

  const showError = (input, errorEl, message) => {
    if (input) {
      input.classList.add('has-error');
      input.setAttribute('aria-invalid', 'true');
    }
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const nameVal = nameInput ? nameInput.value.trim() : '';
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const messageVal = messageInput ? messageInput.value.trim() : '';

    let hasError = false;

    if (!nameVal || nameVal.length < 2) {
      showError(nameInput, nameError, 'Please enter your name or organization (minimum 2 characters).');
      hasError = true;
    }

    if (!emailVal || !emailRegex.test(emailVal)) {
      showError(emailInput, emailError, 'Please provide a valid email address.');
      hasError = true;
    }

    if (!messageVal || messageVal.length < 10) {
      showError(messageInput, messageError, 'Please provide a brief project overview (minimum 10 characters).');
      hasError = true;
    }

    if (hasError) {
      const firstInvalid = form.querySelector('.has-error');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Collect selected disciplines
    const selectedDisciplines = Array.from(
      form.querySelectorAll('input[name="discipline"]:checked')
    ).map(cb => cb.nextElementSibling ? cb.nextElementSibling.textContent.trim() : cb.value);

    // Submission button loading state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Preparing inquiry...</span>`;

    // Case A: Real backend endpoint is configured
    if (CONTACT_FORM_CONFIG.endpoint && CONTACT_FORM_CONFIG.endpoint.trim() !== '') {
      try {
        const response = await fetch(CONTACT_FORM_CONFIG.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: nameVal,
            email: emailVal,
            disciplines: selectedDisciplines.join(', '),
            message: messageVal
          })
        });

        if (response.ok) {
          form.reset();
          feedbackEl.className = 'form-feedback success';
          feedbackEl.innerHTML = `
            <strong>Inquiry Transmitted Successfully.</strong><br>
            Thank you, ${nameVal}. Your message has been received by Maruf. You can expect a direct response within 24 hours.
          `;
        } else {
          throw new Error('Server returned an error status.');
        }
      } catch (err) {
        feedbackEl.className = 'form-feedback error';
        feedbackEl.innerHTML = `
          <strong>Transmission Error:</strong> We could not connect to the form service. 
          Please send your project brief directly to <a href="mailto:${CONTACT_FORM_CONFIG.recipientEmail}" style="text-decoration: underline; color: inherit;">${CONTACT_FORM_CONFIG.recipientEmail}</a>.
        `;
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
      }
    } 
    // Case B: Endpoint not configured — use transparent mailto fallback (no fake success!)
    else {
      const subject = encodeURIComponent(`Project Inquiry from ${nameVal}`);
      const disciplinesText = selectedDisciplines.length ? selectedDisciplines.join(', ') : 'Not specified';
      const body = encodeURIComponent(
        `Name / Organization: ${nameVal}\n` +
        `Email: ${emailVal}\n` +
        `Required Disciplines: ${disciplinesText}\n\n` +
        `Project Overview:\n${messageVal}\n`
      );

      const mailtoUrl = `mailto:${CONTACT_FORM_CONFIG.recipientEmail}?subject=${subject}&body=${body}`;

      feedbackEl.className = 'form-feedback info';
      feedbackEl.innerHTML = `
        <strong>Opening Your Email Client:</strong><br>
        Directing your message to <strong>${CONTACT_FORM_CONFIG.recipientEmail}</strong>. 
        If your email client does not open automatically, <a href="${mailtoUrl}" style="text-decoration: underline; font-weight: 700; color: inherit;">click here to send directly</a>.
      `;

      // Trigger mail client
      window.location.href = mailtoUrl;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
      }, 1000);
    }
  });
}

// --------------------------------------------------------------------------
// 05. Mobile Drawer Navigation (Accessible ARIA & ESC Key)
// --------------------------------------------------------------------------
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  const setDrawerState = (isOpen) => {
    drawer.classList.toggle('open', isOpen);
    toggleBtn.classList.toggle('active', isOpen);
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    drawer.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen) {
      const firstLink = drawer.querySelector('.mobile-nav-link');
      if (firstLink) setTimeout(() => firstLink.focus(), 80);
    } else {
      toggleBtn.focus();
    }
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    setDrawerState(!isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        setDrawerState(false);
      }
    });
  });

  // Close on ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      setDrawerState(false);
    }
  });
}
