import { practice } from '../config/practice';
import type { Translation } from './translations';

// Working Luxembourgish copy. Medical wording and practice facts should be reviewed
// with the doctor or a fluent Luxembourgish speaker before the final public launch.
export const lb: Translation = {
  ...practice,
  // Doctipro has no confirmed Luxembourgish URL for this profile; retain its French destination.
  doctipro: practice.doctipro.fr,
  localeNames: { fr: 'Français', en: 'English', lb: 'Lëtzebuergesch' },
  languageShort: { fr: 'FR', en: 'EN', lb: 'LU' },
  numbers: ['01', '02', '03', '04', '05', '06'],
  slash: '/',
  copyright: '©',
  year: '2026',
  meta: {
    title: 'Aendokter zu Mamer, Lëtzebuerg | Dr M’Hamed EL HIRECH',
    description:
      'Den Dr M’Hamed EL HIRECH empfänkt Erwuessener a Kanner a senger Aepraxis zu Mamer, Lëtzebuerg. Kuckt déi fräi Rendez-vousen a reservéiert online.',
  },
  accessibility: {
    skip: 'Bei den Inhalt sprangen',
    mainNav: 'Haaptnavigatioun',
    footerNav: 'Navigatioun am Foussberäich',
    language: 'Sprooch auswielen',
    menu: 'Menü opmaachen',
    closeMenu: 'Menü zoumaachen',
    closeGallery: 'Foto zoumaachen',
    previous: 'Viregt Foto',
    next: 'Nächst Foto',
    openPhoto: 'Foto vergréisseren',
    newTab: 'neien Tab',
    imageUnavailable: 'D’Foto ass de Moment net verfügbar',
    gallery: 'Fotoe vun der Praxis',
    copyEmail: 'E-Mail-Adress kopéieren',
  },
  nav: {
    home: 'Startsäit',
    doctor: 'Den Dokter',
    expertise: 'Leeschtungen',
    practice: 'D’Praxis',
    contact: 'Wee & Kontakt',
  },
  action: {
    book: 'Rendez-vous maachen',
    home: 'Zréck op d’Startsäit',
    availability: 'Fräi Rendez-vousen ukucken',
    directions: 'Wee op Google Maps',
    discover: 'D’Praxis entdecken',
    call: 'D’Praxis uruffen',
    profile: 'Beruffleche Wee op Doctena',
    moreDoctor: 'Méi iwwer den Dokter liesen',
    moreExpertise: 'All Leeschtunge kucken',
    moreContact: 'Kontakt an Ëffnungszäite kucken',
  },
  hero: {
    eyebrow: 'Aepraxis · Mamer, Lëtzebuerg',
    line1: 'Är Siicht.',
    line2: 'Eis Suergfalt.',
    intro: 'Aebetreiung fir Erwuessener a Kanner, vun der Gebuert un.',
    provider: 'Mam Dr M’Hamed EL HIRECH',
    bookingNote: 'Fräi Rendez-vousen a Reservatioun iwwer Doctena',
    caption: 'Stroossebléck zu Mamer',
    coordinate: '110 Route d’Arlon · Lëtzebuerg',
    trustCue: 'Méi wéi 500 Patiente behandelt',
  },
  introduction: {
    label: 'Perséinlech Betreiung',
    title: 'Zäit fir Är Aen.',
    emphasis: 'Opmierksam fir Iech.',
    text: 'Den Dr M’Hamed EL HIRECH, Aendokter zu Mamer, Lëtzebuerg, empfänkt Iech fir Är Siicht an d’Gesondheet vun Ären Aen.',
  },
  doctorSection: {
    label: 'Ären Aendokter',
    nameFirst: 'Dr M’Hamed',
    nameLast: 'EL HIRECH',
    role: 'Aendokter',
    title: 'Medezinesch Erfarung.',
    emphasis: 'Perséinlech Betreiung.',
    qualifications: [
      'Ofschloss op der medezinescher Fakultéit zu Besançon, Frankräich',
      'Fréiere Spidolsassistent a Spidolsdokter',
      'Fréier als Dokter u Paräisser Spideeler verbonnen',
    ],
    caption: 'An der Praxis · Consultatiounsraum',
    source: 'Beruffleche Wee op Doctena publizéiert',
    profilesLabel: 'Berufflech Profiller',
    doctenaProfile: 'Profil op Doctena',
    doctiproProfile: 'Profil op Doctipro',
  },
  expertiseSection: {
    label: 'Beräicher vun der Aebetreiung',
    title: 'Fir all Alter,',
    emphasis: 'Är Siicht.',
    intro: 'Entdeckt d’Fachberäicher vun Ärem Aendokter zu Mamer.',
    items: [
      { name: 'Allgemeng Ophtalmologie', detail: 'Consultatiounen iwwer d’Aen an d’Siicht' },
      { name: 'Ophtalmologie fir Kanner', detail: 'Kanner, och Neigebueren' },
      { name: 'Brëller & Kontaktlënsen', detail: 'Korrektur vun der Siicht' },
      { name: 'Kataraktchirurgie', detail: 'Chirurgesch Behandlung' },
      { name: 'Chirurgie bei Kuerzsiichtegkeet', detail: 'Chirurgesch Behandlung' },
      { name: 'Chirurgie bei Schielen', detail: 'Chirurgesch Behandlung' },
    ],
  },
  practiceSection: {
    label: 'D’Praxis',
    title: 'Ier Dir kommt,',
    emphasis: 'kuckt Iech emol ëm.',
    intro: 'Entdeckt d’Praxis an hir Consultatiounsraim op der 110 Route d’Arlon zu Mamer.',
    more: 'Äre Besuch virbereeden',
    view: 'Fotoen ukucken',
    captions: ['D’Fassad', 'Den Ënnersichungsraum', 'Eng aner Vue op d’Praxis'],
    attribution: 'Fotoe vun der Praxis iwwer Google Maps zur Verfügung gestallt',
  },
  journey: {
    label: 'Äre Besuch',
    title: 'E kloere Wee',
    emphasis: 'bis bei Äre Rendez-vous.',
    steps: [
      {
        title: 'Rendez-vous auswielen',
        text: 'Kuckt déi fräi Rendez-vousen a reservéiert direkt iwwer Doctena.',
      },
      {
        title: 'An d’Praxis kommen',
        text: 'Dir fannt eis op der 110 Route d’Arlon, L‑8210 Mamer.',
      },
      { title: 'D’Consultatioun', text: 'E Gespréich mam Dokter an eng Ënnersichung vun den Aen.' },
      {
        title: 'Déi nächst Schrëtt',
        text: 'Den Dokter erkläert Iech seng Recommandatiounen an déi passend weider Betreiung.',
      },
    ],
  },
  reviews: {
    label: 'Dat soe Patienten',
    title: 'Eng Erfarung,',
    emphasis: 'déi gedeelt gëtt.',
    openQuote: '„',
    closeQuote: '“',
    ratingLabel: 'Google-Bewäertung',
    count: `${practice.reviewSummary.count} Google-Bewäertungen`,
    quotes: [
      'Ech hu besonnesch seng Professionalitéit, seng Grëndlechkeet a seng Opmierksamkeet geschätzt.',
      'Ech war wéinst Aeschmäerzen do. Den Aendokter war ganz kompetent an huet gutt nogelauschtert. Ech kann hie recommandéieren.',
    ],
    source: 'Google-Bewäertung',
    note: 'Iwwersate Passagen aus de zur Verfügung gestallte Bewäertungen.',
  },
  appointment: {
    label: 'Ären nächste Rendez-vous',
    title: 'Mir huelen eis Zäit',
    emphasis: 'fir Är Siicht.',
    text: 'Wielt Äre Rendez-vous direkt iwwer Doctena.',
    phoneLabel: 'Rufft Dir léiwer un?',
    bookingNote: 'D’Reservatioun leeft iwwer Doctena.',
    alternativeBooking: 'Och iwwer Doctipro reservéieren — Mamer',
  },
  faq: {
    label: 'Ier Dir kommt',
    title: 'E puer Äntwerten,',
    emphasis: 'fir Iech ze orientéieren.',
    intro: 'Praktesch Informatioune fir Äre Besuch an der Praxis.',
    items: [
      {
        question: 'Wéi maachen ech e Rendez-vous?',
        answer:
          'Dir kënnt fir d’Praxis zu Mamer iwwer Doctena oder Doctipro reservéieren. Kuckt déi fräi Rendez-vousen a schléisst d’Reservatioun op der gewielter Plattform of.',
        linkLabel: 'Reservatiounsméiglechkeete kucken',
        href: '#appointment',
      },
      {
        question: 'Wou ass d’Praxis?',
        answer: `D’Praxis ass op der ${practice.address.street}, ${practice.address.postalCity}, zu Lëtzebuerg. D’Kontaktdaten an de Wee fannt Dir hei drënner.`,
        linkLabel: 'Adress a Wee',
        href: '#contact',
      },
      {
        question: 'Wéi eng Sprooche ginn an der Praxis geschwat?',
        answer:
          'An der Praxis gi Franséisch, Englesch a Lëtzebuergesch geschwat. Wann Dir eng bestëmmte Sprooch braucht, kontaktéiert d’Praxis virun Ärem Besuch.',
        linkLabel: '',
        href: '',
      },
      {
        question: 'Wéi kann ech d’Praxis kontaktéieren?',
        answer:
          'Wann Dir virun Ärem Besuch eng Fro hutt, kënnt Dir d’Praxis per Telefon oder E-Mail kontaktéieren.',
        linkLabel: 'D’Praxis kontaktéieren',
        href: '#contact',
      },
    ],
  },
  contactSection: {
    label: 'Hei fannt Dir eis',
    title: 'Zu Mamer.',
    emphasis: 'Fir Iech do.',
    addressLabel: 'D’Praxis',
    contactLabel: 'Kontakt',
    hoursLabel: 'Ëffnungszäiten',
    hoursSaturday: 'Samschdeg',
    hoursTime: '08:00 – 12:00\n14:00 – 19:00',
    hoursClosed: 'Déi aner 6 Deeg zou',
    mapTitle: 'Lag vun der Praxis Ophtalmo Luxembourg zu Mamer',
    country: 'Lëtzebuerg',
  },
  footer: {
    descriptor: 'Aepraxis zu Mamer',
    closing: 'Är Siicht. Eis Suergfalt.',
    top: 'Zréck no uewen',
    demo: 'Demo · Informatiounen nach virun der definitiver Verëffentlechung ze bestätegen',
  },
  pageMeta: {
    home: {
      title: 'Aendokter zu Mamer, Lëtzebuerg | Dr M’Hamed EL HIRECH',
      description:
        'Den Dr M’Hamed EL HIRECH empfänkt Erwuessener a Kanner a senger Aepraxis zu Mamer, Lëtzebuerg. Kuckt déi fräi Rendez-vousen a reservéiert online.',
    },
    doctor: {
      title: 'Dr M’Hamed EL HIRECH | Aendokter zu Mamer',
      description:
        'Léiert den Dr M’Hamed EL HIRECH, Aendokter zu Mamer, kennen: seng Ausbildung zu Besançon, seng Spidolserfarung a Frankräich a seng berufflech Profiller.',
    },
    expertise: {
      title: 'Aebetreiung zu Mamer | Ophtalmo Luxembourg',
      description:
        'Aebetreiung fir Erwuessener a Kanner, Brëller a Kontaktlënsen: entdeckt d’Fachberäicher vum Dr M’Hamed EL HIRECH zu Mamer, Lëtzebuerg.',
    },
    practice: {
      title: 'Aepraxis zu Mamer | Ophtalmo Luxembourg',
      description:
        'Entdeckt d’Aepraxis vum Dr M’Hamed EL HIRECH op der 110 Route d’Arlon zu Mamer, Lëtzebuerg. Kuckt d’Fotoen a bereet Äre Besuch vir.',
    },
    contact: {
      title: 'Rendez-vous beim Aendokter zu Mamer | Wee & Kontakt',
      description:
        'Maacht e Rendez-vous beim Dr M’Hamed EL HIRECH, Aendokter zu Mamer. Fannt d’Adress, den Telefon, de Wee an d’Linke fir Doctena an Doctipro.',
    },
  },
  doctorPage: {
    label: 'Ären Aendokter zu Mamer',
    title: 'Medezinesch Erfarung.',
    emphasis: 'Perséinlech Betreiung.',
    intro:
      'Léiert den Dr M’Hamed EL HIRECH kennen, Aendokter zu Mamer, Lëtzebuerg. Entdeckt seng Ausbildung a seng Spidolserfarung.',
    portraitSlotLabel: 'Portrait vum Dokter derbäisetzen',
    photoNote:
      'Aktuell Foto vun der Praxis. Duerch en aktuelle Portrait vum Dokter am Héichformat ersetzen, deen hien zougestëmmt huet.',
    profileTitle: 'Publizéierte Parcours',
    profileText:
      'Seng Ausbildung zu Besançon a seng Aarbecht a franséische Spideeler ginn op senge publizéierte Profiller genannt.',
    profilesTitle: 'Publizéiert berufflech Profiller',
    proofLabel: 'Mam Dokter ze bestätegen',
    proofTitle: 'Ausbildung & Leeschtungen',
    proofIntro:
      'Dës Plaze weisen Dokumenter, déi den Dokter eventuell presentéiere wëllt. Et ginn him keng onbestätegt Diplomer, Auszeechnungen oder Publikatiounen zougeschriwwen.',
    evidence: [
      {
        title: 'Diplomer & Certificaten',
        imageLabel: 'Plaz fir e Bild: Diplom oder Certificat',
        description:
          'Hei kann eng gutt liesbar Kopie vun engem Fachdiplom oder enger Zousazausbildung dobäikommen, mat iwwerpréiftem Titel, Etablissement a Joer.',
      },
      {
        title: 'Auszeechnungen & Memberschaften',
        imageLabel: 'Plaz fir e Bild: Noweis oder Logo',
        description:
          'Wann et zoutrëfft: eng Auszeechnung, eng Funktioun oder d’Memberschaft an enger medezinescher Gesellschaft mat Noweis an Datum weisen.',
      },
      {
        title: 'Publikatiounen & Virträg',
        imageLabel: 'Plaz fir e Bild: Cover oder éischt Säit',
        description:
          'Wa verfügbar: déi komplett Referenz an en autoriséiert Bild vun engem Artikel oder engem Fachvirtrag derbäisetzen.',
      },
    ],
    viewDoctena: 'Doctena-Profil ukucken',
    viewDoctipro: 'Doctipro-Profil ukucken',
    nextLabel: 'Méi entdecken',
    nextTitle: 'Entdeckt d’Beräicher vun der Aebetreiung.',
    nextCare: 'Leeschtungen ukucken',
  },
  expertisePage: {
    label: 'Ophtalmologie & Aebetreiung',
    title: 'Eng kloer Siicht',
    emphasis: 'op all Schrëtt.',
    intro:
      'Siicht, Brëller a Kontaktlënsen: entdeckt d’Fachberäicher vum Dr M’Hamed EL HIRECH, Aendokter zu Mamer.',
    publishedNote:
      'Dës Texter erklären déi genannte Beräicher am Allgemengen. D’Praxis muss nach bestätegen, wéi eng Ënnersichungen a Behandlungen zu Mamer ugebuede ginn.',
    detailsTitle: 'Genannte Fachberäicher',
    expandLabel: 'Méi gewuer ginn',
    collapseLabel: 'Manner weisen',
    items: [
      {
        title: 'Allgemeng Ophtalmologie',
        text: 'Consultatiounen iwwer d’Siicht an d’Gesondheet vun den Aen.',
        expanded: [
          {
            label: 'Ënnersichung',
            text: 'Jee nom Grond vum Besuch kann eng Aenënnersichung d’Siicht an d’Gesondheet vun den Aen iwwerpréiwen. Den Dokter entscheet, wéi eng Kontrollë sënnvoll sinn.',
          },
          {
            label: 'Weider Betreiung',
            text: 'Wann e Problem observéiert muss ginn, ginn déi nächst Schrëtt no der Situatioun vum Patient beschwat.',
          },
        ],
      },
      {
        title: 'Ophtalmologie fir Kanner',
        text: 'Aebetreiung fir Kanner, och Neigebueren, laut dem publizéierte Profil.',
        expanded: [
          {
            label: 'Entwécklung vun der Siicht',
            text: 'Bei Kanner kann d’Ënnersichung d’Siicht an d’Ausriichtung vun den Aen iwwerpréiwen. Si gëtt dem Alter vum Kand ugepasst.',
          },
          {
            label: 'Gespréich mat den Elteren',
            text: 'D’Eltere kënnen Ännerungen uschwätzen, déi hinnen opgefall sinn, zum Beispill wann en A ofwäicht oder d’Kand net kloer gesäit.',
          },
        ],
      },
      {
        title: 'Brëller & Kontaktlënsen',
        text: 'Ënnersichung vum Besoin un enger Siichtkorrektur.',
        expanded: [
          {
            label: 'D’Siicht verstoen',
            text: 'Kuerzsiichtegkeet, Wäitsiichtegkeet an Astigmatismus kënnen d’Siicht verschwomme maachen. Eng Ënnersichung hëlleft festzestellen, ob eng Korrektur néideg ass.',
          },
          {
            label: 'Eng Korrektur auswielen',
            text: 'E Brëll oder Kontaktlënse kënnen d’Siicht verbesseren. D’Auswiel an d’Verschreiwung hänke vun der Ënnersichung an de Besoine vun all Persoun of.',
          },
        ],
      },
      {
        title: 'Katarakt, Kuerzsiichtegkeet & Schielen',
        text: 'Chirurgesch Beräicher, déi op Doctena genannt ginn; d’Modalitéite sinn nach ze bestätegen.',
        expanded: [
          {
            label: 'Katarakt',
            text: 'Bei engem Katarakt gëtt déi natierlech Lëns am A dréif, an d’Siicht ka verschwommen ginn. Eng Ënnersichung hëlleft ze entscheeden, ob eng Operatioun a Fro kënnt.',
          },
          {
            label: 'Kuerzsiichtegkeet',
            text: 'Bei Kuerzsiichtegkeet gesäit ee Saachen an der Distanz onschaarf. Jee no Patient kann no enger Ënnersichung eng optesch Korrektur oder eng Operatioun beschwat ginn.',
          },
          {
            label: 'Schielen',
            text: 'Beim Schiele kucken d’Aen net an déi selwecht Richtung. Eng Ënnersichung hëlleft, déi méiglech Behandlungen ze beschwätzen.',
          },
        ],
      },
    ],
    visitTitle: 'Wëllt Dir Äre Besuch plangen?',
    visitIntro: 'Kuckt déi fräi Rendez-vousen a wielt déi Reservatiounsplattform, déi Iech passt.',
    confirmationTitle: 'Nach ze bestätegen',
    confirmationText:
      'D’Praxis muss bestätegen, wéi eng Ënnersichungen an Apparater zu Mamer verfügbar sinn, wou méiglech Operatioune stattfannen a wéi d’Nobetreiung organiséiert ass.',
    appointmentLabel: 'Rendez-vous auswielen',
  },
  practicePage: {
    label: 'D’Praxis zu Mamer',
    title: 'Ier Dir kommt,',
    emphasis: 'wësst Dir, wat Iech erwaart.',
    intro:
      'Entdeckt d’Raim vun der Aepraxis op der 110 Route d’Arlon zu Mamer a bereet Äre Besuch vir.',
    arrivalTitle: 'Bei d’Praxis kommen',
    arrivalHeading: 'Hei fannt Dir eis zu Mamer.',
    entrancePhotoLabel: 'Foto vun der Entrée aktualiséieren',
    entrancePhotoNote:
      'Aktuell Vue op d’Gebai. Duerch eng nei Foto vun der richteger Entrée vun der Praxis ersetzen.',
    hoursLink: 'Ëffnungszäiten a Kontaktdaten ukucken',
    arrivalNotes: [
      {
        title: 'Entrée & Ukonft',
        text: 'Nach ze bestätegen: déi richteg Entrée, de Stack an eventuell Hiweiser fir Patienten, déi ukommen.',
      },
      {
        title: 'Parken & Barriärfräiheet',
        text: 'Nach ze bestätegen: Parkméiglechkeeten, ëffentlechen Transport an en Accès ouni Trapen fir Persoune mat ageschränkter Mobilitéit.',
      },
    ],
    galleryLabel: 'An der Praxis',
    galleryTitle: 'D’Raim vun der Praxis',
    galleryIntro:
      'Zwou aktuell Fotoe vum Ënnersichungsraum. Eng Foto vum Empfang kann dësen Abléck ergänzen.',
    gallerySlotLabel: 'Foto derbäisetzen',
    gallerySlotTitle: 'Empfang oder Waarderaum',
    gallerySlotText:
      'Hei eng aktuell Foto vum Raum derbäisetzen, an deem d’Patienten empfaange ginn.',
    bookingLabel: 'Virum Besuch reservéieren',
    bookingTitle: 'Prett fir Äre Besuch?',
    bookingIntro: 'Kuckt déi fräi Rendez-vousen a reservéiert op der Plattform vun Ärer Wiel.',
  },
  contactPage: {
    label: 'Rendez-vous zu Mamer',
    title: 'Äre Besuch.',
    emphasis: 'Gutt virbereet.',
    intro:
      'Maacht e Rendez-vous bei Ärem Aendokter zu Mamer a fannt d’Adress, d’Telefonsnummer an de Wee bei d’Praxis.',
    bookingTitle: 'Online reservéieren',
    bookingPanelTitle: 'Wielt Är Plattform',
    bookingText:
      'Kuckt déi fräi Rendez-vousen a schléisst d’Reservatioun op der Plattform vun Ärer Wiel of.',
    doctenaLabel: 'Op Doctena reservéieren',
    doctiproLabel: 'Op Doctipro reservéieren',
    phoneTitle: 'Eng Fro virun der Reservatioun?',
    detailsTitle: 'Äre Besuch am Iwwerbléck',
    confirmationTitle: 'Ëffnungszäiten nach ze bestätegen',
    confirmationText:
      'Frot wgl. virun Ärem Besuch bei der Praxis no, ob dës Ëffnungszäite stëmmen.',
    directionsLabel: 'Wee op Google Maps opmaachen',
  },
  photos: {
    exteriorWide: 'Breet Baussenopnam vun de Raimlechkeeten zu Mamer mat Fassad a Strooss',
    exterior: 'Vue vun no op d’Fassad vun de Raimlechkeete vun der Praxis zu Mamer',
    consultation: 'Consultatiounsraum mat Schreifdësch, groe Stull a Lëtzebuerger Fändel',
    examination: 'Raum fir Aenënnersichunge mat roude Stull a Schreifdësch',
    examinationAlternate: 'Eng aner Vue op den Ënnersichungsraum mat roude Stull an Instrumenter',
    streetReference:
      'Vue op d’Strooss zu Mamer mat engem Schëld fir verschidde Geschäfter an dem Trottoir',
  },
};
