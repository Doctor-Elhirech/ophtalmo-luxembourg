const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const mobileNav = document.querySelector<HTMLElement>('#mobile-nav');
function closeMenu(restoreFocus = false) {
  if (!toggle || !mobileNav) return;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', toggle.dataset.openLabel || '');
  mobileNav.classList.remove('is-open');
  mobileNav.inert = true;
  if (restoreFocus) toggle.focus();
}
toggle?.addEventListener('click', () => {
  if (!mobileNav) return;
  const opening = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(opening));
  toggle.setAttribute(
    'aria-label',
    (opening ? toggle.dataset.closeLabel : toggle.dataset.openLabel) || '',
  );
  mobileNav.classList.toggle('is-open', opening);
  mobileNav.inert = !opening;
});
mobileNav
  ?.querySelectorAll('a')
  .forEach((link) => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', (event) => {
  if (
    event.target instanceof Node &&
    !document.querySelector('.site-header')?.contains(event.target)
  )
    closeMenu();
});
matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});
document.querySelectorAll<HTMLAnchorElement>('.language-link').forEach((link) => {
  link.addEventListener('click', () => {
    link.href = new URL(link.pathname + window.location.hash, window.location.origin).href;
  });
});
function imageFallback(img: HTMLImageElement) {
  img.hidden = true;
  const fallback = img.parentElement?.querySelector<HTMLElement>('.photo-fallback');
  if (fallback) fallback.hidden = false;
}
document.querySelectorAll<HTMLImageElement>('.photo img').forEach((img) => {
  img.addEventListener('error', () => imageFallback(img));
  if (img.complete && !img.naturalWidth) imageFallback(img);
});

// Native dialog supplies focus trapping, Escape handling, and modal semantics.
const dialog = document.querySelector<HTMLDialogElement>('.gallery-dialog');
const galleryLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.gallery-open'));
const lightboxImage = dialog?.querySelector<HTMLImageElement>('.lightbox-image');
const lightboxFallback = dialog?.querySelector<HTMLElement>('.lightbox-fallback');
const counter = dialog?.querySelector<HTMLElement>('.gallery-counter');
const caption = dialog?.querySelector<HTMLElement>('.gallery-image-caption');
const numberFormat = new Intl.NumberFormat(document.documentElement.lang, {
  minimumIntegerDigits: 2,
});
let photoIndex = 0;
let galleryOpener: HTMLAnchorElement | undefined;
function showPhoto(index: number) {
  photoIndex = (index + galleryLinks.length) % galleryLinks.length;
  const source = galleryLinks[photoIndex];
  if (!source || !lightboxImage) return;
  lightboxImage.hidden = false;
  if (lightboxFallback) lightboxFallback.hidden = true;
  lightboxImage.src = source.href;
  lightboxImage.alt = source.dataset.photoAlt || '';
  if (caption) caption.textContent = source.dataset.photoCaption || '';
  if (counter)
    counter.textContent = `${numberFormat.format(photoIndex + 1)} / ${numberFormat.format(galleryLinks.length)}`;
}
galleryLinks.forEach((link, index) =>
  link.addEventListener('click', (event) => {
    if (
      !dialog ||
      !lightboxImage ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    galleryOpener = link;
    showPhoto(index);
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
  }),
);
lightboxImage?.addEventListener('error', () => {
  lightboxImage.hidden = true;
  if (lightboxFallback) lightboxFallback.hidden = false;
});
dialog?.querySelector('.gallery-close')?.addEventListener('click', () => dialog.close());
dialog
  ?.querySelector('.gallery-previous')
  ?.addEventListener('click', () => showPhoto(photoIndex - 1));
dialog?.querySelector('.gallery-next')?.addEventListener('click', () => showPhoto(photoIndex + 1));
dialog?.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    const buttons = Array.from(dialog.querySelectorAll<HTMLButtonElement>('button'));
    const first = buttons[0],
      last = buttons[buttons.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    showPhoto(photoIndex + 1);
  }
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    showPhoto(photoIndex - 1);
  }
});
dialog?.addEventListener('close', () => {
  document.documentElement.style.overflow = '';
  galleryOpener?.focus({ preventScroll: true });
});

// Content remains visible if JavaScript or IntersectionObserver is unavailable.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.replace('reveal-pending', 'reveal-visible');
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  document
    .querySelectorAll(
      '.doctor-photo, .doctor-copy, .section-heading, .journey-heading, .reviews-heading, .contact-content',
    )
    .forEach((element) => {
      if (element.getBoundingClientRect().top > innerHeight) {
        element.classList.add('reveal-pending');
        observer.observe(element);
      }
    });
  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) {
      document
        .querySelectorAll('.reveal-pending')
        .forEach((el) => el.classList.remove('reveal-pending'));
      observer.disconnect();
    }
  });
}
