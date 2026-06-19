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

  const { naam, email, bericht, onderwerp, website, elapsedMs } = data;
  const turnstileToken = data["cf-turnstile-response"];

  // Honeypot: bots vullen het verborgen veld 'website' in -> stil negeren.
  if (website) {
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  // Tijd-trap: ingevuld in minder dan 3 seconden = vrijwel zeker een bot.
  if (typeof elapsedMs === "number" && elapsedMs < 3000) {
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  }

  if (!naam || !email || !bericht) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Vul alle velden in." }) };
  }

  // Cloudflare Turnstile verifiëren (alleen als er een secret is ingesteld).
  if (process.env.TURNSTILE_SECRET) {
    if (!turnstileToken) {
      return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Bevestig dat je geen robot bent." }) };
    }
    try {
      const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET,
          response: turnstileToken,
          remoteip: event.headers["x-nf-client-connection-ip"] || "",
        }),
      });
      const outcome = await verify.json();
      if (!outcome.success) {
        return { statusCode: 400, body: JSON.stringify({ ok: false, error: "Verificatie mislukt. Probeer opnieuw." }) };
      }
    } catch (e) {
      console.error("Turnstile-fout:", e);
      return { statusCode: 502, body: JSON.stringify({ ok: false, error: "Verificatie niet beschikbaar. Probeer later opnieuw." }) };
    }
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
      subject: `${onderwerp || "Nieuw bericht"} — ${naam}`,
      text: `Onderwerp: ${onderwerp || "(geen)"}\nNaam: ${naam}\nE-mail: ${email}\n\nBericht:\n${bericht}`,
    });
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("SMTP-fout:", err);
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: "Versturen mislukt. Probeer later opnieuw of bel ons." }) };
  }
};
