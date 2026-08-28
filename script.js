const weddingDate = new Date('2027-01-14T15:00:00+08:00');

function updateCountdown() {
  const now = new Date();
  let diff = Math.max(0, weddingDate - now);
  const d = Math.floor(diff / 86400000);
  diff %= 86400000;
  const h = Math.floor(diff / 3600000);
  diff %= 3600000;
  const m = Math.floor(diff / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

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

const enterBtn = document.getElementById('enter-btn');
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

  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleOpen();
    });
  }

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