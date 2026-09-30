// Both translations share their markup, so a reading anchor survives different text lengths.
const storageKey = 'ophtalmo-language-position';
const anchors = Array.from(
  document.querySelectorAll<HTMLElement>(
    'main h1, main h2, main h3, main p, main figure, main details, main address, main .booking-options, .site-footer, .footer-top nav, .footer-contact, .footer-bottom',
  ),
);
const disclosures = Array.from(document.querySelectorAll<HTMLDetailsElement>('main details'));
const readingLine = () =>
  (document.querySelector('header')?.getBoundingClientRect().height || 0) + 16;

interface ReadingPosition {
  path: string;
  savedAt: number;
  anchor: number;
  fraction: number;
  gap: number;
  scrollY: number;
  openDetails: number[];
}

document.querySelectorAll<HTMLAnchorElement>('.language-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
      return;
    if (link.pathname === location.pathname) {
      event.preventDefault();
      return;
    }
    link.hash = location.hash;
    const line = readingLine();
    let anchor = -1;
    let nearestTop = -Infinity;
    anchors.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      if (rect.height > 0 && rect.top <= line && rect.top >= nearestTop) {
        nearestTop = rect.top;
        anchor = index;
      }
    });
    const rect = anchors[anchor]?.getBoundingClientRect();
    const position: ReadingPosition = {
      path: link.pathname,
      savedAt: Date.now(),
      anchor,
      fraction: rect ? Math.min(1, Math.max(0, (line - rect.top) / rect.height)) : 0,
      gap: rect ? Math.max(0, line - rect.bottom) : 0,
      scrollY: window.scrollY,
      openDetails: disclosures.flatMap((detail, index) => (detail.open ? [index] : [])),
    };
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(position));
    } catch {
      // Normal language links still work when browser storage is unavailable.
    }
  });
});

function restoreLanguagePosition() {
  let saved: ReadingPosition;
  try {
    const value = sessionStorage.getItem(storageKey);
    if (!value) return;
    sessionStorage.removeItem(storageKey);
    saved = JSON.parse(value);
  } catch {
    return;
  }
  if (saved.path !== location.pathname || Date.now() - saved.savedAt > 15000) return;
  if (!Number.isFinite(saved.scrollY) || !Array.isArray(saved.openDetails)) return;

  disclosures.forEach((detail, index) => {
    detail.open = saved.openDetails.includes(index);
  });
  const previousRestoration = history.scrollRestoration;
  history.scrollRestoration = 'manual';
  let interrupted = false;
  const cancel = () => {
    interrupted = true;
  };
  const inputEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const;
  inputEvents.forEach((name) => window.addEventListener(name, cancel, { passive: true }));
  const restore = () => {
    if (interrupted) return;
    const element = anchors[saved.anchor];
    const rect = element?.getBoundingClientRect();
    const top =
      saved.scrollY < 2
        ? 0
        : rect
          ? window.scrollY + rect.top + rect.height * saved.fraction + saved.gap - readingLine()
          : saved.scrollY;
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
  };
  restore();
  // Align after fonts settle without waiting for third-party maps or other embeds.
  document.fonts.ready.then(() =>
    requestAnimationFrame(() => {
      restore();
      history.scrollRestoration = previousRestoration;
      inputEvents.forEach((name) => window.removeEventListener(name, cancel));
    }),
  );
}

restoreLanguagePosition();
