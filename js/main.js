/* ══════════════════════════════════════════════════════════════════════
   PORTOFOLIO · main.js
   Bagian-bagiannya independen: matikan satu, halaman tetap jalan.
   ══════════════════════════════════════════════════════════════════════ */

const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ── 1 · DATA PROYEK WEB ────────────────────────────────────────────── */
const PROYEK = [
  {
    nm: 'Katalog Sekolah',
    ct: 'Web · Desain & Frontend',
    yr: '2026',
    img: 'assets/img/work-01.svg',
    url: '#'
  },
  {
    nm: 'Sistem Absensi',
    ct: 'Aplikasi · Fullstack',
    yr: '2025',
    img: 'assets/img/work-02.svg',
    url: '#'
  },
  {
    nm: 'Web Komunitas',
    ct: 'Situs · Redesain',
    yr: '2025',
    img: 'assets/img/work-03.svg',
    url: '#'
  },
  {
    nm: 'Toko Online Baju',
    ct: 'E-commerce · Frontend',
    yr: '2024',
    img: 'assets/img/work-04.svg',
    url: '#'
  }
];

const grid = $('#grid');
if (grid) {
  grid.innerHTML = PROYEK.map((p) => `
    <article class="card rv">
      <a href="${p.url}" class="link">
        <div class="ph">
          <img src="${p.img}" alt="Tangkapan layar ${p.nm}" loading="lazy" width="600" height="800">
          <span class="open">Lihat proyek</span>
        </div>
        <div class="meta">
          <div>
            <div class="nm">${p.nm}</div>
            <div class="ct">${p.ct}</div>
          </div>
          <div class="yr">${p.yr}</div>
        </div>
      </a>
    </article>`).join('');
}

/* ── 2 · DATA GALERI FOTO ─────────────────────────────────────────────
   Kategori: acara, portrait, detail */
const GALERI = [
  { img: 'assets/img/detail-01.svg', cat: 'acara', cap: 'Pensi Sekolah 2025' },
  { img: 'assets/img/detail-02.svg', cat: 'portrait', cap: 'Portrait Ketua Osis' },
  { img: 'assets/img/detail-03.svg', cat: 'detail', cap: 'Detail Dekorasi Panggung' },
  { img: 'assets/img/process.svg', cat: 'acara', cap: 'Seminar IT Mahasiswa' },
  { img: 'assets/img/studio.svg', cat: 'portrait', cap: 'Backstage Candid' },
  { img: 'assets/img/about.svg', cat: 'detail', cap: 'Lighting & Suasana' },
  { img: 'assets/img/focus-01.svg', cat: 'acara', cap: 'Lomba Olahraga' },
  { img: 'assets/img/hero-figure.png', cat: 'portrait', cap: 'Portrait Pemateri' }
];

const masonry = $('#masonry');
if (masonry) {
  masonry.innerHTML = GALERI.map((g, i) => `
    <div class="masonry-item rv" data-cat="${g.cat}" data-idx="${i}">
      <img src="${g.img}" alt="${g.cap}" loading="lazy">
      <div class="mi-cap">${g.cap}</div>
    </div>
  `).join('');
}

/* ── 3 · TABS (Fokus Section) ───────────────────────────────────────── */
const tabs = $$('.fokus-tab');
const panels = $$('.fokus-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Reset tabs & panels
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    // Activate target
    tab.classList.add('active');
    $('#' + tab.dataset.target).classList.add('active');
  });
});

/* ── 4 · FILTER GALERI ──────────────────────────────────────────────── */
const filters = $$('.gf');
const items = $$('.masonry-item');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.filter;
    items.forEach(item => {
      if (target === 'all' || item.dataset.cat === target) {
        item.removeAttribute('data-hidden');
      } else {
        item.setAttribute('data-hidden', '');
      }
    });
  });
});

/* ── 5 · LIGHTBOX GALERI ────────────────────────────────────────────── */
const lb = $('#lightbox');
const lbImg = $('#lbImg');
const lbCap = $('#lbCaption');
let currentLbIndex = 0;

function openLightbox(idx) {
  currentLbIndex = parseInt(idx);
  const data = GALERI[currentLbIndex];
  lbImg.src = data.img;
  lbCap.textContent = data.cap;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden'; // stop scrolling
}

