import type { Locale } from './translations';

export const careGuideIds = ['eye-examination', 'glasses-contact-lenses', 'cataract'] as const;
export type CareGuideId = (typeof careGuideIds)[number];

interface GuideSource { label: string; url: string }
interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  source?: GuideSource;
}
export interface CareGuide {
  slug: string;
  title: string;
  description: string;
  name: string;
  heroLabel: string;
  heroTitle: string;
  heroEmphasis: string;
  intro: string;
  profileNote: string;
  sections: GuideSection[];
  questions: { question: string; answer: string; source?: GuideSource }[];
  bookingIntro: string;
}

const sources = {
  exam: { label: 'National Eye Institute · Get a Dilated Eye Exam', url: 'https://www.nei.nih.gov/eye-health-information/healthy-vision/finding-eye-doctor/get-dilated-eye-exam' },
  dialogue: { label: 'National Eye Institute · Talking with Your Eye Doctor', url: 'https://www.nei.nih.gov/eye-health-information/healthy-vision/finding-eye-doctor/talking-your-eye-doctor' },
  dilation: { label: 'University Hospitals Plymouth NHS Trust · Dilating drops', url: 'https://www.plymouthhospitals.nhs.uk/display-pil/pil-dilating-drops-6823' },
  visionLoss: { label: 'NHS · Vision loss', url: 'https://www.nhs.uk/conditions/vision-loss/' },
  refraction: { label: 'National Eye Institute · Refractive Errors', url: 'https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/refractive-errors' },
  lenses: { label: 'National Eye Institute · Contact Lenses', url: 'https://www.nei.nih.gov/eye-health-information/healthy-vision/contact-lenses' },
  lensCare: { label: 'Moorfields Eye Hospital, NHS · Care of your soft contact lenses', url: 'https://www.moorfields.nhs.uk/for-patients/visual-aids/contact-lenses/care-of-your-soft-contact-lenses' },
  redEye: { label: 'NHS · Red eye', url: 'https://www.nhs.uk/symptoms/red-eye/' },
  cataract: { label: 'National Eye Institute · Cataracts', url: 'https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/cataracts' },
  cataractChoices: { label: 'NHS · Cataracts in adults', url: 'https://www.nhs.uk/conditions/cataracts/' },
  cataractSurgery: { label: 'National Eye Institute · Cataract Surgery', url: 'https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/cataracts/cataract-surgery' },
};

export const careGuideUi = {
  fr: {
    breadcrumb: 'Fil d’Ariane', contents: 'Dans cette page', questions: 'Vos questions',
    information: 'Informations générales pour préparer votre échange avec le médecin. Le contenu ne remplace pas un examen ni un avis adapté à votre situation.',
    profile: 'Profil public sur Doctena', source: 'Pour approfondir, en anglais',
    practical: 'Votre consultation à Mamer', doctor: 'Découvrir le Dr M’Hamed EL HIRECH',
    practice: 'Voir le cabinet à Mamer', contact: 'Préparer votre venue : accès et contact',
    related: 'Poursuivre votre lecture', booking: 'Parlons de votre vision.',
  },
  en: {
    breadcrumb: 'Breadcrumb', contents: 'On this page', questions: 'Your questions',
    information: 'General information to help you prepare for a discussion with your doctor. This page cannot replace an examination or advice tailored to you.',
    profile: 'Public profile on Doctena', source: 'Further reading, in English',
    practical: 'Your appointment in Mamer', doctor: 'Meet Dr M’Hamed EL HIRECH',
    practice: 'Explore the practice in Mamer', contact: 'Plan your visit: directions and contact',
    related: 'Continue reading', booking: 'Let’s talk about your vision.',
  },
  lb: {
    breadcrumb: 'Navigatiounswee', contents: 'Op dëser Säit', questions: 'Är Froen',
    information: 'Allgemeng Informatiounen, fir d’Gespréich mam Dokter virzebereeden. Dës Säit ersetzt keng Ënnersichung a keng Berodung, déi op Är Situatioun ofgestëmmt ass.',
    profile: 'Ëffentleche Profil op Doctena', source: 'Weider Informatiounen op Englesch',
    practical: 'Är Consultatioun zu Mamer', doctor: 'Den Dr M’Hamed EL HIRECH kenneléieren',
    practice: 'D’Praxis zu Mamer entdecken', contact: 'Äre Besuch virbereeden: Wee a Kontakt',
    related: 'Weiderliesen', booking: 'Loosst eis iwwer Är Siicht schwätzen.',
  },
} satisfies Record<Locale, Record<string, string>>;

