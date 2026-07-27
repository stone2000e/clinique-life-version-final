import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ArrowLeft, Search, X } from "lucide-react";
import { Link } from "react-router-dom";

import { Assurance, initialAssurances } from "../data/assurancesData";

const Assurances: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [partners, setPartners] = useState<Assurance[]>([]);

  React.useEffect(() => {
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

  // Filter and Sort partners
  const filteredPartners = useMemo(() => {
    return [...partners]
      .filter((partner) => 
        partner.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, partners]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative bg-[linear-gradient(135deg,#155DFC_0%,#00BBA7_100%)] pt-32 pb-24 px-4 shadow-lg overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30 shadow-xl">
              <ShieldCheck className="text-white w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Nos Assurances Partenaires
            </h1>
            <p className="text-white opacity-90 text-lg md:text-xl max-w-2xl mx-auto mb-12">
              Trouvez rapidement votre assureur parmi nos {partners.length} partenaires santé.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-white/60 group-focus-within:text-white transition-colors">
                <Search size={24} />
              </div>
              <input
                type="text"
                placeholder="Rechercher votre assurance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-14 py-5 bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl text-white placeholder:text-white/50 outline-none focus:bg-white/20 focus:ring-4 focus:ring-white/10 transition-all text-lg shadow-2xl"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-5 flex items-center text-white/60 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            
            {searchQuery && (
              <p className="mt-4 text-white/80 animate-fade-in">
                {filteredPartners.length} résultat{filteredPartners.length > 1 ? 's' : ''} trouvé{filteredPartners.length > 1 ? 's' : ''}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredPartners.length > 0 ? (
              <motion.div 
                key="grid"
                layout
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8"
              >
                {filteredPartners.map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: (index % 12) * 0.03 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="bg-white p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(21,93,252,0.15)] transition-all flex flex-col items-center justify-center text-center group border border-gray-100"
                  >
                    <div className="h-20 w-full mb-4 flex items-center justify-center">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain transition-all duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <h3 className="text-gray-800 font-bold text-sm tracking-wide">
                      {partner.name}
                    </h3>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                  <Search size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun résultat trouvé</h3>
                <p className="text-gray-500">
                  Nous n'avons trouvé aucune assurance correspondant à "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-6 text-blue-600 font-bold hover:underline"
                >
                  Effacer la recherche
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl relative overflow-hidden border border-gray-100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -ml-16 -mb-16" />
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Besoin de plus d'informations ?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Si vous avez des questions sur votre couverture d'assurance ou si votre partenaire ne figure pas dans la liste, notre équipe est là pour vous aider.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-[linear-gradient(135deg,#155DFC_0%,#00BBA7_100%)] text-white font-bold px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all text-center"
              >
                Nous contacter
              </Link>
              <Link
                to="/rdv"
                className="bg-white text-blue-600 border-2 border-blue-600 font-bold px-10 py-4 rounded-2xl hover:bg-blue-50 transition-all transform hover:scale-105 text-center"
              >
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Assurances;
