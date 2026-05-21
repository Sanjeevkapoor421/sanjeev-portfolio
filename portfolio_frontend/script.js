// ── NAV: scroll border + hamburger ──────────────────
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 60
    ? 'rgba(0,255,136,0.18)'
    : 'rgba(28,28,50,1)';
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── NAV: active link on scroll ───────────────────────
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      allNavLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`);
      });
    }
  });
}, { threshold: 0.4, rootMargin: '-60px 0px 0px 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── ROTATING SUBTITLE ────────────────────────────────
let titles = ['AI / ML Engineer', 'Data Scientist', 'LLM Builder', 'MLOps Practitioner', 'Open Source Contributor'];
let titleIdx = 0;
const titleEl = document.getElementById('rotating-title');

function rotateTitle() {
  titleEl.style.opacity = '0';
  titleEl.style.transform = 'translateY(-10px)';
  setTimeout(() => {
    titleIdx = (titleIdx + 1) % titles.length;
    titleEl.textContent = titles[titleIdx];
    titleEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    titleEl.style.opacity = '1';
    titleEl.style.transform = 'translateY(0)';
  }, 350);
}

titleEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
setInterval(rotateTitle, 2800);

// ── COUNTER ANIMATION ────────────────────────────────
function animateCounter(el, target, duration = 1200) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num[data-target]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      statsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ── SKILL BAR OBSERVER ───────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('animate');
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

// ── FADE-UP OBSERVER ─────────────────────────────────
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

// static elements that are always in the DOM
document.querySelectorAll('.about-grid').forEach(el => {
  el.classList.add('fade-up');
  fadeObserver.observe(el);
});

function attachFade(els) {
  els.forEach(el => {
    el.classList.add('fade-up');
    fadeObserver.observe(el);
  });
}

// ── PARTICLES ────────────────────────────────────────
const canvas = document.createElement('canvas');
canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:0.35';
document.getElementById('particles')?.replaceWith(canvas);

const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    opacity: Math.random() * 0.6 + 0.2,
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,255,136,${p.opacity})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── GITHUB SVG ───────────────────────────────────────
const githubSvg = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`;

// ── API: LOAD CONFIG ─────────────────────────────────
async function loadConfig() {
  try {
    const config = await fetch('/data/config.json').then(r => r.json());

    if (config.rotating_titles) {
      titles = config.rotating_titles.split(',').map(t => t.trim());
    }
    if (config.availability_badge) {
      document.getElementById('availability-badge').textContent = config.availability_badge;
    }
    if (config.about_lead) {
      document.getElementById('about-lead').textContent = config.about_lead;
    }
    if (config.about_bio_1) {
      document.getElementById('about-bio-1').textContent = config.about_bio_1;
    }
    if (config.cv_url) {
      document.getElementById('cv-link').href = config.cv_url;
      document.getElementById('about-cv-link').href = config.cv_url;
    }
    if (config.github_url) {
      document.getElementById('about-github-link').href = config.github_url;
      document.getElementById('social-github').href = config.github_url;
      document.getElementById('all-repos-link').href = config.github_url;
      document.getElementById('footer-github').href = config.github_url;
    }
    if (config.linkedin_url) document.getElementById('social-linkedin').href = config.linkedin_url;
    if (config.twitter_url)  document.getElementById('social-twitter').href  = config.twitter_url;

    // override stat counters
    document.querySelectorAll('.stat-num[data-config-key]').forEach(el => {
      const val = config[el.dataset.configKey];
      if (val) el.dataset.target = val;
    });
  } catch (e) {
    // fallback to hardcoded HTML values if API unreachable
  }
}

// ── API: LOAD PROJECTS ───────────────────────────────
async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  try {
    const projects = await fetch('/data/projects.json').then(r => r.json());
    grid.innerHTML = projects.map(p => `
      <div class="project-card ${p.featured ? 'project-card-featured' : ''}">
        ${p.featured ? '<div class="project-featured-badge">Featured</div>' : ''}
        <div class="project-img project-img-1">
          <span class="project-icon">${p.icon || '🚀'}</span>
        </div>
        <div class="project-body">
          <div class="project-tags">
            ${(p.tags || []).map(t => `<span class="ptag">${t}</span>`).join('')}
          </div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description || ''}</p>
          <div class="project-meta">
            ${p.stars    ? `<span class="meta-item">⭐ ${p.stars} stars</span>` : ''}
            ${p.forks    ? `<span class="meta-item">🍴 ${p.forks} forks</span>` : ''}
            ${p.language ? `<span class="meta-item">🐍 ${p.language}</span>`    : ''}
          </div>
          <div class="project-links">
            ${p.github_url ? `<a href="${p.github_url}" target="_blank" class="plink plink-github">${githubSvg} View on GitHub</a>` : ''}
            ${p.demo_url   ? `<a href="${p.demo_url}"   target="_blank" class="plink plink-demo">Live Demo &nearr;</a>` : ''}
          </div>
        </div>
      </div>
    `).join('');
    attachFade(grid.querySelectorAll('.project-card'));
  } catch (e) {
    grid.innerHTML = '<div class="loading-state">Could not load projects.</div>';
  }
}