const fr: Record<CareGuideId, CareGuide> = {
  'eye-examination': {
    slug: 'examen-vue',
    title: 'Consultation et examen de la vue à Mamer | Dr EL HIRECH',
    description: 'Préparez votre consultation ophtalmologique à Mamer : motifs de visite, examen de la vue, documents utiles et questions à poser au Dr EL HIRECH.',
    name: 'Consultation et examen de la vue',
    heroLabel: 'Ophtalmologie générale · Mamer',
    heroTitle: 'Votre examen de la vue,',
    heroEmphasis: 'à Mamer.',
    intro: 'Une difficulté à lire, une gêne visuelle ou un contrôle prévu : voici des repères pour préparer une consultation avec le Dr M’Hamed EL HIRECH à Mamer, au Luxembourg.',
    profileNote: 'L’ophtalmologie générale figure sur le profil public du cabinet.',
    sections: [
      {
        heading: 'Décrire ce qui vous amène',
        paragraphs: ['Avant le rendez-vous, notez une ou deux situations concrètes : reconnaître un visage au loin, lire un écran ou passer de la lecture à la conduite. Précisez depuis quand la gêne existe, si elle est constante et si elle concerne un œil ou les deux. Ces observations donnent un point de départ au dialogue, sans chercher vous-même à nommer une maladie.'],
      },
      {
        heading: 'Ce qu’un examen peut explorer',
        paragraphs: ['Selon vos besoins, l’examen peut évaluer la netteté de la vision et la correction optique, mesurer la pression oculaire et examiner les structures de l’œil. Une dilatation de la pupille peut aider à observer le fond de l’œil. Le médecin détermine les examens utiles et la fréquence du suivi ; une bonne vision ne suffit pas à exclure toute affection.'],
        source: sources.exam,
      },
      {
        heading: 'Rassembler les informations utiles',
        paragraphs: ['Préparez vos lunettes actuelles, les références de vos lentilles si vous en portez, vos ordonnances et les comptes rendus ophtalmologiques disponibles. Une liste lisible des médicaments et des allergies évite de devoir retrouver les noms pendant l’entretien. Signalez également les opérations des yeux déjà réalisées et les antécédents familiaux dont vous avez connaissance.'],
        bullets: ['Choisissez la question la plus importante pour vous.', 'Demandez à quoi sert un examen si cela n’est pas clair.', 'Avant de partir, reformulez la prochaine étape et les consignes reçues.'],
        source: sources.dialogue,
      },
      {
        heading: 'Quand la situation ne doit pas attendre',
        paragraphs: ['Une perte soudaine de la vision ou une douleur oculaire intense justifie une évaluation en urgence. Des éclairs nouveaux ou une ombre dans le champ visuel nécessitent un avis rapide. N’attendez pas un créneau habituel de réservation en ligne pour ces symptômes.'],
        source: sources.visionLoss,
      },
    ],
    questions: [
      {
        question: 'Puis-je conduire après la consultation ?',
        answer: 'Si des gouttes dilatent vos pupilles, la vision peut être floue et la lumière gênante pendant plusieurs heures. Prévoyez un retour accompagné et demandez les consignes avant de reprendre la conduite. Des lunettes de soleil peuvent améliorer votre confort.',
        source: sources.dilation,
      },
      {
        question: 'Quel motif indiquer lors de la réservation ?',
        answer: 'Décrivez votre besoin principal avec vos propres mots : premier avis, contrôle, baisse de vision ou question sur votre correction. Si le motif proposé sur la plateforme ne correspond pas, contactez le cabinet pour orienter votre demande.',
      },
    ],
    bookingIntro: 'Consultez les disponibilités ou les coordonnées du cabinet pour organiser votre consultation et préciser votre motif de visite.',
  },
  'glasses-contact-lenses': {
    slug: 'lunettes-lentilles',
    title: 'Lunettes et lentilles de contact à Mamer | Dr EL HIRECH',
    description: 'Lunettes et lentilles à Mamer : comprendre la correction visuelle, préparer votre consultation et aborder confort, adaptation et entretien.',
    name: 'Lunettes et lentilles de contact',
    heroLabel: 'Correction de la vision · Mamer',
    heroTitle: 'Lunettes et lentilles,',
    heroEmphasis: 'pour votre quotidien.',
    intro: 'Lecture, travail sur écran, déplacements : vos habitudes comptent lorsque vous parlez de lunettes ou de lentilles. Préparez vos questions pour une consultation avec le Dr M’Hamed EL HIRECH à Mamer.',
    profileNote: 'Les lunettes et les lentilles de contact figurent parmi les domaines publiés sur le profil du cabinet.',
    sections: [
      {
        heading: 'Comprendre le besoin de correction',
        paragraphs: ['La myopie gêne surtout la vision de loin. L’hypermétropie peut gêner la vision de près, l’astigmatisme la netteté à différentes distances et la presbytie la lecture avec l’âge. L’examen aide à identifier le besoin de correction. Une gêne persistante avec vos lunettes mérite d’être signalée plutôt que d’être attribuée automatiquement à la fatigue.'],
        source: sources.refraction,
      },
      {
        heading: 'Parler de vos lunettes actuelles',
        paragraphs: ['Apportez les paires que vous utilisez réellement et, si possible, votre dernière ordonnance. Expliquez ce qui fonctionne bien et ce qui reste difficile : texte trop proche, changement fréquent de paire, lecture de documents à côté d’un écran. Mentionnez aussi une nouvelle activité qui modifie vos besoins.'],
        bullets: ['À quelle distance regardez-vous votre écran principal ?', 'Utilisez-vous la même paire pour lire et vous déplacer ?', 'La gêne existe-t-elle avec toutes vos lunettes ou une seule paire ?'],
      },
      {
        heading: 'Aborder le port de lentilles',
        paragraphs: ['Les lentilles reposent directement sur l’œil ; leur choix nécessite une adaptation à votre œil et à votre correction. Discutez du confort, de la manipulation et du rythme de port. Une ordonnance de lunettes ne suffit pas, à elle seule, pour choisir des lentilles.', 'Pour un premier échange, notez vos attentes et vos difficultés éventuelles à mettre ou retirer une lentille. Si vous en portez déjà, gardez la boîte ou une photo de l’étiquette et précisez le produit d’entretien utilisé. Demandez au cabinet s’il faut venir avec vos lentilles ou les retirer auparavant.'],
        source: sources.lenses,
      },
      {
        heading: 'Garder de bons gestes d’entretien',
        paragraphs: ['Lavez et séchez vos mains avant de manipuler les lentilles. Respectez l’entretien recommandé, évitez l’eau du robinet sur les lentilles et leur étui, et retirez-les pour la douche ou la baignade. Ne dormez pas avec sans consigne spécifique du professionnel qui vous suit.'],
        source: sources.lensCare,
      },
    ],
    questions: [
      {
        question: 'Que faire si mon œil devient rouge avec mes lentilles ?',
        answer: 'Retirez les lentilles et demandez rapidement un avis médical. Un œil rouge chez un porteur de lentilles peut être lié à une infection ; une douleur ou une baisse de vision renforce la nécessité d’une évaluation urgente.',
        source: sources.redEye,
      },
      {
        question: 'Comment préparer une demande de renouvellement ?',
        answer: 'Indiquez la date de votre dernière correction et tout changement depuis. Précisez si vous souhaitez reparler de lunettes, de lentilles ou des deux, afin que votre demande soit compréhensible dès la prise de contact.',
      },
    ],
    bookingIntro: 'Pour discuter de votre correction à Mamer, indiquez vos habitudes de port et votre besoin principal lors de la prise de rendez-vous.',
  },
  cataract: {
    slug: 'cataracte',
    title: 'Cataracte : information et consultation à Mamer | Dr EL HIRECH',
    description: 'Comprendre la cataracte et préparer une consultation à Mamer : symptômes, retentissement au quotidien, suivi et questions sur une éventuelle opération.',
    name: 'Cataracte : comprendre et consulter',
    heroLabel: 'Cataracte · Consultation à Mamer',
    heroTitle: 'Comprendre la cataracte,',
    heroEmphasis: 'en consultation.',
    intro: 'Lorsque la vision devient moins confortable, un examen aide à en rechercher la cause. Ces repères vous permettent d’aborder la cataracte et les prochaines étapes avec le Dr M’Hamed EL HIRECH à Mamer.',
    profileNote: 'La chirurgie de la cataracte figure sur le profil public du médecin. Le lieu, l’équipe et les modalités d’une éventuelle intervention sont à préciser lors de la consultation.',
    sections: [
      {
        heading: 'Ce que désigne la cataracte',
        paragraphs: ['La cataracte correspond à une perte de transparence du cristallin, la lentille naturelle située dans l’œil. Elle peut entraîner une vision trouble, des couleurs moins vives ou un éblouissement. Ces manifestations peuvent avoir d’autres causes : les symptômes seuls ne permettent pas de poser le diagnostic.'],
        source: sources.cataract,
      },
      {
        heading: 'Décrire l’impact sur votre quotidien',
        paragraphs: ['Préparez des exemples précis de ce qui a changé : lire une étiquette, suivre des sous-titres, distinguer les marches ou supporter les phares la nuit. Notez les activités que vous avez réduites et celles que vous souhaitez conserver. Indiquez si vous avez déjà changé de lunettes pour tenter d’améliorer la situation.', 'Apportez vos comptes rendus antérieurs, vos lunettes et une liste de vos traitements. Si un autre professionnel a évoqué une cataracte, reprenez ses conclusions et les questions qui restent ouvertes. Cela vous aide à présenter votre demande sans oublier votre priorité.'],
      },
      {
        heading: 'Discuter du suivi ou d’une opération',
        paragraphs: ['Une cataracte ne nécessite pas toujours une opération immédiate. Son effet sur les activités quotidiennes compte dans la décision. Une correction adaptée ou un meilleur éclairage peut aider temporairement. La consultation sert à examiner la situation et à discuter du moment approprié pour envisager un traitement.'],
        source: sources.cataractChoices,
      },
      {
        heading: 'Préparer les questions sur le parcours',
        paragraphs: ['Lorsqu’une chirurgie est envisagée, le cristallin opacifié est remplacé par un implant. Les bénéfices attendus et les risques se discutent individuellement. Une correction par lunettes peut rester nécessaire ensuite. Demandez comment les autres problèmes oculaires éventuels influencent le résultat attendu.'],
        bullets: ['Qui organiserait l’intervention, et dans quel établissement ?', 'Quels documents et examens faudrait-il prévoir avant la décision ?', 'À qui adresser vos questions entre les étapes du parcours ?', 'Comment seraient organisés les contrôles après une éventuelle opération ?'],
        source: sources.cataractSurgery,
      },
    ],
    questions: [
      {
        question: 'Réserver une consultation engage-t-il à se faire opérer ?',
        answer: 'Non. Vous pouvez venir pour comprendre une suspicion de cataracte, parler d’un diagnostic déjà posé ou préparer vos questions. Le rendez-vous est une occasion d’obtenir des explications et de discuter de votre situation.',
      },
      {
        question: 'Que préciser si j’ai déjà un dossier de cataracte ?',
        answer: 'Indiquez où en est votre démarche : premier avis, suivi ou discussion d’une intervention proposée. Regroupez les documents reçus et notez ce que vous souhaitez faire préciser, notamment les responsabilités de chaque intervenant.',
      },
    ],
    bookingIntro: 'Prenez rendez-vous pour parler de votre vision et préparer les questions utiles à votre parcours de consultation.',
  },
};

