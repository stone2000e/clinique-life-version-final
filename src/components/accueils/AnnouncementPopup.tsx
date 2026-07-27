import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import medecinImg from "../../assets/Medecin.jpg";

interface AnnouncementPopupProps {
  delay?: number;
  title?: string;
  message?: string;
  image?: string;
  buttonLink?: string;
  type?: "pub" | "info";
}

const AnnouncementPopup: React.FC<AnnouncementPopupProps> = ({
  delay = 2000,
  title = "Nouveau : Service de Télémédecine 24/7",
  message = "Consultez nos médecins spécialistes depuis chez vous en toute sécurité et à tout moment.",
  image = medecinImg,
  buttonLink = "#",
  type = "pub",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAction = () => {
    if (buttonLink && buttonLink !== "#") {
      navigate(buttonLink);
    }
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm sm:max-w-md md:max-w-sm lg:max-w-md bg-white rounded-2xl md:rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden pointer-events-auto"
            >
              {/* Image Header Section - Reduced height */}
              <div className="relative h-[120px] sm:h-[140px] md:h-[160px] w-full overflow-hidden">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Nouveauté Badge - Smaller */}
                <div className="absolute top-4 left-4">
                  <div className="bg-[#2563EB] text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg ring-1 ring-white/20">
                    <span className="text-sm">🎉</span>
                    <span className="text-[10px] font-black uppercase tracking-wider">Nouveauté</span>
                  </div>
                </div>

                {/* Close Button - Smaller */}
                <button 
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-lg transition-all z-10"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Content Section - Compacted */}
              <div className="p-4 sm:p-5 md:p-6 text-center sm:text-left">
                <p className="text-gray-400 font-bold text-[9px] md:text-[10px] mb-1.5 uppercase tracking-widest">
                  5 Mars 2026
                </p>
                
                <h2 className="text-lg md:text-xl font-black text-[#1A202C] mb-2 leading-tight">
                  {title}
                </h2>
                
                <p className="text-gray-500 text-xs sm:text-sm md:text-sm leading-relaxed mb-4 md:mb-5">
                  {message}
                </p>

                {/* Footer Buttons - Conditionally rendered based on type */}
                {type === "pub" && (
                  <div className="flex gap-3">
                    <button 
                      onClick={handleAction}
                      className="flex-[2] bg-gradient-to-r from-[#1D4ED8] to-[#0D9488] hover:from-[#1e40af] hover:to-[#0f766e] text-white font-black py-3 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-50 text-xs uppercase"
                    >
                      Lire l'article
                    </button>
                    <button 
                      onClick={handleClose}
                      className="flex-[1] bg-white border border-gray-100 hover:bg-gray-50 text-gray-500 font-bold py-3 px-4 rounded-xl transition-all text-xs uppercase"
                    >
                      Plus tard
                    </button>
                  </div>
                )}

                {/* Info fallback button if needed or just nothing */}
                {type === "info" && (
                  <button 
                    onClick={handleClose}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-black py-3 px-4 rounded-xl transition-all text-xs uppercase"
                  >
                    Fermer
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementPopup;
