/*
  MAINTENANCE MODE — SITE-WIDE SWITCH
  ------------------------------------
  Set MAINTENANCE_MODE to true to lock every real page (Home/About/Gallery/Store)
  and redirect visitors to maintenance.html. Set it back to false to reopen the site.

  STAFF_BYPASS_KEY is the "secret" allowed people use to get past the lock while
  it's on. Change this to your own private string before you rely on it.

  ⚠️ IMPORTANT HONESTY NOTE:
  This is a client-side convenience gate, not real security. Because this file is
  plain JavaScript sitting on a static host, anyone who opens the browser's
  "View Page Source" or dev tools can read STAFF_BYPASS_KEY directly. Treat this
  as a "keep casual visitors out during downtime" switch, not a lock that can
  withstand someone who deliberately goes looking for the key. If you ever need
  real access control (a password check nobody can bypass by reading the code),
  that requires server-side logic — ask and we can wire that up separately.
*/

const MAINTENANCE_MODE = false;
const STAFF_BYPASS_KEY = "change-this-secret-before-use";
