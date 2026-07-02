// =====================================================
// Lucas & Guilherme — countdown + modais
// =====================================================

(function () {
  // ---------- Countdown ----------
  const target = new Date('2026-10-10T15:30:00-03:00').getTime();

  const elDays  = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMin   = document.getElementById('cd-min');
  const elSec   = document.getElementById('cd-sec');

  function pad(n, len) {
    return String(Math.max(0, n)).padStart(len, '0');
  }

  function tick() {
    const now = Date.now();
    let diff = target - now;
    if (diff <= 0) {
      elDays.textContent  = '0';
      elHours.textContent = '00';
      elMin.textContent   = '00';
      elSec.textContent   = '00';
      return;
    }
    const days  = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const mins  = Math.floor(diff / 60000);
    diff -= mins * 60000;
    const secs  = Math.floor(diff / 1000);

    elDays.textContent  = pad(days, days >= 100 ? 3 : days >= 10 ? 2 : 1);
    elHours.textContent = pad(hours, 2);
    elMin.textContent   = pad(mins, 2);
    elSec.textContent   = pad(secs, 2);
  }

  tick();
  setInterval(tick, 1000);

  // ---------- Modais ----------
  const backdrop = document.getElementById('modal-backdrop');
  const tiles = document.querySelectorAll('.tile');
  const modals = document.querySelectorAll('.modal');
  let lastFocused = null;

  function openModal(tipId) {
    const modal = document.getElementById('modal-' + tipId);
    if (!modal) return;
    lastFocused = document.activeElement;

    // mostrar backdrop e modal
    backdrop.hidden = false;
    modal.hidden = false;
    // forçar reflow para que a transição funcione
    void backdrop.offsetWidth;
    backdrop.classList.add('is-open');
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');

    // focar no botão de fechar para acessibilidade
    const close = modal.querySelector('.modal-close');
    if (close) setTimeout(() => close.focus(), 100);
  }

  function closeAllModals() {
    modals.forEach((m) => {
      m.classList.remove('is-open');
    });
    backdrop.classList.remove('is-open');
    document.body.classList.remove('modal-open');

    // depois da transição, esconder elementos para tirar do tree de acessibilidade
    setTimeout(() => {
      modals.forEach((m) => { m.hidden = true; });
      backdrop.hidden = true;
    }, 320);

    // devolver foco
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  tiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      const tipId = tile.getAttribute('data-tip');
      openModal(tipId);
    });
  });

  // Clicar no backdrop fecha
  backdrop.addEventListener('click', closeAllModals);

  // Clicar fora do paper (mas dentro do modal) fecha — área cinza ao redor do card
  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAllModals();
    });
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeAllModals);
  });

  // ESC fecha
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('modal-open')) {
      closeAllModals();
    }
  });

  // ---------- Reveal on scroll ----------
  if ('IntersectionObserver' in window) {
    const targets = document.querySelectorAll('.welcome-inner, .great-day-card, .dresscode, .tile, .rsvp-col, .footer-inner');

    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          reveal.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });

    targets.forEach((el) => {
      el.classList.add('reveal');
      reveal.observe(el);
    });

    setTimeout(() => {
      targets.forEach((el) => el.classList.add('is-revealed'));
    }, 3500);
  }

  // ---------- Hero carousel ----------
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (slides.length > 1) {
    const INTERVAL = 6000;
    let current = 0;
    let timer = null;

    function showSlide(i) {
      slides[current].classList.remove('is-active');
      if (dots[current]) dots[current].classList.remove('is-active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      if (dots[current]) dots[current].classList.add('is-active');
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(() => showSlide(current + 1), INTERVAL);
    }
    function stopTimer() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    // Click nos dots
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        startTimer(); // resetar o timer ao interagir
      });
    });

    // Pausar quando a aba não está visível
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopTimer();
      else startTimer();
    });

    // Respeitar prefers-reduced-motion: não auto-tocar
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) startTimer();
  }
  
})();
