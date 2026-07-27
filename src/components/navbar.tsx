import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Home, Info, Briefcase, BookOpen, Mail, Calendar, Heart, ChevronDown, Stethoscope, Users } from "lucide-react";
import logo from "/src/assets/life.png";

const links = [
  { label: "Accueil", path: "/", icon: Home },
  { label: "À propos", path: "/a-propos", icon: Info },
  { 
    label: "Nos ressources", 
    path: "/services", 
    icon: Briefcase,
    subMenu: [
      { label: "Nos services", path: "/services", icon: Stethoscope },
    { label: "Nos spécialistes", path: "/Specialiste", icon: Users },
    ]
  },
  { label: "Blog", path: "/blog", icon: BookOpen },
  { label: "Contact", path: "/contact", icon: Mail },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  // Empêcher le défilement de l'arrière-plan quand le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = ""; // Nettoyage en cas de démontage
    };
  }, [isOpen]);

  return (
    <>
      {/* NAVBAR VERRE */}
      <nav className="
        fixed top-2 sm:top-3 md:top-4 
        left-1/2 -translate-x-1/2 
        z-50 
        w-[96%] sm:w-[95%] md:w-[95%] lg:w-[92%] 
        max-w-[1400px] 
        h-[60px] sm:h-[65px] md:h-[72px]
        rounded-full 
        border-2 border-white 
        overflow-visible
        shadow-lg
      ">
        
        {/* Blur */}
        <div className="absolute inset-0 bg-white/15 backdrop-blur-lg pointer-events-none rounded-full" />

        {/* Contenu */}
        <div className="relative z-10 flex items-center justify-between h-full px-4 sm:px-5 md:px-6 lg:px-5">
          
          {/* MOBILE & TABLET (< lg) */}
          <div className="flex lg:hidden items-center justify-between w-full">
            {/* Menu Burger */}
            <button
              onClick={() => setIsOpen(true)}
              className="text-2xl sm:text-3xl text-[#134774] hover:text-[#1E80EF] transition"
            >
              ☰
            </button>

           {/* Logo centré */}
            <NavLink to="/" className="flex items-center gap-2 cursor-pointer">
              <img src={logo} alt="Logo" className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 object-contain" />
              <span className="font-bold text-[#134774] text-base sm:text-lg md:text-[22px] whitespace-nowrap">
                Clinique Life
              </span>
            </NavLink>

            {/* Espace vide pour équilibrer */}
            <div className="w-8 sm:w-10"></div>
          </div>

          {/* DESKTOP (≥ lg) */}
          <div className="hidden lg:flex items-center justify-between w-full">
            
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 lg:gap-3 flex-[1.2] cursor-pointer relative z-20">
              <img src={logo} alt="Logo" className="w-12 lg:w-14 h-12 lg:h-14 object-contain" />
              <span className="font-bold text-black text-lg lg:text-[22px] whitespace-nowrap">
                Clinique Life
              </span>
            </NavLink>

            {/* LINKS */}
            <ul className="flex gap-4 lg:gap-6 xl:gap-10 justify-center items-center flex-[3] relative z-10">
              {links.map(({ label, path, subMenu }) => (
                <li 
                  key={label} 
                  className="relative"
                  onMouseEnter={() => subMenu && setDropdownOpen(true)}
                  onMouseLeave={() => subMenu && setDropdownOpen(false)}
                >
                  {subMenu ? (
                    // Lien avec dropdown
                    <div>
                      <button
                        className={`px-3 lg:px-4 xl:px-5 py-1.5 rounded-full font-poppins text-sm lg:text-base xl:text-[18px] transition-colors duration-300 whitespace-nowrap font-medium text-[#134774] hover:bg-white/20 flex items-center gap-1`}
                      >
                        {label}
                        <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Desktop */}
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden"
                          >
                            {subMenu.map((item) => (
                              <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                  `block px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2
                                  ${isActive 
                                    ? "bg-gradient-to-r from-[#05D2CE] to-[#007E7B] text-white" 
                                    : "text-[#134774] hover:bg-blue-50"}`
                                }
                              >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                              </NavLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    // Lien normal
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `px-3 lg:px-4 xl:px-5 py-1.5 rounded-full font-poppins text-sm lg:text-base xl:text-[18px] transition-colors duration-300 whitespace-nowrap
                        ${
                          isActive
                            ? "font-semibold text-white bg-gradient-to-b from-[#05D2CE] to-[#007E7B]"
                            : "font-medium text-[#134774] hover:bg-white/20"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            {/* BOUTON RDV Desktop */}
            <div className="flex justify-end flex-[1]">
              <NavLink
                to="/rdv"
                className={({ isActive }) =>
                  `px-5 lg:px-6 xl:px-7 py-2.5 lg:py-3 rounded-full font-medium text-white text-sm lg:text-base transition-transform duration-200 hover:scale-105 whitespace-nowrap
                   ${isActive 
                     ? "bg-[linear-gradient(90deg,#155DFC_0%,#00BBA7_100%)]"
                     : "bg-[#1E80EF]"}`
                }
              >
                Rendez-vous
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu latéral */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 230, damping: 25 }}
              className="
                fixed top-0 left-0 
                h-full 
                w-[280px] sm:w-[300px] md:w-[320px]
                bg-white
                backdrop-blur-xl
                z-[70] 
                pt-6 sm:pt-8
                px-6 sm:px-8 
                shadow-2xl
                overflow-y-auto
              "
            >
              {/* Décorations */}
              <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>

              {/* Bouton fermer */}
              <button
                onClick={() => setIsOpen(false)}
                className="
                  absolute 
                  top-6 
                  right-6 
                  p-3
                  text-slate-800
                  hover:text-slate-500
                  transition-colors
                  z-50
                "
              >
                ✕
              </button>

              {/* Logo dans le menu */}
              <div className="relative flex items-center gap-4 mb-10 sm:mb-12 mt-16 px-2">
                <img src={logo} alt="Logo" className="w-12 sm:w-14 h-12 sm:h-14 object-contain" />
                <div>
                  <span className="block font-bold text-[#134774] text-xl sm:text-2xl whitespace-nowrap">
                    Clinique Life
                  </span>
                  <span className="block text-sm text-slate-500 whitespace-nowrap">Votre santé, notre priorité</span>
                </div>
              </div>

              {/* Navigation avec icônes */}
              <nav className="relative flex flex-col gap-3 sm:gap-4 text-base sm:text-lg">
                {links.map(({ label, path, icon: Icon, subMenu }) => (
                  <div key={label}>
                    {subMenu ? (
                      // Menu avec sous-éléments
                      <div>
                        <button
                          onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                          className="w-full relative px-4 py-3 rounded-xl font-poppins font-semibold transition-all flex items-center justify-between gap-4 group text-slate-600 hover:bg-slate-50 hover:text-[#007E7B]"
                        >
                          <div className="flex items-center gap-4">
                            <Icon className="w-5 h-5 text-slate-400 group-hover:text-[#00BBA7] transition-colors" />
                            <span className="whitespace-nowrap">{label}</span>
                          </div>
                          <ChevronDown className={`w-5 h-5 transition-transform text-slate-400 ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Sous-menu Mobile */}
                        <AnimatePresence>
                          {mobileDropdownOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0, y: -10 }}
                              animate={{ height: "auto", opacity: 1, y: 0 }}
                              exit={{ height: 0, opacity: 0, y: -10 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden ml-4 mt-2 mb-2 space-y-1.5 border-l-2 border-slate-100 pl-3"
                            >
                              {subMenu.map((item) => (
                                <NavLink
                                  key={item.path}
                                  to={item.path}
                                  onClick={() => setIsOpen(false)}
                                  className={({ isActive }) =>
                                    `relative px-4 py-3 rounded-xl font-poppins font-semibold transition-all duration-300 flex items-center gap-4 group
                                    ${isActive 
                                      ? "text-[#007E7B] bg-teal-50/50" 
                                      : "text-slate-500 hover:bg-slate-50 hover:text-[#007E7B]"}`
                                  }
                                >
                                  {({ isActive }) => (
                                    <>
                                      {/* Barre verticale pour l'élément actif */}
                                      {isActive && (
                                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#007E7B] rounded-r-full shadow-[0_0_8px_rgba(0,126,123,0.4)]" />
                                      )}
                                      
                                      <item.icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#007E7B]' : 'text-slate-400 group-hover:text-[#00BBA7]'}`} />
                                      <span className="whitespace-nowrap text-sm">{item.label}</span>
                                    </>
                                  )}
                                </NavLink>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      // Lien normal
                      <NavLink
                        to={path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `relative px-4 py-3 rounded-xl font-poppins font-semibold transition-all flex items-center gap-4 group
                          ${isActive 
                            ? "text-[#007E7B] bg-teal-50/50" 
                            : "text-slate-500 hover:bg-slate-50 hover:text-[#007E7B]"}`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {/* Barre verticale pour l'élément actif */}
                            {isActive && (
                              <div className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#007E7B] rounded-r-full shadow-[0_0_8px_rgba(0,126,123,0.4)]" />
                            )}
                            
                            <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#007E7B] drop-shadow-sm' : 'text-slate-400 group-hover:text-[#00BBA7]'}`} />
                            <span className="whitespace-nowrap">{label}</span>
                          </>
                        )}
                      </NavLink>
                    )}
                  </div>
                ))}

                {/* Séparateur décoratif */}
                <div className="flex items-center gap-2 my-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </div>

                {/* Bouton RDV dans menu - STYLE SPECIAL */}
                <NavLink
                  to="/rdv"
                  onClick={() => setIsOpen(false)}
                  className="
                    relative
                    bg-gradient-to-r from-[#155DFC] to-[#00BBA7]
                    text-white 
                    px-6 py-4
                    rounded-2xl
                    font-bold
                    text-center
                    shadow-xl
                    hover:shadow-2xl
                    hover:scale-105
                    transition-all
                    flex items-center justify-center gap-3
                    overflow-hidden
                    group
                  "
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <Calendar className="w-5 h-5 relative z-10" />
                  <span className="relative z-10 whitespace-nowrap">Prendre Rendez-vous</span>
                </NavLink>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;