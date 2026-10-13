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
};

const observeReveal = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
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
