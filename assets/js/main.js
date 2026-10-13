const DATA_PATH = 'assets/data/content.json';
const LANGUAGE_STORAGE_KEY = 'noir_lang';
const THEME_STORAGE_KEY = 'theme';

// -- Theme ---------------------------------------------------------------
const setTheme = (theme, userInitiated = false) => {
  document.documentElement.setAttribute('data-theme', theme);
  if (userInitiated) localStorage.setItem(THEME_STORAGE_KEY, theme);
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = theme === 'light' ? '☾' : '☼';
};

const initTheme = () => {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  setTheme(theme, !!saved);

  const button = document.querySelector('.theme-toggle');
  if (button) {
    button.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(next, true);
    }, { passive: true });
  }

  if (!saved) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', (e) => setTheme(e.matches ? 'dark' : 'light'));
  }
};

// -- i18n helpers -------------------------------------------------------
const getPreferredLocale = () => {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved === 'ru' || saved === 'en') return saved;
  const browser = (navigator.language || 'en-US').toLowerCase();
  return browser.startsWith('ru') ? 'ru' : 'en';
};

const applyLanguageLabels = (locale) => {
  document.documentElement.lang = locale;
  // toggle active buttons
  document.querySelectorAll('.lang-option').forEach((btn) => {
    const isActive = btn.dataset.lang === locale;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });

  // update any static data-i18n keys that come from UI_STRINGS if present
  // (content from content.json will be applied separately in populateContent)
};

const getLocaleContent = (rawData, locale) => {
  if (!rawData) return {};
  const site = rawData.site || {};
  const localeChunk = rawData[locale] || {};
  return {
    site: { ...(site || {}), ...(localeChunk.site || {}) },
    hero: { ...(site.hero || {}), ...(localeChunk.hero || {}) , ...(rawData.hero || {}) },
    about: { ...(site.about || {}), ...(localeChunk.about || {}) , ...(rawData.about || {}) },
    portfolio: Array.isArray(localeChunk.portfolio) ? localeChunk.portfolio : (rawData.portfolio || []),
    services: Array.isArray(localeChunk.services) ? localeChunk.services : (rawData.services || []),
    contacts: { ...(site.contacts || {}), ...(localeChunk.contacts || {}) , ...(rawData.contacts || {}) }
  };
};

// -- Renderers ----------------------------------------------------------
const renderPortfolio = (items) => {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;
  grid.innerHTML = items.map((item) => `
    <article class="project-card reveal">
      <img src="${item.image}" alt="${item.title}" loading="lazy" />
      <div class="project-info">
        <span>${item.tag}</span>
        <h3>${item.title}</h3>
      </div>
    </article>
  `).join('');
};

const renderServices = (items) => {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  grid.innerHTML = items.map((item, index) => `
    <div class="service-card reveal">
      <span class="service-index">${String(index + 1).padStart(2, '0')}</span>
      <h3>${item.title}</h3>
      <p>${item.body}</p>
    </div>
  `).join('');
};

// -- Reveal / contacts (unchanged) -------------------------------------
const observeReveal = () => {
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (!reveals.length) return;
  const footer = document.getElementById('contacts');
  const revealsToObserve = reveals.filter((el) => !footer || !footer.contains(el));
  const options = { threshold: 0.15, rootMargin: '0px 0px -8% 0px' };
  const onIntersect = (entries, observer) => {
    const toShow = [];
    entries.forEach((entry) => { if (entry.isIntersecting) toShow.push(entry.target); });
    if (!toShow.length) return;
    requestAnimationFrame(() => { toShow.forEach((t) => { t.classList.add('visible'); try { observer.unobserve(t); } catch (e) {} }); });
  };
  const startObserving = () => {
    const observer = new IntersectionObserver(onIntersect, options);
    revealsToObserve.forEach((el) => observer.observe(el));
  };
  if ('requestIdleCallback' in window) requestIdleCallback(startObserving, { timeout: 1500 }); else setTimeout(startObserving, 600);
};

