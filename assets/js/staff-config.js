/*
  STAFF PORTAL CONFIG
  --------------------
  1. GOOGLE_CLIENT_ID: create this for free at https://console.cloud.google.com
     -> APIs & Services -> Credentials -> Create Credentials -> OAuth client ID
     -> Application type: Web application
     -> Authorized JavaScript origins: https://endersmp.ice.fo
     Paste the client ID it gives you below.

  2. ALLOWED_STAFF_EMAILS: the exact Gmail addresses allowed into the staff portal.
     Must match the Google account's email exactly (case-insensitive is handled
     automatically below, but double-check spelling).

  3. SESSION_HOURS: how many hours a successful login stays valid before staff
     have to sign in again.
*/

const GOOGLE_CLIENT_ID = "PASTE-YOUR-GOOGLE-CLIENT-ID-HERE.apps.googleusercontent.com";

const ALLOWED_STAFF_EMAILS = [
  "muhdrahbar39@gmail.com",
  "amish112209@gmail.com"
  // add more staff Gmail addresses here, one per line, comma-separated
];

const SESSION_HOURS = 12;
