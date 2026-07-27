import { CalendarDays, ClipboardList, Stethoscope, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { Assurance, initialAssurances } from "../../data/assurancesData";

// Liste des logos qui ont besoin d'être plus grands - We use the name instead of filename now
const largeLogos = ["GGA", "CIMEF", "CNPS", "SYNACASS", "SEVEN", "MUSATRAP", "Transvie", "Utrep", "Ankara", "Ascoma", "Atlantique"];

const steps = [
  {
    id: "01",
    title: "Prise de rendez-vous",
    text: "Réservez votre créneau en ligne ou par téléphone avec confirmation immédiate",
    icon: CalendarDays,
  },
  {
    id: "02",
    title: "Accueil à la clinique",
    text: "Présentez-vous 10 min avant pour la mise à jour de votre dossier",
    icon: ClipboardList,
  },
  {
    id: "03",
    title: "La Consultation",
    text: "Examen médical complet avec diagnostic personnalisé sur place",
    icon: Stethoscope,
  },
  {
    id: "04",
    title: "Suivi & Documents",
    text: "Ordonnances et documents médicaux avec planification du suivi",
    icon: FileText,
  },
];

export default function Parcours() {
  const [partners, setPartners] = useState<Assurance[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("assurances");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (typeof parsed[0] === 'object' && parsed[0] !== null && 'name' in parsed[0]) {
            setPartners(parsed);
            return;
          } else {
            // Bad format (e.g. old string array), clear it out
            localStorage.removeItem("assurances");
          }
        }
      }
    } catch (e) {

      console.error("Error loading assurances:", e);
    }
    setPartners(initialAssurances);
  }, []);

  return (
    <div className="w-full bg-white">
      {/* Section Partenaires avec scroll automatique */}
      <div className="w-full bg-white py-8 overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
          Assurances et partenaires
        </h2>
        <div className="relative">
          <div className="flex animate-scroll-continuous">
            {/* Première série complète de logos */}
            {partners.map((partner, i) => (
              <div key={`first-${i}`} className="flex-shrink-0 mx-8">
                <img 
                 src={partner.logo}
                  alt={partner.name}
                  className={largeLogos.includes(partner.name) ? "h-28 w-40 object-contain" : "h-20 w-32 object-contain"}
                  onError={(e) => {
                    console.log(`Erreur: ${partner.name}`);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            ))}
            {/* Deuxième série complète pour effet infini */}
            {partners.map((partner, i) => (
              <div key={`second-${i}`} className="flex-shrink-0 mx-8">
                <img 
                  src={partner.logo}
                  alt={partner.name}
                  className={largeLogos.includes(partner.name) ? "h-28 w-40 object-contain" : "h-20 w-32 object-contain"}
                  onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bouton vers la page complète */}
        <div className="flex justify-center mt-12">
          <Link
            to="/assurances"
            className="group flex items-center gap-3 bg-white border-2 border-blue-500 text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-blue-200"
          >
            Voir tous nos partenaires
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Section Parcours de soins */}
      <section className="w-full py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block mb-6 px-6 py-2 border-2 border-cyan-400 text-cyan-500 rounded-full text-sm font-medium">
            Parcours de soins
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Votre consultation en toute simplicité
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-500">
            Nous avons simplifié chaque étape pour que vous puissiez vous concentrer
            sur ce qui compte le plus : votre santé.
          </p>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative flex justify-center">
                  {/* Ligne de connexion */}
                  {index !== steps.length - 1 && (
                    <div className="hidden lg:block absolute top-[62px] right-[-60px] w-[100px] h-[4px] bg-gradient-to-r from-cyan-400 to-transparent" />
                  )}

                  {/* Carte */}
                  <div className="bg-white rounded-2xl shadow-lg px-6 py-8 text-center w-full max-w-[260px] mx-auto hover:shadow-xl transition-shadow duration-300">
                    <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white">
                      <Icon size={26} />
                    </div>

                    <div className="text-5xl font-extrabold text-gray-100 mb-2">
                      {step.id}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll-continuous {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-continuous {
          animation: scroll-continuous 60s linear infinite;
          display: flex;
          width: max-content;
        }

        .animate-scroll-continuous:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}