import React from "react";
import Globe from "../../assets/Globe.png";
import Sante from "../../assets/Sante.png";
import Facebook from "../../assets/Facebook.png";
import Calendrier from "../../assets/Calendrier.png";
import Wave from "../../assets/Wave.png";
import Cli from "../../assets/cli.png";
import { Link } from 'react-router-dom';
import OptimizedImage from "../ui/OptimizedImage";

const AccueilCartes: React.FC = () => {
  return (
    /* 🔒 WRAPPER ANTI OVERFLOW */
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* ================= TITRE ================= */}
      <div className="absolute top-[clamp(3rem,9vw,9.5rem)] left-0 right-0 z-10 pointer-events-none">
        <h1
          className="
            font-corpline
            pl-[clamp(2rem,6vw,10rem)]
            text-[clamp(3.6rem,9.6vw,10.6rem)]
            text-white
            tracking-[0.16em]
            select-none
            leading-none
            max-w-full
            overflow-hidden
          "
        >
          CLINIQUE&nbsp;LIFE
        </h1>

        {/* reflet */}
        <div
          className="
            absolute left-0 bottom-5 w-full
            h-[clamp(2rem,4vw,3rem)]
            bg-gradient-to-b
            from-[rgba(210,222,234,0)]
            via-[rgba(210,222,234,0.85)]
            to-[rgba(210,222,234,1)]
            blur-[10px]
            pointer-events-none
          "
        />
      </div>


      {/* ================= IMAGE CENTRALE ================= */}
     <div
  className="
    absolute z-20 
    left-1/2 
    top-[clamp(10rem,18vh,14rem)]
    -translate-x-1/2
    w-[clamp(220px,45vw,407px)]
    2xl:w-[clamp(220px,45vw,457px)]
    h-auto
    max-h-[clamp(300px,50vh,620px)]
    pointer-events-none
  "
>
        <div className="relative w-full h-full">
          <OptimizedImage priority src={Cli} alt="" className="w-full h-auto object-contain" />
          <div 
            className="absolute inset-0 backdrop-blur-2xl pointer-events-none"
            style={{
              maskImage: 'linear-gradient(to top, black 0%, black 15%, transparent 40%)',
              WebkitMaskImage: 'linear-gradient(to top, black 0%, black 15%, transparent 40%)'
            }}
          />
        </div>
      </div>

 {/* ================= CARTE INFO ================= */}
<div
  className="
    absolute
    bottom-[clamp(8rem,16vh,12rem)]
    md:bottom-[clamp(6rem,12vh,9rem)]
    lg:bottom-[clamp(7rem,14vh,10rem)]
    xl:bottom-[clamp(7rem,14vh,10rem)]
    2xl:bottom-[clamp(23rem,25vh,20rem)]
    2xl:top-[clamp(23rem,25vh,20rem)]
    
    left-[clamp(0.8rem,2vw,2rem)]
    
    w-[clamp(180px,14vw,260px)]
    md:w-[clamp(120px,11vw,160px)]
    lg:w-[clamp(140px,12vw,200px)]
    2xl:w-[clamp(180px,14vw,260px)]
    
    h-[clamp(220px,16vw,296px)]
    md:h-[clamp(150px,13vw,200px)]
    lg:h-[clamp(170px,14vw,230px)]
    2xl:h-[clamp(220px,16vw,296px)]
    
    bg-[#F5FAFD]
    rounded-tr-[clamp(90px,10vw,140px)]
    md:rounded-tr-[clamp(60px,7vw,90px)]
    2xl:rounded-tr-[clamp(90px,10vw,140px)]
    
    p-[clamp(1rem,1.6vw,2rem)]
    md:p-[clamp(0.6rem,1vw,1.2rem)]
    2xl:p-[clamp(1rem,1.6vw,2rem)]
    
    shadow-md z-30
    flex flex-col justify-end
  "
>
  <OptimizedImage 
    src={Globe} 
    alt=""
    className="
      w-40 h-40 
      md:w-24 md:h-24 
      lg:w-28 lg:h-28
      2xl:w-40 2xl:h-40
      mb-2
    " 
  />
  <p className="
    text-[clamp(0.9rem,1.1vw,1.25rem)]
    md:text-[clamp(0.65rem,0.85vw,0.9rem)]
    lg:text-[clamp(0.75rem,0.95vw,1.05rem)]
    2xl:text-[clamp(0.9rem,1.1vw,1.25rem)]
    leading-relaxed
  ">
   <span className="text-blue-600 font-semibold">La Clinique Life</span> : des soins <b>modernes</b> accessibles à <b>tous</b>.
  </p>
</div>

      {/* ================= SATISFACTION ================= */}
<div
  className="
    absolute right-0

    bottom-[clamp(13rem,26vh,15rem)]
    xl:bottom-[clamp(10rem,20vh,12rem)]
    2xl:bottom-[clamp(17rem,30vh,17rem)]

    w-[clamp(220px,17vw,320px)]
    xl:w-[clamp(190px,14vw,260px)]
    2xl:w-[clamp(260px,20vw,382px)]

    min-h-[clamp(85px,6.5vw,140px)]
    xl:min-h-[clamp(65px,5vw,105px)]
    2xl:min-h-[clamp(100px,8vw,180px)]

    bg-white
    rounded-l-[clamp(95px,9vw,150px)]
    xl:rounded-l-[clamp(75px,7vw,115px)]
    2xl:rounded-l-[clamp(120px,12vw,180px)]

    pr-[clamp(0.6rem,1vw,1.4rem)]
    xl:pr-[clamp(0.4rem,0.8vw,1rem)]
    2xl:pr-[clamp(1rem,1.6vw,2.5rem)]

    shadow-md z-30
    flex items-center justify-end
  "
>
  {/* CONTENU */}
  <div className="flex items-center -translate-x-[6%] xl:-translate-x-[10%] 2xl:translate-x-0">

    
    <OptimizedImage
      src={Sante}
      alt=""
      className="
        w-[clamp(44px,4.2vw,100px)]
        xl:w-[clamp(36px,3.4vw,80px)]
        2xl:w-[clamp(55px,5.5vw,133px)]

        h-[clamp(44px,4.2vw,100px)]
        xl:h-[clamp(36px,3.4vw,80px)]
        2xl:h-[clamp(55px,5.5vw,133px)]

        mr-[clamp(0.4rem,0.7vw,1rem)]
        object-contain flex-shrink-0
      "
    />

    <div className="flex flex-col items-end ">
      <h2
        className="
          text-[clamp(0.65rem,0.95vw,1.15rem)]
          xl:text-[clamp(0.55rem,0.75vw,0.95rem)]
          2xl:text-[clamp(0.8rem,1.2vw,1.4rem)]
          font-bold text-emerald-500 mb-0.5 whitespace-nowrap
        "
      >
        SATISFACTION
      </h2>

      <div className="flex gap-[clamp(0.12rem,0.22vw,0.4rem)]">
        {"★★★★★".split("").map((_, i) => (
          <span
            key={i}
            className="
              text-yellow-400
              text-[clamp(0.65rem,1vw,1.25rem)]
              xl:text-[clamp(0.55rem,0.85vw,1.05rem)]
              2xl:text-[clamp(0.8rem,1.3vw,1.5rem)]
            "
          >
            ★
          </span>
        ))}
      </div>
    </div>
  </div>
</div>


      {/* ================= WAVE ================= */}
      <OptimizedImage
        src={Wave}
        alt=""
        className="
          absolute right-0 bottom-[clamp(40px,5vw,60px)]
          w-[clamp(220px,22vw,382px)]
          h-auto
          max-h-[clamp(130px,12vw,260px)]
          object-contain z-20 pointer-events-none
        "
      />

      {/* ================= PRIORITÉ ================= */}
      <div
  className="
    absolute bottom-0 right-0

    w-[clamp(190px,22vw,400px)]
    xl:w-[clamp(170px,20vw,340px)]
    2xl:w-[clamp(220px,28vw,480px)]

    h-[clamp(34px,4vw,48px)]
    xl:h-[clamp(32px,3.6vw,42px)]
    2xl:h-[clamp(40px,5vw,60px)]

    pl-[clamp(2.2rem,7vw,6rem)]
    xl:pl-[clamp(1.8rem,5.5vw,4.8rem)]
    2xl:pl-[clamp(3rem,10vw,9rem)]

    bg-white shadow-md z-30
    flex items-center justify-center text-center
  "
  style={{ clipPath: "polygon(8% 0, 100% 0, 100% 100%, 0% 100%)" }}
>

        <div className="leading-tight">
          <p className="text-[clamp(0.7rem,1vw,1.25rem)] whitespace-nowrap">
            <span className="text-[#2B4E7E] font-bold">Votre santé</span>, notre engagement
          </p>
          <p className="text-[#2B4E7E] font-bold text-[clamp(0.7rem,1vw,1.25rem)] whitespace-nowrap">
            7 jours / 7
          </p>
        </div>
      </div>

      {/* ================= SUIVEZ-NOUS ================= */}
<a
  href="https://www.facebook.com/cliniclife8/?locale=fr_FR"
  target="_blank"
  rel="noopener noreferrer"
  className="
    absolute bottom-0 left-0

    w-[clamp(190px,22vw,400px)]
    xl:w-[clamp(170px,20vw,340px)]
    2xl:w-[clamp(220px,28vw,480px)]

    h-[clamp(34px,4vw,48px)]
    xl:h-[clamp(32px,3.6vw,42px)]
    2xl:h-[clamp(40px,5vw,60px)]

    pr-[clamp(2.2rem,7vw,6rem)]
    xl:pr-[clamp(1.8rem,5.5vw,4.8rem)]
    2xl:pr-[clamp(3rem,10vw,9rem)]

    bg-white shadow-md z-30
    flex items-center justify-center
    gap-[clamp(0.6rem,1.5vw,1.2rem)]
    hover:bg-gray-50 transition-colors cursor-pointer
  "
  style={{ clipPath: "polygon(0 0, 92% 0, 100% 100%, 0% 100%)" }}
>
  <OptimizedImage 
    src={Facebook}
    className="
      w-[clamp(22px,2.2vw,32px)]
      xl:w-[clamp(20px,2vw,28px)]
      2xl:w-[clamp(28px,3vw,40px)]

      h-[clamp(22px,2.2vw,32px)]
      xl:h-[clamp(20px,2vw,28px)]
      2xl:h-[clamp(28px,3vw,40px)]
    "
    alt="Facebook"
  />

  <span
    className="
      text-[clamp(0.7rem,0.95vw,1rem)]
      xl:text-[clamp(0.65rem,0.85vw,0.95rem)]
      2xl:text-[clamp(0.8rem,1.2vw,1.125rem)]
      font-semibold tracking-wider whitespace-nowrap
    "
  >
    Suivez-nous
  </span>
</a>


     {/* ================= BOUTON ================= */}
      <Link
        to="/rdv"
        className="
          absolute bottom-[clamp(1.2rem,2vw,2rem)]
          left-1/2 -translate-x-1/2
          w-[clamp(200px,22vw,300px)]
          h-[clamp(42px,5vw,50px)]
          bg-white rounded-full shadow-lg z-40
          flex items-center justify-center gap-4
          hover:scale-105 transition
        "
      >
        <OptimizedImage src={Calendrier} className="w-[clamp(20px,3vw,28px)] h-[clamp(20px,3vw,28px)]" alt="calendrier" />
        <span className="text-[clamp(0.7rem,1vw,0.95rem)] font-bold tracking-widest text-black">
          Prendre Rendez-vous
        </span>
      </Link>

    </div>
  );
};

export default AccueilCartes;