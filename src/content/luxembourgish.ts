import { practice } from '../config/practice';
import { legalContent } from './legal';
import type { Translation } from './translations';

// Luxembourgish patient information follows the same factual scope as French and English.
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
    legal: legalContent.lb.pages.legal.title,
    privacy: legalContent.lb.pages.privacy.title,
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
    eyebrow: `${practice.brandName} · Aepraxis zu Mamer`,
    line1: 'Är Siicht.',
    line2: 'Eis Suergfalt.',
    intro: 'Aebetreiung fir Erwuessener a Kanner zu Mamer.',
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
    text: 'A menger Praxis zu Mamer empfänken ech Iech fir Är Siicht an d’Gesondheet vun Ären Aen. Bei der Consultatioun schwätze mir iwwer Är Problemer mat den Aen, Är Siichtkorrektur an déi nächst Schrëtt an Ärer Betreiung.',
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
      'Fréier als « attaché des hôpitaux de Paris » täteg',
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
      { name: 'Ophtalmologie fir Kanner', detail: 'Siicht a visuell Entwécklung vum Kand' },
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
    ratingLabel: 'Google-Bewäertungen',
    liveAction: 'Aktuell Bewäertungen op Google Maps kucken',
    quotes: [
      'Ech hu besonnesch seng Professionalitéit, seng Grëndlechkeet a seng Opmierksamkeet geschätzt.',
      'Ech war wéinst Aeschmäerzen do. Den Aendokter war ganz kompetent an huet gutt nogelauschtert. Ech kann hie recommandéieren.',
      'Exzellente Dokter, immens recommandéiert.',
      'Häerze Wëllkomm an immens professionell.',
      'Ech war gëschter zum ersten Rendezvous, an ech hu keng eenzeg Kloen! Super professionell, opmierksom a frëndlech! Ech recommandéieren si immens.',
      'De Fachdokter huet e grousse Professionnalismus gewisen. Hien ass ganz gedëlleg a léif. Ech recommandéieren hien zu 100 %.',
    ],
    source: 'Google-Bewäertung',
    verifiedTag: 'Verifizéiert Google-Bewäertung',
    starsAria: '5 vu 5 Stären',
    pauseLabel: 'Automatescht Scrollen pauséieren',
    resumeLabel: 'Automatescht Scrollen weiderféieren',
    pauseText: 'Paus',
    resumeText: 'Weider',
    note: 'Auszich aus Google-Bewäertungen an der Sprooch vun dëser Säit. Déi ursprénglech Bewäertunge fannt Dir iwwer d’Linken hei uewen.',
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
        answer: `D’Praxis ass op der ${practice.address.street}, ${practice.address.postalCity}, zu Lëtzebuerg. D’Kontaktdaten an de Wee fannt Dir op der Säit Wee & Kontakt.`,
        linkLabel: 'Adress a Wee',
        href: '#contact',
      },
      {
        question: 'Wéi eng Sprooche ginn an der Praxis geschwat?',
        answer:
          'D’Consultatioune kënnen op Franséisch oder Englesch stattfannen. Dës Websäit ass op Franséisch, Englesch a Lëtzebuergesch disponibel. Fir eng aner Consultatiounssprooch, kontaktéiert d’Praxis beim Reservéieren.',
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
    hoursDays: { friday: 'Freideg', saturday: 'Samschdeg', sunday: 'Sonndeg' },
    hoursNote: 'Consultatiounen op Rendez-vous.',
    hoursSource: 'Ëffnungszäite vun der Praxis op Doctena',
    mapTitle: 'Lag vun der Praxis Ophtalmo Luxembourg zu Mamer',
    country: 'Lëtzebuerg',
  },
  footer: {
    descriptor: 'Aepraxis zu Mamer',
    rightsReserved: 'All Rechter virbehalen.',
    closing: 'Är Siicht. Eis Suergfalt.',
    top: 'Zréck no uewen',
  },
  pageMeta: {
    legal: { title: `${legalContent.lb.pages.legal.title} | ${practice.name}`, description: legalContent.lb.pages.legal.description },
    privacy: { title: `${legalContent.lb.pages.privacy.title} | ${practice.name}`, description: legalContent.lb.pages.privacy.description },
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
      'Ech sinn den Dr M’Hamed EL HIRECH, Aendokter zu Mamer, Lëtzebuerg. Ech empfänken Iech fir eng Aebetreiung, déi op Är Situatioun ofgestëmmt ass.',
    photoLabel: 'An der Praxis zu Mamer',
    photoNote:
      'De Consultatiounsbüro vun der Praxis op der 110 Route d’Arlon.',
    profileTitle: 'Ären Aespezialist',
    profileText:
      'Ech hunn op der medezinescher Fakultéit zu Besançon ofgeschloss a war als Spidolsassistent, Spidolsdokter an als « attaché des hôpitaux de Paris » täteg. Haut empfänken ech Erwuessener a Kanner a menger Praxis zu Mamer.',
    profilesTitle: 'Meng berufflech Profiller',
    proofLabel: 'Ausbildung & berufflech Praxis',
    proofTitle: 'Erfarung fir Är Aegesondheet.',
    proofIntro:
      'Eng medezinesch Ausbildung zu Besançon, Spidolserfarung a Frankräich an eng Aschreiwung beim Collège médical vu Lëtzebuerg.',
    evidence: [
      {
        title: 'Medezinesch Ausbildung',
        description:
          'Ofschloss op der medezinescher Fakultéit zu Besançon, a Frankräich. Mäi beruffleche Parcours steet op mengem Doctena-Profil.',
        sourceLabel: 'Parcours op Doctena',
        sourceUrl: practice.profileUrl,
      },
      {
        title: 'Spidolserfarung',
        description:
          'Fréier Spidolsassistent a Spidolsdokter, souwéi als « attaché des hôpitaux de Paris » täteg.',
        sourceLabel: 'Beruffleche Profil',
        sourceUrl: practice.profileUrl,
      },
      {
        title: 'Berufflech Aschreiwung',
        description:
          'Beim Collège médical vu Lëtzebuerg als Fachdokter fir Ophtalmologie ageschriwwen, mat enger Praxis zu Mamer.',
        sourceLabel: 'Register vum Collège médical',
        sourceUrl: practice.registrationUrl,
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
      'Eng Ännerung vun der Siicht, eng nei Korrektur oder eng Aekontroll: entdeckt déi verschidde Consultatiounsberäicher. D’Ënnersichungen an d’Behandlunge ginn no Ärer perséinlecher Situatioun gewielt.',
    detailsTitle: 'Consultatiounsberäicher',
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
        text: 'Ënnersichung vun der Siicht an der visueller Entwécklung vum Kand.',
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
        text: 'Ënnersichung, Behandlungsméiglechkeeten a Begleedung bei enger méiglecher Operatioun.',
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
    careNoteTitle: 'Eng Betreiung fir Är Situatioun',
    careNoteText:
      'Eng Consultatioun hëlleft, eng Diagnos ze stellen an déi méiglech Behandlungen ze beschwätzen. Wann eng Operatioun a Fro kënnt, erkläert den Dokter Iech hiren Notzen, hir Risiken, de Standuert an d’Nobetreiung. D’Informatiounen op dëser Säit bedeiten net, datt eng Operatioun an der Praxis zu Mamer stattfënnt.',
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
    entrancePhotoLabel: 'D’Praxis zu Mamer',
    entrancePhotoNote:
      'D’Gebai vun der Praxis op der 110 Route d’Arlon zu Mamer.',
    entranceDetailCaption: 'D’Entrée vum Gebai',
    entranceDetailAlt: 'Vue vun der rout agerummter Glasdier an der Fassad vum Gebai zu Mamer',
    hoursLink: 'Ëffnungszäiten a Kontaktdaten ukucken',
    arrivalNotes: [
      {
        title: 'Entrée & Ukonft',
        text: 'D’Praxis läit um Rez-de-chaussée op der 110 Route d’Arlon. Plangt Äre Wee mam Itinéraire an haalt Är Rendez-vous-Bestätegung prett.',
      },
      {
        title: 'Äre Besuch virbereeden',
        text: 'Bréngt Äre Brëll, Är Verschreiwung a fréier Rapporte vun Aenënnersichunge mat, wann Dir der hutt. Fir Froen iwwer d’Parken oder e spezielle Besoin beim Accès, rufft d’Praxis virum Besuch un.',
      },
    ],
    galleryLabel: 'An der Praxis',
    galleryTitle: 'D’Raim vun der Praxis',
    galleryIntro:
      'Entdeckt den Ënnersichungsraum an de Consultatiounsbüro vun der Praxis zu Mamer.',
    galleryCaptions: ['Den Ënnersichungsraum', 'Eng aner Vue vum Ënnersichungsraum', 'De Consultatiounsbüro'],
    bookingLabel: 'Virum Besuch reservéieren',
    bookingTitle: 'Prett fir Äre Besuch?',
    bookingIntro: 'Kuckt déi fräi Rendez-vousen a reservéiert op der Plattform vun Ärer Wiel.',
  },
  contactPage: {
    label: 'Rendez-vous zu Mamer',
    title: 'Maacht e Rendez-vous.',
    emphasis: 'Bereet Äre Besuch vir.',
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
    hoursText:
      'Ëffnungszäite vun der Praxis, wéi se op Doctena stinn. D’Disponibilitéite kënnen tëscht de Plattformen ofwäichen: kommt zu der Zäit, déi an Ärer Reservatioun bestätegt ass.',
    directionsLabel: 'Wee op Google Maps opmaachen',
  },
  whatsappForm: {
    label: 'Direkt Noriicht · WhatsApp',
    title: 'Eng Fro un d’Praxis?',
    intro: 'Schreift Är Noriicht hei, kontrolléiert se dono a schéckt se iwwer WhatsApp.',
    name: 'Ären Numm',
    subject: 'Wourëms geet Är Fro?',
    subjectPlaceholder: 'Wielt en Thema',
    subjects: ['Praktesch Fro', 'Virun engem Rendez-vous', 'Aner Ufro'],
    message: 'Är Noriicht',
    messagePlaceholder: 'Schreift Är Fro hei…',
    submit: 'Weider op WhatsApp',
    note: 'D’Noriicht gëtt net automatesch geschéckt. Dir musst a WhatsApp op Schécken drécken.',
    privacy: 'Gitt hei keng sensibel medezinesch Donnéeën un. Fir e Rendez-vous benotzt Doctena oder Doctipro.',
    link: 'Iwwer WhatsApp schreiwen',
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
