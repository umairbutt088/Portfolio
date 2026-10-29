export const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

export const navDelay = 1000;
export const loaderDelay = 2000;

/** Smooth-scroll to an in-page hash target (Gatsby Link often ignores same-page hashes). */
export const scrollToHash = (event, url) => {
  if (typeof window === 'undefined' || !url || !url.includes('#')) {
    return;
  }

  const hash = url.split('#')[1];
  if (!hash) {
    return;
  }

  const el = document.getElementById(hash);
  if (!el) {
    return;
  }

  event.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.pushState(null, '', `#${hash}`);
};

export const KEY_CODES = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_LEFT_IE11: 'Left',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_RIGHT_IE11: 'Right',
  ARROW_UP: 'ArrowUp',
  ARROW_UP_IE11: 'Up',
  ARROW_DOWN: 'ArrowDown',
  ARROW_DOWN_IE11: 'Down',
  ESCAPE: 'Escape',
  ESCAPE_IE11: 'Esc',
  TAB: 'Tab',
  SPACE: ' ',
  SPACE_IE11: 'Spacebar',
  ENTER: 'Enter',
};
