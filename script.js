/* =========================================================
   COMING SOON — PERSONAL WEBSITE
   Vanilla JavaScript only.
   ========================================================= */

/*
  EDIT: TARGET DATE

  Launch target:
  11 November 2026, 12:00 AM IST (Asia/Kolkata)

  IST is UTC+05:30, so the exact same instant in UTC is:
  10 November 2026, 18:30:00 UTC

  To change the launch date later, edit the ISO timestamp below AND
  the visible .launch-date label in index.html. Update README.md as well.
  Use a UTC timestamp ending in "Z" so every visitor counts down
  to the exact same moment regardless of their own timezone.
*/
const TARGET_DATE_UTC = "2026-11-10T18:30:00Z";

// Browser preference key. Changing this key makes existing saved theme choices stop being used.
const THEME_STORAGE_KEY = "coming-soon-theme";

// HTML hooks: these IDs/classes must match index.html. The deferred script runs after HTML parsing.
const countdownElement = document.getElementById("countdown");
const liveMessageElement = document.getElementById("live-message");
const themeToggle = document.getElementById("theme-toggle");
const footerYear = document.getElementById("footer-year");
const timeValues = [...document.querySelectorAll(".time-value")];

const targetTimestamp = new Date(TARGET_DATE_UTC).getTime();

let countdownInterval = null;

// Remember displayed values so unchanged numbers do not replay their animation every 250ms.
let previousValues = {
  days: null,
  hours: null,
  minutes: null,
  seconds: null,
};

// Keep hours/minutes/seconds at two digits; larger day counts are not truncated.
function pad(value) {
  return String(value).padStart(2, "0");
}

function animateValue(element) {
  element.classList.remove("is-ticking");

  // Force reflow so the animation can restart.
  void element.offsetWidth;

  element.classList.add("is-ticking");
}

function updateDisplayedUnit(unit, value) {
  const element = document.querySelector(`[data-unit="${unit}"]`);
  const formatted = pad(value);

  if (previousValues[unit] !== formatted) {
    element.textContent = formatted;
    animateValue(element);
    previousValues[unit] = formatted;
  }
}

// Stop polling and reveal the launch message. No navigation or deployment happens here.
function showLiveState() {
  if (countdownInterval) {
    window.clearInterval(countdownInterval);
    countdownInterval = null;
  }

  countdownElement.hidden = true;
  liveMessageElement.hidden = false;
}

// Calculate from the actual device clock on each update, rather than decrementing a counter.
// This catches up after background-tab throttling; an incorrect device clock affects the result.
function updateCountdown() {
  const now = Date.now();
  const remaining = targetTimestamp - now;

  if (remaining <= 0) {
    showLiveState();
    return;
  }

  // Convert milliseconds to whole seconds, then split into days and the remaining time units.
  const totalSeconds = Math.floor(remaining / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  updateDisplayedUnit("days", days);
  updateDisplayedUnit("hours", hours);
  updateDisplayedUnit("minutes", minutes);
  updateDisplayedUnit("seconds", seconds);

  countdownElement.setAttribute(
    "aria-label",
    `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds until launch`
  );
}

// Priority: saved manual selection first, operating-system preference second.
function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// data-theme selects the CSS palette. persist=false is used for system-driven/initial changes.
function setTheme(theme, persist = true) {
  document.documentElement.dataset.theme = theme;

  const isDark = theme === "dark";

  themeToggle.setAttribute("aria-pressed", String(isDark));

  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );

  if (persist) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme;

  const nextTheme =
    currentTheme === "dark"
      ? "light"
      : "dark";

  setTheme(nextTheme);
}

function initTheme() {
  setTheme(getInitialTheme(), false);

  themeToggle.addEventListener("click", toggleTheme);

  /*
    If the visitor has never manually selected a theme,
    automatically follow operating-system theme changes.
  */
  const mediaQuery = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  mediaQuery.addEventListener("change", (event) => {
    const savedTheme = localStorage.getItem(
      THEME_STORAGE_KEY
    );

    if (!savedTheme) {
      setTheme(
        event.matches ? "dark" : "light",
        false
      );
    }
  });
}

// Uses the current year from the visitor\'s device; no yearly HTML edit is needed.
function initFooterYear() {
  footerYear.textContent =
    new Date().getFullYear();
}

// Validate the date, render immediately, then start polling only if launch is still in the future.
function initCountdown() {
  if (Number.isNaN(targetTimestamp)) {
    console.error(
      "Invalid TARGET_DATE_UTC value:",
      TARGET_DATE_UTC
    );

    return;
  }

  updateCountdown();

  if (!liveMessageElement.hidden) {
    return;
  }

  /*
    Check four times per second so the displayed
    second changes promptly.

    The animation still happens only when the
    displayed value actually changes.
  */
  countdownInterval =
    window.setInterval(
      updateCountdown,
      250
    );
}

// Start page behaviour once. Decorative background animations are CSS-only, not JavaScript timers.
function init() {
  initTheme();
  initFooterYear();
  initCountdown();

  timeValues.forEach((element) => {
    element.addEventListener(
      "animationend",
      () => {
        element.classList.remove(
          "is-ticking"
        );
      }
    );
  });
}

init();
