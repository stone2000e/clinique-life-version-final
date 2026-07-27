import MaterniteImg from "../assets/Maternite.jpg";
import MedecinImg from "../assets/Medecin.jpg";
import ChirurgieImg from "../assets/Chirurgie.jpg";
import AnalyseImg from "../assets/Analyse.jpg";
import ImagerieImg from "../assets/Imagerie.jpg";
import EnceinteImg from "../assets/Enceinte.jpg";
import CardiologieImg from "../assets/Cardiologie.jpg";
import RadiologieImg from "../assets/Radiologie.jpg";

export interface ServiceDetail {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  highlights: string[];
}

export const servicesDetailedData: Record<string, ServiceDetail> = {
  // FEMME – MÈRE – ENFANT
  "la-gynecologie": {
    title: "La Gynécologie",
    subtitle: "Suivi et prévention pour la femme",
    image: MaterniteImg,
    description: "La gynécologie à la Clinique LIFE englobe l'ensemble des soins liés à la santé reproductive féminine. Nous assurons le dépistage précoce, les consultations de routine et le traitement des pathologies gynécologiques avec une approche personnalisée et respectueuse.",
    highlights: ["Consultations annuelles", "Dépistage et frottis", "Planification familiale", "Traitement des troubles hormonaux"]
  },
  "obstetrique": {
    title: "Obstétrique",
    subtitle: "Accompagner la vie avec expertise",
    image: EnceinteImg,
    description: "Notre service d'obstétrique vous accompagne de la conception à l'accouchement. Nous offrons un suivi de grossesse rigoureux, des échographies de pointe et un accouchement sécurisé dans un environnement chaleureux pour la mère et l'enfant.",
    highlights: ["Suivi de grossesse", "Échographies obstétricales", "Préparation à la naissance", "Accouchement sécurisé"]
  },
  "reeducation-du-perinee": {
    title: "Rééducation du périnée",
    subtitle: "Restauration du confort post-partum",
    image: MaterniteImg,
    description: "Essentielle après l'accouchement, la rééducation périnéale permet de prévenir les complications futures et de retrouver un confort optimal. Nos kinésithérapeutes spécialisés vous guident à travers des exercices adaptés.",
    highlights: ["Évaluation post-natale", "Techniques manuelles", "Biofeedback", "Suivi personnalisé"]
  },
  "medecine-de-la-reproduction": {
    title: "Médecine de la Reproduction",
    subtitle: "Soutenir vos projets de parentalité",
    image: MaterniteImg,
    description: "Le pôle de médecine de la reproduction aide les couples rencontrant des difficultés de conception. Grâce à des diagnostics précis et des techniques modernes (PMA, insémination), nous maximisons vos chances de réussite.",
    highlights: ["Bilan de fertilité", "Assistance Médicale à la Procréation", "Suivi endocrinologique", "Conseil génétique"]
  },
  "pediatrie": {
    title: "Pédiatrie",
    subtitle: "La santé de vos enfants, notre priorité",
    image: MaterniteImg,
    description: "Le service de pédiatrie assure la croissance et le bien-être de vos enfants, du nouveau-né à l'adolescent. Nous proposons des consultations de suivi, des vaccinations et une prise en charge rapide des maladies infantiles.",
    highlights: ["Suivi de croissance", "Vaccinations", "Urgences pédiatriques", "Conseils nutritionnels"]
  },
  "service-de-neonatologie": {
    title: "Service de Néonatologie",
    subtitle: "Soins intensifs pour les tout-petits",
    image: MaterniteImg,
    description: "Notre unité de néonatologie accueille les prématurés et les nouveau-nés nécessitant une surveillance particulière. Équipée de couveuses modernes, elle garantit des soins optimaux 24h/24.",
    highlights: ["Soins intensifs néonataux", "Pathologies respiratoires", "Accompagnement des parents", "Surveillance continue"]
  },

  // MÉDECINE
  "service-de-medecine-interne": {
    title: "Service de Médecine Interne",
    subtitle: "Diagnostic global des pathologies complexes",
    image: MedecinImg,
    description: "La médecine interne traite les maladies touchant plusieurs organes ou les cas complexes nécessitant une vision globale du patient. Nos internistes coordonnent les soins pour une prise en charge holistique.",
    highlights: ["Maladies systémiques", "Pathologies infectieuses", "Bilan de santé global", "Coordination spécialisée"]
  },
  "service-de-neurologie": {
    title: "Service de neurologie",
    subtitle: "Expertise du système nerveux",
    image: MedecinImg,
    description: "Prise en charge des troubles du cerveau, de la moelle épinière et des nerfs. Nous traitons les migraines, l'épilepsie, les troubles du sommeil et les maladies neurodégénératives avec précision.",
    highlights: ["EEG et bilans neuro", "Suivi post-AVC", "Troubles du mouvement", "Consultations mémoire"]
  },
  "service-de-cardiologie": {
    title: "Service de Cardiologie",
    subtitle: "Prendre soin de votre cœur",
    image: CardiologieImg,
    description: "Diagnostic et traitement des maladies cardiovasculaires. Notre service dispose d'outils modernes pour l'électrocardiographie et le suivi de l'hypertension et de l'insuffisance cardiaque.",
    highlights: ["ECG et Doppler", "Holter tensionnel", "Épreuve d'effort", "Prévention cardiovasculaire"]
  },

  // CHIRURGIE
  "service-durologie": {
    title: "Service d'Urologie",
    subtitle: "Santé des voies urinaires",
    image: ChirurgieImg,
    description: "Chirurgie et traitement des pathologies urinaires chez l'homme et la femme. Nous traitons les calculs, les infections chroniques et la santé de l'appareil génital masculin.",
    highlights: ["Lithiase urinaire", "Incontinence", "Andrologie", "Chirurgie rénale"]
  },
  "service-dorthopedie-et-de-traumatologie": {
    title: "Service d'Orthopédie et de Traumatologie",
    subtitle: "Rétablir votre mobilité",
    image: ChirurgieImg,
    description: "Prise en charge des fractures, des entorses et des maladies dégénératives des articulations. Nos chirurgiens orthopédistes interviennent pour restaurer votre autonomie.",
    highlights: ["Traumatologie d'urgence", "Chirurgie prothétique", "Médecine du sport", "Arthroscopie"]
  },

  // LABORATOIRE
  "analyses-biologiques-completes": {
    title: "Analyses biologiques",
    subtitle: "La bio-technologie au service du soin",
    image: AnalyseImg,
    description: "Le laboratoire réalise l'ensemble des analyses sanguines, urinaires et biologiques nécessaires à votre diagnostic. Précision et rapidité sont nos engagements quotidiens.",
    highlights: ["Bilans sanguins", "Hémostase", "Sérologie", "Analyses d'urgence 24/7"]
  },

  // IMAGERIE
  "radiologie": {
    title: "Radiologie",
    subtitle: "Imagerie médicale standard",
    image: RadiologieImg,
    description: "Examens de radiographie conventionnelle pour l'exploration des os et des organes internes. Résultats rapides pour un diagnostic efficace.",
    highlights: ["Radio pulmonaire", "Ostéo-articulaire", "ASP", "Interprétation rapide"]
  },
  "echographie": {
    title: "Échographie",
    subtitle: "Imagerie par ultrasons",
    image: ImagerieImg,
    description: "Explorez vos organes en temps réel et sans irradiation. Idéal pour le suivi de grossesse et l'exploration abdominale ou pelvienne.",
    highlights: ["Dopler vasculaire", "Écho abdominale", "Thyroïde et tissus mous", "Gynéco-obstétrique"]
  }
};

// Fonction helper pour obtenir la clé à partir du titre
export const getServiceKey = (title: string): string => {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Enlever les accents
    .replace(/[^\w\s-]/g, "") // Enlever caractères spéciaux
    .trim()
    .replace(/\s+/g, "-"); // Remplacer espaces par tirets
};
