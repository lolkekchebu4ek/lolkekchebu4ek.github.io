const DATA_PATH = 'assets/data/content.json';

const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const button = document.querySelector('.theme-toggle');
  if (button) {
    button.textContent = theme === 'light' ? '☾' : '☼';
  }
};

const initTheme = () => {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  setTheme(theme);

  const button = document.querySelector('.theme-toggle');
  if (button) {
    button.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      setTheme(next);
    });
  }
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

const populateContent = (data) => {
  document.querySelector('[data-brand]')?.replaceChildren(document.createTextNode(data.site.brand));

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
  if (heroImage) heroImage.src = data.hero.image;
  if (aboutTitle) aboutTitle.textContent = data.about.title;
  if (aboutText) aboutText.textContent = data.about.text;
  if (emailLink) {
    emailLink.href = `mailto:${data.contacts.email}`;
    emailLink.textContent = data.contacts.email;
  }

  renderPortfolio(data.portfolio);
  renderServices(data.services);
  observeReveal();
  // Make contacts block immediately interactive and light-weight
  optimizeContactsBlock();
};

// Reveal observer optimized to avoid heavy work when many elements exist.
const observeReveal = () => {
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (!reveals.length) return;

  // Skip observing elements inside #contacts — we'll reveal footer cheaply.
  const footer = document.getElementById('contacts');
  const revealsToObserve = reveals.filter((el) => !footer || !footer.contains(el));

  const options = { threshold: 0.15, rootMargin: '0px 0px -8% 0px' };

  const onIntersect = (entries, observer) => {
    // Batch DOM writes
    const toShow = [];
    entries.forEach((entry) => {
      if (entry.isIntersecting) toShow.push(entry.target);
    });
    if (toShow.length) {
      // Use requestAnimationFrame to avoid forced synchronous layouts
      requestAnimationFrame(() => {
        toShow.forEach((target) => {
          target.classList.add('visible');
          try { observer.unobserve(target); } catch (e) { /* ignore */ }
        });
      });
    }
  };

  // Observe in idle time to avoid competing with page load
  const startObserving = () => {
    const observer = new IntersectionObserver(onIntersect, options);
    revealsToObserve.forEach((el) => observer.observe(el));
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(startObserving, { timeout: 1500 });
  } else {
    // Fallback: small timeout
    setTimeout(startObserving, 600);
  }
};

// Contacts block-specific optimizations
const optimizeContactsBlock = () => {
  const contacts = document.getElementById('contacts');
  if (!contacts) return;

  // Avoid heavy CSS on small viewports
  if (window.matchMedia && window.matchMedia('(max-width: 720px)').matches) {
    contacts.style.backdropFilter = 'none';
    contacts.style.boxShadow = 'none';
  }

  // Ensure footer is visible without waiting for observer
  contacts.classList.add('reveal');
  // Slight stagger so it doesn't paint at the same frame as other heavy resources
  setTimeout(() => contacts.classList.add('visible'), 220);

  // Defer loading of social links (non-critical) until idle
  const socials = contacts.querySelectorAll('.socials a');
  if (!socials.length) return;

  const activateSocials = () => {
    socials.forEach((a) => {
      a.setAttribute('role', 'link');
      a.addEventListener('click', (e) => {
        // for demo anchors, prevent accidental navigation
        const href = a.getAttribute('href');
        if (href === '#') e.preventDefault();
      });
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(activateSocials, { timeout: 2000 });
  } else {
    setTimeout(activateSocials, 1200);
  }
};

const init = async () => {
  initTheme();

  try {
    const res = await fetch(DATA_PATH + '?v=' + Date.now());
    const data = await res.json();
    populateContent(data);
  } catch (error) {
    console.error('Content load error:', error);
  }
};

document.addEventListener('DOMContentLoaded', init);
