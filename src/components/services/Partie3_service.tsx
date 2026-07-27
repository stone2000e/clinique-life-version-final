import React, { useState } from "react";
import ServiceModal from "./ServiceModal";
import { servicesDetailedData, getServiceKey, ServiceDetail } from "../../data/servicesDetailedData";
import { ArrowUpRight } from "lucide-react";

/* ICONES */
import MedecinIcon from "../../assets/medecin.png";
import CheckBleu from "../../assets/check_bleu.png";

type Service = {
  title: string;
  description: string;
};

const services: Service[] = [
  {
    title: "Service de Médecine Interne",
    description: "Diagnostic et traitement des pathologies complexes",
  },
  {
    title: "Service de neurologie",
    description: "Prise en charge des troubles neurologiques",
  },
  {
    title: "Service de Diabétologie-Endocrinologie",
    description: "Suivi du diabète et troubles hormonaux",
  },
  {
    title: "Service de Cardiologie",
    description: "Diagnostic et traitement des maladies cardiaques",
  },
  {
    title: "Service de Dermatologie et Vénérologie",
    description: "Soins de la peau et MST",
  },
  {
    title: "Service d'Hématologie",
    description: "Traitement des maladies du sang",
  },
  {
    title: "Service d'Oto-Rhino-Laryngologie (ORL)",
    description: "Spécialiste ORL et troubles auditifs",
  },
];

const Partie3_service: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const handleOpenModal = (title: string) => {
    const key = getServiceKey(title);
    const detail = servicesDetailedData[key];
    if (detail) {
      setSelectedService(detail);
    }
  };

  return (
    <section className="w-full py-12 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-500 to-emerald-400 px-8 py-6 flex items-center gap-4 text-white">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/20">
            <img
              src={MedecinIcon}
              alt="Médecine"
              className="w-7 h-7 object-contain"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold tracking-wide uppercase">
              MÉDECINE
            </h2>
            <p className="text-sm text-white/90">
              7 services disponibles
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-blue-50 rounded-xl p-5 hover:bg-blue-100/50 hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleOpenModal(service.title)}
              >
                <div className="flex items-start gap-3">
                  {/* CHECK */}
                  <img
                    src={CheckBleu}
                    alt="Check"
                    className="w-5 h-5 mt-1"
                  />

                  {/* TEXTE */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <ArrowUpRight size={14} className="text-blue-300 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {service.description}
                    </p>

                    <button className="mt-3 text-[10px] font-bold uppercase tracking-wider text-blue-500 opacity-0 group-hover:opacity-100 transition-all">
                      En savoir plus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <ServiceModal 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        service={selectedService} 
      />
    </section>
  );
};

export default Partie3_service;