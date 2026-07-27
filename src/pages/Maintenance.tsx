import React from "react";
import { Wrench, Clock, Mail, Phone } from "lucide-react";
import Logo from "../assets/life.png";

const Maintenance: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* LOGO */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Clinique Life" className="h-16 w-16 md:h-20 md:w-20 object-contain" />
            <span className="text-3xl md:text-4xl font-bold text-gray-900">Clinique Life</span>
          </div>
        </div>

        {/* CARD PRINCIPALE */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* HEADER GRADIENT */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-8 py-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
              <Wrench className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Maintenance en cours
            </h1>
            <p className="text-white/90 text-lg">
              Nous améliorons nos services pour mieux vous servir
            </p>
          </div>

          {/* CONTENU */}
          <div className="px-8 py-12 space-y-8">
            {/* MESSAGE */}
            <div className="text-center">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Notre site web est actuellement en maintenance pour vous offrir une meilleure expérience.
              </p>
              <p className="text-gray-600">
                Nous serons de retour très bientôt avec de nouvelles fonctionnalités !
              </p>
            </div>

            {/* TEMPS ESTIMÉ */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center gap-4 justify-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-600 mb-1">Temps estimé de maintenance</p>
                  <p className="text-2xl font-bold text-gray-900">2 - 4 heures</p>
                </div>
              </div>
            </div>

            {/* INFOS URGENCE */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
                Besoin d'une assistance immédiate ?
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* TÉLÉPHONE */}
                <a
                  href="tel:+22507773448 59"
                  className="flex items-center gap-4 p-5 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 mb-1">Appelez-nous</p>
                    <p className="font-bold text-gray-900">+225 07 77 34 48 59</p>
                  </div>
                </a>

                {/* EMAIL */}
                <a
                  href="mailto:info@clinique-life.com"
                  className="flex items-center gap-4 p-5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 mb-1">Écrivez-nous</p>
                    <p className="font-bold text-gray-900 text-sm">info@clinique-life.com</p>
                  </div>
                </a>
              </div>
            </div>

            {/* RÉSEAUX SOCIAUX */}
            <div className="text-center pt-4">
              <p className="text-gray-600 mb-4 font-semibold">Suivez-nous sur nos réseaux sociaux</p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://web.facebook.com/cliniclife8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer"
                  aria-label="Facebook"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href="https://wa.me/2250554176268"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer"
                  aria-label="WhatsApp"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>

                <a
                  href="https://www.tiktok.com/@cliniclife7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-gray-900 hover:bg-black text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer"
                  aria-label="TikTok"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            © 2026 Clinique Life - Angré, Abidjan • Tous droits réservés
          </p>
        </div>
      </div>

      {/* ANIMATION DE FOND */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
    </div>
  );
};

export default Maintenance;