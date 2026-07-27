import assaleImg from "../assets/team/assale.png";
import dibiImg from "../assets/team/dibi.png";
import YaoImg from "../assets/team/Yao.jpeg";
import adjouaImg from "../assets/team/adjoua.png";
import yaoImg from "../assets/team/yao.png";
import bambaImg from "../assets/team/bamba.png";

export type AdminTeamMember = {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
  responsibilities?: string[];
  experience: string;
  phone: string;
  email: string;
  education?: string[];
};

export type Specialist = {
  id: number;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  image: string;
  iconBg: string;
  bio: string;
  qualifications: string[];
  languages: string[];
  schedule: string;
  phone: string;
  email: string;
};

export const initialAdminTeam: AdminTeamMember[] = [
  {
    id: 1,
    name: "Benjamin Kouassi Dibi",
    role: "Directeur Administratif et Financier (DAF)",
    specialty: "Finance et Contrôle de Gestion",
    image: dibiImg,
    responsibilities: [
      "Piloter la stratégie financière de la clinique",
      "Superviser la comptabilité, la trésorerie et le contrôle de gestion",
      "Élaborer les budgets et optimiser les ressources financières",
      "Assurer la conformité fiscale et réglementaire",
      "Gérer les relations avec les partenaires financiers et bancaires",
    ],
    experience: "12 ans",
    phone: "+225 07 57 63 84 79",
    email: "dibiomer@gmail.com",
    education: [
      "MBA in Finance - Graduate School of Management (GSM), Abidjan",
      "Licence Professionnelle en Audit & Contrôle de Gestion",
      "BTS Finance Comptabilité et Gestion d'Entreprise",
    ],
  },
  {
    id: 2,
    name: "Yao Narcisse Kouame",
    role: "Directeur des relations extérieures et Marketing",
    specialty: "Stratégie Marketing et Développement de Partenariats Assurances",
    image: YaoImg,
    experience: "16 ans",
    phone: "+225 01 01 05 96 85",
    email: "nkouamey@outlook.com",
    education: [
      "Master en assurance ESCA-ESA",
      "Master en marketing et management",
    ],
  },
  {
    id: 3,
    name: "ASSALE Kouadio Kossonou",
    role: "Consultant en Communication",
    specialty: "Communication et Relations Publiques",
    image: assaleImg,
    responsibilities: [
      "Gérer la communication externe de la clinique",
      "Développer la stratégie de communication digitale",
      "Assurer les relations avec les médias et partenaires",
      "Coordonner les campagnes de sensibilisation santé",
    ],
    experience: "24 ans",
    phone: "+225 07 58 87 21 96",
    email: "assalekoss@yahoo.fr",
    education: [
      "DESS Communication / Journalisme - ISTC Abidjan",
      "DEA Lettres Modernes - Université d'Abidjan Cocody",
    ],
  },
  {
    id: 4,
    name: "Mme. Adjoua Koffi",
    role: "Infirmière en Chef",
    specialty: "15 ans d'expérience en soins d'urgence",
    image: adjouaImg,
    responsibilities: [
      "Superviser l'équipe infirmière",
      "Assurer la qualité des soins infirmiers",
      "Gérer les urgences et les soins critiques",
    ],
    experience: "15 ans",
    phone: "+225 01 23 45 67 91",
    email: "adjoua.koffi@cliniquelife.com",
  },
  {
    id: 5,
    name: "Dr. Yao Franck",
    role: "Cardiologue",
    specialty: "Expert en maladies cardiovasculaires",
    image: yaoImg,
    responsibilities: [
      "Diagnostiquer et traiter les maladies cardiaques",
      "Réaliser des examens cardiologiques",
      "Conseiller sur la prévention cardiovasculaire",
    ],
    experience: "18 ans",
    phone: "+225 01 23 45 67 92",
    email: "yao.franck@cliniquelife.com",
  },
  {
    id: 6,
    name: "Dr. Bamba Mariam",
    role: "Gynécologue",
    specialty: "Spécialiste en santé de la femme",
    image: bambaImg,
    responsibilities: [
      "Assurer le suivi gynécologique et obstétrical",
      "Réaliser des interventions chirurgicales",
      "Accompagner les femmes tout au long de leur vie",
    ],
    experience: "14 ans",
    phone: "+225 01 23 45 67 93",
    email: "bamba.mariam@cliniquelife.com",
  },
];

