import React from "react";
import { ArrowLeft, Stethoscope, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DirecteurImg from "../assets/directeur.png";

const DrDonguiProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative bg-[linear-gradient(135deg,#155DFC_0%,#00BBA7_100%)] pt-32 pb-24 px-4 shadow-lg overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          {/* Back Button & Title */}
          <div className="flex-1 text-center md:text-left">
            <Link
              to="/a-propos"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Retour à propos
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                Dr. Gabriel DONGUI
              </h1>
              <p className="text-white opacity-90 text-xl font-medium mb-6 flex items-center justify-center md:justify-start gap-2">
                <Stethoscope size={24} /> Directeur Général
              </p>
              <p className="text-white/80 text-lg max-w-xl">
                Fort de plus de 20 ans d'expérience dans le domaine médical et la gestion hospitalière, le Dr. Dongui incarne la vision et l'excellence de la Clinique Life.
              </p>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="w-64 md:w-80 shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl transform scale-110" />
              <img
                src={DirecteurImg}
                alt="Dr. Gabriel DONGUI"
                className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white relative z-10 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Briefcase size={20} />
              </span>
              Son Parcours & Sa Vision
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                La création de la <span className="font-semibold text-gray-800">Clinique Life</span> est le fruit d'une longue réflexion et d'un engagement profond envers la santé publique en Côte d'Ivoire. Le Dr. Gabriel DONGUI a souhaité bâtir une structure médicale alliant l'excellence des soins à une véritable approche humaine du patient.
              </p>
              <p>
                Avant de fonder la clinique, le Dr. Dongui a exercé dans plusieurs établissements hospitaliers de renom, forgeant ainsi une solide expertise tant sur le plan médical qu'administratif. Sa philosophie repose sur un principe simple : <em className="text-gray-800 font-medium font-serif">"Chaque patient mérite une écoute attentive et des soins de la plus haute qualité, dans un environnement rassurant."</em>
              </p>
              <p>
                Aujourd'hui, il dirige une équipe pluridisciplinaire dévouée, veillant quotidiennement au respect des normes de qualité, à la modernisation du plateau technique et à l'innovation continue au sein de l'établissement.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default DrDonguiProfile;
