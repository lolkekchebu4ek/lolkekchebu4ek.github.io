const DATA_PATH = 'assets/data/content.json';
const LANGUAGE_STORAGE_KEY = 'noir_lang';
const THEME_STORAGE_KEY = 'theme';

const UI_STRINGS = {
  ru: {
    nav: {
      about: 'Обо мне',
      portfolio: 'Портфолио',
      services: 'Услуги',
      contacts: 'Контакты',
      cta: 'Связаться',
    },
    hero: {
      primaryBtn: 'Посмотреть работы',
      secondaryBtn: 'Обо мне',
      meta: ['лет в визуальном дизайне', 'успешных проектов', 'на ответ'],
    },
    about: {
      eyebrow: 'Обо мне',
      stats: [
        'Логотипы, визуальные системы, концепции',
        'Сайты, лендинги, цифровые интерфейсы',
        'Креатив для кампаний, социальных сетей и визуалов',
      ],
    },
    portfolio: {
      eyebrow: 'Портфолио',
      title: 'Недавние проекты',
      cta: 'Запросить проект →',
    },
    services: {
      eyebrow: 'Услуги',
      title: 'Поддержка на каждом этапе визуального продвижения.',
    },
    contacts: {
      eyebrow: 'Контакты',
      title: 'Давайте создадим сильный визуальный образ для вашего проекта.',
    },
  },
  en: {
    nav: {
      about: 'About',
      portfolio: 'Portfolio',
      services: 'Services',
      contacts: 'Contacts',
      cta: 'Book a call',
    },
    hero: {
      primaryBtn: 'View work',
      secondaryBtn: 'About me',
      meta: ['years in visual design', 'successful projects', 'response time'],
    },
    about: {
      eyebrow: 'About',
      stats: [
        'Logotypes, visual systems, concepts',
        'Websites, landing pages, digital interfaces',
        'Creative concepts for campaigns, social content and visuals',
      ],
    },
    portfolio: {
      eyebrow: 'Portfolio',
      title: 'Recent projects',
      cta: 'Request a project →',
    },
    services: {
      eyebrow: 'Services',
      title: 'Support at every stage of visual growth.',
    },
    contacts: {
      eyebrow: 'Contacts',
      title: 'Let’s create a strong visual identity for your project.',
    },
  },
};

const getPreferredLocale = () => {
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (saved === 'ru' || saved === 'en') return saved;

  const browserLang = (navigator.language || 'en-US').toLowerCase();
  return browserLang.startsWith('ru') ? 'ru' : 'en';
};

const setTheme = (theme, userInitiated = false) => {
  document.documentElement.setAttribute('data-theme', theme);
  if (userInitiated) localStorage.setItem(THEME_STORAGE_KEY, theme);

  const button = document.querySelector('.theme-toggle');
  if (button) {
    button.textContent = theme === 'light' ? '☾' : '☼';
    button.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  }
};

const initTheme = () => {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  setTheme(theme, !!saved);

  const button = document.querySelector('.theme-toggle');
  if (button) {
    button.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      setTheme(next, true);
    }, { passive: true });
  }

  // react to system preference changes only if user hasn't chosen
  if (!saved) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', (e) => setTheme(e.matches ? 'dark' : 'light'));
  }
};

const getLocaleContent = (data, locale) => {
  const localeChunk = data?.[locale] || {};
  const fallback = data?.site ? data : {};

  return {
    site: { ...(fallback.site || {}), ...(localeChunk.site || {}) },
    hero: { ...(fallback.hero || {}), ...(localeChunk.hero || {}) },
    about: { ...(fallback.about || {}), ...(localeChunk.about || {}) },
    portfolio: Array.isArray(localeChunk.portfolio) ? localeChunk.portfolio : (fallback.portfolio || []),
    services: Array.isArray(localeChunk.services) ? localeChunk.services : (fallback.services || []),
    contacts: { ...(fallback.contacts || {}), ...(localeChunk.contacts || {}) },
  };
};

