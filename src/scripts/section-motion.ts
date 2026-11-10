// Section entrances share the same timing and work without a motion library.
// Nothing is hidden until this enhancement is ready; each entrance runs once.
export {};
type MotionKind = 'rise' | 'left' | 'right' | 'image' | 'card' | 'row' | 'fade' | 'settle' | 'flip' | 'map';
interface MotionRule {
  selector: string;
  kind: MotionKind;
  stagger?: boolean;
}

const motionRules: MotionRule[] = [
  // Register green surfaces first so their content settles together, without nested entrances.
  { selector: '.expertise-section, .appointment-section, .appointment-preview, .detail-booking-band, .contact-booking-panel, .doctor-next', kind: 'flip' },
  { selector: '.hero-figure', kind: 'image' },
  { selector: '.page-hero > .eyebrow, .page-hero > h1, .page-hero-intro', kind: 'rise', stagger: true },
  { selector: '.introduction > .eyebrow, .introduction > h2, .intro-description', kind: 'rise', stagger: true },
  { selector: '.doctor-photo, .doctor-story-media, .practice-arrival-media', kind: 'image' },
  { selector: '.doctor-copy, .doctor-story-copy, .practice-arrival-copy', kind: 'right' },
  { selector: '.expertise-heading, .section-heading > div:first-child', kind: 'left' },
  { selector: '.expertise-list > li', kind: 'row', stagger: true },
  { selector: '.practice-heading-aside', kind: 'right' },
  { selector: '.gallery-item', kind: 'image', stagger: true },
  { selector: '.gallery-caption, .review-note', kind: 'fade' },
  { selector: '.reviews-heading > div:first-child', kind: 'rise' },
  { selector: '.reviews-live', kind: 'fade' },
  { selector: '.reviews-carousel', kind: 'fade' },
  { selector: '.appointment-preview-layout > div:first-child, .appointment-layout > div:first-child, .detail-booking-layout > div:not(.booking-options)', kind: 'left' },
  // Animate the container, leaving its individual button hover/focus effects intact.
  { selector: '.appointment-preview-layout > div:last-child, .appointment-actions, .detail-booking-layout > .booking-options', kind: 'settle' },
  { selector: '.doctor-proof-heading > div, .doctor-next-layout > div:first-child', kind: 'rise' },
  { selector: '.doctor-proof-heading > p', kind: 'fade' },
  { selector: '.doctor-proof-card', kind: 'card', stagger: true },
  { selector: '.doctor-next-actions', kind: 'settle' },
  { selector: '.detail-intro-row', kind: 'settle' },
  { selector: '.care-card', kind: 'card', stagger: true },
  { selector: '.care-information-panel', kind: 'fade' },
  { selector: '.journey-heading', kind: 'left' },
  // Keep the existing scroll-driven circles and connecting lines unchanged.
  { selector: '.journey-list li > div', kind: 'row' },
  { selector: '.contact-hero-copy, .contact-essentials-heading, .faq-heading', kind: 'rise' },
  { selector: '.contact-content', kind: 'settle' },
  { selector: '.contact-info-card', kind: 'settle', stagger: true },
  { selector: '.contact-map', kind: 'map' },
  { selector: '.faq-item', kind: 'row', stagger: true },
  { selector: '.footer-top > *, .footer-bottom', kind: 'settle', stagger: true },
];

const reducedMotionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const pending = new Set<HTMLElement>();
const running = new Set<HTMLElement>();
const cleanupTimers = new Map<HTMLElement, number>();
let entranceObserver: IntersectionObserver | undefined;
let flipObserver: IntersectionObserver | undefined;
let journeyObserver: IntersectionObserver | undefined;

function isJourneyEntrance(element: HTMLElement) {
  return element.closest('.journey-section') !== null;
}

