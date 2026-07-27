import { useState } from "react";
import {
  Calendar,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Download,
  Phone,
  MessageCircle,
} from "lucide-react";

type RdvStatus = "En attente" | "Confirmé" | "Rejeté" | "Terminé";

interface Rdv {
  id: number;
  patient: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  commentaire: string;
  date: string;
  time: string;
  contact: "WhatsApp" | "SMS";
  status: RdvStatus;
  medecin?: string;
  rejectionReason?: string;
  createdAt: string;
}

const initialRdvs: Rdv[] = [
  {
    id: 1,
    patient: "Marie Kouassi",
    email: "marie.kouassi@email.com",
    phone: "+225 07 77 34 48 59",
    service: "Gynécologie",
    description: "Consultation de suivi grossesse",
    commentaire: "Besoin d'un rendez-vous matinal si possible.",
    date: "2024-12-20",
    time: "10:00",
    contact: "WhatsApp",
    status: "En attente",
    medecin: "Dr. Bamba Mariam",
    createdAt: "2024-12-15 14:30",
  },
  {
    id: 2,
    patient: "Jean Diabaté",
    email: "jean.diab@test.com",
    phone: "+225 27 22 26 94 03",
    service: "Pédiatrie",
    description: "Vaccination enfant 6 mois",
    commentaire: "Première visite à la clinique.",
    date: "2024-12-21",
    time: "14:30",
    contact: "SMS",
    status: "Confirmé",
    medecin: "Dr. Aminata Traoré",
    createdAt: "2024-12-14 10:15",
  },
  {
    id: 3,
    patient: "Fatou Koné",
    email: "fatou.k@gmail.com",
    phone: "+225 05 12 34 56 78",
    service: "Cardiologie",
    description: "Douleurs thoraciques",
    commentaire: "Patient avec antécédents familiaux.",
    date: "2024-12-22",
    time: "09:00",
    contact: "WhatsApp",
    status: "En attente",
    medecin: "Dr. Koné Sarah",
    createdAt: "2024-12-16 16:45",
  },
  {
    id: 4,
    patient: "Amadou Touré",
    email: "amadou.t@email.com",
    phone: "+225 07 88 99 00 11",
    service: "Médecine Interne",
    description: "Bilan de santé annuel",
    commentaire: "Vient pour un check-up complet.",
    date: "2024-12-19",
    time: "11:00",
    contact: "SMS",
    status: "Terminé",
    medecin: "Dr. Kouassi Emmanuel",
    createdAt: "2024-12-10 09:20",
  },
];

const services = [
  "Médecine générale",
  "Gynécologie",
  "Obstétrique / Pédiatrie",
  "Néonatologie",
  "Chirurgie digestive et générale",
  "Traumatologie",
  "Néphrologie",
  "Diabétologie",
  "Endocrinologie",
  "Gastro-entérologie",
  "Urologie",
  "Dermatologie",
  "Vénérologie",
  "Neurologie",
  "Cardiologie",
];

const statusStyles: Record<RdvStatus, string> = {
  "En attente": "bg-yellow-100 text-yellow-700",
  "Confirmé": "bg-green-100 text-green-700",
  "Rejeté": "bg-red-100 text-red-700",
  "Terminé": "bg-blue-100 text-blue-700",
};

