const weddingDate = new Date('2027-01-14T15:00:00+08:00');

function updateCountdown() {
  const now = new Date();
  let diff = Math.max(0, weddingDate - now);

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  // If the wedding day has arrived or passed
  if (diff === 0) {
    const countdownContainer = document.querySelector('.countdown');
    if (countdownContainer) {
      countdownContainer.style.gridTemplateColumns = '1fr';
      countdownContainer.innerHTML = `
        <div style="padding: 32px; text-align: center; background: rgba(255, 254, 251, 0.95);">
          <strong style="font-size: 1.6rem; color: var(--wine); font-weight: 400; font-family: Georgia, serif;">Today is the Big Day! 🥂</strong>
          <p style="margin: 8px 0 20px; color: var(--ink-muted); font-size: 0.95rem;">Welcome to Lex & Angelica's wedding day.</p>
          <a class="button" href="https://www.google.com/maps/search/?api=1&query=Maharlika+Events+Tagaytay" target="_blank" rel="noopener" style="margin-top: 0;">Navigate to Venue</a>
        </div>
      `;
    }
    return;
  }

  const d = Math.floor(diff / 86400000);
  diff %= 86400000;
  const h = Math.floor(diff / 3600000);
  diff %= 3600000;
  const m = Math.floor(diff / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  if (daysEl) daysEl.textContent = d;
  if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(m).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(s).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

const observer = new IntersectionObserver((entries, observerInstance) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observerInstance.unobserve(entry.target);
    }
  });
}, { threshold: 0.10 });

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

const particleContainer = document.querySelector('.particles');
if (particleContainer) {
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = `${Math.random() * 100}%`;
    p.style.width = `${Math.random() * 6 + 4}px`;
    p.style.height = p.style.width;
    p.style.animationDuration = `${Math.random() * 4 + 5}s`;
    p.style.animationDelay = `${Math.random() * 5}s`;
    particleContainer.appendChild(p);
  }
}

const overlay = document.getElementById('audio-overlay');
const bgMusic = document.getElementById('bg-music');
const waxSeal = document.querySelector('.wax-seal');
const envelopeContainer = document.getElementById('envelope-box');

if (overlay && bgMusic) {
  const handleOpen = () => {
    if (envelopeContainer) {
      envelopeContainer.classList.add('open');
    }
    bgMusic.volume = 0.4;
    bgMusic.play().catch(() => {});
    
    setTimeout(() => {
      overlay.classList.add('is-hidden');
      setTimeout(() => overlay.remove(), 900);
    }, 1100);
  };

  if (waxSeal) {
    waxSeal.addEventListener('click', (e) => {
      e.stopPropagation();
      handleOpen();
    });
  }

  if (envelopeContainer) {
    envelopeContainer.addEventListener('click', handleOpen);
  }
}