const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[char]));

const required = ['name', 'email', 'service', 'date', 'time'];

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed.' });

  const payload = request.body || {};
  for (const field of required) {
    if (!String(payload[field] || '').trim()) return response.status(400).json({ error: 'Please complete all required fields.' });
  }
  const email = String(payload.email).trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email)) return response.status(400).json({ error: 'Please enter a valid email address.' });
  if (!process.env.RESEND_API_KEY) return response.status(503).json({ error: 'Consultation email is being set up. Please email info@yeezyescapes.com for now.' });

  const name = String(payload.name).trim();
  const service = String(payload.service).trim();
  const date = String(payload.date).trim();
  const time = String(payload.time).trim();
  const phone = String(payload.phone || '').trim() || 'Not provided';
  const notes = String(payload.notes || '').trim() || 'None provided';
  const from = process.env.RESEND_FROM_EMAIL || 'Yeezy Escapes <info@yeezyescapes.com>';
  const details = `<p><strong>Name:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Phone:</strong> ${escapeHtml(phone)}<br><strong>Service:</strong> ${escapeHtml(service)}<br><strong>Preferred day:</strong> ${escapeHtml(date)}<br><strong>Preferred time:</strong> ${escapeHtml(time)}</p><p><strong>Notes:</strong><br>${escapeHtml(notes).replace(/\n/g, '<br>')}</p>`;
  const emails = [
    { from, to: ['info@yeezyescapes.com'], reply_to: email, subject: `New consultation request — ${service}`, html: `<h2>New Yeezy Escapes consultation request</h2>${details}` },
    { from, to: [email], subject: 'We received your Yeezy Escapes consultation request', html: `<p>Hi ${escapeHtml(name)},</p><p>Thank you for reaching out to Yeezy Escapes Business Services. We received your request for <strong>${escapeHtml(service)}</strong> on <strong>${escapeHtml(date)}</strong> during <strong>${escapeHtml(time)}</strong>.</p><p>Yisbeth will follow up soon to confirm your consultation.</p><p>— Yeezy Escapes Business Services</p>` }
  ];
  const results = await Promise.all(emails.map(async message => {
    const res = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify(message) });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }));
  return response.status(200).json({ ok: true, ids: results.map(result => result.id) });
}
