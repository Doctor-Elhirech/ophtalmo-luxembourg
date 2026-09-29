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

// On the homepage, highlight the page preview the visitor is reading.
const siteHeader = document.querySelector<HTMLElement>('.site-header');
if (siteHeader?.dataset.currentPage === 'home') {
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link[data-nav-page]');
  const sectionPages = [
    ['doctor', document.getElementById('doctor')],
    ['expertise', document.getElementById('expertise')],
    ['practice', document.getElementById('practice')],
    ['contact', document.getElementById('appointment')],
  ] as const;
  let activeFrame = 0;

  const updateActivePage = () => {
    activeFrame = 0;
    const readingLine = siteHeader.offsetHeight + window.innerHeight * 0.2;
    let activePage = 'home';
    for (const [page, section] of sectionPages) {
      if (section && section.getBoundingClientRect().top <= readingLine) activePage = page;
    }
    navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.navPage === activePage));
  };

  const scheduleActivePage = () => {
    if (!activeFrame) activeFrame = window.requestAnimationFrame(updateActivePage);
  };

  window.addEventListener('scroll', scheduleActivePage, { passive: true });
  window.addEventListener('resize', scheduleActivePage);
  window.addEventListener('pageshow', scheduleActivePage);
  window.addEventListener('load', scheduleActivePage);
  window.addEventListener('hashchange', scheduleActivePage);
  updateActivePage();
}

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
      '.doctor-photo, .doctor-copy, .reviews-heading, .contact-content',
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

// Copy to clipboard functionality
document.querySelectorAll<HTMLButtonElement>('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<svg width="1.1em" height="1.1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      btn.style.color = '#173c34';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.color = '';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  });
});

// Journey section scroll animation — unified continuous timeline
if (!reducedMotion.matches) {
  const journeyList = document.querySelector<HTMLOListElement>('.journey-list');
  const journeyItems = Array.from(document.querySelectorAll<HTMLLIElement>('.journey-list li'));
  if (journeyList && journeyItems.length) {
    // 4 circles + 3 lines = 7 sequential segments on one timeline
    const segmentCount = journeyItems.length * 2 - 1;
    const segmentSize = 1 / segmentCount;
    let ticking = false;

    const updateJourneyScroll = () => {
      const vh = window.innerHeight;
      const rect = journeyList.getBoundingClientRect();

      // Responsive triggers: mobile/tablet bottom bars eat ~70px of viewport,
      // and smaller screens need tighter animation travel.
      const isMobile = window.innerWidth <= 600;
      const isTablet = window.innerWidth > 600 && window.innerWidth <= 900;

      // Start: how far down the viewport the list top must reach to begin
      // End: where the list bottom should be when the animation finishes
      
      // On mobile/tablet, account for the sticky CTA bar at the bottom (~80px).
      // On laptop, start lower down the screen (90%) and complete much faster (65%).
      const startTrigger = isMobile ? vh * 0.75 : isTablet ? vh * 0.80 : vh * 0.90;
      const endTrigger = isMobile ? vh * 0.45 : isTablet ? vh * 0.50 : vh * 0.65;
      const totalTravel = rect.height + startTrigger - endTrigger;
      let globalProgress = (startTrigger - rect.top) / totalTravel;
      globalProgress = Math.max(0, Math.min(1, globalProgress));

      journeyItems.forEach((item, i) => {
        // Circle is segment 0, 2, 4, 6 — maps to index * 2
        const cStart = (i * 2) * segmentSize;
        const cEnd = (i * 2 + 1) * segmentSize;
        const circle = Math.max(0, Math.min(1, (globalProgress - cStart) / (cEnd - cStart)));
        item.style.setProperty('--circle-progress', circle.toString());

        // Line is segment 1, 3, 5 — only for non-last items
        if (i < journeyItems.length - 1) {
          const lStart = (i * 2 + 1) * segmentSize;
          const lEnd = (i * 2 + 2) * segmentSize;
          const line = Math.max(0, Math.min(1, (globalProgress - lStart) / (lEnd - lStart)));
          item.style.setProperty('--line-progress', line.toString());
        }
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateJourneyScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateJourneyScroll();

    reducedMotion.addEventListener('change', (event) => {
      if (event.matches) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        journeyItems.forEach((item) => {
          item.style.removeProperty('--circle-progress');
          item.style.removeProperty('--line-progress');
        });
      }
    });
  }
}