function entranceCleanupDelay(element: HTMLElement) {
  if (isJourneyEntrance(element)) return 1100;
  // Read each entrance once, so slower transitions and their stagger can finish.
  const style = getComputedStyle(element);
  const milliseconds = (value: string) => value.split(',').map((time) =>
    Number.parseFloat(time) * (time.trim().endsWith('ms') ? 1 : 1000),
  );
  const durations = milliseconds(style.transitionDuration);
  const delays = milliseconds(style.transitionDelay);
  const end = durations.reduce((longest, duration, index) =>
    Math.max(longest, duration + delays[index % delays.length]), 0,
  );
  return Math.ceil(end + 100);
}

function completeEntrance(element: HTMLElement) {
  const timer = cleanupTimers.get(element);
  if (timer !== undefined) window.clearTimeout(timer);
  cleanupTimers.delete(element);
  pending.delete(element);
  running.delete(element);
  entranceObserver?.unobserve(element);
  flipObserver?.unobserve(element);
  journeyObserver?.unobserve(element);
  element.classList.remove('motion-pending', 'motion-running');
  element.removeAttribute('data-motion-immediate');
}

function reveal(element: HTMLElement, instant = false) {
  if (!pending.has(element)) return;
  if (instant || reducedMotionPreference.matches) {
    completeEntrance(element);
    return;
  }
  pending.delete(element);
  entranceObserver?.unobserve(element);
  flipObserver?.unobserve(element);
  journeyObserver?.unobserve(element);
  running.add(element);
  element.classList.add('motion-running');
  element.classList.remove('motion-pending');
  // Release compositing hints when the longest entrance and its stagger finish.
  const cleanupDelay = entranceCleanupDelay(element);
  cleanupTimers.set(element, window.setTimeout(() => completeEntrance(element), cleanupDelay));
}

function finishAllEntrances() {
  [...pending, ...running].forEach(completeEntrance);
  entranceObserver?.disconnect();
  flipObserver?.disconnect();
  journeyObserver?.disconnect();
}

function viewportEdges() {
  const header = document.querySelector<HTMLElement>('.site-header');
  const bar = document.querySelector<HTMLElement>('.mobile-contact-bar');
  const headerHeight = header?.getBoundingClientRect().height || 0;
  const barHeight = bar?.getBoundingClientRect().height || 0;
  // Keep the original boundary for first-view readability and the visit timeline.
  const inset = window.innerWidth <= 600 ? 24 : window.innerWidth <= 900 ? 38 : 56;
  // Green sections have generous inner padding: wait until their content is visible.
  // A viewport-based inset also works when a section is taller than a phone screen.
  const usableHeight = Math.max(0, window.innerHeight - headerHeight - barHeight);
  const entranceInset = Math.min(180, usableHeight * (window.innerWidth <= 600 ? 0.18 : 0.22));
  const flipInset = Math.min(240, usableHeight * (window.innerWidth <= 600 ? 0.28 : 0.34));
  return {
    top: headerHeight,
    bottom: window.innerHeight - barHeight - inset,
    flipBottom: window.innerHeight - barHeight - flipInset,
    barHeight,
    inset,
    entranceInset,
    flipInset,
  };
}

function observePending() {
  entranceObserver?.disconnect();
  flipObserver?.disconnect();
  journeyObserver?.disconnect();
  const edges = viewportEdges();
  const onEnter: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) reveal(entry.target as HTMLElement);
    });
  };
  entranceObserver = new IntersectionObserver(onEnter, {
    rootMargin: `-${Math.round(edges.top)}px 0px -${Math.round(edges.barHeight + edges.entranceInset)}px 0px`,
    threshold: 0,
  });
  flipObserver = new IntersectionObserver(onEnter, {
    rootMargin: `-${Math.round(edges.top)}px 0px -${Math.round(edges.barHeight + edges.flipInset)}px 0px`,
    threshold: 0,
  });
  journeyObserver = new IntersectionObserver(onEnter, {
    rootMargin: `-${Math.round(edges.top)}px 0px -${Math.round(edges.barHeight + edges.inset)}px 0px`,
    threshold: 0,
  });
  pending.forEach((element) => {
    const observer = isJourneyEntrance(element) ? journeyObserver : element.dataset.motion === 'flip' ? flipObserver : entranceObserver;
    observer?.observe(element);
  });
}