export default function Rdv() {
  const [rdvs, setRdvs] = useState<Rdv[]>(initialRdvs);
  const [search, setSearch] = useState("");
  const [openService, setOpenService] = useState(false);
  const [serviceFilter, setServiceFilter] = useState("Tous");
  const [openStatus, setOpenStatus] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [selectedRdv, setSelectedRdv] = useState<Rdv | null>(null);
  const [rejectionModalId, setRejectionModalId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const filteredRdvs = rdvs.filter((rdv) => {
    const matchSearch =
      rdv.patient.toLowerCase().includes(search.toLowerCase()) ||
      rdv.service.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "Tous" || rdv.status === statusFilter;

    const matchService =
      serviceFilter === "Tous" || rdv.service === serviceFilter;

    return matchSearch && matchStatus && matchService;
  });

  const updateStatus = (id: number, status: RdvStatus, reason?: string) => {
    setRdvs(prev => prev.map(rdv => rdv.id === id ? { ...rdv, status, rejectionReason: reason } : rdv));
    if (selectedRdv && selectedRdv.id === id) {
      setSelectedRdv(prev => prev ? { ...prev, status, rejectionReason: reason } : null);
    }
  };

  const handleConfirm = (id: number) => {
    updateStatus(id, "Confirmé");
  };

  const handleReject = (id: number) => {
    if (!rejectionReason.trim()) return;
    updateStatus(id, "Rejeté", rejectionReason);
    setRejectionModalId(null);
    setRejectionReason("");
    setSelectedRdv(null);
  };


  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="text-blue-600" />
          Gestion des Rendez-vous
        </h1>

        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded-xl text-sm font-medium">
          <Download size={16} />
          Exporter
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: rdvs.length, color: "border-blue-500" },
          {
            label: "En attente",
            value: rdvs.filter((r) => r.status === "En attente").length,
            color: "border-yellow-500",
          },
          {
            label: "Confirmés",
            value: rdvs.filter((r) => r.status === "Confirmé").length,
            color: "border-green-500",
          },
          {
            label: "Rejetés",
            value: rdvs.filter((r) => r.status === "Rejeté").length,
            color: "border-red-500",
          },
          {
            label: "Terminés",
            value: rdvs.filter((r) => r.status === "Terminé").length,
            color: "border-blue-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-white rounded-xl p-4 border-l-4 ${stat.color}`}
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-3 border rounded-xl px-4 py-3 w-full md:flex-1">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom ou service..."
              className="outline-none text-sm w-full bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative w-full md:w-56">
            <button
              onClick={() => setOpenService(!openService)}
              className="flex items-center gap-3 border rounded-xl px-4 py-3 w-full text-sm bg-white"
            >
              <Filter size={18} className="text-gray-400" />
              <span className="flex-1 text-left">
                {serviceFilter === "Tous" ? "Tous les services" : serviceFilter}
              </span>
            </button>

            {openService && (
              <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border overflow-hidden">
                <div className="max-h-36 overflow-y-auto">
                  {["Tous", ...services].map((item, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setServiceFilter(item);
                        setOpenService(false);
                      }}
                      className="w-full text-left px-5 py-3 text-sm hover:bg-blue-50 transition"
                    >
                      {item === "Tous" ? "Tous les services" : item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative w-full md:w-48">
            <button
              onClick={() => setOpenStatus(!openStatus)}
              className="flex items-center gap-3 border rounded-xl px-4 py-3 w-full text-sm bg-white"
            >
              <Filter size={18} className="text-gray-400" />
              <span className="flex-1 text-left">
                {statusFilter === "Tous" ? "Tous les statuts" : statusFilter}
              </span>
            </button>

            {openStatus && (
              <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border overflow-hidden">
                <div className="max-h-36 overflow-y-auto">
                  {["Tous", "En attente", "Confirmé", "Rejeté", "Terminé"].map((item, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setStatusFilter(item as RdvStatus | "Tous");
                        setOpenStatus(false);
                      }}
                      className="w-full text-left px-5 py-3 text-sm hover:bg-blue-50 transition"
                    >
                      {item === "Tous" ? "Tous les statuts" : item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hidden md:block bg-white rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-600 to-teal-500 text-white">
            <tr>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Date & Heure</th>
              <th className="p-3 text-left">Contact</th>
              <th className="p-3 text-left">Statut</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredRdvs.map((rdv) => (
              <tr key={rdv.id}>
                <td className="p-3">
                  <p className="font-medium">{rdv.patient}</p>
                  <p className="text-xs text-gray-500">{rdv.phone}</p>
                </td>

                <td className="p-3">
                  <p className="font-medium text-blue-600 truncate max-w-[150px]">{rdv.service}</p>
                  <p className="text-xs text-blue-400 font-medium">{rdv.medecin || "Non spécifié"}</p>
                </td>

                <td className="p-3">
                  <p>{rdv.date}</p>
                  <p className="text-xs text-gray-500">{rdv.time}</p>
                </td>

                <td className="p-3">
                  {rdv.contact === "WhatsApp" ? (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      <MessageCircle size={14} /> WhatsApp
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                      <Phone size={14} /> SMS
                    </span>
                  )}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[rdv.status]}`}
                  >
                    {rdv.status}
                  </span>
                </td>

                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setSelectedRdv(rdv)}
                      className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    >
                      <Eye size={16} />
                    </button>

                    {rdv.status === "En attente" && (
                      <>
                        <button 
                          onClick={() => handleConfirm(rdv.id)}
                          className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition"
                          title="Confirmer"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={() => setRejectionModalId(rdv.id)}
                          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                          title="Rejeter"
                        >
                          <X size={16} />
                        </button>
                      </>
                    )}
                    {rdv.status === "Confirmé" && (
                      <button 
                        onClick={() => updateStatus(rdv.id, "Terminé")}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition shadow-sm"
                        title="Marquer comme terminé"
                      >
                        <Check size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {filteredRdvs.map((rdv) => (
          <div key={rdv.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{rdv.patient}</p>
                <p className="text-xs text-gray-500">{rdv.phone}</p>
              </div>
              <span
                className={`h-fit px-3 py-1 rounded-full text-xs font-medium ${statusStyles[rdv.status]}`}
              >
                {rdv.status}
              </span>
            </div>

            <div className="mt-3 text-sm">
              <p className="font-bold text-blue-600">{rdv.service}</p>
              <p className="text-xs font-semibold text-blue-400 mb-1">{rdv.medecin || "Médecin non spécifié"}</p>
              <p className="mt-2 text-xs text-gray-400 font-medium">
                {rdv.date} • {rdv.time}
              </p>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs font-medium text-blue-600">
                {rdv.contact}
              </span>

              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedRdv(rdv)}
                  className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                >
                  <Eye size={16} />
                </button>
                {rdv.status === "En attente" && (
                  <>
                    <button 
                      onClick={() => handleConfirm(rdv.id)}
                      className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition"
                    >
                      <Check size={16} />
                    </button>
                    <button 
                      onClick={() => setRejectionModalId(rdv.id)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      <X size={16} />
                    </button>
                  </>
                )}
                {rdv.status === "Confirmé" && (
                  <button 
                    onClick={() => updateStatus(rdv.id, "Terminé")}
                    className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-800 transition shadow-md"
                  >
                    <Check size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedRdv && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Détails du rendez-vous</h2>
                <button 
                  onClick={() => setSelectedRdv(null)} 
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Patient</p>
                  <p className="text-xl font-bold text-gray-900">{selectedRdv.patient}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-lg font-bold text-gray-900">{selectedRdv.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Service demandé</p>
                  <p className="text-xl font-bold text-gray-900">{selectedRdv.service}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Médecin sélectionné</p>
                  <p className="text-lg font-bold text-blue-600">{selectedRdv.medecin || "Non spécifié"}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Motif / Commentaire</p>
                <div className="bg-gray-50 p-4 rounded-xl border font-medium italic text-gray-900">
                  "{selectedRdv.commentaire}"
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="text-lg font-bold text-gray-900">{selectedRdv.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Heure</p>
                  <p className="text-lg font-bold text-gray-900">{selectedRdv.time}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                <p className="text-lg font-bold text-gray-900">{selectedRdv.phone}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Mode de validation</p>
                {selectedRdv.contact === "WhatsApp" ? (
                  <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold">
                    <MessageCircle size={16} /> WhatsApp
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-semibold">
                    <Phone size={16} /> SMS
                  </span>
                )}
              </div>

              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-2">Statut</p>
                <span className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${statusStyles[selectedRdv.status]}`}>
                  {selectedRdv.status}
                </span>
                {selectedRdv.status === "Rejeté" && selectedRdv.rejectionReason && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">Raison du refus :</p>
                    <p className="text-red-700 italic">"{selectedRdv.rejectionReason}"</p>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-500 mb-8">Demande créée le {selectedRdv.createdAt}</p>

              {selectedRdv.status === "Confirmé" && (
                <div className="mt-6 flex justify-center">
                  <button 
                    onClick={() => updateStatus(selectedRdv.id, "Terminé")}
                    className="w-20 h-20 bg-blue-600 hover:bg-blue-800 text-white rounded-full flex items-center justify-center transition-all shadow-xl shadow-blue-100"
                    title="Marquer comme terminé"
                  >
                    <Check size={32} strokeWidth={3} />
                  </button>
                </div>
              )}

              {selectedRdv.status === "En attente" && (
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleConfirm(selectedRdv.id)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition"
                  >
                    Confirmer
                  </button>
                  <button 
                    onClick={() => setRejectionModalId(selectedRdv.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition"
                  >
                    Rejeter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* RICH REJECTION MODAL (MOCKUP MATCH) */}
      {rejectionModalId && (() => {
        const rdv = rdvs.find(r => r.id === rejectionModalId);
        if (!rdv) return null;

        return (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[70] animate-in fade-in duration-300">
            <div className="bg-white rounded-[1.5rem] shadow-2xl w-full max-w-lg overflow-hidden transform animate-in zoom-in-95 duration-200">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-black text-gray-900">Annuler le rendez-vous</h3>
                  <button 
                    onClick={() => setRejectionModalId(null)}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>

                {/* Compact Details Grid */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Patient</p>
                      <p className="text-sm font-black text-gray-900">{rdv.patient}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Téléphone</p>
                      <p className="text-sm font-bold text-gray-900">{rdv.phone}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Service</p>
                      <p className="text-sm font-bold text-blue-600">{rdv.service}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Médecin</p>
                      <p className="text-sm font-bold text-gray-900">{rdv.medecin || "Non assigné"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Date & Heure</p>
                      <p className="text-sm font-bold text-gray-900">{rdv.date} à {rdv.time}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Validation</p>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${rdv.contact === "WhatsApp" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                        {rdv.contact}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Motif du patient</p>
                    <p className="text-xs italic text-gray-600">"{rdv.commentaire || "Aucun commentaire"}"</p>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 mb-2 font-medium">Demande créée le {rdv.createdAt}</p>
                    
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Raison de l'annulation (obligatoire)</label>
                    <textarea
                      autoFocus
                      className="w-full px-4 py-2 bg-gray-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-xl outline-none transition-all duration-200 min-h-[80px] text-sm text-gray-900 placeholder:text-gray-400 font-medium"
                      placeholder="Pourquoi annulez-vous ?"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={() => handleReject(rejectionModalId)}
                      disabled={!rejectionReason.trim()}
                      className="flex-[2] py-3 px-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-red-100 text-xs uppercase"
                    >
                      Confirmer l'annulation
                    </button>
                    <button
                      onClick={() => {
                        setRejectionModalId(null);
                        setRejectionReason("");
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors text-xs uppercase"
                    >
                      Retour
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}