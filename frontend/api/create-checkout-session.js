import "dotenv/config";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder'); // Prevent crash on load

function getBaseUrl(req) {
  const proto = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${proto}://${host}`;
}

export default async function handler(req, res) {
  // Solo permitimos solicitudes POST (enviar datos).
  // Si alguien intenta entrar desde el navegador directamente (GET), le damos error.
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  /* 
   * IMPORTANTE: Seguridad
   * Aquí verificamos que la CLAVE SECRETA exista. 
   * Esta clave vive en el servidor (Vercel) y NUNCA debe llegar al Frontend (React).
   * Si la expusiéramos en el React, cualquiera podría robar nuestra cuenta de Stripe.
   */
  console.log("DEBUG: STRIPE_SECRET_KEY is:", process.env.STRIPE_SECRET_KEY);
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder_key_replace_me') {
    console.error("Missing STRIPE_SECRET_KEY");
    return res.status(500).json({ error: "Stripe Secret Key is missing in server environment." });
  }

  // Inicializamos Stripe con la clave secreta segura desde el entorno del servidor.
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { items } = req.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Missing items" });
    }

    const baseUrl = getBaseUrl(req);

    /* 
     * MOCK MODE (Modo Simulado)
     * Esto es solo para propósitos de demostración/portafolio si no se tiene una clave real.
     * En un proyecto real de producción, este bloque no existiría.
     */
    if (process.env.STRIPE_SECRET_KEY === 'Bocajuniors12' || process.env.STRIPE_SECRET_KEY?.startsWith('mock_')) {
      console.log("Using MOCK MODE for checkout");
      return res.status(200).json({
        url: `${baseUrl}/success?session_id=mock_session_123456&mock=true`
      });
    }

    /*
     * CREACIÓN DE LA SESIÓN DE PAGO
     * Le decimos a Stripe: "Oye, quiero cobrar estos productos".
     * Stripe nos devuelve una URL (session.url) donde el usuario pondrá su tarjeta.
     */
    const session = await stripe.checkout.sessions.create({
      mode: "payment", // Pago único (no suscripción)
      line_items: items.map((i) => ({
        quantity: i.quantity,
        price_data: {
          currency: "eur",
          product_data: { name: i.name },
          unit_amount: i.unit_amount, // Stripe usa centavos (ej. 1000 = 10.00€)
        },
      })),
      // A dónde redirigir si el pago sale bien
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      // A dónde redirigir si el usuario cancela o va atrás
      cancel_url: `${baseUrl}/checkout`,
    });

    // Devolvemos la URL de Stripe al Frontend para que haga la redirección
    return res.status(200).json({ url: session.url });
  } catch (err) {
    return res.status(500).json({ error: err?.message || "Server error" });
  }
}
