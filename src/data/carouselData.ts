import BuildingImg from "../assets/Acceuil0.webp";
import TeamImg from "../assets/Chirurgie.jpg";
import EquipImg from "../assets/Technologie.jpg";
import TechVideo from "../assets/Docteur.mp4";

export type CarouselSlide = {
  id: number;
  type: "image" | "video";
  url: string;
  title: string;
  description: string;
  isActive?: boolean;
};

export const initialSlides: CarouselSlide[] = [
  {
    id: 1,
    type: "image",
    url: BuildingImg,
    title: "Infrastructure de Pointe",
    description: "Une clinique moderne conçue pour votre confort et votre bien-être.",
  },
  {
    id: 2,
    type: "image",
    url: TeamImg,
    title: "Équipe Médicale Experte",
    description: "Des professionnels passionnés et à votre écoute 24h/24.",
  },
  {
    id: 3,
    type: "image",
    url: EquipImg,
    title: "Technologie de Dernière Génération",
    description: "Un plateau technique moderne pour des diagnostics précis.",
  },
  {
    id: 4,
    type: "video",
    url: TechVideo,
    title: "Découvrez la Clinique Life",
    description: "Une vision humaine de la médecine moderne.",
  },
];
