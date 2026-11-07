import { practice } from '../config/practice';

export type LegalPage = 'legal' | 'privacy';

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  links?: { label: string; href: string }[];
}

interface LegalLocaleContent {
  label: string;
  updatedLabel: string;
  updatedDate: string;
  navigationLabel: string;
  relatedNavigationLabel: string;
  contactLabel: string;
  pages: Record<LegalPage, {
    title: string;
    description: string;
    intro: string;
    sections: LegalSection[];
  }>;
}

const email = `mailto:${practice.email}`;
const sources = {
  register: 'https://collegemedical.lu/fr/professionals?id=44',
  medicalRules: 'https://strapi.collegemedical.lu/uploads/Code_de_deontologie_medicale_2025_b50d842a47.pdf',
  medicalPublic: 'https://collegemedical.lu/fr/documentation/public',
  healthMinistry: 'https://m3s.gouvernement.lu/fr.html',
  vercelPrivacy: 'https://vercel.com/legal/privacy-notice',
  vercelDpa: 'https://vercel.com/legal/dpa',
  googlePrivacy: 'https://policies.google.com/privacy',
  googleTransfers: 'https://policies.google.com/privacy/frameworks',
  googleControls: 'https://myaccount.google.com/data-and-privacy',
  doctenaPrivacy: 'https://trust.doctena.com/privacy-policy/',
  doctiproPrivacy: 'https://www.doctipro.lu/fr/about-us',
  cnpd: 'https://cnpd.public.lu/fr/particuliers/faire-valoir.html',
  erasure: 'https://cnpd.public.lu/fr/particuliers/vos-droits/droit-oubli.html',
};