// ── API: LOAD SKILLS ─────────────────────────────────
async function loadSkills() {
  const barsEl       = document.getElementById('skill-bars');
  const categoriesEl = document.getElementById('tool-categories');
  try {
    const grouped = await fetch('/data/skills.json').then(r => r.json());

    const core = grouped['Core'] || [];
    barsEl.innerHTML = core.map(s => `
      <div class="skill-bar-item">
        <div class="skill-bar-top"><span>${s.name}</span><span>${s.percentage}%</span></div>
        <div class="skill-bar-track"><div class="skill-bar-fill" style="--pct:${s.percentage}%"></div></div>
      </div>
    `).join('');
    barsEl.querySelectorAll('.skill-bar-fill').forEach(b => barObserver.observe(b));
    attachFade(barsEl.querySelectorAll('.skill-bar-item'));

    const toolCats = Object.entries(grouped).filter(([cat]) => cat !== 'Core');
    categoriesEl.innerHTML = toolCats.map(([cat, skills]) => `
      <div class="tool-category">
        <span class="tool-cat-label">${cat}</span>
        <div class="tool-grid">
          ${skills.map(s => `<span class="tool-chip">${s.name}</span>`).join('')}
        </div>
      </div>
    `).join('');
    attachFade(categoriesEl.querySelectorAll('.tool-category'));
  } catch (e) {
    barsEl.innerHTML = '<div class="loading-state">Could not load skills.</div>';
  }
}

// ── API: LOAD EXPERIENCE ─────────────────────────────
async function loadExperience() {
  const timeline = document.getElementById('timeline');
  try {
    const items = await fetch('/data/experience.json').then(r => r.json());
    timeline.innerHTML = items.map(item => `
      <div class="timeline-item ${item.type === 'education' ? 'timeline-edu' : ''}">
        <div class="timeline-dot ${item.type === 'education' ? 'timeline-dot-edu' : ''}"></div>
        <div class="timeline-body">
          <span class="timeline-date">
            ${item.start_date}${item.end_date ? ` — ${item.end_date}` : ' — Present'}
          </span>
          <h4 class="timeline-role">${item.role}</h4>
          <span class="timeline-company">${item.company || ''}</span>
          <p class="timeline-desc">${item.description || ''}</p>
          ${(item.tags || []).length ? `
            <div class="timeline-tags">
              ${item.tags.map(t => `<span class="ttag">${t}</span>`).join('')}
            </div>` : ''}
        </div>
      </div>
    `).join('');
    attachFade(timeline.querySelectorAll('.timeline-item'));
  } catch (e) {
    timeline.innerHTML = '<div class="loading-state">Could not load experience.</div>';
  }
}

// ── CONTACT FORM → API ───────────────────────────────
const form      = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async e => {
  e.preventDefault();
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/xjgzwonv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:    document.getElementById('field-name').value,
        email:   document.getElementById('field-email').value,
        subject: document.getElementById('field-subject').value,
        message: document.getElementById('field-message').value,
      }),
    });

    if (res.ok) {
      submitBtn.textContent = 'Message Sent ✓';
      submitBtn.style.background = '#00cc6a';
      form.reset();
    } else {
      submitBtn.textContent = 'Failed — try again';
      submitBtn.style.background = '#cc3333';
    }
  } catch {
    submitBtn.textContent = 'Failed — try again';
    submitBtn.style.background = '#cc3333';
  }

  setTimeout(() => {
    submitBtn.textContent = 'Send Message →';
    submitBtn.style.background = '';
    submitBtn.disabled = false;
  }, 3000);
});

// ── INIT ─────────────────────────────────────────────
async function init() {
  await loadConfig();
  await Promise.all([loadProjects(), loadSkills(), loadExperience()]);
}

init();
