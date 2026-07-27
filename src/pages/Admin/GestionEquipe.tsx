import React, { useState, useEffect } from "react";
import { Users, UserPlus, Edit, Trash2, Save, X, Upload, Image as ImageIcon } from "lucide-react";
import { initialAdminTeam, initialSpecialists, AdminTeamMember, Specialist } from "../../data/teamData";

const GestionEquipe: React.FC = () => {
  const [tab, setTab] = useState<"admin" | "specialists">("admin");
  const [adminTeam, setAdminTeam] = useState<AdminTeamMember[]>([]);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from an API or localStorage
    const savedAdmin = localStorage.getItem("adminTeam");
    const savedSpecs = localStorage.getItem("specialists");
    
    setAdminTeam(savedAdmin ? JSON.parse(savedAdmin) : initialAdminTeam);
    setSpecialists(savedSpecs ? JSON.parse(savedSpecs) : initialSpecialists);
  }, []);

  const saveToStorage = (newAdmin: AdminTeamMember[], newSpecs: Specialist[]) => {
    localStorage.setItem("adminTeam", JSON.stringify(newAdmin));
    localStorage.setItem("specialists", JSON.stringify(newSpecs));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingMember({ ...editingMember, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "admin") {
      let updated;
      if (editingMember.id) {
        updated = adminTeam.map(m => m.id === editingMember.id ? editingMember : m);
      } else {
        const newMember = { ...editingMember, id: Date.now() };
        updated = [...adminTeam, newMember];
      }
      setAdminTeam(updated);
      saveToStorage(updated, specialists);
    } else {
      let updated;
      if (editingMember.id) {
        updated = specialists.map(s => s.id === editingMember.id ? editingMember : s);
      } else {
        const newSpec = { ...editingMember, id: Date.now() };
        updated = [...specialists, newSpec];
      }
      setSpecialists(updated);
      saveToStorage(adminTeam, updated);
    }
    setShowForm(false);
    setEditingMember(null);
  };

  const deleteMember = (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) return;
    if (tab === "admin") {
      const updated = adminTeam.filter(m => m.id !== id);
      setAdminTeam(updated);
      saveToStorage(updated, specialists);
    } else {
      const updated = specialists.filter(s => s.id !== id);
      setSpecialists(updated);
      saveToStorage(adminTeam, updated);
    }
  };

  const startAdd = () => {
    setEditingMember(tab === "admin" ? {
      name: "", role: "", specialty: "", experience: "", phone: "", email: "", image: "", responsibilities: [], education: []
    } : {
      name: "", title: "", specialty: "", experience: "", phone: "", email: "", image: "", bio: "", qualifications: [], languages: [], schedule: "", iconBg: "bg-blue-500"
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users size={28} className="text-blue-600" /> Gestion de l'Équipe
        </h1>
        <button 
          onClick={startAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <UserPlus size={18} /> Ajouter un membre
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b">
          <button 
            onClick={() => setTab("admin")}
            className={`flex-1 py-4 text-sm font-bold transition-all ${tab === "admin" ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50" : "text-gray-400 hover:text-gray-600"}`}
          >
            Équipe Administrative
          </button>
          <button 
            onClick={() => setTab("specialists")}
            className={`flex-1 py-4 text-sm font-bold transition-all ${tab === "specialists" ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50" : "text-gray-400 hover:text-gray-600"}`}
          >
            Spécialistes
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(tab === "admin" ? adminTeam : specialists).map((member: any) => (
              <div key={member.id} className="border rounded-2xl p-4 flex flex-col gap-4 hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 border">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">{member.name}</h3>
                    <p className="text-xs text-blue-600 font-medium truncate">{tab === "admin" ? member.role : member.title}</p>
                    <p className="text-[10px] text-gray-400 truncate">{member.specialty}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-auto pt-4 border-t">
                  <button 
                    onClick={() => { setEditingMember(member); setShowForm(true); }}
                    className="flex-1 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-2 text-xs font-bold"
                  >
                    <Edit size={14} /> Modifier
                  </button>
                  <button 
                    onClick={() => deleteMember(member.id)}
                    className="py-2 px-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center justify-center"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{editingMember?.id ? "Modifier" : "Ajouter"} {tab === "admin" ? "un membre admin" : "un spécialiste"}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20}/></button>
            </div>
            <form onSubmit={handleSaveMember} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Nom Complet</label>
                  <input 
                    required 
                    type="text" 
                    value={editingMember.name} 
                    onChange={e => setEditingMember({...editingMember, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">{tab === "admin" ? "Rôle" : "Titre"}</label>
                  <input 
                    required 
                    type="text" 
                    value={tab === "admin" ? editingMember.role : editingMember.title} 
                    onChange={e => setEditingMember(tab === "admin" ? {...editingMember, role: e.target.value} : {...editingMember, title: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Spécialité</label>
                  <input 
                    required 
                    type="text" 
                    value={editingMember.specialty} 
                    onChange={e => setEditingMember({...editingMember, specialty: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition"
                  />
                </div>
                {tab === "admin" && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Expérience</label>
                    <input 
                      required 
                      type="text" 
                      value={editingMember.experience || ""} 
                      onChange={e => setEditingMember({...editingMember, experience: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Téléphone</label>
                  <input 
                    required 
                    type="text" 
                    value={editingMember.phone} 
                    onChange={e => setEditingMember({...editingMember, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Email</label>
                  <input 
                    required 
                    type="email" 
                    value={editingMember.email} 
                    onChange={e => setEditingMember({...editingMember, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Formation</label>
                  <textarea 
                    rows={3}
                    value={tab === "admin" ? (editingMember.education?.join('\n') || '') : (editingMember.qualifications?.join('\n') || '')} 
                    onChange={e => setEditingMember(tab === "admin" ? {...editingMember, education: e.target.value.split('\n')} : {...editingMember, qualifications: e.target.value.split('\n')})}
                    placeholder="Séparez les formations par un retour à la ligne"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition resize-none"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase">Image du membre</label>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group relative">
                    {editingMember.image ? (
                      <>
                        <img src={editingMember.image} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <Upload size={20} className="text-white" />
                        </div>
                      </>
                    ) : (
                      <ImageIcon size={32} className="text-gray-300" />
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-gray-700">Changer la photo</p>
                    <p className="text-xs text-gray-400">PNG, JPG ou WebP. Max 2MB.</p>
                    <button 
                      type="button"
                      onClick={() => document.getElementById('fileInput')?.click()}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 mt-1"
                    >
                      Parcourir les fichiers
                    </button>
                    <input 
                      id="fileInput"
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
              {tab === "specialists" && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Biographie</label>
                  <textarea 
                    rows={3}
                    value={editingMember.bio} 
                    onChange={e => setEditingMember({...editingMember, bio: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition resize-none"
                  />
                </div>
              )}
              <div className="flex gap-4 mt-8">
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition uppercase tracking-widest text-[10px]"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-lg shadow-blue-100 uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
                >
                  <Save size={16} /> Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionEquipe;
