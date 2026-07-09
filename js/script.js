/* ============================================
   ALI REZAEI WEBSITE - PROFESSIONAL JS
   ============================================ */

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initArchiveFilter();
  initAccordion();
  initForms();
  function initForms() {
    // Newsletter form (posts to configured action)
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
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

        button.textContent = 'در حال ثبت...';
        button.disabled = true;

        try {
          const response = await fetch(newsletterForm.action || '/', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
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
          button.textContent = originalText;
          button.disabled = false;
        }
      });
    }

    // Contact form (posts to Formspree)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const button = contactForm.querySelector('button');
        const originalText = button.textContent;

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

        button.textContent = 'در حال ارسال...';
        button.disabled = true;

        try {
          const response = await fetch(contactForm.action || '/', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
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
          button.textContent = originalText;
          button.disabled = false;
        }
      });
    }
  }
  const tabs = document.querySelectorAll('.archive-tab');
  const items = document.querySelectorAll('.archive-item');
  
  if (tabs.length === 0 || items.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const filter = tab.dataset.filter;
      
      // Filter items with animation
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

// ============ FORMS ============
function initForms() {
<<<<<<< HEAD
  // Newsletter form (posts to configured action)
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
=======
  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const button = newsletterForm.querySelector('button');
      const originalText = button.textContent;
      const email = newsletterForm.querySelector('input[type="email"]').value;
      
      // Validate email
      if (!isValidEmail(email)) {
        showMessage('لطفاً یک ایمیل معتبر وارد کنید.', 'error');
        return;
      }
      
      // Show loading state
      button.textContent = 'در حال ارسال...';
      button.disabled = true;
      
      try {
        // ارسال به Formspree
        const response = await fetch('https://formspree.io/f/xykqqbgp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            _subject: 'عضویت در خبرنامه'
          })
        });
        
        if (response.ok) {
          showMessage('با تشکر! شما به بایگانی خصوصی اضافه شدید.', 'success');
          newsletterForm.reset();
        } else {
          showMessage('خطا در ارسال. لطفاً دوباره تلاش کنید.', 'error');
        }
      } catch (error) {
        showMessage('خطا در ارتباط با سرور.', 'error');
      } finally {
        button.textContent = originalText;
        button.disabled = false;
      }
    });
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
>>>>>>> parent of 08fc5ed (اصلاح فرم تماس)
      e.preventDefault();

      const button = newsletterForm.querySelector('button');
      const originalText = button.textContent;
<<<<<<< HEAD
      const formData = new FormData(newsletterForm);
      const email = formData.get('email');

      if (!email) {
        showMessage('لطفاً ایمیل خود را وارد کنید.', 'error');
=======
      
      // Validate form
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const message = contactForm.querySelector('textarea').value;
      
      if (!name || !email || !message) {
        showMessage('لطفاً تمام فیلدها را پر کنید.', 'error');
>>>>>>> parent of 08fc5ed (اصلاح فرم تماس)
        return;
      }

      if (!isValidEmail(email)) {
        showMessage('لطفاً یک ایمیل معتبر وارد کنید.', 'error');
        return;
      }
<<<<<<< HEAD

      button.textContent = 'در حال ثبت...';
=======
      
      // Show loading state
      button.textContent = 'در حال ارسال...';
>>>>>>> parent of 08fc5ed (اصلاح فرم تماس)
      button.disabled = true;

      try {
<<<<<<< HEAD
        const response = await fetch(newsletterForm.action || '/', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
=======
        // ارسال به Formspree
        const response = await fetch('https://formspree.io/f/meebbrpv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: 'پیام جدید از سایت'
          })
>>>>>>> parent of 08fc5ed (اصلاح فرم تماس)
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
        button.textContent = originalText;
        button.disabled = false;
      }
    });
  }

  // Contact form (posts to Formspree)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const button = contactForm.querySelector('button');
      const originalText = button.textContent;

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

      button.textContent = 'در حال ارسال...';
      button.disabled = true;

      try {
        const response = await fetch(contactForm.action || '/', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
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
        button.textContent = originalText;
        button.disabled = false;
      }
    });
  }
}

// ============ EMAIL VALIDATION ============
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ============ SHOW MESSAGE ============
function showMessage(text, type = 'info') {
  // Remove existing message
  const existing = document.querySelector('.toast-message');
  if (existing) existing.remove();
  
  // Create message element
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
  
  // Remove after 4 seconds
  setTimeout(() => {
    message.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => message.remove(), 300);
  }, 4000);
}

// ============ BACK TO TOP BUTTON ============
function initBackToTop() {
  // Create button
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
  
  // Show/hide on scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      button.style.opacity = '1';
      button.style.visibility = 'visible';
    } else {
      button.style.opacity = '0';
      button.style.visibility = 'hidden';
    }
  }, { passive: true });
  
  // Scroll to top on click
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Hover effect
  button.addEventListener('mouseenter', () => {
    button.style.background = 'var(--gold-dust)';
    button.style.transform = 'translateY(-3px)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.background = 'var(--bronze)';
    button.style.transform = 'translateY(0)';
  });
}

// ============ EASTER EGG ============
function initEasterEgg() {
  // Create hidden symbol
  const symbol = document.createElement('button');
  symbol.className = 'hidden-symbol';
  symbol.setAttribute('aria-label', 'نماد پنهان');
  symbol.innerHTML = `
    <svg viewBox="0 0 40 40" style="width: 100%; height: 100%; color: var(--bronze);">
      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" stroke-width="0.5"/>
      <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" stroke-width="0.5"/>
      <path d="M20 2 L20 38 M2 20 L38 20" stroke="currentColor" stroke-width="0.3"/>
      <text x="20" y="24" text-anchor="middle" font-size="8" fill="currentColor"
            font-family="serif" font-style="italic">ع</text>
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
    clicks++;
    
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

// ============ MANUSCRIPT MODAL ============
function showManuscript() {
  // Create modal
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
  
  // Close on button click
  modal.querySelector('.manuscript-close').addEventListener('click', () => {
    modal.style.animation = 'fadeOut 0.3s';
    setTimeout(() => modal.remove(), 300);
  });
  
  // Close on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.animation = 'fadeOut 0.3s';
      setTimeout(() => modal.remove(), 300);
    }
  });
  
  // Close on ESC key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      modal.style.animation = 'fadeOut 0.3s';
      setTimeout(() => modal.remove(), 300);
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

// ============ LAZY LOADING ============
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

// ============ ANIMATIONS CSS ============
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
    from { 
      opacity: 0;
      transform: translateY(30px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideDown {
    from { 
      opacity: 0;
      transform: translate(50%, -20px);
    }
    to { 
      opacity: 1;
      transform: translate(50%, 0);
    }
  }
`;
document.head.appendChild(style);
// ============ ACCORDION ============
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (accordionItems.length === 0) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      accordionItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}