(() => {
  'use strict';

  const WORKS = [
    'RJ01508566', 'RJ01255210', 'RJ01237134', 'RJ01199295', 'RJ01186124',
    'RJ01142777', 'RJ01135587', 'RJ01135576', 'RJ01135551', 'RJ01135547',
    'RJ01135532', 'RJ01122100', 'RJ01118875', 'RJ01118860', 'RJ01118849',
    'RJ01118842', 'RJ01118838', 'RJ01118833', 'RJ01118826', 'RJ01107397',
    'RJ01107386', 'RJ01107375', 'RJ01107370', 'RJ01107204', 'RJ01107197',
    'RJ01097985', 'RJ01095608', 'RJ01095602', 'RJ01095579', 'RJ01095377',
    'RJ01095372', 'RJ01095370', 'RJ01095366', 'RJ01095358', 'RJ01082880',
    'RJ01082673', 'RJ01082667', 'RJ01082664', 'RJ01082661', 'RJ01082656',
    'RJ01080540', 'RJ01057409', 'RJ01024204', 'RJ01001187', 'RJ01001070',
    'RJ434682', 'RJ413122', 'RJ392191', 'RJ377760', 'RJ364394',
    'RJ353614', 'RJ351072', 'RJ337498', 'RJ334956', 'RJ327790',
    'RJ327264', 'RJ326586', 'RJ325179', 'RJ323931', 'RJ320487',
    'RJ319412', 'RJ318544', 'RJ316900', 'RJ315107', 'RJ312507',
    'RJ307647', 'RJ299693'
  ];

  const getAssetBase = () => {
    const path = location.pathname.replace(/\\/g, '/');
    return path.includes('/pages/') ? '../' : '';
  };

  const renderWorks = () => {
    const grid = document.getElementById('worksGrid');
    if (!grid) return;
    const base = getAssetBase();
    const frag = document.createDocumentFragment();
    WORKS.forEach((code, i) => {
      const li = document.createElement('li');
      li.className = 'work-item';
      li.innerHTML = `
        <img src="${base}assets/images/works/${code}_img_main_300x300.jpg"
             alt="出演作品 ${code}"
             loading="${i < 8 ? 'eager' : 'lazy'}"
             decoding="async"
             width="300" height="300">
        <span class="work-item__code">${code}</span>
      `;
      frag.appendChild(li);
    });
    grid.appendChild(frag);
  };

  const initHeaderScroll = () => {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  };

  const initNavToggle = () => {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('primaryNav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      });
    });
  };

  const initReveal = () => {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => io.observe(el));
  };

  const initAudioExclusive = () => {
    const audios = document.querySelectorAll('audio');
    audios.forEach(a => {
      a.addEventListener('play', () => {
        audios.forEach(other => {
          if (other !== a && !other.paused) other.pause();
        });
      });
    });
  };

  const initAgeGate = () => {
    const gate = document.getElementById('ageGate');
    if (!gate) return;
    const KEY = 'fes_age_verified';
    try {
      if (sessionStorage.getItem(KEY) === '1') {
        gate.hidden = true;
        return;
      }
    } catch (e) {}

    document.body.style.overflow = 'hidden';

    const yes = document.getElementById('ageYes');
    if (yes) {
      yes.addEventListener('click', () => {
        try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
        gate.hidden = true;
        document.body.style.overflow = '';
      });
    }
  };

  const setYear = () => {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  };

  document.addEventListener('DOMContentLoaded', () => {
    renderWorks();
    initHeaderScroll();
    initNavToggle();
    initReveal();
    initAudioExclusive();
    initAgeGate();
    setYear();
  });
})();
