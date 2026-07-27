import Partie1Service from "../components/services/Partie1_service";
import Partie2_service from "../components/services/Partie2_service";
import Partie3_service from "../components/services/Partie3_service";
import Partie4_service from "../components/services/Partie4_service";
import Partie5_service from "../components/services/Partie5_service";
import Partie6_service from "../components/services/Partie6_service";
import Partie7_service from "../components/services/Partie7_service";
import Partie8_service from "../components/services/Partie8_service";
import Partie9_service from "../components/services/Partie9_service";
import ServicesInstallations from "../components/services/ServicesInstallations";
import FadeIn from "../components/animations/FadeIn";
const Service = () => {
  return (
    <main
      className="
        min-h-screen
        bg-white
        pt-[100px]
        overflow-x-hidden
      "
    >
   
      <Partie1Service />

      <FadeIn duration={0.8} delay={0.1} direction="up">
        <Partie2_service />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1} direction="left">
        <Partie3_service />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1} direction="right">
        <Partie4_service />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1} direction="up">
        <Partie5_service />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1} direction="left">
        <Partie6_service />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1} direction="none">
        <ServicesInstallations />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1} direction="right">
        <Partie7_service />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1} direction="up">
        <Partie8_service />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1} direction="left">
        <Partie9_service />
      </FadeIn>
    </main>
  );
};

export default Service;