function initializeEntrances() {
  if (reducedMotionPreference.matches || !('IntersectionObserver' in window)) return;
  const edges = viewportEdges();
  const atPageStart = window.scrollY < 2 && !location.hash;
  const targets: HTMLElement[] = [];

  motionRules.forEach(({ selector, kind, stagger }) => {
    const siblingOrder = new Map<Element, number>();
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      // One animation level per group avoids nested movement or delayed controls.
      if (element.dataset.motion || element.parentElement?.closest('[data-motion]')) return;
      element.dataset.motion = kind;
      element.classList.add('motion-target');
      if (stagger && element.parentElement) {
        const order = siblingOrder.get(element.parentElement) || 0;
        element.style.setProperty('--motion-stagger', `${Math.min(order * 65, 195)}ms`);
        siblingOrder.set(element.parentElement, order + 1);
      }
      targets.push(element);
    });
  });

  // Read all positions before adding starting transforms, avoiding repeated layout.
  const positions = targets.map((element) => ({
    element,
    rect: element.getBoundingClientRect(),
    focused: element.contains(document.activeElement),
  }));
  positions.forEach(({ element, rect, focused }) => {
    // Restored content remains readable without a replayed entrance.
    if (rect.bottom <= edges.top || focused || (rect.top < edges.bottom && !atPageStart)) return;
    const entranceBottom = element.dataset.motion === 'flip' ? edges.flipBottom : edges.bottom;
    if (rect.top < entranceBottom) element.dataset.motionImmediate = 'true';
    pending.add(element);
    element.classList.add('motion-pending');
  });

  // Commit starting styles before beginning transitions, without forcing layout.
  requestAnimationFrame(() => {
    if (reducedMotionPreference.matches) {
      finishAllEntrances();
      return;
    }
    observePending();
    pending.forEach((element) => {
      if (element.dataset.motionImmediate) reveal(element);
    });
  });
}

// Language navigation restores its reading anchor after fonts settle.
// Let that frame complete before measuring or moving any section.
document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(initializeEntrances)));

document.addEventListener('focusin', (event) => {
  if (!(event.target instanceof Element)) return;
  const group = event.target.closest<HTMLElement>('.motion-target');
  if (group) completeEntrance(group);
});

document.addEventListener('click', (event) => {
  if (event.target instanceof Element && event.target.closest('.language-link')) {
    // Capture runs before the existing reading-position handler measures its anchor.
    finishAllEntrances();
  }
}, { capture: true });

document.addEventListener('click', (event) => {
  if (reducedMotionPreference.matches || !(event.target instanceof Element)) return;
  const summary = event.target.closest('summary');
  const detail = summary?.parentElement;
  if (!(detail instanceof HTMLDetailsElement) || !detail.matches('.care-card, .faq-item')) return;
  detail.classList.remove('motion-disclosure-opening');
  if (!detail.open) {
    // Only a visitor's activation animates the answer, not restored language state.
    detail.classList.add('motion-disclosure-opening');
    window.setTimeout(() => detail.classList.remove('motion-disclosure-opening'), 320);
  }
});

window.addEventListener('resize', () => {
  if (!pending.size || reducedMotionPreference.matches) return;
  observePending();
}, { passive: true });

window.addEventListener('hashchange', () => {
  const edges = viewportEdges();
  pending.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < edges.bottom && rect.bottom > edges.top) reveal(element, true);
  });
});

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') finishAllEntrances();
});
window.addEventListener('beforeprint', finishAllEntrances);
window.addEventListener('pagehide', finishAllEntrances);
reducedMotionPreference.addEventListener('change', (event) => {
  if (event.matches) finishAllEntrances();
});
