import React from "react";
import { Link } from "react-router-dom";
import TelIcon from "../../assets/Tel2.png";

const Partie9_service: React.FC = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-600 to-teal-500">
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Besoin d&apos;une consultation ?
        </h2>

        <p className="text-sm md:text-base text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
          Prenez rendez-vous dès maintenant ou contactez-nous pour plus
          d&apos;informations sur nos
          <br className="hidden sm:block" />
          services.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link 
            to="/rdv"
            className="flex items-center gap-2 bg-white text-blue-600 font-medium px-7 py-3 rounded-xl shadow hover:bg-blue-50 transition"
          >
            <span className="text-blue-600">♡</span>
            Prendre rendez-vous
          </Link>

          
           <a href="tel:+2250777344859"
            className="flex items-center gap-3 border border-white text-white font-medium px-7 py-3 rounded-xl hover:bg-white/10 transition"
          >
            <img src={TelIcon} alt="Téléphone" className="w-5 h-5 object-contain" />
            +225 07 77 34 48 59
          </a>
        </div>
      </div>
    </section>
  );
};

export default Partie9_service;