export const initialSpecialists: Specialist[] = [
  {
    id: 1,
    name: "Dr. Kouassi Emmanuel",
    title: "Directeur Médical",
    specialty: "Médecine Générale",
    experience: "20 ans d'expérience",
    image: "/images/doctors/kouassi.jpg",
    iconBg: "bg-blue-500",
    bio: "Le Dr. Kouassi Emmanuel dirige la Clinique Life depuis sa création. Avec plus de 20 ans d'expérience en médecine générale et interne, il s'est spécialisé dans la prise en charge globale des patients. Sa vision holistique de la santé et son engagement envers l'excellence ont fait de notre clinique une référence en Côte d'Ivoire.",
    qualifications: [
      "Doctorat en Médecine - Université d'Abidjan",
      "Spécialisation en Médecine Interne",
      "Diplôme de Management Hospitalier",
    ],
    languages: ["Français", "Anglais", "Baoulé"],
    schedule: "Lundi - Vendredi: 8h - 17h",
    phone: "+225 07 77 34 48 59",
    email: "dr.kouassi@clinique-life.com",
  },
  {
    id: 2,
    name: "Dr. Aminata Traoré",
    title: "Pédiatre",
    specialty: "Pédiatrie et Néonatologie",
    experience: "15 ans d'expérience",
    image: "/images/doctors/aminata.jpg",
    iconBg: "bg-pink-500",
    bio: "Spécialiste reconnue en pédiatrie et néonatologie, le Dr. Aminata Traoré accompagne les familles avec bienveillance depuis plus de 15 ans. Son approche douce et son expertise font d'elle une référence pour les soins infantiles.",
    qualifications: [
      "Doctorat en Médecine - Université de Cocody",
      "Spécialisation en Pédiatrie",
      "Formation en Néonatologie - France",
    ],
    languages: ["Français", "Bambara"],
    schedule: "Lundi - Samedi: 9h - 16h",
    phone: "+225 05 12 34 56 78",
    email: "dr.traore@clinique-life.com",
  },
  {
    id: 3,
    name: "Dr. Yao Franck",
    title: "Cardiologue",
    specialty: "Cardiologie",
    experience: "18 ans d'expérience",
    image: "/images/doctors/yao.jpg",
    iconBg: "bg-red-500",
    bio: "Expert en maladies cardiovasculaires, le Dr. Yao Franck apporte son expertise dans le diagnostic et le traitement des pathologies cardiaques. Sa rigueur et son professionnalisme assurent une prise en charge optimale.",
    qualifications: [
      "Doctorat en Médecine - Université d'Abidjan",
      "Spécialisation en Cardiologie",
      "Formation en Échographie Cardiaque",
    ],
    languages: ["Français", "Anglais"],
    schedule: "Lundi - Vendredi: 8h - 15h",
    phone: "+225 07 23 45 67 89",
    email: "dr.yao@clinique-life.com",
  },
  {
    id: 4,
    name: "Dr. Bamba Mariam",
    title: "Gynécologue",
    specialty: "Gynécologie et Obstétrique",
    experience: "12 ans d'expérience",
    image: "/images/doctors/bamba.jpg",
    iconBg: "bg-purple-500",
    bio: "Spécialisée en gynécologie et obstétrique, le Dr. Bamba Mariam accompagne les femmes à chaque étape de leur vie. Son empathie et son professionnalisme créent un environnement de confiance.",
    qualifications: [
      "Doctorat en Médecine - Université de Bouaké",
      "Spécialisation en Gynécologie-Obstétrique",
      "Formation en Échographie Obstétricale",
    ],
    languages: ["Français", "Dioula"],
    schedule: "Lundi - Samedi: 9h - 17h",
    phone: "+225 01 98 76 54 32",
    email: "dr.bamba@clinique-life.com",
  },
  {
    id: 5,
    name: "Dr. N'Guessan André",
    title: "Neurologue",
    specialty: "Neurologie",
    experience: "16 ans d'expérience",
    image: "/images/doctors/nguessan.jpg",
    iconBg: "bg-indigo-500",
    bio: "Le Dr. N'Guessan André est un neurologue expérimenté spécialisé dans les troubles neurologiques. Son approche méthodique et son expertise permettent des diagnostics précis.",
    qualifications: [
      "Doctorat en Médecine - Université d'Abidjan",
      "Spécialisation en Neurologie",
      "Formation en Neurophysiologie",
    ],
    languages: ["Français", "Anglais", "Agni"],
    schedule: "Mardi - Samedi: 10h - 18h",
    phone: "+225 07 65 43 21 09",
    email: "dr.nguessan@clinique-life.com",
  },
  {
    id: 6,
    name: "Dr. Koné Sarah",
    title: "Ophtalmologue",
    specialty: "Ophtalmologie",
    experience: "10 ans d'expérience",
    image: "/images/doctors/kone.jpg",
    iconBg: "bg-teal-500",
    bio: "Spécialiste en ophtalmologie, le Dr. Koné Sarah offre des soins oculaires de qualité avec les technologies les plus modernes. Sa précision et son attention aux détails garantissent les meilleurs résultats.",
    qualifications: [
      "Doctorat en Médecine - Université de Cocody",
      "Spécialisation en Ophtalmologie",
      "Formation en Chirurgie Réfractive",
    ],
    languages: ["Français", "Anglais"],
    schedule: "Lundi - Vendredi: 8h - 16h",
    phone: "+225 05 87 65 43 21",
    email: "dr.kone@clinique-life.com",
  },
];
