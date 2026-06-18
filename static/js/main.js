// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth active nav link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

// Contactformulier -> verstuurt naar de Netlify-functie
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('contactStatus');
    const btn = document.getElementById('contactSubmit');
    const data = Object.fromEntries(new FormData(contactForm).entries());

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
