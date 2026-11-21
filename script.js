const themeToggle = document.getElementById('themeToggle');

function setTheme(theme) {
  const isLight = theme === 'light';
  document.body.classList.toggle('light', isLight);
  themeToggle.setAttribute('aria-label', isLight ? 'Включить тёмную тему' : 'Включить светлую тему');
  themeToggle.title = themeToggle.getAttribute('aria-label');
}

try {
  setTheme(localStorage.getItem('theme'));
} catch {
  setTheme('dark');
}

themeToggle.addEventListener('click', () => {
  const theme = document.body.classList.contains('light') ? 'dark' : 'light';
  setTheme(theme);
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // The theme still works when local storage is unavailable.
  }
});

const burger = document.getElementById('burger');
const menu = document.getElementById('mobileMenu');
const mobileLayout = window.matchMedia('(max-width: 48rem)');

function setMenuOpen(open) {
  menu.hidden = !open;
  burger.setAttribute('aria-expanded', String(open));
}

burger.addEventListener('click', () => setMenuOpen(menu.hidden));

menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    setMenuOpen(false);
  }
});

document.addEventListener('click', (event) => {
  if (!menu.hidden && !menu.contains(event.target) && !burger.contains(event.target)) {
    setMenuOpen(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !menu.hidden) {
    setMenuOpen(false);
    burger.focus();
  }
});

mobileLayout.addEventListener('change', () => setMenuOpen(false));