const en: Record<CareGuideId, CareGuide> = {
  'eye-examination': {
    slug: 'eye-examination',
    title: 'Eye examination and consultation in Mamer | Dr EL HIRECH',
    description: 'Prepare for an eye appointment in Mamer: reasons to visit, possible examinations, useful records and questions for Dr M’Hamed EL HIRECH.',
    name: 'Eye consultation and examination',
    heroLabel: 'General ophthalmology · Mamer',
    heroTitle: 'Your eye examination,',
    heroEmphasis: 'in Mamer.',
    intro: 'A reading difficulty, a change in vision or a planned check: these pointers help you prepare for an appointment with Dr M’Hamed EL HIRECH in Mamer, Luxembourg.',
    profileNote: 'General ophthalmology is listed on the practice’s public profile.',
    sections: [
      {
        heading: 'Explain what brings you in',
        paragraphs: ['Before your appointment, think of one or two situations that describe the problem: recognising a face at a distance, reading a screen or switching from reading to driving. Note when it started, whether it is constant and whether one eye or both are affected. These observations can start the conversation without needing to identify a condition yourself.'],
      },
      {
        heading: 'What an examination may explore',
        paragraphs: ['Depending on your needs, an examination may assess visual sharpness and your prescription, measure eye pressure and examine eye structures. Dilating the pupil can help the doctor look at the back of the eye. Your doctor chooses the appropriate tests and follow-up interval; clear vision alone does not rule out every eye condition.'],
        source: sources.exam,
      },
      {
        heading: 'Gather useful information',
        paragraphs: ['Have your current glasses, contact lens details if relevant, previous prescriptions and available eye reports ready. A readable list of medicines and allergies saves searching for names during the discussion. Mention any previous eye operations and family eye conditions you know about. Keep everything together so that a document from another appointment is easy to find.'],
        bullets: ['Choose the question that matters most to you.', 'Ask what a proposed test is intended to clarify.', 'Before leaving, check that you understand the next step and any instructions.'],
        source: sources.dialogue,
      },
      {
        heading: 'When a routine booking is not enough',
        paragraphs: ['Sudden loss of sight or severe eye pain needs emergency assessment. New flashes or a shadow across your vision need prompt advice. Do not wait for an ordinary online appointment if these symptoms occur.'],
        source: sources.visionLoss,
      },
    ],
    questions: [
      {
        question: 'Can I drive after the appointment?',
        answer: 'If drops are used to dilate your pupils, your vision may be blurred and light uncomfortable for several hours. Arrange help getting home and ask about driving before setting off. Sunglasses may make you more comfortable.',
        source: sources.dilation,
      },
      {
        question: 'Which appointment reason should I choose?',
        answer: 'Describe your main need in your own words: a first opinion, follow-up, change in vision or question about your prescription. If the available booking option does not match, contact the practice so your request can be directed appropriately.',
      },
    ],
    bookingIntro: 'View appointment availability or contact the practice to arrange your visit and explain your main concern.',
  },
  'glasses-contact-lenses': {
    slug: 'glasses-contact-lenses',
    title: 'Glasses and contact lenses in Mamer | Dr EL HIRECH',
    description: 'Discuss glasses and contact lenses in Mamer: understand vision correction, prepare your appointment and ask about comfort, fitting and lens care.',
    name: 'Glasses and contact lenses',
    heroLabel: 'Vision correction · Mamer',
    heroTitle: 'Glasses and contacts,',
    heroEmphasis: 'for everyday life.',
    intro: 'Reading, working at a screen and getting around all shape what you need from your vision. Prepare your questions about glasses or contact lenses for Dr M’Hamed EL HIRECH in Mamer.',
    profileNote: 'Glasses and contact lenses are among the areas listed on the practice’s public profile.',
    sections: [
      {
        heading: 'Understand the need for correction',
        paragraphs: ['Short-sightedness mainly blurs distance vision. Long-sightedness can affect near vision, astigmatism can blur different distances, and presbyopia makes close work harder with age. An examination helps identify your correction needs. Report persistent difficulty with your glasses rather than assuming it is simply tiredness.'],
        source: sources.refraction,
      },
      {
        heading: 'Talk about the glasses you use',
        paragraphs: ['Bring the pairs you actually wear and your latest prescription if available. Explain what works well and what is still difficult: holding text too close, changing pairs frequently or reading paperwork alongside a monitor. Mention a new activity that has changed what you need. Concrete examples are more useful than trying to describe everything as simply blurred.'],
        bullets: ['How far away is your main computer screen?', 'Do you use the same pair for reading and moving around?', 'Does the difficulty occur with every pair or just one?'],
      },
      {
        heading: 'Discuss contact lens wear',
        paragraphs: ['Contact lenses sit on the eye and need to be fitted for your eyes and prescription. Discuss comfort, handling and your wearing routine. A glasses prescription alone is not enough to choose contact lenses.', 'For a first discussion, note your expectations and any difficulty inserting or removing lenses. If you already use them, keep the packaging or a photograph of the label and name your cleaning product. Ask the practice whether to arrive wearing lenses or remove them beforehand. You can also explain whether you want occasional wear or a regular alternative to glasses.'],
        source: sources.lenses,
      },
      {
        heading: 'Keep up good lens care',
        paragraphs: ['Wash and dry your hands before handling lenses. Follow the recommended cleaning routine, keep tap water away from lenses and their case, and remove lenses before showering or swimming. Do not sleep in them unless specifically advised by your eye care professional.'],
        source: sources.lensCare,
      },
    ],
    questions: [
      {
        question: 'What if my eye becomes red while wearing lenses?',
        answer: 'Remove your lenses and seek prompt medical advice. A red eye in a contact lens wearer can indicate infection; pain or reduced vision makes urgent assessment especially important.',
        source: sources.redEye,
      },
      {
        question: 'How should I prepare a renewal request?',
        answer: 'Give the date of your last prescription and mention any changes since then. Explain whether you want to discuss glasses, lenses or both so that your request is clear from the first contact.',
      },
    ],
    bookingIntro: 'When booking a consultation in Mamer, explain your current glasses or lens routine and the main issue you would like to discuss.',
  },
  cataract: {
    slug: 'cataract',
    title: 'Cataract information and consultation in Mamer | Dr EL HIRECH',
    description: 'Prepare a cataract consultation in Mamer: understand symptoms, describe everyday difficulties and discuss monitoring or possible surgery.',
    name: 'Cataract information and consultation',
    heroLabel: 'Cataract · Consultation in Mamer',
    heroTitle: 'Understanding cataracts,',
    heroEmphasis: 'one step at a time.',
    intro: 'When seeing becomes less comfortable, an examination helps explore the cause. These pointers help you discuss cataracts and possible next steps with Dr M’Hamed EL HIRECH in Mamer.',
    profileNote: 'Cataract surgery is listed on the doctor’s public profile. The location, team and arrangements for any proposed operation should be clarified during the consultation.',
    sections: [
      {
        heading: 'What a cataract means',
        paragraphs: ['A cataract is clouding of the natural lens inside the eye. It may cause blurred vision, less vivid colours or glare. Other conditions can cause similar difficulties, so symptoms alone cannot establish the diagnosis.'],
        source: sources.cataract,
      },
      {
        heading: 'Describe the effect on everyday life',
        paragraphs: ['Prepare specific examples of what has changed: reading a label, following subtitles, seeing steps or coping with headlights at night. Note activities you have reduced and those you want to keep doing. Mention whether you have already changed glasses in an attempt to improve things. It can help to distinguish the difficulty itself from the adjustments you have made around it.', 'Bring previous reports, your glasses and a list of medicines. If another professional has mentioned a cataract, gather their findings and the questions you still have. This helps you explain your request while keeping your own priority in view.'],
      },
      {
        heading: 'Discuss monitoring or an operation',
        paragraphs: ['A cataract does not always require an immediate operation. Its effect on daily activities matters when deciding what to do. An updated prescription or improved lighting may help temporarily. The consultation is an opportunity to assess the situation and discuss when treatment may be appropriate.'],
        source: sources.cataractChoices,
      },
      {
        heading: 'Prepare questions about the care pathway',
        paragraphs: ['In cataract surgery, the cloudy lens is replaced with an artificial lens. Expected benefits and risks need an individual discussion. You may still need glasses afterwards. Ask how any other eye conditions could affect the expected result.'],
        bullets: ['Who would arrange the operation, and at which facility?', 'Which records or examinations would be needed before a decision?', 'Whom should you contact with questions between appointments?', 'How would follow-up appointments after an operation be organised?'],
        source: sources.cataractSurgery,
      },
    ],
    questions: [
      {
        question: 'Does booking a consultation commit me to surgery?',
        answer: 'No. You can come to discuss a possible cataract, understand an existing diagnosis or work through your questions. An appointment is an opportunity to receive explanations and talk about your circumstances.',
      },
      {
        question: 'What if I already have a cataract care plan?',
        answer: 'Explain your current stage: an initial opinion, monitoring or discussion of a proposed procedure. Collect the documents you have received and note what needs clarification, including the role of each professional involved.',
      },
    ],
    bookingIntro: 'Arrange an appointment to discuss your vision and prepare the questions that matter for your consultation pathway.',
  },
};

