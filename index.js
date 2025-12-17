// Kostis & Loukia — Save the Date
// Countdown + simple EL/EN toggle (no dependencies)

// If you don't know the time yet, keep it at midnight Athens time.
// Later you can change to e.g. "2026-06-25T18:00:00+03:00"
const EVENT_ISO = "2026-06-25T00:00:00+03:00";

function pad2(n) {
  return String(n).padStart(2, "0");
}

function getTargetMs() {
  // Robust parsing (some environments can be picky)
  const ms = Date.parse(EVENT_ISO);
  if (!Number.isNaN(ms)) return ms;

  // Fallback: YYYY-MM-DD
  const [y, m, d] = EVENT_ISO.slice(0, 10).split("-").map(Number);
  // Month is 0-based
  return new Date(y, (m - 1), d, 0, 0, 0).getTime();
}

function updateCountdown() {
  const elDays = document.getElementById("cdDays");
  const elHours = document.getElementById("cdHours");
  const elMins = document.getElementById("cdMins");
  const elSecs = document.getElementById("cdSecs");

  // If countdown block not present, do nothing (prevents crashes)
  if (!elDays || !elHours || !elMins || !elSecs) return;

  const target = getTargetMs();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  elDays.textContent = String(days);
  elHours.textContent = pad2(hours);
  elMins.textContent = pad2(mins);
  elSecs.textContent = pad2(secs);
}

// Simple bilingual toggle (only for the top button + a few key bits)
// If you don't care, you can delete everything below and keep the countdown.
const STRINGS = {
  el: {
    toggle: "ΕΛ / EN",
    details: "Λεπτομέρειες",
    directions: "Οδηγίες",
  },
  en: {
    toggle: "EN / ΕΛ",
    details: "Details",
    directions: "Directions",
  }
};

const translations = {
  el: {
    menu_details: "Λεπτομέρειες",
    menu_program: "Πρόγραμμα",
    menu_venue: "Το Αρχοντικό",
    menu_map: "Χάρτης",
    menu_stay: "Διαμονή",
    menu_rsvp: "RSVP",

    venue_title: "Το Αρχοντικό",
    venue_body: "Ένα ιστορικό, πετρόχτιστο αρχοντικό μέσα στο πράσινο του Περτουλίου — με κτήμα και εκκλησάκι στο χώρο."
  },
  en: {
    menu_details: "Details",
    menu_program: "Schedule",
    menu_venue: "The Manor",
    menu_map: "Map",
    menu_stay: "Accommodation",
    menu_rsvp: "RSVP",

    venue_title: "The Manor",
    venue_body: "A historic stone-built manor surrounded by the greenery of Pertouli, featuring an estate and a private chapel."
  }
};


function setLang(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = STRINGS[lang].toggle;

  // Optional: update the 2 hero buttons (won't break if not found)
  const detailsBtn = document.querySelector('.hero-actions a[href="#details"]');
  const mapBtn = document.querySelector('.hero-actions a[href="#map"]');

  if (detailsBtn) detailsBtn.textContent = STRINGS[lang].details;
  if (mapBtn) mapBtn.textContent = STRINGS[lang].directions;
}

function initLang() {
  const saved = localStorage.getItem("lang");
  const lang = saved === "en" ? "en" : "el";
  setLang(lang);

  const btn = document.getElementById("langToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const current = document.documentElement.lang === "en" ? "en" : "el";
      setLang(current === "en" ? "el" : "en");
    });
  }
}

window.addEventListener("load", () => {
  initLang();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
