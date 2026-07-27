import React from "react";

import Partie1_apropos from "../components/propos/Partie1_apropos";
import Partie2_apropos from "../components/propos/Partie2_apropos";
import Partie3_apropos from "../components/propos/Partie3_apropos";
import Partie4_apropos from "../components/propos/Partie4_apropos";
import Partie5_apropos from "../components/propos/Partie5_apropos";
import Partie6_apropos from "../components/propos/Partie6_apropos";
import FadeIn from "../components/animations/FadeIn";

const APropos: React.FC = () => {
  return (
    <main className="min-h-screen bg-white pt-[100px]">
      <Partie1_apropos />
      <FadeIn duration={0.8} delay={0.1} direction="up">
        <Partie2_apropos />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1} direction="left">
        <Partie3_apropos />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1} direction="right">
        <Partie4_apropos />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1} direction="up">
        <Partie5_apropos />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1} direction="none">
        <Partie6_apropos />
      </FadeIn>
     
    </main>
  );
};

export default APropos;