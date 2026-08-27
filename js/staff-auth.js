/*
  CLIENT-SIDE SHA-256 AUTHENTICATION
  -----------------------------------
  Hashes the user input dynamically using Web Crypto API and compares against STAFF_PASSCODE_HASH.
*/

async function hashString(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function handleStaffLogin(event) {
  if (event) event.preventDefault();
  
  const emailInput = document.getElementById("staff-email");
  const passInput = document.getElementById("staff-passcode");
  const statusEl = document.getElementById("login-status");

  const email = (emailInput ? emailInput.value : "").toLowerCase().trim();
  const passcode = passInput ? passInput.value.trim() : "";

  statusEl.textContent = "Verifying credentials...";
  statusEl.style.color = "var(--lilac-dim)";

  // Check Email
  if (typeof ALLOWED_STAFF_EMAILS !== "undefined" && !ALLOWED_STAFF_EMAILS.includes(email)) {
    statusEl.textContent = "Access Denied: Email not recognized.";
    statusEl.style.color = "#ff6b6b";
    return false;
  }

  // Hash input passcode and compare
  const inputHash = await hashString(passcode);

  if (inputHash !== STAFF_PASSCODE_HASH) {
    statusEl.textContent = "Access Denied: Incorrect passcode.";
    statusEl.style.color = "#ff6b6b";
    return false;
  }

  // Save session
  const session = {
    email: email,
    authenticated: true,
    expires: Date.now() + SESSION_HOURS * 60 * 60 * 1000
  };
  localStorage.setItem("endersmp_staff_session", JSON.stringify(session));

  statusEl.textContent = "Authentication successful. Access granted.";
  statusEl.style.color = "var(--magenta)";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 800);

  return false;
}

function hasValidStaffSession() {
  try {
    const raw = localStorage.getItem("endersmp_staff_session");
    if (!raw) return false;
    const session = JSON.parse(raw);
    return session.expires > Date.now() && session.authenticated === true;
  } catch (err) {
    return false;
  }
}

function staffLogout() {
  localStorage.removeItem("endersmp_staff_session");
  window.location.href = "maintenance.html";
}
