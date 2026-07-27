import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  MessageSquare,
  Users,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Lock,
  Layout,
  UserPlus,
  Bell,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/life.png";

import VueEnsemble from "./VueEnsemble";
import Rdv from "./Rdv";
import Messages from "./Messages";
import Recrutement from "./Recrutement";
import GestionContenu from "./GestionContenu";
import ChangePassword from "./Changepassword";
import GestionAdmins from "./Gestionadmins";
import PopupManager from "./PopupManager";
import GestionEquipe from "./GestionEquipe";
import GestionCarousel from "./GestionCarousel";
import GestionAssurances from "./GestionAssurances";

/* ---------- MENU ITEM ---------- */
const MenuItem = ({ icon, label, active, onClick, sidebarOpen }: any) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
      ${
        active
          ? "bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-md"
          : "text-gray-500 hover:bg-gray-100"
      }
    `}
  >
    {icon}
    {sidebarOpen && <span className="font-medium">{label}</span>}
  </div>
);

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("Vue d'ensemble");
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 768);
    };
    
    // Set initial state
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  const renderPage = () => {
    switch (activePage) {
      case "Vue d'ensemble":
        return <VueEnsemble />;
      case "Rendez-vous":
        return <Rdv />;
      case "Messages":
        return <Messages />;
      case "Recrutement":
        return <Recrutement />;
      case "Gestion contenu":
        return <GestionContenu />;
      case "Gestion admins":
        return <GestionAdmins />;
      case "Popup d'accueil":
        return <PopupManager />;
      case "Équipe":
        return <GestionEquipe />;
      case "Carrousel":
        return <GestionCarousel />;
      case "Assurances":
        return <GestionAssurances />;
      case "Mot de passe":
        return <ChangePassword />;
      default:
        return <VueEnsemble />;
    }
  };

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: "Vue d'ensemble" },
    { icon: <CalendarDays size={18} />, label: "Rendez-vous" },
    { icon: <MessageSquare size={18} />, label: "Messages" },
    { icon: <Users size={18} />, label: "Recrutement" },
    { icon: <FileText size={18} />, label: "Gestion contenu" },
    { icon: <UserPlus size={18} />, label: "Gestion admins" },
    { icon: <Bell size={18} />, label: "Popup d'accueil" },
    { icon: <Users size={18} />, label: "Équipe" },
    { icon: <Layout size={18} />, label: "Carrousel" },
    { icon: <ShieldCheck size={18} />, label: "Assurances" },
    { icon: <Lock size={18} />, label: "Mot de passe" },
  ];

  return (
    <div className="h-screen flex bg-[#F5FAFF] overflow-hidden relative">

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ---------- SIDEBAR ---------- */}
      <aside
        className={`bg-white border-r flex flex-col py-6 transition-transform duration-300 fixed inset-y-0 left-0 z-50 h-screen md:relative md:translate-x-0
          ${sidebarOpen ? "translate-x-0 w-64 px-5" : "-translate-x-full md:w-20 md:px-3 w-64 px-5"}
        `}
      >
        {/* LOGO & MENU CONTAINER */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-center mb-8 shrink-0">
            <img src={logo} className="w-10 h-10 rounded-xl object-contain" />
            {sidebarOpen && (
              <div className="ml-3">
                <h2 className="font-bold text-gray-800">Clinique Life</h2>
                <p className="text-sm text-gray-400">Admin Niveau 1</p>
              </div>
            )}
          </div>

          {/* MENU */}
          <nav className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                {...item}
                active={activePage === item.label}
                onClick={() => setActivePage(item.label)}
                sidebarOpen={sidebarOpen}
              />
            ))}
          </nav>
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-600 px-4 py-3 mt-4 shrink-0 rounded-xl hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          {sidebarOpen && <span className="font-medium">Déconnexion</span>}
        </button>
      </aside>

      {/* ---------- CONTENT ---------- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* TOP BAR */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl hover:bg-gray-100 transition flex items-center justify-center text-gray-600"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">Administrateur 1</p>
              <p className="text-xs text-gray-400">Gestion complète</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-400 text-white rounded-full flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
        </header>

        {/* PAGE */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default Admin;