import React from "react";
import Partie1_blog from "../components/blogs/Partie1_blog";
import Partie2_blog from "../components/blogs/Partie2_blog";
import Partie3_blog from "../components/blogs/Partie3_blog";
import Partie4_blog from "../components/blogs/Partie4_blog";
import FadeIn from "../components/animations/FadeIn";

const Blog: React.FC = () => {
  return (
    <main className="min-h-screen bg-white pt-[100px]">
      <Partie1_blog />
      <FadeIn duration={0.8} delay={0.1} direction="up">
        <Partie2_blog />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1} direction="up">
        <Partie3_blog />
      </FadeIn>
      <FadeIn duration={0.8} delay={0.1} direction="up">
        <Partie4_blog />
      </FadeIn>
    </main>
  );
};

export default Blog; // ✅ OBLIGATOIRE