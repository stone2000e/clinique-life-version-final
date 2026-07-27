import React, { useState } from "react";
import { Bell, Save, Image as ImageIcon, Eye, Power, Megaphone, Info } from "lucide-react";

const PopupManager: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  const [title, setTitle] = useState("Nouveau : Service de Télémédecine 24/7");
  const [date, setDate] = useState("5 Mars 2026");
  const [buttonLink, setButtonLink] = useState("https://clinique-life.com/news/telemedecine");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [popupType, setPopupType] = useState<"pub" | "info">("pub");
  const [message, setMessage] = useState(
    "La Clinique Life lance son nouveau service de téléconsultation disponible 24h/24. Consultez nos médecins spécialistes depuis chez vous en toute sécurité."
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Logic to save (e.g., localStorage or API)
    alert("Configuration de la popup enregistrée !");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-emerald-400 p-6 text-white shadow-lg">
        <h1 className="text-2xl font-black flex items-center gap-3">
          <Bell className="animate-bounce" /> Gestion de la Popup d'Accueil
        </h1>
        <p className="text-sm opacity-90 mt-1 font-medium">
          Personnalisez l'annonce qui s'affiche lors de l'arrivée des patients sur le site.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Power size={20} className="text-blue-500" /> État de la popup
              </h3>
              <button
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                  isActive ? "bg-emerald-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                    isActive ? "translate-x-8" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Type de Popup</label>
                <div className="flex p-1 bg-gray-100 rounded-2xl w-full max-w-sm">
                  <button
                    onClick={() => setPopupType("pub")}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${
                      popupType === "pub" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Megaphone size={18} /> Publicité
                  </button>
                  <button
                    onClick={() => setPopupType("info")}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 ${
                      popupType === "info" 
                      ? "bg-white text-blue-600 shadow-sm" 
                      : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Info size={18} /> Information
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Titre de l'annonce</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-800"
                  placeholder="Ex: Nouveau Service..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Date affichée</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Image de fond</label>
                  <input
                    type="file"
                    id="popup-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <label 
                    htmlFor="popup-image"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-dashed border-gray-200 hover:border-blue-500 hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-2 text-gray-500 font-bold group cursor-pointer"
                  >
                    <ImageIcon size={20} className="group-hover:text-blue-500" /> 
                    {imagePreview ? "Changer l'image" : "Choisir une image"}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Lien du bouton</label>
                <input
                  type="text"
                  value={buttonLink}
                  onChange={(e) => setButtonLink(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium text-blue-600 underline decoration-blue-200"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Message de l'annonce</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-medium text-gray-800 resize-none"
                  placeholder="Écrivez votre message ici..."
                />
              </div>
            </div>

            <div className="mt-10">
              <button
                onClick={handleSave}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-100 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
              >
                <Save size={20} /> Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 sticky top-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Eye size={20} className="text-emerald-500" /> Aperçu en direct
            </h3>
            
            <div className="border border-gray-100 rounded-3xl overflow-hidden shadow-inner bg-gray-50 p-4">
              <div className="bg-white rounded-2xl shadow-lg transition-all duration-300 transform scale-90 origin-top">
                <div className="h-32 bg-gray-200 relative overflow-hidden">
                   {imagePreview ? (
                     <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold italic text-[10px]">Aucune image</div>
                   )}
                   <div className="absolute top-2 left-2 bg-blue-600 text-white text-[8px] px-2 py-1 rounded-full font-black uppercase">Nouveauté</div>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-[8px] font-bold mb-1 uppercase tracking-tighter">{date}</p>
                  <h4 className="text-sm font-black text-gray-900 mb-2 leading-tight line-clamp-2">{title}</h4>
                  <p className="text-gray-500 text-[10px] leading-relaxed line-clamp-3 mb-4">{message}</p>
                  
                  {popupType === "pub" && (
                    <div className="flex gap-2">
                      <div className="flex-[2] h-6 rounded bg-gradient-to-r from-blue-600 to-emerald-400 text-[6px] text-white flex items-center justify-center font-black uppercase tracking-tighter shadow-sm shadow-blue-50">
                        Lire l'article
                      </div>
                      <div className="flex-1 h-6 rounded border border-gray-100 text-[6px] text-gray-400 flex items-center justify-center font-bold uppercase bg-white">
                        Plus tard
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <p className="mt-6 text-xs text-gray-400 text-center font-medium italic leading-relaxed">
              Mode : <span className="text-blue-600 font-bold">{popupType === "pub" ? "Publicité (Boutons visibles)" : "Information (Sans boutons)"}</span> <br/>
              Lien configuré vers : <br/>
              <span className="text-blue-500 truncate block w-full">{buttonLink || "Aucun lien"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupManager;