const optimizeContactsBlock = () => {
  const contacts = document.getElementById('contacts');
  if (!contacts) return;
  if (window.matchMedia && window.matchMedia('(max-width: 720px)').matches) {
    contacts.style.backdropFilter = 'none';
    contacts.style.boxShadow = 'none';
  }
  contacts.classList.add('reveal');
  setTimeout(() => contacts.classList.add('visible'), 220);
  const socials = contacts.querySelectorAll('.socials a');
  if (!socials.length) return;
  const activateSocials = () => { socials.forEach((a) => { a.setAttribute('role','link'); a.addEventListener('click', (e) => { if (a.getAttribute('href') === '#') e.preventDefault(); }); }); };
  if ('requestIdleCallback' in window) requestIdleCallback(activateSocials, { timeout: 2000 }); else setTimeout(activateSocials, 1200);
};

// -- Populate content by locale ----------------------------------------
const populateContent = (rawData, locale = getPreferredLocale()) => {
  const data = getLocaleContent(rawData, locale);
  const brand = document.querySelector('[data-brand]'); if (brand) brand.textContent = data.site.brand || 'NOIR STUDIO';
  const heroEyebrow = document.getElementById('hero-eyebrow');
  const heroTitle = document.getElementById('hero-title');
  const heroLead = document.getElementById('hero-lead');
  const heroImage = document.getElementById('hero-image');
  const aboutTitle = document.getElementById('about-title');
  const aboutText = document.getElementById('about-text');
  const emailLink = document.getElementById('contact-email');

  if (heroEyebrow) heroEyebrow.textContent = data.hero.eyebrow || '';
  if (heroTitle) heroTitle.innerHTML = data.hero.title || '';
  if (heroLead) heroLead.textContent = data.hero.lead || '';
  if (heroImage) {
    if ('requestIdleCallback' in window) requestIdleCallback(() => { heroImage.src = data.hero.image; }, { timeout: 800 }); else heroImage.src = data.hero.image;
  }
  if (aboutTitle) aboutTitle.textContent = data.about.title || '';
  if (aboutText) aboutText.textContent = data.about.text || '';
  if (emailLink && data.contacts) { emailLink.href = `mailto:${data.contacts.email}`; emailLink.textContent = data.contacts.email || emailLink.textContent; }

  renderPortfolio(data.portfolio || []);
  renderServices(data.services || []);
  applyLanguageLabels(locale);
  observeReveal();
  optimizeContactsBlock();
};

// -- Language switcher init --------------------------------------------
let currentLocale = getPreferredLocale();
const initLanguageSwitcher = () => {
  currentLocale = getPreferredLocale();
  // Don't overwrite user's explicit choice
  if (!localStorage.getItem(LANGUAGE_STORAGE_KEY)) localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLocale);

  document.querySelectorAll('.lang-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.dataset.lang;
      if (!next) return;
      localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
      currentLocale = next;
      applyLanguageLabels(next);
      if (window.__NOIR_DATA__) populateContent(window.__NOIR_DATA__, next);
    }, { passive: true });
  });
  applyLanguageLabels(currentLocale);
};

// -- Header scroll optimization ----------------------------------------
const onScroll = () => {
  const hdr = document.querySelector('.site-header');
  if (!hdr) return; hdr.classList.toggle('header--scrolled', window.scrollY > 16);
};
let scrollTick = false; window.addEventListener('scroll', () => { if (scrollTick) return; scrollTick = true; requestAnimationFrame(() => { onScroll(); scrollTick = false; }); }, { passive: true });

// -- Menu toggle -------------------------------------------------------
const initMenu = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navPanel = document.getElementById('nav-panel');
  if (!menuToggle || !navPanel) return;
  menuToggle.addEventListener('click', () => {
    const open = navPanel.classList.toggle('open');
    menuToggle.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  }, { passive: true });
};

// -- Init --------------------------------------------------------------
const init = async () => {
  initTheme();
  initLanguageSwitcher();
  initMenu();

  try {
    const res = await fetch(DATA_PATH + '?v=' + Date.now(), { cache: 'no-store' });
    const data = await res.json();
    window.__NOIR_DATA__ = data;
    populateContent(data, currentLocale);
  } catch (err) {
    console.error('Content load error:', err);
  }
};

document.addEventListener('DOMContentLoaded', init);
