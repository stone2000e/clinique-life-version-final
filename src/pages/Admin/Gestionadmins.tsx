import React, { useState } from "react";
import { UserPlus, Users, Trash2, Eye, EyeOff, Search, Shield, Mail } from "lucide-react";

interface Admin {
  id: number;
  nom: string;
  email: string;
  niveau: number;
  dateCreation: string;
  status: "actif" | "inactif";
}

const GestionAdmins: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Formulaire
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [niveau, setNiveau] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Liste simulée d'admins
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: 1,
      nom: "Administrateur 1",
      email: "admin1@cliniquelife.com",
      niveau: 1,
      dateCreation: "2024-01-15",
      status: "actif"
    },
    {
      id: 2,
      nom: "Administrateur 2",
      email: "admin2@cliniquelife.com",
      niveau: 2,
      dateCreation: "2024-02-20",
      status: "actif"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!nom || !email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    // Vérifier si l'email existe déjà
    if (admins.some(admin => admin.email === email)) {
      setError("Cet email est déjà utilisé");
      return;
    }

    // Ajouter le nouvel admin
    const newAdmin: Admin = {
      id: admins.length + 1,
      nom,
      email,
      niveau,
      dateCreation: new Date().toISOString().split('T')[0],
      status: "actif"
    };

    setAdmins([...admins, newAdmin]);
    setSuccess(`Administrateur ${nom} ajouté avec succès !`);
    
    // Reset form
    setNom("");
    setEmail("");
    setPassword("");
    setNiveau(1);
    setShowAddForm(false);
    
    setTimeout(() => setSuccess(""), 5000);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet administrateur ?")) {
      setAdmins(admins.filter(admin => admin.id !== id));
      setSuccess("Administrateur supprimé avec succès");
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const filteredAdmins = admins.filter(admin =>
    admin.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-blue-500" />
            Gestion des Administrateurs
          </h1>
          <p className="text-gray-500 mt-1">Gérez les accès administrateurs de la plateforme</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
        >
          <UserPlus size={20} />
          Ajouter un admin
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-green-700">{success}</p>
        </div>
      )}

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="mb-6 bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Nouvel Administrateur</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Jean Dupont"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="admin@cliniquelife.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                    placeholder="Au moins 8 caractères"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau d'accès
                </label>
                <select
                  value={niveau}
                  onChange={(e) => setNiveau(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={1}>Niveau 1 - Gestion complète</option>
                  <option value={2}>Niveau 2 - Contenu & Communication</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-emerald-400 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                Créer l'administrateur
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Rechercher un administrateur..."
          />
        </div>
      </div>

      {/* Liste des admins */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Administrateur
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Niveau
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date création
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-400 text-white rounded-full flex items-center justify-center font-bold">
                        {admin.nom.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{admin.nom}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Mail size={16} className="text-gray-400" />
                      {admin.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className={admin.niveau === 1 ? "text-blue-500" : "text-emerald-500"} />
                      <span className="text-sm font-medium text-gray-900">Niveau {admin.niveau}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(admin.dateCreation).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      admin.status === 'actif' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleDelete(admin.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAdmins.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Aucun administrateur trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionAdmins;