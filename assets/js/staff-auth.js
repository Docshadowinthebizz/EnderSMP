/*
  STAFF AUTH
  ----------
  Decodes the signed-in Google account's ID token (JWT) to read the verified
  email address, checks it against ALLOWED_STAFF_EMAILS, and stores a session
  if it matches.

  Note on trust: this decodes the token payload but does not cryptographically
  verify Google's signature (that requires a server). It's still meaningfully
  harder to fake than a shared password, because you'd need to either forge a
  structurally valid JWT or bypass this script entirely in dev tools — but a
  determined attacker with browser console access could do the latter. For
  airtight verification, the token needs checking server-side against Google's
  public keys.
*/

function decodeJwtPayload(token) {
  const payload = token.split(".")[1];
  let base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  const decoded = new TextDecoder("utf-8").decode(bytes);
  return JSON.parse(decoded);
}

function handleGoogleSignIn(response) {
  const statusEl = document.getElementById("login-status");
  try {
    const data = decodeJwtPayload(response.credential);
    const email = (data.email || "").toLowerCase().trim();
    const verified = data.email_verified === true;
    const allowed = ALLOWED_STAFF_EMAILS.map(e => e.toLowerCase().trim());

    if (verified && allowed.includes(email)) {
      const session = {
        email: email,
        name: data.name || email,
        expires: Date.now() + SESSION_HOURS * 60 * 60 * 1000
      };
      localStorage.setItem("endersmp_staff_session", JSON.stringify(session));
      statusEl.textContent = `Welcome, ${session.name}. Redirecting…`;
      statusEl.style.color = "var(--magenta)";
      setTimeout(() => { window.location.href = "index.html"; }, 900);
    } else {
      statusEl.textContent = `${email} isn't on the staff allowlist. Access denied.`;
      statusEl.style.color = "#ff6b6b";
    }
  } catch (err) {
    statusEl.textContent = "Sign-in failed — please try again.";
    statusEl.style.color = "#ff6b6b";
  }
}

function hasValidStaffSession() {
  try {
    const raw = localStorage.getItem("endersmp_staff_session");
    if (!raw) return false;
    const session = JSON.parse(raw);
    return session.expires > Date.now();
  } catch (err) {
    return false;
  }
}

function staffLogout() {
  localStorage.removeItem("endersmp_staff_session");
  window.location.href = "maintenance.html";
}
