import React from "react";
import Titre from "../components/specialiste/Titre";
import Teams from "../components/specialiste/Teams";
import FadeIn from "../components/animations/FadeIn";

const Specialiste: React.FC = () => {
  return (
    <div className="w-full">
      <Titre />
      <FadeIn duration={0.8} delay={0.1}>
        <Teams />
      </FadeIn>
      {/* Les autres parties de la page seront ajoutées ici */}
    </div>
  );
};

export default Specialiste;