const applyLanguageLabels = (locale) => {
  const strings = UI_STRINGS[locale] || UI_STRINGS.ru;
  document.documentElement.lang = locale;

  const textKeys = [
    ['nav.about', strings.nav.about],
    ['nav.portfolio', strings.nav.portfolio],
    ['nav.services', strings.nav.services],
    ['nav.contacts', strings.nav.contacts],
    ['nav.cta', strings.nav.cta],
    ['hero.primaryBtn', strings.hero.primaryBtn],
    ['hero.secondaryBtn', strings.hero.secondaryBtn],
    ['about.eyebrow', strings.about.eyebrow],
    ['portfolio.eyebrow', strings.portfolio.eyebrow],
    ['portfolio.title', strings.portfolio.title],
    ['portfolio.cta', strings.portfolio.cta],
    ['services.eyebrow', strings.services.eyebrow],
    ['services.title', strings.services.title],
    ['contacts.eyebrow', strings.contacts.eyebrow],
    ['contacts.title', strings.contacts.title],
  ];

  textKeys.forEach(([key, value]) => {
    const el = document.querySelector(`[data-i18n="${key}"]`);
    if (el) el.textContent = value;
  });

  const metaEls = document.querySelectorAll('[data-i18n^="hero.meta."]');
  metaEls.forEach((el, index) => {
    if (strings.hero.meta[index]) {
      el.textContent = strings.hero.meta[index];
    }
  });

  const aboutStats = document.querySelectorAll('[data-i18n^="about.stats."]');
  aboutStats.forEach((el, index) => {
    if (strings.about.stats[index]) {
      el.textContent = strings.about.stats[index];
    }
  });

  document.querySelectorAll('.lang-option').forEach((button) => {
    const isActive = button.dataset.lang === locale;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
};

const renderPortfolio = (items) => {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  // build HTML string then assign once to avoid reflows
  const html = items.map((item) => `
    <article class="project-card reveal">
      <img src="${item.image}" alt="${item.title}" loading="lazy" />
      <div class="project-info">
        <span>${item.tag}</span>
        <h3>${item.title}</h3>
      </div>
    </article>
  `).join('');

  grid.innerHTML = html;
};

const renderServices = (items) => {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  const html = items.map((item, index) => `
    <div class="service-card reveal">
      <span class="service-index">${String(index + 1).padStart(2, '0')}</span>
      <h3>${item.title}</h3>
      <p>${item.body}</p>
    </div>
  `).join('');

  grid.innerHTML = html;
};

const populateContent = (rawData, locale = getPreferredLocale()) => {
  const data = getLocaleContent(rawData, locale);
  const brandEl = document.querySelector('[data-brand]');
  if (brandEl) brandEl.textContent = data.site.brand || 'NOIR STUDIO';

  const heroEyebrow = document.getElementById('hero-eyebrow');
  const heroTitle = document.getElementById('hero-title');
  const heroLead = document.getElementById('hero-lead');
  const heroImage = document.getElementById('hero-image');
  const aboutTitle = document.getElementById('about-title');
  const aboutText = document.getElementById('about-text');
  const emailLink = document.getElementById('contact-email');

  if (heroEyebrow) heroEyebrow.textContent = data.hero.eyebrow;
  if (heroTitle) heroTitle.innerHTML = data.hero.title;
  if (heroLead) heroLead.textContent = data.hero.lead;
  if (heroImage) {
    // ensure hero image isn't blocking first paint too much
    heroImage.src = data.hero.image;
  }
  if (aboutTitle) aboutTitle.textContent = data.about.title;
  if (aboutText) aboutText.textContent = data.about.text;
  if (emailLink) {
    emailLink.href = `mailto:${data.contacts.email}`;
    emailLink.textContent = data.contacts.email;
  }

  renderPortfolio(data.portfolio);
  renderServices(data.services);
  applyLanguageLabels(locale);
  refreshReveal();
  optimizeContactsBlock();
};

const refreshReveal = () => {
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (!reveals.length) return;

  const footer = document.getElementById('contacts');
  const observeTargets = reveals.filter((el) => !footer || !footer.contains(el));
  if (!observeTargets.length) {
    const footerVisible = document.getElementById('contacts');
    if (footerVisible) footerVisible.classList.add('visible');
    return;
  }

  const revealOptions = { threshold: 0.15, rootMargin: '0px 0px -8% 0px' };
  const observer = new IntersectionObserver((entries) => {
    const queue = [];
    entries.forEach((entry) => {
      if (entry.isIntersecting) queue.push(entry.target);
    });

    if (!queue.length) return;

    requestAnimationFrame(() => {
      queue.forEach((target) => {
        target.classList.add('visible');
        try { observer.unobserve(target); } catch (error) {}
      });
    });
  }, revealOptions);

  observeTargets.forEach((el) => observer.observe(el));

  const footerEl = document.getElementById('contacts');
  if (footerEl) {
    footerEl.classList.add('reveal');
    setTimeout(() => footerEl.classList.add('visible'), 220);
  }
};

const optimizeContactsBlock = () => {
  const contacts = document.getElementById('contacts');
  if (!contacts) return;

  if (window.matchMedia && window.matchMedia('(max-width: 720px)').matches) {
    contacts.style.backdropFilter = 'none';
    contacts.style.boxShadow = 'none';
  }

  const socials = contacts.querySelectorAll('.socials a');
  if (!socials.length) return;

  const activateSocials = () => {
    socials.forEach((link) => {
      link.setAttribute('role', 'link');
      link.addEventListener('click', (event) => {
        if (link.getAttribute('href') === '#') event.preventDefault();
      }, { passive: true });
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(activateSocials, { timeout: 2000 });
  } else {
    setTimeout(activateSocials, 1200);
  }
};

const initLanguageSwitcher = () => {
  const locale = getPreferredLocale();
  localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);

  document.querySelectorAll('.lang-option').forEach((button) => {
    button.addEventListener('click', () => {
      const nextLocale = button.dataset.lang;
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLocale);
      applyLanguageLabels(nextLocale);
      currentLocale = nextLocale;

      if (window.__NOIR_DATA__) {
        populateContent(window.__NOIR_DATA__, nextLocale);
      }
    }, { passive: true });
  });

  applyLanguageLabels(locale);
  return locale;
};

let currentLocale = 'ru';

// Header performance: reduce reflow on scroll
let lastScroll = 0;
let ticking = false;
const header = null;
const onScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY || window.pageYOffset;
    const hdr = document.querySelector('.site-header');
    if (!hdr) { ticking = false; return; }
    if (y > 24) hdr.classList.add('header--scrolled'); else hdr.classList.remove('header--scrolled');
    ticking = false;
  });
};

const initHeader = () => {
  window.addEventListener('scroll', onScroll, { passive: true });
  // ensure initial state
  onScroll();
};

const init = async () => {
  initTheme();
  currentLocale = initLanguageSwitcher();
  initHeader();

  try {
    const res = await fetch(DATA_PATH + '?v=' + Date.now(), { cache: 'no-store' });
    const data = await res.json();
    window.__NOIR_DATA__ = data;
    populateContent(data, currentLocale);
  } catch (error) {
    console.error('Content load error:', error);
  }
};

document.addEventListener('DOMContentLoaded', init);