// Luxembourgish medical terminology follows the public LOD entries for
// Aendokter and Katarakt. This is editorial information, not a medical review.
const lb: Record<CareGuideId, CareGuide> = {
  'eye-examination': {
    slug: 'aenuntersuchung',
    title: 'Aenënnersichung a Consultatioun zu Mamer | Dr EL HIRECH',
    description: 'Bereet Är Consultatioun beim Aendokter zu Mamer vir: Grond fir de Besuch, Ënnersichung, nëtzlech Dokumenter a Froen un den Dr EL HIRECH.',
    name: 'Consultatioun an Aenënnersichung',
    heroLabel: 'Allgemeng Ophtalmologie · Mamer',
    heroTitle: 'Är Aenënnersichung,',
    heroEmphasis: 'zu Mamer.',
    intro: 'Schwieregkeete beim Liesen, eng Verännerung vun der Siicht oder eng geplangte Kontroll: dës Informatiounen hëllefen Iech, eng Consultatioun beim Dr M’Hamed EL HIRECH zu Mamer virzebereeden.',
    profileNote: 'Allgemeng Ophtalmologie steet um ëffentleche Profil vun der Praxis.',
    sections: [
      {
        heading: 'Beschreiwen, wat Iech opfält',
        paragraphs: ['Notéiert virum Rendez-vous eng oder zwou konkret Situatiounen: e Gesiicht aus der Distanz erkennen, en Ecran liesen oder vum Liesen op d’Fuere wiesselen. Schreift op, säit wéini de Problem besteet, ob en ëmmer do ass an ob een A oder béid Ae betraff sinn. Esou kënnt Dir d’Gespréich ufänken, ouni selwer eng Krankheet benennen ze mussen.'],
      },
      {
        heading: 'Wat eng Ënnersichung kucke kann',
        paragraphs: ['Jee no Ärem Besoin kann eng Ënnersichung d’Seeschäerft an d’Korrektur iwwerpréiwen, den Aendrock moossen an d’Strukture vum A ënnersichen. Eng Erweiderung vun der Pupill kann hëllefen, den hënneschten Deel vum A ze gesinn. Den Dokter bestëmmt déi néideg Ënnersichungen an den Ofstand tëscht de Kontrollen. Eng gutt Siicht schléisst net all Aekrankheet aus.'],
        source: sources.exam,
      },
      {
        heading: 'Nëtzlech Informatiounen zesummesichen',
        paragraphs: ['Leet Ären aktuelle Brëll, d’Referenze vun Äre Kontaktlënsen, Är Ordonnancen an eventuell Rapporte vu fréieren Aenënnersichunge prett. Eng lieserlech Lëscht vun Äre Medikamenter an Allergië verhënnert, datt Dir d’Nimm eréischt am Gespréich siche musst. Sot och, ob Dir schonn un den Aen operéiert gouft a wéi eng Aekrankheeten Iech an Ärer Famill bekannt sinn.'],
        bullets: ['Wielt déi Fro aus, déi Iech am wichtegsten ass.', 'Frot no, wann den Zweck vun enger Ënnersichung net kloer ass.', 'Kläert virum Heemgoen, wat den nächste Schrëtt ass a wéi eng Consignë gëllen.'],
        source: sources.dialogue,
      },
      {
        heading: 'Wéini Dir net waarde sollt',
        paragraphs: ['Wann Dir op eemol net méi gesitt oder staark Aepéng hutt, braucht Dir eng Ënnersichung am Noutfall. Nei Liichtblëtzer oder e Schiet am Gesiichtsfeld erfuerderen séier medezinesche Rot. Waart bei dëse Symptomer net op en normale fräie Rendez-vous op enger Buchungsplattform.'],
        source: sources.visionLoss,
      },
    ],
    questions: [
      {
        question: 'Kann ech no der Consultatioun Auto fueren?',
        answer: 'Wann Drëpsen Är Pupillen erweideren, kënnt Dir e puer Stonne verschwomme gesinn a méi empfindlech op Liicht reagéieren. Organiséiert eng Begleedung fir den Heemwee a frot no de Consignë fir d’Fueren. E Sonnebrëll kann de Komfort verbesseren.',
        source: sources.dilation,
      },
      {
        question: 'Wat soll ech als Grond fir de Rendez-vous uginn?',
        answer: 'Beschreift Ären Haaptbesoin mat Ären eegene Wierder: en éischten Avis, eng Kontroll, eng Verännerung vun der Siicht oder eng Fro iwwer Är Korrektur. Wann d’Optiounen op der Plattform net passen, kontaktéiert d’Praxis, fir Är Ufro ze klären.',
      },
    ],
    bookingIntro: 'Kuckt déi fräi Rendez-vousen oder kontaktéiert d’Praxis, fir Äre Besuch ze organiséieren an Ären Haaptbesoin matzedeelen.',
  },
  'glasses-contact-lenses': {
    slug: 'brell-kontaktlensen',
    title: 'Brëll a Kontaktlënsen zu Mamer | Dr EL HIRECH',
    description: 'Informatiounen iwwer Brëll a Kontaktlënsen zu Mamer: Korrektur vun der Siicht, Virbereedung vun der Consultatioun, Komfort a Fleeg.',
    name: 'Brëll a Kontaktlënsen',
    heroLabel: 'Korrektur vun der Siicht · Mamer',
    heroTitle: 'Brëll a Kontaktlënsen,',
    heroEmphasis: 'fir Ären Alldag.',
    intro: 'Liesen, um Ecran schaffen an ënnerwee sinn: Är Gewunnechte si wichteg, wann Dir iwwer Brëll oder Kontaktlënsen schwätzt. Bereet Är Froen un den Dr M’Hamed EL HIRECH zu Mamer vir.',
    profileNote: 'Brëll a Kontaktlënse gehéieren zu de Beräicher, déi um ëffentleche Profil vun der Praxis stinn.',
    sections: [
      {
        heading: 'De Besoin u Korrektur verstoen',
        paragraphs: ['Bei Kuerzsiichtegkeet ass virun allem d’Siicht an d’Distanz onschaarf. Wäitsiichtegkeet kann d’Nosiicht beaflossen, Astigmatismus d’Schäerft op verschidden Distanzen a Presbyopie d’Liese mam Alter. Eng Ënnersichung hëlleft, de Korrekturbedarf ze klären. Sot dem Dokter, wann Dir trotz Brëll weider Schwieregkeeten hutt, amplaz dat automatesch op Middegkeet zeréckzeféieren.'],
        source: sources.refraction,
      },
      {
        heading: 'Iwwer Ären aktuelle Brëll schwätzen',
        paragraphs: ['Bréngt déi Brëller mat, déi Dir wierklech benotzt, a wa méiglech Är lescht Ordonnance. Erkläert, wat gutt geet a wat schwéier bleift: Text ganz no un d’Aen halen, dacks d’Brëll wiesselen oder Dokumenter nieft engem Ecran liesen. Sot och, ob eng nei Aktivitéit Är Besoine verännert huet. Konkret Beispiller maachen Är Ufro méi verständlech.'],
        bullets: ['Wéi wäit ass Ären Haaptecran vun Iech ewech?', 'Benotzt Dir deeselwechte Brëll fir ze liesen a fir ënnerwee?', 'Besteet d’Schwieregkeet mat all Äre Brëller oder nëmme mat engem?'],
      },
      {
        heading: 'Iwwer Kontaktlënse schwätzen',
        paragraphs: ['Kontaktlënse leien direkt um A a mussen un Är Aen an Är Korrektur ugepasst ginn. Schwätzt iwwer Komfort, Handhabung a wéi dacks Dir se droe wëllt. Eng Brëllenordonnance eleng geet net duer, fir Kontaktlënsen auszewielen.', 'Notéiert fir dat éischt Gespréich Är Erwaardungen an eventuell Problemer beim Asëtzen oder Eraushuele vun de Lënsen. Wann Dir scho Lënsen drot, haalt d’Verpakung oder eng Foto vun der Etikett prett a nennt Äert Fleegemëttel. Frot d’Praxis, ob Dir mat de Lënse komme sollt oder se virdrun eraushuele musst.'],
        source: sources.lenses,
      },
      {
        heading: 'Op eng gutt Fleeg oppassen',
        paragraphs: ['Wäscht an dréchent Är Hänn, ier Dir d’Lënsen upaakt. Haalt Iech un déi recommandéiert Fleeg, benotzt kee Krunnewaasser fir Lënsen oder Behälter an huelt d’Lënse virum Duschen oder Schwammen eraus. Schlooft net domat, ausser wann de Fachmann, deen Iech betreit, et ausdrécklech esou virgesinn huet.'],
        source: sources.lensCare,
      },
    ],
    questions: [
      {
        question: 'Wat maachen ech, wann mäin A mat Lënse rout gëtt?',
        answer: 'Huelt d’Lënsen eraus a sicht séier medezinesche Rot. E rout A bei Kontaktlënsedréier kann op eng Infektioun hiweisen. Péng oder eng méi schlecht Siicht maachen eng dréngend Ënnersichung besonnesch wichteg.',
        source: sources.redEye,
      },
      {
        question: 'Wéi bereeden ech eng Erneierung vun der Ordonnance vir?',
        answer: 'Gitt den Datum vun Ärer leschter Korrektur un an nennt d’Verännerungen zënterhier. Sot, ob Dir iwwer Brëll, Kontaktlënsen oder béides schwätze wëllt, fir datt Är Ufro vum éischte Kontakt u kloer ass.',
      },
    ],
    bookingIntro: 'Gitt bei der Buchung zu Mamer un, wéi Dir Äre Brëll oder Lënsen aktuell benotzt a wat Dir gär bespreche wëllt.',
  },
  cataract: {
    slug: 'groe-star',
    title: 'Groe Star: Informatioun a Consultatioun zu Mamer | Dr EL HIRECH',
    description: 'De groe Star verstoen an eng Consultatioun zu Mamer virbereeden: Symptomer, Auswierkungen am Alldag a Froen iwwer eng méiglech Operatioun.',
    name: 'Groe Star: verstoen a consultéieren',
    heroLabel: 'Katarakt · Consultatioun zu Mamer',
    heroTitle: 'De groe Star,',
    heroEmphasis: 'verständlech erkläert.',
    intro: 'Wann d’Siicht manner komfortabel gëtt, hëlleft eng Ënnersichung, d’Ursaach ze sichen. Dës Informatiounen hëllefen Iech, mam Dr M’Hamed EL HIRECH zu Mamer iwwer de groe Star an déi nächst Schrëtt ze schwätzen.',
    profileNote: 'Kataraktchirurgie steet um ëffentleche Profil vum Dokter. D’Plaz, d’Ekipp an d’Organisatioun vun enger méiglecher Operatioun gi bei der Consultatioun gekläert.',
    sections: [
      {
        heading: 'Wat ass de groe Star?',
        paragraphs: ['Beim groe Star, och Katarakt genannt, gëtt déi natierlech Lëns am A dréif. Dat ka verschwomme Siicht, manner kräfteg Faarwen oder Blendung verursaachen. Déi selwecht Schwieregkeete kënnen och aner Ursaachen hunn. D’Symptomer eleng ginn dofir net duer, fir eng Diagnos ze stellen.'],
        source: sources.cataract,
      },
      {
        heading: 'D’Auswierkungen am Alldag beschreiwen',
        paragraphs: ['Bereet konkret Beispiller vir: eng Etikett liesen, Ënnertitele verfollegen, Träppleken erkennen oder nuets d’Scheinwerfer vun Autoen erdroen. Notéiert, wéi eng Aktivitéiten Dir reduzéiert hutt a wéi eng Dir bäibehale wëllt. Sot och, ob Dir scho probéiert hutt, d’Situatioun mat engem neie Brëll ze verbesseren. Beschreift souwuel de Problem wéi och d’Upassungen, déi Dir am Alldag scho gemaach hutt.', 'Bréngt fréier Rapporte mat, Äre Brëll an eng Lëscht vun Äre Medikamenter. Wann en anere Fachmann e groe Star ugeschwat huet, sicht seng Conclusiounen an déi nach oppe Froen zesummen. Sou kënnt Dir Är Ufro erklären an Är eege Prioritéit am Bléck behalen.'],
      },
      {
        heading: 'Kontrollen oder eng Operatioun diskutéieren',
        paragraphs: ['E groe Star muss net ëmmer direkt operéiert ginn. Seng Auswierkungen op den Alldag spille bei der Entscheedung eng Roll. Eng ugepasste Korrektur oder besser Beliichtung kann zäitweis hëllefen. Bei der Consultatioun gëtt d’Situatioun ënnersicht an diskutéiert, wéini eng Behandlung sënnvoll ka sinn.'],
        source: sources.cataractChoices,
      },
      {
        heading: 'Froen iwwer de Verlaf virbereeden',
        paragraphs: ['Bei enger Kataraktoperatioun gëtt déi dréif Lëns duerch eng kënschtlech Lëns ersat. Déi erwaart Virdeeler an d’Risike ginn individuell beschwat. E Brëll kann duerno nach néideg sinn. Frot, wéi aner méiglech Aekrankheeten dat erwaart Resultat beaflosse kéinten.'],
        bullets: ['Wien géif d’Operatioun organiséieren, an a wéi engem Etablissement?', 'Wéi eng Dokumenter an Ënnersichunge wiere virun der Entscheedung néideg?', 'U wie kënnt Dir Iech mat Froen tëscht de Rendez-vouse wenden?', 'Wéi géifen d’Kontrollen no enger méiglecher Operatioun organiséiert ginn?'],
        source: sources.cataractSurgery,
      },
    ],
    questions: [
      {
        question: 'Engagéieren ech mech mat enger Consultatioun fir eng Operatioun?',
        answer: 'Nee. Dir kënnt komme fir e méigleche groe Star ze verstoen, iwwer eng bestoend Diagnos ze schwätzen oder Är Froen ze klären. De Rendez-vous bitt Iech d’Geleeënheet, Erklärungen ze kréien an Är perséinlech Situatioun ze beschwätzen.',
      },
      {
        question: 'Wat ginn ech un, wann ech schonn en Dossier hunn?',
        answer: 'Erkläert, wou Dir an Ärer Demarche stitt: éischten Avis, Kontroll oder Gespréich iwwer eng proposéiert Operatioun. Sammelt déi Dokumenter, déi Dir kritt hutt, a notéiert, wat Dir nach kläre wëllt, och d’Roll vun de verschiddene Fachleit.',
      },
    ],
    bookingIntro: 'Maacht e Rendez-vous, fir iwwer Är Siicht ze schwätzen an déi Froen ze klären, déi fir Äre weidere Consultatiounsverlaf wichteg sinn.',
  },
};

export const careGuides: Record<Locale, Record<CareGuideId, CareGuide>> = { fr, en, lb };

const guideRoots: Record<Locale, string> = {
  fr: '/expertises/',
  en: '/en/expertise/',
  lb: '/lb/leeschtungen/',
};

export function careGuidePath(locale: Locale, id: CareGuideId): string {
  return `${guideRoots[locale]}${careGuides[locale][id].slug}/`;
}

export function careGuideFromPath(path: string): { locale: Locale; id: CareGuideId } | undefined {
  const pathname = path.split(/[?#]/, 1)[0].replace(/\/+$/, '') + '/';
  for (const locale of ['fr', 'en', 'lb'] as const) {
    const id = careGuideIds.find((guideId) => careGuidePath(locale, guideId) === pathname);
    if (id) return { locale, id };
  }
  return undefined;
}
