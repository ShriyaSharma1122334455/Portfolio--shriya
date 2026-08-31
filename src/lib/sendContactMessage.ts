/**
 * Delivers a contact-form submission to Shriya's inbox.
 *
 * This site is a static SPA with no backend, so delivery goes through
 * Web3Forms: the browser POSTs to their endpoint and they email the owner of
 * the access key. The access key is public by design — it only ever delivers
 * to the address that key was verified against, so it is safe in client code.
 *
 * Do NOT swap this for a Resend/SendGrid/Postmark API key. Those are real
 * secrets, and anything referenced here is readable in the shipped bundle. To
 * use one of those providers, add a server route (e.g. a Vercel function at
 * /api/contact), keep the key in a non-VITE_ env var, and point `ENDPOINT`
 * at that route instead.
 */

const ENDPOINT = "https://api.web3forms.com/submit";

const ACCESS_KEY = import.meta.env.WEB3FORMS_ACCESS_KEY as
  | string
  | undefined;

export interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
  /** Honeypot. Real people leave this empty; bots fill every field. */
  company?: string;
}

/**
 * Deliberately one shape rather than a discriminated union: this project does
 * not run TypeScript in strict mode, so `ok: true` widens to `boolean` and the
 * union never narrows at the call site.
 */
export interface SendResult {
  ok: boolean;
  error?: string;
}

export async function sendContactMessage(
  payload: ContactMessage,
): Promise<SendResult> {
  // Silently accept honeypot hits so bots get no signal to adapt to.
  if (payload.company) return { ok: true };

  if (!ACCESS_KEY) {
    return {
      ok: false,
      error:
        "The contact form isn't connected yet. Please email me directly in the meantime.",
    };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        name: payload.name,
        email: payload.email,
        subject: payload.subject
          ? `Portfolio: ${payload.subject}`
          : `Portfolio message from ${payload.name}`,
        message: payload.message,
        from_name: "Portfolio contact form",
        // Makes a reply in the mail client go back to the sender.
        replyto: payload.email,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
      return {
        ok: false,
        error:
          data?.message ??
          "That didn't go through. Please try again, or email me directly.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error:
        "Couldn't reach the mail service. Check your connection, or email me directly.",
    };
  }
}
