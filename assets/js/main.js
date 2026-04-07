/* ========================================
   Timewaver8 - メインJS
   ======================================== */

/* --- スクロール時ヘッダー変化 --- */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });


/* --- スクロールフェードイン（Intersection Observer） --- */
const fadeEls = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));


/* --- トップへ戻るボタン --- */
const backToTop = document.getElementById('back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* --- ハンバーガーメニュー --- */
const hamburger = document.querySelector('.hamburger');
const nav = document.getElementById('site-nav');

if (hamburger && nav) {
  let scrollY = 0;

  const openNav = () => {
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    nav.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
  };

  const closeNav = () => {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo({ top: scrollY, behavior: 'instant' });
    nav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    nav.classList.contains('open') ? closeNav() : openNav();
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
}


/* --- トースト通知 --- */
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3000);
}


/* --- このページを要約ボタン --- */
const summaryBtn = document.getElementById('btn-page-summary');
const summaryMeta = document.querySelector('meta[name="page-summary"]');

if (summaryBtn && summaryMeta) {
  summaryBtn.style.display = 'inline-flex';

  summaryBtn.addEventListener('click', () => {
    const text = summaryMeta.getAttribute('content');
    navigator.clipboard.writeText(text).then(() => {
      showToast('コピーしました。ChatGPTに貼り付けて使ってください。');
    }).catch(() => {
      /* フォールバック：テキストエリアでコピー */
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      showToast('コピーしました。ChatGPTに貼り付けて使ってください。');
    });
  });
}
