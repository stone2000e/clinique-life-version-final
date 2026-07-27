import React from "react";


const Partie1_blog: React.FC = () => {
  return (
    <section className="relative w-full h-[520px] md:h-[600px] overflow-hidden">
      
      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-sky-500 to-teal-400" />

      {/* CONTENU */}
      <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-center px-6 md:px-10 text-white">
        
        {/* BADGE */}
        <span className="w-fit mb-6 rounded-full bg-white/20 px-4 py-1 text-sm font-medium backdrop-blur">
          Actualités
        </span>

        {/* TITRE */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4">
          Bienvenue à la Clinique <br />
          Life
        </h1>

        {/* SOUS-TITRE */}
        <p className="text-lg md:text-xl font-medium mb-3">
          Votre santé, notre engagement
        </p>

        {/* DESCRIPTION */}
        <p className="max-w-xl text-sm md:text-base text-white/90 mb-8">
          Découvrez nos dernières actualités et conseils santé pour vous
          accompagner au quotidien.
        </p>

        {/* BOUTON REMOVED BY USER REQUEST */}
      </div>
    </section>
  );
};

export default Partie1_blog;