function closeLightbox() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

function navLightbox(dir) {
  currentLbIndex += dir;
  if (currentLbIndex < 0) currentLbIndex = GALERI.length - 1;
  if (currentLbIndex >= GALERI.length) currentLbIndex = 0;
  openLightbox(currentLbIndex);
}

if (lb) {
  items.forEach(item => {
    item.addEventListener('click', () => openLightbox(item.dataset.idx));
  });

  $('.lb-close').addEventListener('click', closeLightbox);
  $('.lb-prev').addEventListener('click', () => navLightbox(-1));
  $('.lb-next').addEventListener('click', () => navLightbox(1));

  lb.addEventListener('click', e => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
  });
}

/* ── 6 · HERO ANIMASI MASUK ─────────────────────────────────────────── */
if (RM) {
  $$('.hv').forEach(e => e.classList.add('on'));
} else {
  addEventListener('load', () => {
    $$('.hv').forEach((el, i) => setTimeout(() => el.classList.add('on'), 120 + i * 140));
  });
}

/* ── 7 · SCROLL EFFECTS (Parallax & Progress) ───────────────────────── */
(function scrollSystem() {
  if (RM) return;

  const nav = $('#nav');
  const bar = document.createElement('i');
  bar.id = 'prog';
  nav.appendChild(bar);

  let queued = false;

  function pass() {
    queued = false;
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  }

  addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(pass); }
  }, { passive: true });
  addEventListener('resize', pass);
  pass();
})();

/* Gambar di #tentang ikut bergerak sedikit */
(function aboutParallax() {
  if (RM) return;
  const img = $('#aboutImg');
  if (!img) return;
  let queued = false;

  function step() {
    queued = false;
    const r = img.parentElement.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) {
      img.style.transform = `scale(1.12) translateY(${(r.top / innerHeight) * -26}px)`;
    }
  }
  addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(step); }
  }, { passive: true });
})();

/* ── 8 · MUNCUL SAAT SCROLL (.rv) ───────────────────────────────────── */
const pending = new Set($$('.rv'));

function show(el) {
  el.classList.add('in');
  pending.delete(el);
  io.unobserve(el);
}

const io = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (e.isIntersecting || e.boundingClientRect.top < 0) show(e.target);
  }
}, { threshold: .12, rootMargin: '0px 0px -6% 0px' });

[...pending].forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 70 + 'ms';
  io.observe(el);
});

let sweeping = false;
function sweep() {
  sweeping = false;
  for (const el of pending) {
    if (el.getBoundingClientRect().top < innerHeight * 0.94) show(el);
  }
  if (!pending.size) removeEventListener('scroll', queue);
}
function queue() {
  if (!sweeping) { sweeping = true; requestAnimationFrame(sweep); }
}
addEventListener('scroll', queue, { passive: true });
addEventListener('load', sweep);

/* ── 9 · ANGKA MENGHITUNG NAIK ──────────────────────────────────────── */
(function counters() {
  const nums = $$('#studio .counts b');
  if (!nums.length) return;

  if (RM) {
    nums.forEach(n => n.textContent = n.dataset.to);
    return;
  }

  const run = n => {
    const to = +n.dataset.to;
    const t0 = performance.now(), D = 1100;
    (function step(now) {
      const p = Math.min(1, (now - t0) / D);
      const ease = 1 - Math.pow(1 - p, 3);
      n.textContent = Math.round(to * ease);
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  };

  const o = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { run(e.target); o.unobserve(e.target); }
  }), { threshold: .6 });

  nums.forEach(n => o.observe(n));
})();

/* ── 10 · FORM KONTAK ───────────────────────────────────────────────── */
const form = $('#kontakForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nama = $('#nama');
    const email = $('#email');
    if (!nama.value || !email.value || !email.checkValidity()) {
      if(!nama.value) nama.focus();
      else email.focus();
      return;
    }
    $('#kontakOk').classList.add('on');
    form.reset();
  });
}

/* Tautan href="#" tidak lompat ke atas */
document.addEventListener('click', e => {
  const a = e.target.closest('a');
  if (a && a.getAttribute('href') === '#') e.preventDefault();
});
