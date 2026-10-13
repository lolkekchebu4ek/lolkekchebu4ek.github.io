const DATA_PATH = 'assets/data/content.json';
const LANGUAGE_STORAGE_KEY = 'noir_lang';
const THEME_STORAGE_KEY = 'theme';

const getLocale = () => {
  const forcedLocale = window.__NOIR_LOCALE__;
  if (forcedLocale === 'ru' || forcedLocale === 'en') {
    return forcedLocale;
  }

  const savedLocale = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLocale === 'ru' || savedLocale === 'en') return savedLocale;

  const browserLang = (navigator.language || 'en').toLowerCase();
  return browserLang.startsWith('ru') ? 'ru' : 'en';
};

const setTheme = (theme, userInitiated = false) => {
  document.documentElement.setAttribute('data-theme', theme);
  if (userInitiated) localStorage.setItem(THEME_STORAGE_KEY, theme);
  const button = document.querySelector('.theme-toggle');
  if (button) button.textContent = theme === 'light' ? '☾' : '☼';
};

const initTheme = () => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(theme, !!savedTheme);

  const button = document.querySelector('.theme-toggle');
  if (button) {
    button.addEventListener('click', () => {
      const nextTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(nextTheme, true);
    }, { passive: true });
  }

  if (!savedTheme) {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    if (media.addEventListener) {
      media.addEventListener('change', (event) => setTheme(event.matches ? 'dark' : 'light'));
    }
  }
};

const getValueByPath = (obj, path) => {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
};

const applyLanguageLabels = (locale) => {
  document.documentElement.lang = locale;
  document.querySelectorAll('.lang-option').forEach((button) => {
    const active = button.dataset.lang === locale;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
};

const applyDataI18n = (data, locale) => {
  const langData = data?.[locale] || data || {};
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.dataset.i18n;
    const value = getValueByPath(langData, key);
    if (typeof value === 'string') {
      node.textContent = value;
    }
  });
};

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

const setLocaleContent = (data, locale) => {
  const langData = data?.[locale] || data || {};

  const brand = document.querySelector('[data-brand]');
  if (brand) brand.textContent = langData.site?.brand || 'NOIR STUDIO';

  const heroEyebrow = document.getElementById('hero-eyebrow');
  const heroTitle = document.getElementById('hero-title');
  const heroLead = document.getElementById('hero-lead');
  const heroImage = document.getElementById('hero-image');
  const aboutTitle = document.getElementById('about-title');
  const aboutText = document.getElementById('about-text');
  const emailLink = document.getElementById('contact-email');

  if (heroEyebrow) heroEyebrow.textContent = langData.hero?.eyebrow || '';
  if (heroTitle) heroTitle.innerHTML = langData.hero?.title || '';
  if (heroLead) heroLead.textContent = langData.hero?.lead || '';
  if (heroImage && langData.hero?.image) heroImage.src = langData.hero.image;
  if (aboutTitle) aboutTitle.textContent = langData.about?.title || '';
  if (aboutText) aboutText.textContent = langData.about?.text || '';
  if (emailLink && langData.contacts?.email) {
    emailLink.href = `mailto:${langData.contacts.email}`;
    emailLink.textContent = langData.contacts.email;
  }

  const portfolioItems = langData.portfolioItems || langData.portfolio || [];
  const servicesItems = langData.servicesItems || langData.services || [];
  renderPortfolio(portfolioItems);
  renderServices(servicesItems);

  applyDataI18n(data, locale);
  applyLanguageLabels(locale);
  observeReveal();
  optimizeContactsBlock();
};

const observeReveal = () => {
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (!reveals.length) return;

  const footer = document.getElementById('contacts');
  const revealsToObserve = reveals.filter((el) => !footer || !footer.contains(el));
  const options = { threshold: 0.15, rootMargin: '0px 0px -8% 0px' };

  const onIntersect = (entries, observer) => {
    const toShow = [];
    entries.forEach((entry) => {
      if (entry.isIntersecting) toShow.push(entry.target);
    });

    if (!toShow.length) return;
    requestAnimationFrame(() => {
      toShow.forEach((target) => {
        target.classList.add('visible');
        try { observer.unobserve(target); } catch (error) { /* ignore */ }
      });
    });
  };

  const startObserving = () => {
    const observer = new IntersectionObserver(onIntersect, options);
    revealsToObserve.forEach((el) => observer.observe(el));
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(startObserving, { timeout: 1500 });
  } else {
    setTimeout(startObserving, 600);
  }
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

  const activateSocials = () => {
    socials.forEach((a) => {
      a.setAttribute('role', 'link');
      a.addEventListener('click', (event) => {
        const href = a.getAttribute('href');
        if (href === '#') event.preventDefault();
      });
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(activateSocials, { timeout: 2000 });
  } else {
    setTimeout(activateSocials, 1200);
  }
};

const initLanguageSwitcher = () => {
  const defaultLocale = getLocale();
  if (!localStorage.getItem(LANGUAGE_STORAGE_KEY)) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, defaultLocale);
  }

  document.querySelectorAll('.lang-option').forEach((button) => {
    button.addEventListener('click', () => {
      const nextLocale = button.dataset.lang;
      if (!nextLocale) return;
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLocale);
      if (window.__NOIR_DATA__) {
        setLocaleContent(window.__NOIR_DATA__, nextLocale);
      }
    }, { passive: true });
  });
};

const initMenu = () => {
  const toggle = document.querySelector('.menu-toggle');
  const navPanel = document.getElementById('nav-panel');
  if (!toggle || !navPanel) return;

  toggle.addEventListener('click', () => {
    const isOpen = navPanel.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  }, { passive: true });
};

const onScroll = () => {
  const header = document.querySelector('.site-header');
  if (!header) return;
  header.classList.toggle('header--scrolled', window.scrollY > 16);
};

let scrollTick = false;
window.addEventListener('scroll', () => {
  if (scrollTick) return;
  scrollTick = true;
  requestAnimationFrame(() => {
    onScroll();
    scrollTick = false;
  });
}, { passive: true });

const init = async () => {
  initTheme();
  initLanguageSwitcher();
  initMenu();

  try {
    const res = await fetch(DATA_PATH + '?v=' + Date.now(), { cache: 'no-store' });
    const data = await res.json();
    window.__NOIR_DATA__ = data;
    setLocaleContent(data, getLocale());
  } catch (error) {
    console.error('Content load error:', error);
  }
};

document.addEventListener('DOMContentLoaded', init);
