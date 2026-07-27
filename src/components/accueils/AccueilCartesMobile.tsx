import Globe from "../../assets/Globe.png";
import Sante from "../../assets/Sante.png";
import Facebook from "../../assets/Facebook.png";
import Calendrier from "../../assets/Calendrier.png";
import Cli from "../../assets/cli.png";
import { Link } from 'react-router-dom';
import OptimizedImage from "../ui/OptimizedImage";

const AccueilCartesMobile = () => {
  return (
   <div className="relative w-full min-h-[900px] bg-[#E8F0F7] overflow-hidden pb-24">

      {/* TITRE */}
      <h1 className="absolute top-32 left-1 text-white font-corpline leading-none">
        <span className="block text-[2.5rem] md:text-[3.4rem] tracking-widest opacity-80">
          CLINIQUE
        </span>

        <span className="relative block text-[5.8rem] md:text-[7.5rem]">
          LIFE
          <span className="pointer-events-none absolute left-0 bottom-0 w-full
            h-[3.4rem] md:h-[4.6rem]
            bg-gradient-to-b from-[rgba(210,222,234,0)] via-[rgba(210,222,234,0.75)] to-[rgba(210,222,234,1)]
            blur-[10px]" />
        </span>
      </h1>

      {/* DOCTEUR */}
      <OptimizedImage priority src={Cli} className="absolute right-[-30px] top-24 w-[260px] md:w-[340px]" alt="" />

      {/* GLOBE */}
      <img src={Globe} className="absolute left-0 top-[240px] w-36 md:w-48 z-40" />

      {/* VAGUE */}
      <div className="absolute top-[310px] md:top-[360px] left-0 w-full z-30">
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className="w-full h-[80px] md:h-[105px]">
          <path d="M0,50 C0,10 400,0 590,40 C700,70 880,140 1400,40 C1580,20 1520,30 1440,50 L1440,140 L0,140 Z" fill="#F1F6FB"/>
        </svg>

        <div className="bg-[#F1F6FB] text-center py-6 md:py-8 -mt-6">
          <p className="text-lg md:text-xl font-bold text-[#264873]">
            Votre santé, <span className="text-black">notre priorité</span>
          </p>
          <p className="text-[#264873] font-bold md:text-lg">7jours/7</p>
        </div>
      </div>

      {/* CARTE */}
      <div className="
        absolute left-1/2 -translate-x-1/2
        bottom-[10.6rem] md:bottom-[12.5rem]
        w-[90%] max-w-[380px]
        md:w-[85%] md:max-w-[620px]
        bg-white rounded-2xl
        flex flex-col overflow-hidden z-30
      ">

        {/* TEXTE */}
        <div className="p-5 md:p-8">
          <p className="text-base md:text-xl leading-relaxed">
            <span className="text-[#0D6CCA] font-bold">La Clinique Life</span> : des soins
            <span className="font-bold text-black"> modernes</span> accessibles à
            <span className="font-bold text-black"> tous.</span>
          </p>
        </div>

        {/* SATISFACTION */}
        <div className="bg-[#F2FBFD] px-5 md:px-8 py-4 md:py-6 flex items-center gap-4 md:gap-8 shadow-md">
          <OptimizedImage src={Sante} className="w-20 h-20 md:w-32 md:h-32" alt="" />

          <div>
            <p className="text-emerald-500 font-bold tracking-wide text-base md:text-xl">
              SATISFACTION
            </p>

            <div className="flex text-yellow-400 text-lg md:text-2xl">
              ★★★★★
            </div>
          </div>
        </div>

        {/* SUIVEZ NOUS */}
        <div className="border-t px-5 md:px-8 py-4 md:py-6 flex items-center justify-center gap-2 md:gap-4">
          <OptimizedImage src={Facebook} className="w-10 h-10 md:w-16 md:h-16" alt="" />
          <span className="tracking-widest text-sm md:text-base font-semibold">
            Suivez-nous
          </span>
        </div>
      </div>

      {/* BOUTON PRENDRE RENDEZ-VOUS */}
      <Link
        to="/rdv"
        className="
          absolute left-1/2 -translate-x-1/2
          bottom-8 md:bottom-12
          w-[85%] max-w-[380px]
          md:w-[70%] md:max-w-[480px]
          h-[60px] md:h-[70px]
          bg-gradient-to-r from-[#00BBA7] to-[#0D9F93]
          rounded-full
          flex items-center justify-center gap-3 md:gap-4
          shadow-2xl
          hover:scale-105 transition-transform
          z-40
        "
      >
        <OptimizedImage src={Calendrier} className="w-8 h-8 md:w-10 md:h-10 brightness-0 invert" alt="" />
        <span className="text-white font-bold text-base md:text-lg tracking-widest">
          Prendre Rendez-vous
        </span>
      </Link>

    </div>
  );
};

export default AccueilCartesMobile;