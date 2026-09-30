// Navbar: uitklapmenu (vervangt bootstrap.bundle.js) + scroll-effecten
const nav = document.getElementById('mainNav');
const menu = document.getElementById('navMenu');
const toggler = document.querySelector('.navbar-toggler');

if (menu && toggler) {
  const setOpen = (open) => {
    menu.classList.toggle('show', open);
    toggler.setAttribute('aria-expanded', String(open));
  };
  toggler.addEventListener('click', () => setOpen(!menu.classList.contains('show')));
  menu.addEventListener('click', (e) => {
    if (e.target.closest('.nav-link')) setOpen(false);
  });
}

// Navbar-achtergrond en actieve link bij scrollen
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// Contactformulier -> verstuurt naar de Netlify-functie
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  // Tijd-trap: onthoud wanneer de pagina laadde (bots versturen vrijwel direct)
  const formLoadedAt = Date.now();

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('contactStatus');
    const btn = document.getElementById('contactSubmit');
    const data = Object.fromEntries(new FormData(contactForm).entries());
    data.elapsedMs = Date.now() - formLoadedAt;

    if (!data.naam || !data.email || !data.bericht) {
      status.textContent = 'Vul alle velden in.';
      status.style.color = '#b00';
      return;
    }

    btn.disabled = true;
    const originalText = btn.textContent;
    btn.textContent = 'Versturen…';
    status.textContent = '';

    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok && result.ok) {
        contactForm.reset();
        if (window.turnstile) window.turnstile.reset();
        status.textContent = 'Bedankt! Je bericht is verstuurd.';
        status.style.color = 'var(--color-primary, #5c7a5c)';
      } else {
        status.textContent = result.error || 'Er ging iets mis. Probeer opnieuw.';
        status.style.color = '#b00';
      }
    } catch (err) {
      status.textContent = 'Verbinding mislukt. Probeer later opnieuw.';
      status.style.color = '#b00';
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
}
