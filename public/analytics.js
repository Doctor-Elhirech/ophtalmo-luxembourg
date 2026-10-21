// Loaded only when a GA4 ID and the three-language privacy notice are configured.
const panel = document.querySelector('[data-analytics-consent]');

if (panel) {
  const measurementId = panel.dataset.measurementId || '';
  if (/^G-[A-Z0-9]+$/.test(measurementId)) {
    const storageKey = 'ophtalmo-analytics-choice';
    const safePage = new URL('/site', window.location.origin).href;
    const safeReferrer = (() => {
      try {
        const url = new URL(document.referrer);
        return ['https:', 'http:'].includes(url.protocol) ? `${url.origin}/` : '';
      } catch { return ''; }
    })();
    const page = document.body.dataset.page || '';
    const pageGroup = ['home', 'doctor', 'expertise', 'practice', 'contact', 'legal', 'privacy'].includes(page)
      ? page
      : 'care';
    const locale = ['fr', 'en', 'lb'].includes(document.documentElement.lang) ? document.documentElement.lang : 'fr';
    const genericContext = {
      page_location: safePage,
      page_referrer: safeReferrer,
      page_title: 'Ophtalmo Luxembourg',
      page_group: pageGroup,
      site_language: locale,
    };
    let consented = false;
    let tagLoaded = false;

    const readChoice = () => {
      try { return window.localStorage.getItem(storageKey); }
      catch { return null; }
    };

    const saveChoice = (choice) => {
      try { window.localStorage.setItem(storageKey, choice); }
      catch { /* The visitor can still make a choice for this page. */ }
    };

    // Use the same command queue format as Google's gtag function.
    function send() {
      window.dataLayer?.push(arguments);
    }

    const consentState = (analyticsStorage) => ({
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: analyticsStorage,
    });

    const activate = () => {
      if (consented) return;
      consented = true;
      window[`ga-disable-${measurementId}`] = false;

      if (!tagLoaded) {
        window.dataLayer = window.dataLayer || [];
        send('consent', 'default', consentState('denied'));
        send('consent', 'update', consentState('granted'));
        send('js', new Date());
        send('config', measurementId, {
          ...genericContext,
          send_page_view: false,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
        });

        const tag = document.createElement('script');
        tag.async = true;
        tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
        document.head.append(tag);
        tagLoaded = true;
      } else {
        send('consent', 'update', consentState('granted'));
      }

      send('event', 'page_view', genericContext);
    };

    const reject = () => {
      consented = false;
      if (tagLoaded) send('consent', 'update', consentState('denied'));
      window[`ga-disable-${measurementId}`] = true;
    };

    panel.querySelector('[data-analytics-accept]')?.addEventListener('click', () => {
      saveChoice('accepted');
      panel.hidden = true;
      activate();
    });

    panel.querySelector('[data-analytics-reject]')?.addEventListener('click', () => {
      saveChoice('rejected');
      panel.hidden = true;
      reject();
    });

    document.querySelector('[data-analytics-settings]')?.addEventListener('click', () => {
      panel.hidden = false;
      panel.querySelector('[data-analytics-reject]')?.focus();
    });

    const classifyLink = (link) => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('tel:')) return { name: 'phone_click' };
      if (href.startsWith('mailto:')) return { name: 'email_click' };

      try {
        const url = new URL(href, window.location.origin);
        if (url.hostname === 'www.doctena.lu' && url.pathname === '/fr/practitioner/mhamed-el-hirech') {
          return { name: 'booking_click', provider: 'doctena' };
        }
        if (url.hostname === 'www.doctipro.lu' && /^\/(?:fr|en)\/rendez-vous\/254\/?$/.test(url.pathname)) {
          return { name: 'booking_click', provider: 'doctipro' };
        }
        if (url.hostname === 'www.google.com' && url.pathname.startsWith('/maps/dir/')) {
          return { name: 'directions_click' };
        }
      } catch { /* Ignore non-URL links. */ }
      return null;
    };

    document.addEventListener('click', (event) => {
      if (!consented || !(event.target instanceof Element)) return;
      const link = event.target.closest('a');
      if (!link) return;
      const action = classifyLink(link);
      if (!action) return;
      send('event', action.name, { ...genericContext, ...(action.provider ? { provider: action.provider } : {}) });
    });

    const choice = readChoice();
    if (choice === 'accepted') activate();
    else if (choice === 'rejected') reject();
    else panel.hidden = false;
  }
}
