import Partie1 from "../components/contacts/Partie1";
import Partie2 from "../components/contacts/Partie2";
import Partie3 from "../components/contacts/Partie3";
import FadeIn from "../components/animations/FadeIn";

export default function Contact() {
  return (
    <main
      className="
        min-h-screen
        bg-white
        pt-[100px]
        overflow-x-hidden
      "
    >
      <Partie1 />
      <FadeIn duration={0.8} delay={0.1} direction="up">
        <Partie2 />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1} direction="up">
        <Partie3 />
      </FadeIn>
    </main>
  );
}