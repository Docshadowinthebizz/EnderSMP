(function () {
  if (typeof MAINTENANCE_MODE === "undefined" || !MAINTENANCE_MODE) return;

  if (typeof hasValidStaffSession === "function" && hasValidStaffSession()) {
    return;
  }

  window.location.replace("maintenance.html");
})();
