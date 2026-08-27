/*
  MAINTENANCE GATE
  ----------------
  Include this AFTER site-status.js, staff-config.js, and staff-auth.js, as
  early as possible in <head>, on every real page (index/about/gallery/store)
  — but NOT on maintenance.html or staff-login.html themselves.

  Staff get in by signing in through staff-login.html with an allowed Gmail
  account (see staff-config.js). Everyone else gets redirected to
  maintenance.html while MAINTENANCE_MODE is on.
*/
(function () {
  if (typeof MAINTENANCE_MODE === "undefined" || !MAINTENANCE_MODE) return;

  if (typeof hasValidStaffSession === "function" && hasValidStaffSession()) {
    return;
  }

  window.location.replace("maintenance.html");
})();
