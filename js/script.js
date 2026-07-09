/* ============================================
   ALI REZAEI WEBSITE - PROFESSIONAL JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initArchiveFilter();
  initAccordion();
  initForms();
  initJournalToggles();
  initBackToTop();
  initEasterEgg();
  initLazyLoad();
});

function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const toggleHeader = () => {
    header.classList.toggle('scrolled', window.pageYOffset > 20);
  };

  toggleHeader();
  window.addEventListener('scroll', toggleHeader, { passive: true });
}

function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });

  nav.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
    });
  });
}

function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
  });

  revealElements.forEach(element => observer.observe(element));
}

function initArchiveFilter() {
  const tabs = document.querySelectorAll('.archive-tab');
  const items = document.querySelectorAll('.archive-item');

  if (tabs.length === 0 || items.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      items.forEach(item => {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.style.display = '';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (accordionItems.length === 0) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      accordionItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

function initForms() {
  const newsletterForm = document.getElementById('newsletterForm');
  const contactForm = document.getElementById('contactForm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const button = newsletterForm.querySelector('button');
      const originalText = button ? button.textContent : 'ارسال';
      const formData = new FormData(newsletterForm);
      const email = formData.get('email');

      if (!email) {
        showMessage('لطفاً ایمیل خود را وارد کنید.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showMessage('لطفاً یک ایمیل معتبر وارد کنید.', 'error');
        return;
      }

      if (button) {
        button.textContent = 'در حال ثبت...';
        button.disabled = true;
      }

      try {
        const response = await fetch(newsletterForm.action || '/', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' },
        });

        if (response.ok) {
          showMessage('ایمیل شما در حلقه‌ی درونی ثبت شد.', 'success');
          newsletterForm.reset();
        } else {
          showMessage('ثبت نام با مشکل مواجه شد. لطفاً دوباره تلاش کنید.', 'error');
        }
      } catch (err) {
        showMessage('خطا در ارتباط با سرور.', 'error');
      } finally {
        if (button) {
          button.textContent = originalText;
          button.disabled = false;
        }
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const button = contactForm.querySelector('button');
      const originalText = button ? button.textContent : 'ارسال';
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      if (!name || !email || !message) {
        showMessage('لطفاً تمام فیلدها را پر کنید.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showMessage('لطفاً یک ایمیل معتبر وارد کنید.', 'error');
        return;
      }

      if (button) {
        button.textContent = 'در حال ارسال...';
        button.disabled = true;
      }

      try {
        const response = await fetch(contactForm.action || '/', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' },
        });

        if (response.ok) {
          showMessage('پیام شما دریافت شد. به‌زودی پاسخ خواهید گرفت.', 'success');
          contactForm.reset();
        } else {
          showMessage('خطا در ارسال. لطفاً دوباره تلاش کنید.', 'error');
        }
      } catch (err) {
        showMessage('خطا در ارتباط با سرور.', 'error');
      } finally {
        if (button) {
          button.textContent = originalText;
          button.disabled = false;
        }
      }
    });
  }
}

function initJournalToggles() {
  const toggles = document.querySelectorAll('.journal-toggle');
  if (toggles.length === 0) return;

  toggles.forEach(toggle => {
    const targetId = toggle.getAttribute('aria-controls');
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;

    toggle.addEventListener('click', () => {
      const journalItem = toggle.closest('.journal-item');
      const isExpanded = journalItem ? !journalItem.classList.contains('expanded') : false;

      if (!journalItem) return;

      journalItem.classList.toggle('expanded', isExpanded);
      toggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      target.setAttribute('aria-hidden', isExpanded ? 'false' : 'true');
      target.style.maxHeight = isExpanded ? `${target.scrollHeight}px` : '0px';
      toggle.textContent = isExpanded ? 'بستن مطلب' : 'ادامه مطلب';
    });
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showMessage(text, type = 'info') {
  const existing = document.querySelector('.toast-message');
  if (existing) existing.remove();

  const message = document.createElement('div');
  message.className = `toast-message toast-${type}`;
  message.textContent = text;
  message.style.cssText = `
    position: fixed;
    top: 100px;
    right: 50%;
    transform: translateX(50%);
    padding: 1rem 2rem;
    background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    border-radius: 4px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideDown 0.3s ease;
    font-family: 'Vazirmatn', sans-serif;
  `;

  document.body.appendChild(message);
  setTimeout(() => {
    message.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => message.remove(), 300);
  }, 4000);
}

function initBackToTop() {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'back-to-top';
  button.setAttribute('aria-label', 'بازگشت به بالا');
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 50px;
    height: 50px;
    background: var(--bronze);
    color: var(--parchment);
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(139,111,71,0.3);
    z-index: 99;
  `;

  document.body.appendChild(button);

  const updateVisibility = () => {
    const visible = window.pageYOffset > 300;
    button.style.opacity = visible ? '1' : '0';
    button.style.visibility = visible ? 'visible' : 'hidden';
  };

  window.addEventListener('scroll', updateVisibility, { passive: true });
  updateVisibility();

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  button.addEventListener('mouseenter', () => {
    button.style.background = 'var(--gold-dust)';
    button.style.transform = 'translateY(-3px)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.background = 'var(--bronze)';
    button.style.transform = 'translateY(0)';
  });
}

function initEasterEgg() {
  const symbol = document.createElement('button');
  symbol.className = 'hidden-symbol';
  symbol.setAttribute('aria-label', 'نماد پنهان');
  symbol.innerHTML = `
    <svg viewBox="0 0 40 40" style="width: 100%; height: 100%; color: var(--bronze);">
      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" stroke-width="0.5"/>
      <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" stroke-width="0.5"/>
      <path d="M20 2 L20 38 M2 20 L38 20" stroke="currentColor" stroke-width="0.3"/>
      <text x="20" y="24" text-anchor="middle" font-size="8" fill="currentColor" font-family="serif" font-style="italic">ع</text>
    </svg>
  `;
  symbol.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    width: 40px;
    height: 40px;
    opacity: 0.08;
    cursor: pointer;
    transition: opacity 0.7s;
    z-index: 50;
    background: none;
    border: none;
    padding: 0;
  `;

  document.body.appendChild(symbol);
  let clicks = 0;

  symbol.addEventListener('click', () => {
    clicks += 1;
    if (clicks >= 3) {
      showManuscript();
      clicks = 0;
    }
  });

  symbol.addEventListener('mouseenter', () => {
    symbol.style.opacity = '0.4';
  });

  symbol.addEventListener('mouseleave', () => {
    symbol.style.opacity = '0.08';
  });
}

function showManuscript() {
  const modal = document.createElement('div');
  modal.className = 'manuscript-modal';
  modal.style.cssText = `
    display: flex;
    position: fixed;
    inset: 0;
    background: rgba(15,13,10,0.85);
    backdrop-filter: blur(8px);
    z-index: 200;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    animation: fadeIn 0.5s;
  `;

  modal.innerHTML = `
    <div style="
      max-width: 600px;
      width: 100%;
      background: var(--parchment);
      border: 1px solid rgba(139,111,71,0.4);
      padding: 4rem 3rem;
      position: relative;
      box-shadow: 0 30px 80px rgba(0,0,0,0.5);
      animation: slideUp 0.6s ease-out;
    ">
      <div style="
        position: absolute;
        top: -1.5rem;
        right: 50%;
        transform: translateX(50%);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, var(--gold-dust), var(--bronze));
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--parchment);
        font-size: 1.8rem;
        font-weight: 700;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      ">ع</div>
      <div style="
        font-size: 0.65rem;
        letter-spacing: 0.3em;
        color: var(--bronze);
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 1rem;
      ">دست‌نوشته‌ی گشوده‌شده · قطعه‌ی شماره‌ی ۰۱</div>
      <h3 style="
        font-size: 1.8rem;
        color: var(--stone);
        text-align: center;
        margin-bottom: 2rem;
        font-weight: 500;
      ">مُهر کاتب خاموش</h3>
      <p style="
        font-size: 1.15rem;
        color: rgba(42, 36, 25, 0.85);
        line-height: 1.9;
        text-align: justify;
        font-style: italic;
        margin-bottom: 2rem;
      ">
        «آن‌که این واژه‌ها را می‌خواند، سفر را آغاز کرده است. سکوت، خالی نیست — در انتظار است.
        در حاشیه‌ی نسخه‌ای از سال ۱۲۴۷، کسی این جمله را نوشته بود — با جوهری که از خون و زعفران ساخته شده بود.
        کسی که آن را خواند، دیگر همان نبود.
        و کسی که آن را نوشت، هرگز بازنگشت.»
      </p>
      <p style="
        font-size: 0.75rem;
        letter-spacing: 0.2em;
        color: var(--bronze);
        text-align: center;
        margin-bottom: 2rem;
      ">— بازیافته از حاشیه‌ی نسخه‌ی ۱۲۴۷ · تبریز</p>
      <button class="manuscript-close" style="
        width: 100%;
        padding: 0.8rem;
        background: transparent;
        border: 1px solid var(--bronze);
        color: var(--stone);
        font-family: inherit;
        font-size: 0.75rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.3s;
      ">مهر و موم کردن سند</button>
    </div>
  `;

  document.body.appendChild(modal);

  const closeModal = () => {
    modal.style.animation = 'fadeOut 0.3s';
    setTimeout(() => modal.remove(), 300);
    document.removeEventListener('keydown', escHandler);
  };

  modal.querySelector('.manuscript-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  const escHandler = (e) => {
    if (e.key === 'Escape') closeModal();
  };
  document.addEventListener('keydown', escHandler);
}

function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');
  if (images.length === 0) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translate(50%, -20px); }
    to { opacity: 1; transform: translate(50%, 0); }
  }
`;
document.head.appendChild(style);