/** Public notices for the website's implemented services, not patient medical records. */
export const legalContent: Record<'fr' | 'en' | 'lb', LegalLocaleContent> = {
  fr: {
    label: 'Informations légales',
    updatedLabel: 'Dernière mise à jour',
    updatedDate: '7 novembre 2026',
    navigationLabel: 'Dans cette page',
    relatedNavigationLabel: 'Pages utiles',
    contactLabel: 'Contacter le cabinet',
    pages: {
      legal: {
        title: 'Mentions légales',
        description: 'Éditeur, cadre professionnel et conditions d’utilisation du site du Dr M’Hamed EL HIRECH à Mamer.',
        intro: 'Les informations ci-dessous identifient le responsable du site et précisent le cadre de son utilisation.',
        sections: [
          {
            id: 'publisher',
            title: 'Éditeur et responsable de publication',
            paragraphs: [
              `${practice.doctor} édite ce site à titre individuel et en assume la responsabilité éditoriale. « ${practice.name} » est le nom utilisé pour présenter son activité ; il ne désigne pas une société éditrice distincte.`,
            ],
          },
          {
            id: 'profession',
            title: 'Profession et cadre déontologique',
            paragraphs: [
              `${practice.doctor} est présenté dans le registre ordinal du Collège médical comme médecin spécialiste en ophtalmologie, à Mamer, au Luxembourg. Le Collège médical est l’ordre professionnel compétent. Le ministère de la Santé et de la Sécurité sociale est l’autorité compétente pour les autorisations d’exercer.`,
              'Son profil professionnel mentionne une formation médicale à Besançon, en France. Les informations sur son parcours figurent sur la page « Le médecin ». Les règles professionnelles applicables sont accessibles auprès du Collège médical.',
            ],
            links: [
              { label: 'Registre ordinal du Collège médical — ophtalmologie', href: sources.register },
              { label: 'Code de déontologie médicale', href: sources.medicalRules },
              { label: 'Informations du Collège médical pour le public', href: sources.medicalPublic },
              { label: 'Ministère de la Santé et de la Sécurité sociale', href: sources.healthMinistry },
            ],
          },
          {
            id: 'hosting',
            title: 'Hébergement',
            paragraphs: [
              'Le site est actuellement hébergé par Vercel Inc., une société basée aux États-Unis. Son réseau assure la diffusion des pages et des fichiers ainsi que la protection technique du service. Les informations de confidentialité et les conditions de traitement publiées par Vercel sont accessibles ci-dessous.',
            ],
            links: [
              { label: 'Informations de confidentialité de Vercel', href: sources.vercelPrivacy },
              { label: 'Conditions de traitement des données de Vercel', href: sources.vercelDpa },
            ],
          },
          {
            id: 'medical-information',
            title: 'Information médicale et urgences',
            paragraphs: [
              'Ce site présente le cabinet et fournit des informations générales sur les soins oculaires. Il ne réalise aucun diagnostic, consultation ou prescription en ligne et ne remplace pas une évaluation médicale individuelle. Les examens et traitements adaptés sont déterminés avec le médecin.',
              'En cas d’urgence médicale, appelez le 112. Le courriel du cabinet et les liens de rendez-vous ne sont pas des services d’urgence. Pour transmettre des informations de santé confidentielles, contactez le cabinet afin de convenir d’un moyen d’échange adapté.',
              'Les informations pratiques peuvent évoluer. Vous pouvez signaler une erreur au cabinet ; pour une question concernant votre situation personnelle, contactez directement le médecin.',
            ],
          },
          {
            id: 'intellectual-property',
            title: 'Droits d’auteur',
            paragraphs: [
              `Les créations originales propres à ce site, notamment ses textes, sa conception et son code spécifique, sont protégées par le droit d’auteur. ${practice.doctor} est le titulaire des droits sur ces créations, dans la mesure des droits qui lui appartiennent. Tous droits réservés.`,
              'Les photographies, polices de caractères, bibliothèques et autres éléments utilisés sous licence restent soumis aux droits et conditions de leurs titulaires respectifs. La mention de copyright du site ne transfère pas ces droits.',
              'Toute reproduction ou réutilisation nécessite l’autorisation du titulaire concerné, sauf dans les cas permis par la loi, notamment les exceptions légales applicables à la copie privée ou à la citation.',
            ],
          },
          {
            id: 'external-links',
            title: 'Liens et services externes',
            paragraphs: [
              'Les liens vers Doctena, Doctipro, Google Maps et les ressources professionnelles ouvrent des services externes. Leurs conditions d’utilisation et leurs informations de confidentialité s’appliquent à l’utilisation de ces services. Le site ne remplace pas leurs interfaces de réservation.',
              'La page « Confidentialité et cookies » explique les données techniques nécessaires à ce site et le fonctionnement de la carte Google Maps intégrée.',
            ],
          },
        ],
      },
      privacy: {
        title: 'Confidentialité et cookies',
        description: 'Données du site, hébergement, carte Google Maps, réservation externe et droits relatifs à vos données personnelles.',
        intro: 'Cette notice décrit le fonctionnement du site public et les traitements de données liés aux services externes utilisés. Elle ne concerne pas la tenue des dossiers médicaux du cabinet.',
        sections: [
          {
            id: 'controller',
            title: 'Responsable du traitement',
            paragraphs: [
              `${practice.doctor} est responsable des traitements liés à ce site. Pour toute question ou demande relative à vos données, utilisez le courriel ou l’adresse professionnelle ci-dessous.`,
              'Le site ne propose pas de compte utilisateur et n’intègre pas d’outil de mesure d’audience ou de publicité. Ses polices de caractères et ses images sont servies avec les fichiers du site, sans chargement depuis une plateforme de polices externe.',
            ],
          },
          {
            id: 'technical-data',
            title: 'Données techniques nécessaires',
            paragraphs: [
              'L’accès aux pages transmet à l’hébergeur les données nécessaires à leur livraison et à la sécurité : notamment l’adresse IP, les informations du navigateur, l’adresse de la page demandée et la date et l’heure de la requête. Vercel et les personnes habilitées à assurer la maintenance peuvent traiter les informations nécessaires à ces opérations.',
              'Ces opérations reposent sur l’intérêt légitime de fournir un site fonctionnel et de le protéger contre les abus, conformément à l’article 6, paragraphe 1, point f), du RGPD. Ces données ne servent pas à établir un profil publicitaire sur ce site.',
            ],
            links: [{ label: 'Informations sur le traitement par Vercel', href: sources.vercelPrivacy }],
          },
          {
            id: 'contact',
            title: 'Lorsque vous contactez le cabinet',
            paragraphs: [
              'Si vous appelez ou écrivez, vos coordonnées et les informations que vous fournissez sont utilisées pour vous répondre et traiter votre demande. Vous les communiquez volontairement ; seules les informations nécessaires pour vous répondre sont requises. Selon la nature de votre demande, le traitement repose sur les démarches précontractuelles demandées par vous (article 6, paragraphe 1, point b), du RGPD) ou sur l’intérêt légitime de répondre aux demandes d’information (article 6, paragraphe 1, point f)).',
              `Au sein du cabinet, seul ${practice.doctor} accède à la boîte de messagerie utilisée pour les demandes de renseignements.`,
              'L’adresse de contact utilise Gmail, un service de Google qui assure l’acheminement et l’hébergement des messages. Le site ne collecte pas le contenu de ces échanges. Évitez d’envoyer des documents ou détails médicaux sensibles par courriel ordinaire ; appelez le cabinet pour convenir d’un moyen de communication adapté.',
              'Le formulaire WhatsApp prépare le message dans votre navigateur et ouvre WhatsApp uniquement lorsque vous appuyez sur le bouton. Le site ne reçoit ni ne conserve le texte saisi. Vous vérifiez puis envoyez vous-même le message dans WhatsApp ; ce service traite alors les informations selon ses propres règles. Ne transmettez pas de données médicales sensibles par ce formulaire.',
            ],
            links: [{ label: 'Informations de confidentialité de Google', href: sources.googlePrivacy }],
          },
          {
            id: 'storage',
            title: 'Stockage fonctionnel dans votre navigateur',
            paragraphs: [
              'Lorsque vous changez de langue, le site utilise le stockage de session de votre navigateur pour retrouver votre position de lecture. L’entrée « ophtalmo-language-position » contient la page et la position nécessaires à cette action ; elle ne sert pas au suivi de votre navigation.',
              'Cette position est valable pendant 15 secondes et l’entrée est supprimée lorsque la page suivante la lit. Si elle n’est pas lue, elle reste dans le stockage de session de l’onglet, sans être réutilisée après ce délai. Ce stockage est strictement fonctionnel et distinct des éventuels cookies utilisés par Google Maps.',
            ],
          },
          {
            id: 'map',
            title: 'Carte Google Maps intégrée',
            paragraphs: [
              'La page de contact contient une carte Google Maps qui se charge automatiquement, sans demande de confirmation sur ce site. Le chargement de la carte établit une connexion avec Google. L’adresse du cabinet et un lien d’itinéraire ouvrant Google Maps séparément sont également disponibles.',
              'La carte permet de situer le cabinet, de vous orienter et de préparer votre venue. Pour la connexion technique permettant de l’afficher, le cabinet se fonde sur son intérêt légitime à aider les visiteurs à trouver et rejoindre le cabinet, conformément à l’article 6, paragraphe 1, point f), du RGPD. Google traite également des informations pour ses propres finalités, décrites dans sa politique de confidentialité.',
              'Lors du chargement de la carte, Google reçoit des informations techniques, notamment votre adresse IP, des informations sur votre navigateur ainsi que la date et l’heure de la requête et, selon le navigateur, l’adresse de la page d’origine. Pour les visiteurs de l’Espace économique européen, l’entité Google responsable est Google Ireland Limited. Google peut utiliser des cookies et traiter des données aux États-Unis ou dans d’autres pays conformément à ses propres règles, accessibles ci-dessous.',
              'Vous pouvez gérer ou bloquer les cookies dans les paramètres de votre navigateur et consulter vos paramètres de confidentialité Google. Le blocage des cookies ou des contenus tiers peut limiter le fonctionnement de la carte. Le site ne supprime pas les cookies de Google et ne dispose pas d’un réglage permettant de désactiver ceux-ci dans la carte intégrée.',
            ],
            links: [
              { label: 'Confidentialité de Google', href: sources.googlePrivacy },
              { label: 'Paramètres de confidentialité de Google', href: sources.googleControls },
            ],
          },
          {
            id: 'booking',
            title: 'Rendez-vous sur Doctena et Doctipro',
            paragraphs: [
              'Les boutons de réservation ouvrent Doctena ou Doctipro. Vous saisissez vos informations sur la plateforme choisie, et non dans un formulaire de ce site. Aucun formulaire de réservation ni outil de suivi de ces plateformes n’est chargé automatiquement ici.',
              'Les plateformes et le professionnel traitent les données nécessaires à la réservation selon leurs rôles respectifs. Leurs notices précisent le fonctionnement du service, les destinataires, les durées de conservation et vos droits. Consultez-les avant de transmettre vos informations.',
            ],
            links: [
              { label: 'Confidentialité de Doctena', href: sources.doctenaPrivacy },
              { label: 'Informations et confidentialité de Doctipro', href: sources.doctiproPrivacy },
            ],
          },
          {
            id: 'transfers-retention',
            title: 'Destinataires, transferts et conservation',
            paragraphs: [
              'Les services d’hébergement, de messagerie et de cartographie peuvent traiter des données hors de l’Espace économique européen, notamment aux États-Unis. Vercel indique participer au cadre de protection des données UE–États-Unis. Google décrit le recours aux décisions d’adéquation, la participation de Google LLC à ce cadre et, lorsque nécessaire, aux clauses contractuelles types. Les conditions de traitement de Vercel décrivent également ces clauses pour les comptes auxquels elles s’appliquent.',
              'Les documents des fournisseurs, liés ci-dessous, expliquent ces garanties. Vous pouvez demander au cabinet ou au fournisseur concerné des précisions ou une copie des garanties applicables. La page de Google sur les transferts indique notamment comment demander une copie de ses clauses contractuelles types.',
              'Les données techniques sont conservées pour la durée nécessaire à la diffusion, à la sécurité et au traitement des incidents, selon les services et règles de conservation de l’hébergeur.',
              'Le médecin indique conserver actuellement la correspondance électronique du cabinet indéfiniment, sans délai de suppression prédéfini. Vous pouvez demander l’effacement de vos données dans les conditions expliquées ci-dessous.',
              'Les services de carte et de réservation appliquent leurs propres durées de conservation. Le stockage fonctionnel du site suit les limites décrites ci-dessus. Pour connaître les données conservées dans votre cas, vous pouvez contacter le cabinet ou le fournisseur concerné.',
            ],
            links: [
              { label: 'Confidentialité et transferts de Vercel', href: sources.vercelPrivacy },
              { label: 'Conditions de traitement des données de Vercel', href: sources.vercelDpa },
              { label: 'Transferts de Google et garanties applicables', href: sources.googleTransfers },
            ],
          },
          {
            id: 'rights',
            title: 'Vos droits',
            paragraphs: [
              'Selon les conditions prévues par le RGPD, vous pouvez demander l’accès à vos données, leur rectification ou leur effacement, la limitation du traitement et, lorsque cela s’applique, leur portabilité. Vous pouvez vous opposer à un traitement fondé sur l’intérêt légitime pour des raisons liées à votre situation et retirer un consentement sans remettre en cause les traitements antérieurs licites.',
              'Le droit à l’effacement n’est pas absolu : certaines données peuvent devoir être conservées pour respecter une obligation légale ou pour la constatation, l’exercice ou la défense de droits en justice.',
              `Adressez votre demande à ${practice.email} ou à l’adresse professionnelle indiquée ci-dessus. Une vérification proportionnée de votre identité peut être nécessaire. Vous pouvez également déposer une réclamation auprès de la Commission nationale pour la protection des données (CNPD), au Luxembourg.`,
              'Ce site ne prend aucune décision automatisée produisant des effets juridiques ou comparables à votre égard et ne réalise aucun profilage.',
            ],
            links: [
              { label: 'Contacter le responsable du traitement', href: email },
              { label: 'Droit à l’effacement : informations de la CNPD', href: sources.erasure },
              { label: 'Faire valoir vos droits auprès de la CNPD', href: sources.cnpd },
            ],
          },
          {
            id: 'changes',
            title: 'Évolution de cette notice',
            paragraphs: [
              'Cette notice est mise à jour lorsque le fonctionnement du site ou les services utilisés évoluent. La date affichée en haut de la page indique la dernière mise à jour.',
            ],
          },
        ],
      },
    },
  },
  en: {
    label: 'Legal information',
    updatedLabel: 'Last updated',
    updatedDate: '7 November 2026',
    navigationLabel: 'On this page',
    relatedNavigationLabel: 'Related pages',
    contactLabel: 'Contact the practice',
    pages: {
      legal: {
        title: 'Legal notice',
        description: 'Publisher, professional framework and website terms for Dr M’Hamed EL HIRECH in Mamer.',
        intro: 'The information below identifies the person responsible for this website and explains how it may be used.',
        sections: [
          {
            id: 'publisher',
            title: 'Publisher and editorial responsibility',
            paragraphs: [
              `${practice.doctor} publishes this website in his individual capacity and is responsible for its editorial content. “${practice.name}” is the name used to present his practice; it does not identify a separate publishing company.`,
            ],
          },
          {
            id: 'profession',
            title: 'Profession and professional rules',
            paragraphs: [
              `${practice.doctor} is listed in the Collège médical’s professional register as a specialist in ophthalmology in Mamer, Luxembourg. The Collège médical is the relevant professional body. The Ministry of Health and Social Security is the authority responsible for authorisation to practise.`,
              'His professional profile describes medical training in Besançon, France. Information about his background appears on “The doctor” page. The applicable professional rules are available from the Collège médical.',
            ],
            links: [
              { label: 'Collège médical professional register — ophthalmology', href: sources.register },
              { label: 'Medical code of ethics', href: sources.medicalRules },
              { label: 'Collège médical information for the public', href: sources.medicalPublic },
              { label: 'Ministry of Health and Social Security', href: sources.healthMinistry },
            ],
          },
          {
            id: 'hosting',
            title: 'Hosting',
            paragraphs: [
              'Vercel Inc., a company based in the United States, currently hosts this website. Its network delivers the pages and files and provides technical protection for the service. Vercel’s published privacy information and data processing terms are available below.',
            ],
            links: [
              { label: 'Vercel privacy information', href: sources.vercelPrivacy },
              { label: 'Vercel data processing terms', href: sources.vercelDpa },
            ],
          },
          {
            id: 'medical-information',
            title: 'Medical information and emergencies',
            paragraphs: [
              'This website introduces the practice and provides general eye care information. It does not provide online diagnosis, consultation or prescriptions and does not replace an individual medical assessment. Appropriate examinations and treatment are determined with the doctor.',
              'For a medical emergency, call 112. The practice email and appointment links are not emergency services. To share confidential health information, contact the practice to arrange a suitable communication method.',
              'Practical information may change. You can report an error to the practice; for a question about your personal circumstances, contact the doctor directly.',
            ],
          },
          {
            id: 'intellectual-property',
            title: 'Copyright',
            paragraphs: [
              `Original work created for this website, including its text, design and custom code, is protected by copyright. ${practice.doctor} holds the rights in these works to the extent that those rights belong to him. All rights reserved.`,
              'Licensed photographs, fonts, libraries and other materials remain subject to the rights and terms of their respective owners. The website copyright notice does not transfer those rights.',
              'Reproduction or reuse requires the relevant rights holder’s permission, except where permitted by law, including applicable exceptions for private copying or quotation.',
            ],
          },
          {
            id: 'external-links',
            title: 'External links and services',
            paragraphs: [
              'Links to Doctena, Doctipro, Google Maps and professional resources open external services. Their terms and privacy information apply when you use them. This website does not replace their booking interfaces.',
              'The “Privacy and cookies” page explains the technical data needed by this website and how its embedded Google Map works.',
            ],
          },
        ],
      },
      privacy: {
        title: 'Privacy and cookies',
        description: 'Website data, hosting, Google Maps, external booking and your personal data rights.',
        intro: 'This notice describes the public website and data processing associated with the external services it uses. It does not cover the practice’s management of patient medical records.',
        sections: [
          {
            id: 'controller',
            title: 'Data controller',
            paragraphs: [
              `${practice.doctor} is responsible for data processing associated with this website. For questions or requests about your data, use the email or professional address below.`,
              'The website has no user account and includes no audience analytics or advertising tool. Its fonts and images are served with the website files, without loading fonts from an external font platform.',
            ],
          },
          {
            id: 'technical-data',
            title: 'Necessary technical data',
            paragraphs: [
              'Opening a page sends the host the data needed to deliver it and maintain security, including your IP address, browser information, the requested page address and the request date and time. Vercel and authorised maintenance personnel may process the information needed for these operations.',
              'These operations rely on the legitimate interest in providing a working website and protecting it against misuse, under Article 6(1)(f) GDPR. This website does not use this data to build an advertising profile.',
            ],
            links: [{ label: 'Information about Vercel’s data processing', href: sources.vercelPrivacy }],
          },
          {
            id: 'contact',
            title: 'When you contact the practice',
            paragraphs: [
              'If you call or write, your contact details and the information you provide are used to respond and handle your request. Providing them is voluntary; only the information needed to reply is required. Depending on the request, processing relies on steps you ask us to take before entering a contract (Article 6(1)(b) GDPR) or the legitimate interest in answering information enquiries (Article 6(1)(f)).',
              `Within the practice, only ${practice.doctor} accesses the email account used for enquiries.`,
              'The contact address uses Gmail, a Google service that delivers and stores messages. The website does not collect the content of these exchanges. Avoid sending sensitive medical details or documents through ordinary email; call the practice to arrange an appropriate communication method.',
              'The WhatsApp form prepares your message in your browser and opens WhatsApp only when you press the button. This website does not receive or store the text you enter. You review and send the message yourself in WhatsApp, which then processes the information under its own rules. Do not share sensitive medical details through this form.',
            ],
            links: [{ label: 'Google privacy information', href: sources.googlePrivacy }],
          },
          {
            id: 'storage',
            title: 'Functional browser storage',
            paragraphs: [
              'When you change language, the website uses your browser’s session storage to restore your reading position. The “ophtalmo-language-position” entry contains the page and position needed for this action; it is not used to track your browsing.',
              'The position is valid for 15 seconds and the entry is removed when the next page reads it. If it is not read, it remains in the tab’s session storage and is not reused after that time limit. This storage is strictly functional and separate from any cookies used by Google Maps.',
            ],
          },
          {
            id: 'map',
            title: 'Embedded Google Maps',
            paragraphs: [
              'The contact page contains a Google Map that loads automatically, without a confirmation prompt on this website. Loading the map establishes a connection to Google. The practice address and a directions link that opens Google Maps separately are also available.',
              'The map shows the practice’s location and helps you orient yourself and plan your visit. For the technical connection used to display it, the practice relies on its legitimate interest in helping visitors find and reach the practice, under Article 6(1)(f) GDPR. Google also processes information for its own purposes, described in its privacy policy.',
              'When the map loads, Google receives technical information including your IP address, browser details, the request date and time and, depending on the browser, the referring page address. For visitors in the European Economic Area, the responsible Google entity is Google Ireland Limited. Google may use cookies and process data in the United States or other countries under its own policies, linked below.',
              'You can manage or block cookies through your browser settings and review your Google privacy settings. Blocking cookies or third-party content may limit the map’s functionality. This website does not delete Google cookies and has no setting that disables them within the embedded map.',
            ],
            links: [
              { label: 'Google privacy policy', href: sources.googlePrivacy },
              { label: 'Google privacy settings', href: sources.googleControls },
            ],
          },
          {
            id: 'booking',
            title: 'Appointments through Doctena and Doctipro',
            paragraphs: [
              'Booking buttons open Doctena or Doctipro. You enter your information on the chosen platform, rather than in a form on this website. No booking form or tracking tool from these platforms loads automatically here.',
              'The platforms and the medical professional process the data needed for bookings according to their respective roles. Their notices explain the service, recipients, retention periods and your rights. Please read them before submitting your information.',
            ],
            links: [
              { label: 'Doctena privacy policy', href: sources.doctenaPrivacy },
              { label: 'Doctipro information and privacy policy', href: sources.doctiproPrivacy },
            ],
          },
          {
            id: 'transfers-retention',
            title: 'Recipients, transfers and retention',
            paragraphs: [
              'Hosting, email and map services may process data outside the European Economic Area, including in the United States. Vercel states that it participates in the EU–US Data Privacy Framework. Google describes using adequacy decisions, Google LLC’s participation in that framework and, where needed, standard contractual clauses. Vercel’s published data processing terms also describe these clauses for accounts covered by those terms.',
              'The linked provider documents explain these safeguards. You can ask the practice or the relevant provider for further information or a copy of applicable safeguards. Google’s transfer page explains how to request a copy of its standard contractual clauses.',
              'Technical data is retained for as long as needed for delivery, security and incident handling, according to the host’s services and retention rules.',
              'The doctor states that the practice currently keeps email correspondence indefinitely, without a predefined deletion period. You can request deletion of your personal data under the conditions explained below.',
              'Map and booking services apply their own retention periods. The website’s functional storage follows the limits explained above. To ask which data is retained in your case, contact the practice or the relevant provider.',
            ],
            links: [
              { label: 'Vercel privacy and transfers', href: sources.vercelPrivacy },
              { label: 'Vercel data processing terms', href: sources.vercelDpa },
              { label: 'Google transfers and applicable safeguards', href: sources.googleTransfers },
            ],
          },
          {
            id: 'rights',
            title: 'Your rights',
            paragraphs: [
              'Subject to the GDPR’s conditions, you can request access, correction or deletion of your data, restriction of processing and, where applicable, data portability. You can object to processing based on legitimate interests for reasons relating to your circumstances and withdraw consent without affecting earlier lawful processing.',
              'The right to deletion is not absolute: some data may need to be kept to comply with a legal obligation or to establish, exercise or defend legal claims.',
              `Send your request to ${practice.email} or the professional address above. A proportionate identity check may be needed. You can also complain to Luxembourg’s National Commission for Data Protection (CNPD).`,
              'This website does not make automated decisions with legal or similarly significant effects on you and does not carry out profiling.',
            ],
            links: [
              { label: 'Contact the data controller', href: email },
              { label: 'Right to deletion: CNPD information', href: sources.erasure },
              { label: 'Exercise your rights through the CNPD', href: sources.cnpd },
            ],
          },
          {
            id: 'changes',
            title: 'Updates to this notice',
            paragraphs: [
              'This notice is updated when the website or the services it uses change. The date at the top of the page identifies the latest update.',
            ],
          },
        ],
      },
    },
  },
  lb: {
    label: 'Rechtlech Informatiounen',
    updatedLabel: 'Lescht Aktualiséierung',
    updatedDate: '7. November 2026',
    navigationLabel: 'Op dëser Säit',
    relatedNavigationLabel: 'Weider Säiten',
    contactLabel: 'D’Praxis kontaktéieren',
    pages: {
      legal: {
        title: 'Rechtlech Hiweiser',
        description: 'Editeur, beruffleche Kader an Notzung vun der Websäit vum Dr M’Hamed EL HIRECH zu Mamer.',
        intro: 'Déi folgend Informatiounen nennen déi Persoun, déi fir d’Websäit verantwortlech ass, an erklären de Kader vun hirer Notzung.',
        sections: [
          {
            id: 'publisher',
            title: 'Editeur a redaktionell Verantwortung',
            paragraphs: [
              `${practice.doctor} gëtt dës Websäit als Eenzelpersoun eraus an ass fir hiren Inhalt verantwortlech. „${practice.name}“ ass den Numm, ënner deem seng Praxis presentéiert gëtt; et ass keng separat Gesellschaft, déi d’Websäit erausgëtt.`,
            ],
          },
          {
            id: 'profession',
            title: 'Beruff a berufflech Reegelen',
            paragraphs: [
              `${practice.doctor} steet am Beruffsregister vum Collège médical als Dokter, spezialiséiert op Ophtalmologie, zu Mamer, Lëtzebuerg. De Collège médical ass déi zoustänneg berufflech Instanz. De Ministère fir Gesondheet a sozial Sécherheet ass déi zoustänneg Autoritéit fir d’Autorisatiounen, fir de Beruff auszeüben.`,
              'Säi beruffleche Profil nennt eng medezinesch Ausbildung zu Besançon, a Frankräich. Informatiounen iwwer säi Parcours stinn op der Säit „Den Dokter“. Déi uwendbar berufflech Reegelen si beim Collège médical disponibel.',
            ],
            links: [
              { label: 'Beruffsregister vum Collège médical — Ophtalmologie', href: sources.register },
              { label: 'Medezinesche Beruffskodex', href: sources.medicalRules },
              { label: 'Informatioune vum Collège médical fir de Public', href: sources.medicalPublic },
              { label: 'Ministère fir Gesondheet a sozial Sécherheet', href: sources.healthMinistry },
            ],
          },
          {
            id: 'hosting',
            title: 'Hosting',
            paragraphs: [
              'D’Websäit gëtt de Moment vu Vercel Inc., engem Betrib mat Sëtz an den USA, gehost. Säin Netzwierk liwwert d’Säiten an d’Fichieren a suergt fir den technesche Schutz vum Service. Dem Vercel seng verëffentlecht Dateschutzinformatiounen a Konditioune fir d’Dateveraarbechtung sinn hei ënnendrënner verlinkt.',
            ],
            links: [
              { label: 'Vercel seng Dateschutzinformatiounen', href: sources.vercelPrivacy },
              { label: 'Vercel seng Konditioune fir d’Dateveraarbechtung', href: sources.vercelDpa },
            ],
          },
          {
            id: 'medical-information',
            title: 'Medezinesch Informatiounen an Noutfäll',
            paragraphs: [
              'Dës Websäit stellt d’Praxis vir a bitt allgemeng Informatiounen iwwer d’Aegesondheet. Si bitt keng Diagnos, Consultatioun oder Rezept online an ersetzt keng individuell medezinesch Bewäertung. Déi passend Ënnersichungen a Behandlunge gi mam Dokter festgeluecht.',
              'Bei engem medezineschen Noutfall, rufft den 112 un. D’E-Mail vun der Praxis an d’Rendez-vous-Linke si keng Noutdéngschter. Fir vertraulech Gesondheetsinformatiounen ze deelen, kontaktéiert d’Praxis, fir e passende Kommunikatiounswee ze wielen.',
              'Praktesch Informatioune kënnen änneren. Dir kënnt der Praxis e Feeler mellen; fir eng Fro iwwer Är perséinlech Situatioun, kontaktéiert den Dokter direkt.',
            ],
          },
          {
            id: 'intellectual-property',
            title: 'Auteursrechter',
            paragraphs: [
              `Déi originell Wierker, déi fir dës Websäit geschaf goufen, dorënner hir Texter, hir Gestaltung an hire spezifesche Code, sinn duerch d’Auteursrecht geschützt. ${practice.doctor} ass den Titulaire vun de Rechter op dëse Wierker, souwäit dës Rechter him gehéieren. All Rechter virbehalen.`,
              'Fotoen, Schrëftaarten, Bibliothéiken an aner Elementer, déi ënner Lizenz benotzt ginn, ënnerleien de Rechter a Konditioune vun hire jeeweilegen Titulairen. De Copyright-Hiweis vun der Websäit iwwerdréit dës Rechter net.',
              'Fir eng Reproduktioun oder Weiderbenotzung ass d’Erlaabnis vum jeeweilegen Titulaire néideg, ausser wann d’Gesetz et erlaabt, besonnesch duerch déi uwendbar Ausname fir Privatkopien oder Zitater.',
            ],
          },
          {
            id: 'external-links',
            title: 'Extern Linken a Servicer',
            paragraphs: [
              'Linken op Doctena, Doctipro, Google Maps a berufflech Ressourcen maachen extern Servicer op. Hir Notzungskonditiounen an Dateschutzinformatioune gëlle fir d’Benotzung vun dëse Servicer. Dës Websäit ersetzt hir Reservatiounsinterface net.',
              'D’Säit „Dateschutz a Cookien“ erkläert déi technesch Donnéeën, déi dës Websäit brauch, an de Fonctionnement vun der integréierter Google-Maps-Kaart.',
            ],
          },
        ],
      },
      privacy: {
        title: 'Dateschutz a Cookien',
        description: 'Donnéeë vun der Websäit, Hosting, Google Maps, extern Rendez-vous-Reservatiounen an Är Dateschutzrechter.',
        intro: 'Dësen Hiweis erkläert de Fonctionnement vun der ëffentlecher Websäit an d’Dateveraarbechtung am Zesummenhang mat den externe Servicer, déi si benotzt. En ëmfaasst net d’Gestioun vun de medezineschen Dossiere vun der Praxis.',
        sections: [
          {
            id: 'controller',
            title: 'Verantwortleche fir d’Veraarbechtung',
            paragraphs: [
              `${practice.doctor} ass fir d’Dateveraarbechtung am Zesummenhang mat dëser Websäit verantwortlech. Fir Froen oder Ufroen zu Ären Donnéeën, benotzt d’E-Mail oder déi berufflech Adress hei ënnendrënner.`,
              'D’Websäit huet kee Benotzerkont an integréiert keen Instrument fir Besuchsstatistiken oder Reklammen. Hir Schrëftaarten a Biller gi mat de Fichiere vun der Websäit geliwwert, ouni Schrëftaarten vun enger externer Plattform ze lueden.',
            ],
          },
          {
            id: 'technical-data',
            title: 'Néideg technesch Donnéeën',
            paragraphs: [
              'Wann Dir eng Säit opmaacht, kritt den Hosting-Ubidder déi Donnéeën, déi fir hir Liwwerung a fir d’Sécherheet néideg sinn, dorënner Är IP-Adress, Informatiounen iwwer Äre Browser, d’Adress vun der gefroter Säit an den Datum an d’Auerzäit vun der Ufro. Vercel an déi autoriséiert Persoune fir den techneschen Ënnerhalt kënnen déi fir dës Operatiounen néideg Informatioune veraarbechten.',
              'Dës Operatioune berouen op dem berechtegten Interessi, eng funktionéierend Websäit bereetzestellen a si géint Mëssbrauch ze schützen, nom Artikel 6, Paragraf 1, Buschtaf f), vum RGPD. Dës Websäit benotzt dës Donnéeën net fir e Reklammeprofil ze erstellen.',
            ],
            links: [{ label: 'Informatiounen iwwer Vercel seng Dateveraarbechtung', href: sources.vercelPrivacy }],
          },
          {
            id: 'contact',
            title: 'Wann Dir d’Praxis kontaktéiert',
            paragraphs: [
              'Wann Dir urufft oder schreift, ginn Är Kontaktdetailer an déi Informatiounen, déi Dir gitt, benotzt, fir Iech ze äntweren an Är Ufro ze behandelen. Dir gitt se fräiwëlleg un; nëmmen déi Informatiounen, déi fir eng Äntwert néideg sinn, gi gebraucht. Jee no der Ufro berout d’Veraarbechtung op de Schrëtt virum Ofschloss vun engem Kontrakt, déi Dir ufrot (Artikel 6, Paragraf 1, Buschtaf b), vum RGPD), oder op dem berechtegten Interessi, Informatiounsufroen ze beäntweren (Artikel 6, Paragraf 1, Buschtaf f)).',
              `An der Praxis huet nëmmen ${practice.doctor} Zougang zum E-Mail-Kont, dee fir Informatiounsufroe benotzt gëtt.`,
              'D’Kontaktadress benotzt Gmail, e Service vu Google, deen d’Messagen iwwerdréit a späichert. D’Websäit sammelt den Inhalt vun dësen Austausch net. Schéckt keng sensibel medezinesch Detailer oder Dokumenter per normaler E-Mail; rufft d’Praxis un, fir e passende Kommunikatiounswee ze wielen.',
              'De WhatsApp-Formulaire bereet Är Noriicht an Ärem Browser vir a mécht WhatsApp eréischt op, wann Dir op de Knäppchen dréckt. Dës Websäit kritt a späichert den Text net. Dir kontrolléiert a schéckt d’Noriicht selwer a WhatsApp; dëse Service veraarbecht d’Informatiounen no sengen eegene Reegelen. Gitt iwwer dëse Formulaire keng sensibel medezinesch Donnéeën un.',
            ],
            links: [{ label: 'Google seng Dateschutzinformatiounen', href: sources.googlePrivacy }],
          },
          {
            id: 'storage',
            title: 'Funktionell Späicherung am Browser',
            paragraphs: [
              'Wann Dir d’Sprooch wiesselt, benotzt d’Websäit de Sessiounsspäicher vun Ärem Browser, fir Är Liespositioun erëmzefannen. Den Entrée „ophtalmo-language-position“ enthält d’Säit an d’Positioun, déi fir dës Aktioun néideg sinn; e gëtt net benotzt, fir Är Navigatioun ze verfollegen.',
              'D’Positioun ass 15 Sekonne laang gëlteg an den Entrée gëtt geläscht, wann déi nächst Säit e liest. Wann en net gelies gëtt, bleift en am Sessiounsspäicher vum Tab a gëtt no dëser Zäit net méi benotzt. Dës Späicherung ass reng funktionell a separat vun eventuell benotzte Google-Maps-Cookien.',
            ],
          },
          {
            id: 'map',
            title: 'Integréiert Google-Maps-Kaart',
            paragraphs: [
              'D’Kontaktsäit enthält eng Google-Maps-Kaart, déi automatesch geluede gëtt, ouni datt dës Websäit eng Bestätegung freet. Beim Luede vun der Kaart gëtt eng Verbindung mat Google hiergestallt. D’Adress vun der Praxis an en Itinéraire-Link, deen Google Maps separat opmécht, sinn och disponibel.',
              'D’Kaart weist, wou d’Praxis läit, an hëlleft Iech, Iech z’orientéieren an Är Visitt ze plangen. Fir déi technesch Verbindung, déi fir d’Uweise vun der Kaart gebraucht gëtt, berifft d’Praxis sech op hire berechtegten Interessi, de Visiteuren ze hëllefen, d’Praxis ze fannen an ze erreechen, nom Artikel 6, Paragraf 1, Buschtaf f), vum RGPD. Google veraarbecht och Informatiounen fir seng eege Zwecker, déi a sengen Dateschutzreegele beschriwwe sinn.',
              'Wann d’Kaart geluede gëtt, kritt Google technesch Informatiounen, dorënner Är IP-Adress, Informatiounen iwwer Äre Browser, den Datum an d’Auerzäit vun der Ufro an, jee nom Browser, d’Adress vun der Säit, vun där d’Ufro kënnt. Fir Visiteuren am Europäesche Wirtschaftsraum ass Google Ireland Limited déi verantwortlech Google-Gesellschaft. Google ka Cookië benotzen an Donnéeën an den USA oder an anere Länner no sengen eegene Reegelen veraarbechten. Dës Reegelen sinn hei ënnendrënner verlinkt.',
              'Dir kënnt Cookien an Äre Browser-Astellunge geréieren oder blockéieren an Är Google-Dateschutzastellungen nokucken. Wann Dir Cookien oder Inhalter vun Drëttubidder blockéiert, kann dat de Fonctionnement vun der Kaart aschränken. Dës Websäit läscht keng Google-Cookien an huet keng Astellung, fir se an der integréierter Kaart ze deaktivéieren.',
            ],
            links: [
              { label: 'Google seng Dateschutzreegelen', href: sources.googlePrivacy },
              { label: 'Google seng Dateschutzastellungen', href: sources.googleControls },
            ],
          },
          {
            id: 'booking',
            title: 'Rendez-vous iwwer Doctena an Doctipro',
            paragraphs: [
              'D’Reservatiounsknäppercher maachen Doctena oder Doctipro op. Dir gitt Är Informatiounen op där Plattform an, déi Dir auswielt, an net an engem Formulaire op dëser Websäit. Hei gëtt kee Reservatiounsformulaire a keen Tracking-Instrument vun dëse Plattformen automatesch gelueden.',
              'D’Plattformen an den Dokter veraarbechten déi fir d’Reservatioun néideg Donnéeën no hire jeeweilege Rollen. Hir Hiweiser erklären de Service, d’Empfänger, d’Späicherfristen an Är Rechter. Liest dës, ier Dir Är Informatiounen agitt.',
            ],
            links: [
              { label: 'Doctena seng Dateschutzreegelen', href: sources.doctenaPrivacy },
              { label: 'Doctipro seng Informatiounen an Dateschutzreegelen', href: sources.doctiproPrivacy },
            ],
          },
          {
            id: 'transfers-retention',
            title: 'Empfänger, Iwwerdroung a Späicherfristen',
            paragraphs: [
              'Hosting-, E-Mail- a Kaarteservicer kënnen Donnéeën ausserhalb vum Europäesche Wirtschaftsraum veraarbechten, ënner anerem an den USA. Vercel erkläert, datt et um EU–US-Dateschutzkader deelhëlt. Google beschreift d’Benotzung vun Adäquatiounsbescheeder, d’Participatioun vu Google LLC un dësem Kader an, wann néideg, Standardvertragsklauselen. Déi verëffentlecht Dateveraarbechtungskonditioune vu Vercel beschreiwen dës Klauselen och fir déi Konten, fir déi dës Konditioune gëllen.',
              'Déi hei verlinkt Dokumenter vun den Ubidder erklären dës Garantien. Dir kënnt d’Praxis oder de betraffenen Ubidder ëm méi Informatiounen oder eng Kopie vun den uwendbare Garantien froen. D’Säit vu Google iwwer Dateiwwerdroungen erkläert, wéi Dir eng Kopie vu senge Standardvertragsklauselen ufroe kënnt.',
              'Technesch Donnéeë gi sou laang gespäichert, wéi et fir d’Liwwerung, d’Sécherheet an d’Behandlung vun techneschen Tëschefäll néideg ass, no de Servicer a Späicherreegele vum Hosting-Ubidder.',
              'Den Dokter erkläert, datt d’E-Mail-Korrespondenz vun der Praxis aktuell ouni Zäitlimitt gespäichert gëtt, ouni eng virdefinéiert Frist fir d’Läschung. Dir kënnt d’Läschung vun Äre perséinlechen Donnéeën ënner de Konditiounen hei ënnendrënner ufroen.',
              'Kaarten- a Reservatiounsservicer hunn hir eege Späicherfristen. De funktionelle Späicher vun der Websäit hält sech un déi uewe beschriwwe Grenzen. Fir ze wëssen, wéi eng Donnéeën an Ärem Fall gespäichert ginn, kontaktéiert d’Praxis oder dee betraffenen Ubidder.',
            ],
            links: [
              { label: 'Vercel seng Dateschutzinformatiounen an Dateiwwerdroungen', href: sources.vercelPrivacy },
              { label: 'Vercel seng Konditioune fir d’Dateveraarbechtung', href: sources.vercelDpa },
              { label: 'Google seng Dateiwwerdroungen an uwendbar Garantien', href: sources.googleTransfers },
            ],
          },
          {
            id: 'rights',
            title: 'Är Rechter',
            paragraphs: [
              'Ënner de Konditioune vum RGPD kënnt Dir den Zougang zu Ären Donnéeën, hir Berichtegung oder Läschung, d’Aschränkung vun der Veraarbechtung an, wann et uwendbar ass, hir Portabilitéit ufroen. Dir kënnt géint eng Veraarbechtung op Basis vum berechtegten Interessi Widdersproch aleeën, aus Grënn, déi mat Ärer Situatioun ze dinn hunn, an eng Zoustëmmung zeréckzéien, ouni déi virdrun rechtméisseg Veraarbechtung a Fro ze stellen.',
              'D’Recht op Läschung gëllt net ouni Ausnamen: verschidden Donnéeë mussen eventuell gespäichert bleiwen, fir eng gesetzlech Obligatioun ze erfëllen oder fir rechtlech Uspréch festzestellen, geltend ze maachen oder ze verdeedegen.',
              `Schéckt Är Ufro un ${practice.email} oder un déi uewe genannte berufflech Adress. Eng proportionéiert Iwwerpréiwung vun Ärer Identitéit kann néideg sinn. Dir kënnt och eng Reklamatioun bei der Commission nationale pour la protection des données (CNPD), zu Lëtzebuerg, areechen.`,
              'Dës Websäit hëlt keng automatiséiert Entscheedungen, déi rechtlech oder änlech bedeitend Auswierkungen op Iech hunn, a mécht kee Profiling.',
            ],
            links: [
              { label: 'De Verantwortleche fir d’Veraarbechtung kontaktéieren', href: email },
              { label: 'Recht op Läschung: Informatioune vun der CNPD', href: sources.erasure },
              { label: 'Informatiounen iwwer Är Rechter bei der CNPD', href: sources.cnpd },
            ],
          },
          {
            id: 'changes',
            title: 'Aktualiséierung vun dësem Hiweis',
            paragraphs: [
              'Dësen Hiweis gëtt aktualiséiert, wann de Fonctionnement vun der Websäit oder déi benotzte Servicer änneren. Den Datum uewen op der Säit weist déi lescht Aktualiséierung.',
            ],
          },
        ],
      },
    },
  },
};
