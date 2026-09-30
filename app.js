const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation'); }
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });
window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMenu(); });
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { document.querySelector('#service').value = link.dataset.service; }));
document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#consultation-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  document.querySelector('#inquiry-text').value = `Consultation inquiry — Yeezy Escapes Services\n\nName: ${data.get('name').trim()}\nEmail: ${data.get('email').trim()}\nService: ${data.get('service')}\n\nProject details:\n${data.get('message').trim()}`;
  const result = document.querySelector('#inquiry-result');
  result.hidden = false;
  document.querySelector('#copy-status').textContent = '';
  result.focus();
  document.querySelector('#email-inquiry').href = 'mailto:info@yeezyescapes.com?subject=' + encodeURIComponent('Consultation inquiry: ' + data.get('service')) + '&body=' + encodeURIComponent(document.querySelector('#inquiry-text').value);
});
document.querySelector('#copy-inquiry').addEventListener('click', async () => {
  const text = document.querySelector('#inquiry-text');
  try { await navigator.clipboard.writeText(text.value); document.querySelector('#copy-status').textContent = 'Copied. Share your inquiry through your existing contact channel.'; }
  catch { text.focus(); text.select(); document.querySelector('#copy-status').textContent = 'Select and copy the inquiry above.'; }
});
