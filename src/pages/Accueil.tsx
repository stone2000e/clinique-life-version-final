import Actualites from "../components/accueils/Actualites";
import Avantages from "../components/accueils/Avantages";
import Banniere from "../components/accueils/Banniere";
import Parcours from "../components/accueils/Parcour";
import Equipements from "../components/accueils/Equipements";
import CarouselHero from "../components/accueils/CarouselHero";
import AnnouncementPopup from "../components/accueils/AnnouncementPopup";
import FadeIn from "../components/animations/FadeIn";

const Accueil: React.FC = () => {
  return (
    <div className="bg-[#D2DEEA] w-full overflow-hidden">
      <AnnouncementPopup buttonLink="/blog" />

      {/* HERO SECTION - CAROUSEL */}
      <section className="relative w-full">
        <CarouselHero />
      </section>

      {/* AVANTAGES */}
      <FadeIn duration={0.8} delay={0.1} direction="left">
        <Avantages />
      </FadeIn>

      {/* PARCOURS */}
      <FadeIn duration={0.8} delay={0.2} direction="right">
        <Parcours />
      </FadeIn>

      {/* ÉQUIPEMENTS */}
      <FadeIn duration={0.8} delay={0.1} direction="up">
        <Equipements />
      </FadeIn>

      {/* ACTUALITES */}
      <FadeIn duration={0.8} delay={0.2} direction="left">
        <Actualites />
      </FadeIn>

      {/* BANNIERE */}
      <FadeIn duration={0.8} delay={0.1} direction="none">
        <Banniere />
      </FadeIn>

    </div>
  );
};

export default Accueil;