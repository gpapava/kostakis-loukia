// Kostis & Loukia & Pavlos — Save the Date
// Countdown + EL/EN translations

const EVENT_ISO = "2026-07-25T00:00:00+03:00";

function pad2(n) {
  return String(n).padStart(2, "0");
}

function getTargetMs() {
  const ms = Date.parse(EVENT_ISO);
  if (!Number.isNaN(ms)) return ms;

  const [y, m, d] = EVENT_ISO.slice(0, 10).split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0).getTime();
}

function updateCountdown() {
  const elDays = document.getElementById("cdDays");
  const elHours = document.getElementById("cdHours");
  const elMins = document.getElementById("cdMins");
  const elSecs = document.getElementById("cdSecs");

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

// Translations
const translations = {
  el: {
    // Menu
    menu_map: "Χάρτης",
    menu_venue: "Το Αρχοντικό",
    menu_stay: "Διαμονή",
    menu_contact: "Επικοινωνία",

    // Hero
    hero_couple: "Κωστής - Λουκία",
    hero_child: "Παύλος",
    hero_venue_name: "Αρχοντικό Χατζηγάκη",
    hero_venue_place: "Περτούλι Τρικάλων",
    hero_venue_date: "25 Ιουλίου 2026",
    hero_message: "Σας περιμένουμε στο γάμο και τη βάφτιση του μικρού μας",

    // Countdown
    cd_days: "ημέρες",
    cd_hours: "ώρες",
    cd_mins: "λεπτά",
    cd_secs: "δευτ.",

    // Map
    map_title: "Οδηγίες",

    // Buttons
    btn_info: "Info",

    // Venue
    venue_title: "Το Αρχοντικό",
    venue_body: "Το Αρχοντικό Χατζηγάκη είναι ένα πολυτελές, παραδοσιακό και ιστορικό ξενοδοχείο 5 αστέρων που βρίσκεται στο Περτούλι, κοντά στην Ελάτη στην κεντρική Ελλάδα. Κρυμμένο στις καταπράσινες πλαγιές της οροσειράς της Πίνδου, σε υψόμετρο 1.200 μέτρων, προσφέρει εξαιρετική θέα προς το δάσος και τα περιχώρια. Συνδυάζει παραδοσιακή αρχιτεκτονική με σύγχρονες ανέσεις, σε πλήρη αρμονία με τις ελληνικές παραδόσεις.",

    // Stay
    stay_title: "Διαμονή",
    stay_chatzigaki: "Αρχοντικό Χατζηγάκη",
    stay_limited: "Περιορισμένη διαθεσιμότητα",
    stay_alternatives: "Εναλλακτικές Επιλογές",
    stay_pertouli: "Περτούλι",
    stay_elati: "Ελάτη",
    stay_neraidochori: "Νεραϊδοχώρι",
    stay_contact_betty: "Μπέτυ Χατζηγάκη",
    stay_distance_3: "(3 χλμ)",
    stay_distance_15: "(15 χλμ)",

    // Contact
    contact_title: "Επικοινωνία",
    contact_kostis: "Κωστής",
    contact_loukia: "Λουκία",
    contact_note: "Θα ακολουθήσει επίσημη πρόσκληση",

    // Lang toggle
    toggle: "ΕΛ / EN"
  },
  en: {
    // Menu
    menu_map: "Map",
    menu_venue: "The Manor",
    menu_stay: "Accommodation",
    menu_contact: "Contact",

    // Hero
    hero_couple: "Kostis - Loukia",
    hero_child: "Pavlos",
    hero_venue_name: "Chatzigaki Manor",
    hero_venue_place: "Pertouli, Trikala",
    hero_venue_date: "25 July 2026",
    hero_message: "We look forward to celebrating our wedding and our son's baptism with you",

    // Countdown
    cd_days: "days",
    cd_hours: "hours",
    cd_mins: "mins",
    cd_secs: "secs",

    // Map
    map_title: "Directions",

    // Buttons
    btn_info: "Info",

    // Venue
    venue_title: "The Manor",
    venue_body: "Chatzigaki Manor is a luxurious, traditional, and historic 5-star hotel located in Pertouli, near Elati in central Greece. Hidden on the lush slopes of the Pindus mountain range, at an altitude of 1,200 meters, it offers exceptional views of the forest and surrounding area. It combines traditional architecture with modern amenities, in complete harmony with Greek traditions.",

    // Stay
    stay_title: "Accommodation",
    stay_chatzigaki: "Chatzigaki Manor",
    stay_limited: "Limited availability",
    stay_alternatives: "Alternative Options",
    stay_pertouli: "Pertouli",
    stay_elati: "Elati",
    stay_neraidochori: "Neraidochori",
    stay_contact_betty: "Mpety Chatzigaki",
    stay_distance_3: "(3 km)",
    stay_distance_15: "(15 km)",

    // Contact
    contact_title: "Contact",
    contact_kostis: "Kostis",
    contact_loukia: "Loukia",
    contact_note: "A formal invitation will follow",

    // Lang toggle
    toggle: "EN / ΕΛ"
  }
};

function setLang(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  // Apply translations to all elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const value = translations?.[lang]?.[key];
    if (value) el.textContent = value;
  });

  // Update toggle button
  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = translations[lang].toggle;
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

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('navMenu');
  const overlay = document.getElementById('menuOverlay');

  if (!toggle || !nav || !overlay) return;

  function closeMenu() {
    nav.classList.remove('open');
    overlay.classList.remove('open');
    toggle.classList.remove('open');
  }

  function openMenu() {
    nav.classList.add('open');
    overlay.classList.add('open');
    toggle.classList.add('open');
  }

  toggle.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  // Close menu when clicking a nav link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

window.addEventListener("load", () => {
  initLang();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  initMobileMenu();
});
