import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, X, Save, Image as ImageIcon, ShieldCheck } from "lucide-react";
import { Assurance, initialAssurances } from "../../data/assurancesData";

export default function GestionAssurances() {
  const [assurances, setAssurances] = useState<Assurance[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingAssurance, setEditingAssurance] = useState<Assurance | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("assurances");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (typeof parsed[0] === 'object' && parsed[0] !== null && 'name' in parsed[0]) {
            setAssurances(parsed);
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
    setAssurances(initialAssurances);
  }, []);

  const saveToLocalAndState = (newAssurances: Assurance[]) => {
    setAssurances(newAssurances);
    localStorage.setItem("assurances", JSON.stringify(newAssurances));
  };

  const handleOpenAddModal = () => {
    setEditingAssurance(null);
    setName("");
    setLogo("");
    setShowModal(true);
  };

  const handleOpenEditModal = (assurance: Assurance) => {
    setEditingAssurance(assurance);
    setName(assurance.name);
    setLogo(assurance.logo);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAssurance(null);
    setName("");
    setLogo("");
  };

  const handleSave = () => {
    if (!name.trim() || !logo.trim()) return;

    if (editingAssurance) {
      // Edit existing
      const updated = assurances.map(a => 
        a.id === editingAssurance.id ? { ...a, name, logo } : a
      );
      saveToLocalAndState(updated);
    } else {
      // Add new
      const newId = assurances.length > 0 ? Math.max(...assurances.map(a => a.id)) + 1 : 1;
      const newAssurance: Assurance = { id: newId, name, logo };
      saveToLocalAndState([...assurances, newAssurance]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette assurance partenaire ?")) {
      const updated = assurances.filter(a => a.id !== id);
      saveToLocalAndState(updated);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogo(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const filteredAssurances = assurances.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShieldCheck className="text-blue-600" size={32} />
            Gestion des Assurances
          </h1>
          <p className="text-gray-500 mt-2">
            Gérez la liste et les logos de vos assurances partenaires.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-200"
        >
          <Plus size={20} /> Ajouter un partenaire
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
        <div className="relative">
          <label className="sr-only">Rechercher</label>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher une assurance au nom..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 rounded-xl outline-none transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {filteredAssurances.map(partner => (
          <div 
            key={partner.id}
            className="group bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col items-center justify-center text-center relative hover:shadow-md transition-shadow"
          >
            {/* Actions overlays */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button 
                onClick={() => handleOpenEditModal(partner)}
                className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={() => handleDelete(partner.id)}
                className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="h-16 w-full mb-3 flex items-center justify-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <h3 className="text-gray-800 font-semibold text-sm truncate w-full" title={partner.name}>
              {partner.name}
            </h3>
          </div>
        ))}
        {filteredAssurances.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            Aucune assurance trouvée correspondant à votre recherche.
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingAssurance ? "Modifier l'assurance" : "Ajouter une assurance"}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 transition">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Nom du partenaire <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: NSIA Assurances"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Logo (Image URL ou Téléchargement) <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="URL (/assurances/logo.png) ou parcourir..."
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                  <label className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-4 py-3 rounded-xl font-medium hover:bg-blue-100 transition cursor-pointer shrink-0">
                    <ImageIcon size={18} /> Parcourir
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                {logo && (
                  <div className="h-24 w-full bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200 p-2">
                     <img src={logo} alt="Aperçu" className="max-h-full max-w-full object-contain" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-200 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={!name.trim() || !logo.trim()}
                className="flex-1 bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Save size={18} /> {editingAssurance ? "Mettre à jour" : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
