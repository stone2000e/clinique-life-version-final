import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { ServiceDetail } from "../../data/servicesDetailedData";
import OptimizedImage from "../ui/OptimizedImage";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetail | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-[95%] sm:w-full max-w-2xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] z-10"
          >
            {/* Image Header */}
            <div className="relative h-48 md:h-64 w-full flex-shrink-0">
              <OptimizedImage
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all border border-white/30"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                  {service.title}
                </h2>
                <p className="text-white/90 text-sm md:text-base font-medium mt-1">
                  {service.subtitle}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 md:p-8 lg:p-10">
              <p className="text-slate-600 leading-relaxed text-sm md:text-lg mb-6 md:mb-8">
                {service.description}
              </p>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                  Points forts & Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center">
                        <CheckCircle size={16} className="text-teal-500" />
                      </div>
                      <span className="text-slate-700 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 md:mt-10 flex justify-end">
                <button
                  onClick={onClose}
                  className="w-full md:w-auto px-6 md:px-10 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl md:rounded-2xl font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  Fermer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
