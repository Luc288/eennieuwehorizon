const nodemailer = require("nodemailer");

// Verstuurt het contactformulier via SMTP (mail5018.site4now.net).
// Gevoelige gegevens komen uit environment variables in Netlify,
// NOOIT hardcoded in deze code.
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ ok: false, error: "Method Not Allowed" }) };
  }

  let data;
  try {
    data = JSON.parse(event.body || "{}");
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Ongeldige aanvraag." }) };
  }

  const { naam, email, bericht, website } = data;

  // Honeypot: bots vullen het verborgen veld 'website' in -> stil negeren.
  if (website) {
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  if (!naam || !email || !bericht) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Vul alle velden in." }) };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: true, // poort 465 = SSL
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website Een Nieuwe Horizon" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo: `"${naam}" <${email}>`,
      subject: `Nieuw bericht via de website van ${naam}`,
      text: `Naam: ${naam}\nE-mail: ${email}\n\nBericht:\n${bericht}`,
    });
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("SMTP-fout:", err);
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: "Versturen mislukt. Probeer later opnieuw of bel ons." }) };
  }
};
