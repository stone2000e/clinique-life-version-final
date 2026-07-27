import { useState } from "react";
import { Eye, Save, Briefcase, Newspaper, Image, Trash2, X, Plus, Edit, FileText } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  subtitle?: string;
  image?: string;
  detailedDescription?: string;
  highlights?: string[];
}

type ServicesData = {
  [key: string]: Service[];
};

interface Article {
  id: number;
  image: string;
  title: string;
  description: string;
  author: string;
  date: string;
  status: "Publié" | "Brouillon";
  readTime?: string;
  tags?: string[];
  mainImage?: string;
  introduction?: string;
  section1Image?: string;
  section1Title?: string;
  section1Content?: string;
  section2Image?: string;
  section2Title?: string;
  section2Content?: string;
  section3Title?: string;
  section3Content1?: string;
  section3Content2?: string;
  conclusion?: string;
}

export default function GestionContenu() {
  const [tab, setTab] = useState("services");
  const [expandedDept, setExpandedDept] = useState<string | null>(null);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [currentDept, setCurrentDept] = useState<string>("");
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceDescription, setNewServiceDescription] = useState("");
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [articleFormStep, setArticleFormStep] = useState(1);
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const [viewingArticleId, setViewingArticleId] = useState<number | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [newArticle, setNewArticle] = useState({
    imageUrl: "",
    author: "",
    date: "",
    readTime: "5 min",
    title: "",
    description: "",
    tags: [] as string[],
    mainImage: "",
    introduction: "",
    section1Image: "",
    section1Title: "",
    section1Content: "",
    section2Image: "",
    section2Title: "",
    section2Content: "",
    section3Title: "",
    section3Content1: "",
    section3Content2: "",
    conclusion: "",
    publishStatus: "Brouillon" as "Brouillon" | "Publié"
  });
  const [currentTag, setCurrentTag] = useState("");

  const [servicesData, setServicesData] = useState<ServicesData>({
    "FEMME–MÈRE–ENFANT": [
      { 
        id: 1, 
        title: "La Gynécologie", 
        description: "Consultations et suivi gynécologique complet",
        subtitle: "Suivi et prévention pour la femme",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80",
        detailedDescription: "La gynécologie à la Clinique LIFE englobe l'ensemble des soins liés à la santé reproductive féminine. Nous assurons le dépistage précoce, les consultations de routine et le traitement des pathologies gynécologiques avec une approche personnalisée et respectueuse.",
        highlights: ["Consultations annuelles", "Dépistage et frottis", "Planification familiale", "Traitement des troubles hormonaux"]
      },
      { id: 2, title: "Le Frottis cervico-utérin", description: "Dépistage et prévention du cancer du col" },
      { id: 3, title: "L'endométriose", description: "Diagnostic et prise en charge spécialisée" },
      { id: 4, title: "Le cancer du sein", description: "Dépistage, diagnostic et accompagnement" },
      { id: 5, title: "Obstétrique", description: "Suivi de grossesse et accouchement" },
      { id: 6, title: "Vous avez le projet de faire un bébé ?", description: "Consultation pré-conceptionnelle" },
      { id: 7, title: "Si le bébé tarde à venir", description: "Aide à la procréation" },
      { id: 8, title: "L'accouchement", description: "Accompagnement personnalisé" },
      { id: 9, title: "Césarienne", description: "Intervention chirurgicale sécurisée" },
      { id: 10, title: "Rééducation du périnée", description: "Rééducation post-partum" },
      { id: 11, title: "Médecine de la Reproduction", description: "Assistance médicale à la procréation" },
      { id: 12, title: "Pédiatrie", description: "Soins pour enfants et adolescents" },
      { id: 13, title: "Service de Néonatologie", description: "Soins spécialisés pour nouveau-nés" },
    ],
    "MÉDECINE": [
      { id: 14, title: "Médecine générale", description: "Consultations et soins généraux" },
      { id: 15, title: "Cardiologie", description: "Examens et suivis cardiaques" },
    ],
    "CHIRURGIE": [
      { id: 16, title: "Chirurgie générale", description: "Interventions chirurgicales diverses" },
    ],
    "LABORATOIRE D'ANALYSES MÉDICALES": [
      { id: 17, title: "Analyses sanguines", description: "Bilans complets et spécialisés" },
    ],
    "SERVICE D'IMAGERIE MÉDICALE": [
      { id: 18, title: "Échographie", description: "Imagerie par ultrasons" },
    ],
  });

  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400",
      title: "Les bienfaits de la médecine préventive",
      description: "Découvrez comment la médecine préventive peut améliorer votre qualité de vie",
      author: "Dr. Koffi",
      date: "2024-01-15",
      status: "Publié"
    }
  ]);

  const toggleDept = (deptName: string) => {
    setExpandedDept(expandedDept === deptName ? null : deptName);
  };

  const handleAddService = () => {
    if (!newServiceName.trim() || !currentDept) return;

    const newService = {
      id: Date.now(),
      title: newServiceName,
      description: newServiceDescription
    };

    setServicesData(prev => ({
      ...prev,
      [currentDept]: [...prev[currentDept], newService]
    }));

    setShowAddServiceModal(false);
    setNewServiceName("");
    setNewServiceDescription("");
    setCurrentDept("");
  };

  const resetArticleForm = () => {
    setShowArticleForm(false);
    setArticleFormStep(1);
    setEditingArticleId(null);
    setViewingArticleId(null);
    setHasUnsavedChanges(false);
    setNewArticle({
      imageUrl: "",
      author: "",
      date: "",
      readTime: "5 min",
      title: "",
      description: "",
      tags: [],
      mainImage: "",
      introduction: "",
      section1Image: "",
      section1Title: "",
      section1Content: "",
      section2Image: "",
      section2Title: "",
      section2Content: "",
      section3Title: "",
      section3Content1: "",
      section3Content2: "",
      conclusion: "",
      publishStatus: "Brouillon"
    });
    setCurrentTag("");
  };

  const handleCreateArticle = () => {
    if (!newArticle.title.trim() || !newArticle.author.trim()) return;

    const article: Article = {
      id: editingArticleId || Date.now(),
      image: newArticle.imageUrl || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400",
      title: newArticle.title,
      description: newArticle.description,
      author: newArticle.author,
      date: newArticle.date,
      status: newArticle.publishStatus,
      readTime: newArticle.readTime,
      tags: newArticle.tags,
      mainImage: newArticle.mainImage,
      introduction: newArticle.introduction,
      section1Image: newArticle.section1Image,
      section1Title: newArticle.section1Title,
      section1Content: newArticle.section1Content,
      section2Image: newArticle.section2Image,
      section2Title: newArticle.section2Title,
      section2Content: newArticle.section2Content,
      section3Title: newArticle.section3Title,
      section3Content1: newArticle.section3Content1,
      section3Content2: newArticle.section3Content2,
      conclusion: newArticle.conclusion
    };

    if (editingArticleId) {
      setArticles(prev => prev.map(a => a.id === editingArticleId ? article : a));
    } else {
      setArticles(prev => [...prev, article]);
    }

    resetArticleForm();
  };

  const handleEditArticle = (article: Article) => {
    setNewArticle({
      imageUrl: article.image,
      author: article.author,
      date: article.date,
      readTime: article.readTime || "5 min",
      title: article.title,
      description: article.description,
      tags: article.tags || [],
      mainImage: article.mainImage || "",
      introduction: article.introduction || "",
      section1Image: article.section1Image || "",
      section1Title: article.section1Title || "",
      section1Content: article.section1Content || "",
      section2Image: article.section2Image || "",
      section2Title: article.section2Title || "",
      section2Content: article.section2Content || "",
      section3Title: article.section3Title || "",
      section3Content1: article.section3Content1 || "",
      section3Content2: article.section3Content2 || "",
      conclusion: article.conclusion || "",
      publishStatus: article.status
    });
    setEditingArticleId(article.id);
    setViewingArticleId(null);
    setShowArticleForm(true);
    setArticleFormStep(1);
    setHasUnsavedChanges(false);
  };

  const handleViewArticle = (article: Article) => {
    setViewingArticleId(article.id);
    setShowArticleForm(false);
    setEditingArticleId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FBFF] to-[#EAF3FF] p-4 sm:p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
          📄 Gestion du Contenu
        </h1>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
            <Eye size={18}/> Prévisualiser
          </button>
          <button className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
            <Save size={18}/> Sauvegarder
          </button>
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* TABS */}
        <div className="flex border-b border-gray-200">
          <Tab icon={<Briefcase size={16}/>} label="Services" active={tab==="services"} onClick={()=>setTab("services")} />
          <Tab icon={<Newspaper size={16}/>} label="Blog" active={tab==="blog"} onClick={()=>setTab("blog")} />
        </div>

        {/* FORM */}
        <div className="p-6 space-y-8">

          {/* =================== PAGE SERVICES =================== */}
          {tab==="services" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gestion des Services par Département</h2>

                <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-xl shadow">
                  <Save size={18}/> Sauvegarder
                </button>
              </div>

              {Object.entries(servicesData).map(([deptName, services]) => (
                <ServiceDept
                  key={deptName}
                  title={deptName}
                  count={services.length}
                  isExpanded={expandedDept === deptName}
                  onToggle={() => toggleDept(deptName)}
                  services={services}
                  onAddService={() => {
                    setCurrentDept(deptName);
                    setShowAddServiceModal(true);
                  }}
                  onDeleteService={(serviceId) => {
                    if(!window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return;
                    setServicesData(prev => ({
                      ...prev,
                      [deptName]: prev[deptName].filter(s => s.id !== serviceId)
                    }));
                  }}
                  onEditService={(service) => {
                    setCurrentDept(deptName);
                    setEditingService({...service});
                  }}
                />
              ))}
            </>
          )}

          {/* =================== PAGE BLOG =================== */}
          {tab==="blog" && (
            <>
              {viewingArticleId ? (
                // Vue de la mini carte
                (() => {
                  const article = articles.find(a => a.id === viewingArticleId);
                  if (!article) return null;
                  
                  return (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <button
                          onClick={() => setViewingArticleId(null)}
                          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          ← Retour à la liste
                        </button>
                      </div>

                      <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition">
                          {/* Image */}
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-48 object-cover"
                          />
                          
                          {/* Contenu */}
                          <div className="p-6">
                            <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                              <span>{article.author}</span>
                              <span>•</span>
                              <span>{article.date}</span>
                              {article.readTime && (
                                <>
                                  <span>•</span>
                                  <span>{article.readTime}</span>
                                </>
                              )}
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                            <p className="text-gray-600 mb-4">{article.description}</p>
                            
                            {article.tags && article.tags.length > 0 && (
                              <div className="flex gap-2 flex-wrap">
                                {article.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                article.status === "Publié" 
                                  ? "bg-green-100 text-green-700" 
                                  : "bg-yellow-100 text-yellow-700"
                              }`}>
                                {article.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : !showArticleForm ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <FileText size={32} className="text-indigo-600" />
                      <h2 className="text-3xl font-bold text-gray-900">Gestion des Articles</h2>
                    </div>

                    <button 
                      onClick={() => setShowArticleForm(true)}
                      className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition font-medium"
                    >
                      + Créer un article
                    </button>
                  </div>

                  {/* Table des articles */}
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                    {/* En-tête du tableau */}
                    <div className="bg-indigo-50/50 px-8 py-4 border-b border-gray-100">
                      <div className="flex items-center gap-8">
                        <div className="w-24 text-sm font-semibold text-gray-700">Image</div>
                        <div className="flex-1 text-sm font-semibold text-gray-700">Titre</div>
                        <div className="w-40 text-sm font-semibold text-gray-700">Auteur</div>
                        <div className="w-36 text-sm font-semibold text-gray-700">Date</div>
                        <div className="w-32 text-sm font-semibold text-gray-700">Statut</div>
                        <div className="w-32 text-sm font-semibold text-gray-700 text-center">Actions</div>
                      </div>
                    </div>

                    {/* Lignes des articles */}
                    <div className="divide-y divide-gray-100">
                      {articles.map((article) => (
                        <div key={article.id} className="px-8 py-5 hover:bg-gray-50/50 transition">
                          <div className="flex items-center gap-8">
                            {/* Image */}
                            <div className="w-24 flex-shrink-0">
                              <img 
                                src={article.image} 
                                alt={article.title}
                                className="w-20 h-20 object-cover rounded-xl"
                              />
                            </div>

                            {/* Titre et description */}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 mb-1">{article.title}</h3>
                              <p className="text-sm text-gray-500">{article.description}</p>
                            </div>

                            {/* Auteur */}
                            <div className="w-40 text-gray-700 flex-shrink-0">
                              {article.author}
                            </div>

                            {/* Date */}
                            <div className="w-36 text-gray-700 flex-shrink-0">
                              {article.date}
                            </div>

                            {/* Statut */}
                            <div className="w-32 flex-shrink-0">
                              <span className={`px-4 py-1.5 rounded-lg text-sm font-medium inline-block ${
                                article.status === "Publié" 
                                  ? "bg-green-100 text-green-700" 
                                  : "bg-yellow-100 text-yellow-700"
                              }`}>
                                {article.status}
                              </span>
                            </div>

                            {/* Actions */}
                            <div className="w-32 flex items-center justify-center gap-3 flex-shrink-0">
                              <button 
                                onClick={() => handleViewArticle(article)}
                                className="text-indigo-600 hover:text-indigo-700 transition"
                                title="Voir l'article"
                              >
                                <Eye size={20} />
                              </button>
                              <button 
                                onClick={() => handleEditArticle(article)}
                                className="text-green-600 hover:text-green-700 transition"
                                title="Modifier l'article"
                              >
                                <Edit size={20} />
                              </button>
                              <button 
                                onClick={() => setArticles(articles.filter(a => a.id !== article.id))}
                                className="text-red-600 hover:text-red-700 transition"
                                title="Supprimer l'article"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message si aucun article */}
                    {articles.length === 0 && (
                      <div className="text-center py-16 text-gray-400">
                        <Newspaper size={56} className="mx-auto mb-4 opacity-20" />
                        <p className="text-lg font-medium">Aucun article pour le moment</p>
                        <p className="text-sm mt-2">Cliquez sur "Créer un article" pour commencer</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Formulaire d'ajout d'article */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <FileText size={32} className="text-indigo-600" />
                      <h2 className="text-3xl font-bold text-gray-900">
                        {editingArticleId ? "Modifier l'article" : "Créer un article"}
                      </h2>
                    </div>
                    <button 
                      onClick={resetArticleForm}
                      className="text-gray-600 hover:text-gray-800 font-medium"
                    >
                      ← Retour à la liste
                    </button>
                  </div>

                  {/* Steps */}
                  <div className="flex items-center gap-4 mb-8">
                    <button
                      onClick={() => setArticleFormStep(1)}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition ${
                        articleFormStep === 1
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      1. Mini carte
                    </button>
                    <div className="h-px flex-1 bg-gray-300"></div>
                    <button
                      onClick={() => setArticleFormStep(2)}
                      className={`px-6 py-2.5 rounded-xl font-medium transition ${
                        articleFormStep === 2
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      2. Page article
                    </button>
                  </div>

                  {articleFormStep === 1 && (
                    <>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Informations de la mini carte</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Image de la carte
                          </label>
                          <div className="flex gap-3">
                            <input
                              type="text"
                              placeholder="URL de l'image"
                              value={newArticle.imageUrl}
                              onChange={(e) => {
                                setNewArticle({...newArticle, imageUrl: e.target.value});
                                setHasUnsavedChanges(true);
                              }}
                              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                            <label className="flex items-center gap-2 bg-indigo-100 text-indigo-600 px-6 py-3 rounded-xl font-medium hover:bg-indigo-200 transition cursor-pointer">
                              <Image size={18} /> Choisir
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      setNewArticle({...newArticle, imageUrl: event.target?.result as string});
                                      setHasUnsavedChanges(true);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          </div>
                          {newArticle.imageUrl && (
                            <img 
                              src={newArticle.imageUrl} 
                              alt="Preview" 
                              className="mt-3 w-32 h-32 object-cover rounded-xl"
                            />
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Auteur <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Dr. Nom"
                              value={newArticle.author}
                              onChange={(e) => {
                                setNewArticle({...newArticle, author: e.target.value});
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Date
                            </label>
                            <input
                              type="date"
                              value={newArticle.date}
                              onChange={(e) => {
                                setNewArticle({...newArticle, date: e.target.value});
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Temps de lecture
                            </label>
                            <input
                              type="text"
                              placeholder="5 min"
                              value={newArticle.readTime}
                              onChange={(e) => {
                                setNewArticle({...newArticle, readTime: e.target.value});
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Titre de l'article <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Titre accrocheur"
                            value={newArticle.title}
                            onChange={(e) => {
                              setNewArticle({...newArticle, title: e.target.value});
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Mini description
                          </label>
                          <textarea
                            rows={4}
                            placeholder="Courte description pour la carte"
                            value={newArticle.description}
                            onChange={(e) => {
                              setNewArticle({...newArticle, description: e.target.value});
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Étiquettes (max 5)
                          </label>
                          <div className="flex gap-2 mb-3 flex-wrap">
                            {newArticle.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                              >
                                {tag}
                                <button
                                  onClick={() => {
                                    setNewArticle({...newArticle, tags: newArticle.tags.filter(t => t !== tag)});
                                    setHasUnsavedChanges(true);
                                  }}
                                  className="hover:text-indigo-900"
                                >
                                  <X size={14} />
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Ajouter une étiquette"
                              value={currentTag}
                              onChange={(e) => setCurrentTag(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && currentTag.trim() && newArticle.tags.length < 5) {
                                  setNewArticle({...newArticle, tags: [...newArticle.tags, currentTag.trim()]});
                                  setCurrentTag("");
                                  setHasUnsavedChanges(true);
                                }
                              }}
                              disabled={newArticle.tags.length >= 5}
                              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none disabled:bg-gray-100"
                            />
                            <button
                              onClick={() => {
                                if (currentTag.trim() && newArticle.tags.length < 5) {
                                  setNewArticle({...newArticle, tags: [...newArticle.tags, currentTag.trim()]});
                                  setCurrentTag("");
                                  setHasUnsavedChanges(true);
                                }
                              }}
                              disabled={newArticle.tags.length >= 5 || !currentTag.trim()}
                              className="px-6 py-3 text-indigo-600 rounded-xl font-medium hover:bg-indigo-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                              🏷️ Ajouter
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Footer buttons */}
                      <div className="flex justify-between items-center mt-8 pt-6 border-t">
                        <button
                          onClick={resetArticleForm}
                          className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
                        >
                          Annuler
                        </button>
                        <button
                          onClick={() => setArticleFormStep(2)}
                          disabled={!newArticle.title.trim() || !newArticle.author.trim()}
                          className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Suivant →
                        </button>
                      </div>
                    </>
                  )}

                  {articleFormStep === 2 && (
                    <>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">En-tête de l'article</h3>
                      
                      <div className="space-y-6">
                        {/* Image principale */}
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Image principale
                          </label>
                          <div className="flex gap-3">
                            <input
                              type="text"
                              placeholder="URL de l'image principale"
                              value={newArticle.mainImage}
                              onChange={(e) => {
                                setNewArticle({...newArticle, mainImage: e.target.value});
                                setHasUnsavedChanges(true);
                              }}
                              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                            />
                            <label className="flex items-center gap-2 bg-indigo-100 text-indigo-600 px-6 py-3 rounded-xl font-medium hover:bg-indigo-200 transition cursor-pointer">
                              <Image size={18} /> Choisir
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      setNewArticle({...newArticle, mainImage: event.target?.result as string});
                                      setHasUnsavedChanges(true);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          </div>
                          {newArticle.mainImage && (
                            <img 
                              src={newArticle.mainImage} 
                              alt="Preview" 
                              className="mt-3 w-32 h-32 object-cover rounded-xl"
                            />
                          )}
                        </div>

                        {/* Introduction */}
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Généralités
                          </label>
                          <textarea
                            rows={5}
                            placeholder="Introduction générale de l'article"
                            value={newArticle.introduction}
                            onChange={(e) => {
                              setNewArticle({...newArticle, introduction: e.target.value});
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
                          />
                        </div>

                        <hr className="my-8" />

                        {/* Corps de l'article - Section 1 */}
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Corps de l'article</h3>
                        
                        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                          <h4 className="font-semibold text-gray-800">Section 1</h4>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Image
                            </label>
                            <div className="flex gap-3">
                              <input
                                type="text"
                                placeholder="URL de l'image"
                                value={newArticle.section1Image}
                                onChange={(e) => {
                                  setNewArticle({...newArticle, section1Image: e.target.value});
                                  setHasUnsavedChanges(true);
                                }}
                                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
                              />
                              <label className="flex items-center gap-2 bg-indigo-100 text-indigo-600 px-6 py-3 rounded-xl font-medium hover:bg-indigo-200 transition cursor-pointer">
                                <Image size={18} /> Choisir
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        setNewArticle({...newArticle, section1Image: event.target?.result as string});
                                        setHasUnsavedChanges(true);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                            {newArticle.section1Image && (
                              <img 
                                src={newArticle.section1Image} 
                                alt="Preview" 
                                className="mt-3 w-32 h-32 object-cover rounded-xl"
                              />
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Titre de la section
                            </label>
                            <input
                              type="text"
                              placeholder="Titre de la section 1"
                              value={newArticle.section1Title}
                              onChange={(e) => {
                                setNewArticle({...newArticle, section1Title: e.target.value});
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Contenu
                            </label>
                            <textarea
                              rows={4}
                              placeholder="Contenu de la section 1"
                              value={newArticle.section1Content}
                              onChange={(e) => {
                                setNewArticle({...newArticle, section1Content: e.target.value});
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none bg-white"
                            />
                          </div>
                        </div>

                        {/* Section 2 */}
                        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                          <h4 className="font-semibold text-gray-800">Section 2</h4>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Image
                            </label>
                            <div className="flex gap-3">
                              <input
                                type="text"
                                placeholder="URL de l'image"
                                value={newArticle.section2Image}
                                onChange={(e) => {
                                  setNewArticle({...newArticle, section2Image: e.target.value});
                                  setHasUnsavedChanges(true);
                                }}
                                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
                              />
                              <label className="flex items-center gap-2 bg-indigo-100 text-indigo-600 px-6 py-3 rounded-xl font-medium hover:bg-indigo-200 transition cursor-pointer">
                                <Image size={18} /> Choisir
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        setNewArticle({...newArticle, section2Image: event.target?.result as string});
                                        setHasUnsavedChanges(true);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                            {newArticle.section2Image && (
                              <img 
                                src={newArticle.section2Image} 
                                alt="Preview" 
                                className="mt-3 w-32 h-32 object-cover rounded-xl"
                              />
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Titre de la section
                            </label>
                            <input
                              type="text"
                              placeholder="Titre de la section 2"
                              value={newArticle.section2Title}
                              onChange={(e) => {
                                setNewArticle({...newArticle, section2Title: e.target.value});
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Contenu
                            </label>
                            <textarea
                              rows={4}
                              placeholder="Contenu de la section 2"
                              value={newArticle.section2Content}
                              onChange={(e) => {
                                setNewArticle({...newArticle, section2Content: e.target.value});
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none bg-white"
                            />
                          </div>
                        </div>

                        {/* Section 3 */}
                        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                          <h4 className="font-semibold text-gray-800">Section 3</h4>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Titre de la section
                            </label>
                            <input
                              type="text"
                              placeholder="Titre de la section 3"
                              value={newArticle.section3Title}
                              onChange={(e) => {
                                setNewArticle({...newArticle, section3Title: e.target.value});
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Contenu 1
                            </label>
                            <textarea
                              rows={4}
                              placeholder="Premier paragraphe de la section 3"
                              value={newArticle.section3Content1}
                              onChange={(e) => {
                                setNewArticle({...newArticle, section3Content1: e.target.value});
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none bg-white"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                              Contenu 2
                            </label>
                            <textarea
                              rows={4}
                              placeholder="Deuxième paragraphe de la section 3"
                              value={newArticle.section3Content2}
                              onChange={(e) => {
                                setNewArticle({...newArticle, section3Content2: e.target.value});
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none bg-white"
                            />
                          </div>
                        </div>

                        <hr className="my-8" />

                        {/* Conclusion */}
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Conclusion et Finalisation</h3>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Conclusion
                          </label>
                          <textarea
                            rows={5}
                            placeholder="Conclusion de l'article"
                            value={newArticle.conclusion}
                            onChange={(e) => {
                              setNewArticle({...newArticle, conclusion: e.target.value});
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
                          />
                        </div>

                        {/* Statut de publication */}
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">
                            Statut de publication
                          </label>
                          <select
                            value={newArticle.publishStatus}
                            onChange={(e) => {
                              setNewArticle({...newArticle, publishStatus: e.target.value as "Brouillon" | "Publié"});
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                          >
                            <option value="Brouillon">Brouillon</option>
                            <option value="Publié">Publié</option>
                          </select>
                        </div>
                      </div>

                      {/* Footer buttons */}
                      <div className="flex justify-between items-center mt-8 pt-6 border-t">
                        <button
                          onClick={() => setArticleFormStep(1)}
                          className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition flex items-center gap-2"
                        >
                          ← Retour
                        </button>
                        <div className="flex gap-3">
                          <button
                            onClick={resetArticleForm}
                            className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={handleCreateArticle}
                            disabled={!!(editingArticleId && !hasUnsavedChanges)}
                            className={`px-8 py-3 rounded-xl font-medium transition flex items-center gap-2 ${
                              editingArticleId && !hasUnsavedChanges
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                            }`}
                          >
                            <Save size={18} /> {editingArticleId ? "Sauvegarder" : "Créer l'article"}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}

        </div>
      </div>

      {/* Modal Ajouter un service */}
      {showAddServiceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Plus size={20} className="text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Ajouter un nouveau service</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Nom du service
                </label>
                <input
                  type="text"
                  placeholder="Ex: Service de Cardiologie"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Description
                </label>
                <textarea
                  rows={5}
                  placeholder="Description du service"
                  value={newServiceDescription}
                  onChange={(e) => setNewServiceDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    setShowAddServiceModal(false);
                    setNewServiceName("");
                    setNewServiceDescription("");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
                >
                  <X size={18} /> Annuler
                </button>
                <button
                  onClick={handleAddService}
                  disabled={!newServiceName.trim()}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={18} /> Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editer un service */}
      {editingService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Edit size={20} className="text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Modifier le service</h2>
              </div>
              <button onClick={() => setEditingService(null)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Informations Générales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Titre du service <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Sous-titre (pour le popup)</label>
                  <input
                    type="text"
                    value={editingService.subtitle || ""}
                    onChange={(e) => setEditingService({...editingService, subtitle: e.target.value})}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                    placeholder="Ex: Suivi et prévention pour la femme"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Description Courte (Aperçu) <span className="text-red-500">*</span></label>
                <textarea
                  rows={2}
                  required
                  value={editingService.description}
                  onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
                />
              </div>

              {/* Contenu Détaillé pour le Popup */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-indigo-500"/>
                  Contenu détaillé du Popup
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Description Complète</label>
                    <textarea
                      rows={4}
                      value={editingService.detailedDescription || ""}
                      onChange={(e) => setEditingService({...editingService, detailedDescription: e.target.value})}
                      placeholder="Texte détaillé affiché dans le popup..."
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Image du Popup</label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="URL de l'image"
                        value={editingService.image || ""}
                        onChange={(e) => setEditingService({...editingService, image: e.target.value})}
                        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                      />
                      <label className="flex items-center gap-2 bg-indigo-100 text-indigo-600 px-6 py-3 rounded-xl font-medium hover:bg-indigo-200 transition cursor-pointer">
                        <Image size={18} /> Parcourir
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => setEditingService({...editingService, image: event.target?.result as string});
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                    {editingService.image && (
                      <div className="mt-3 relative w-48 h-32 rounded-xl overflow-hidden shadow">
                        <img src={editingService.image} alt="Aperçu" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Points Forts & Services (Séparés par un retour à la ligne)
                    </label>
                    <textarea
                      rows={4}
                      value={editingService.highlights?.join('\n') || ""}
                      onChange={(e) => setEditingService({...editingService, highlights: e.target.value.split('\n').filter(h => h.trim() !== "")})}
                      placeholder="Ex: Consultations annuelles\nDépistage et frottis..."
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setEditingService(null)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    if(!editingService.title.trim() || !editingService.description.trim()) return;
                    setServicesData(prev => ({
                      ...prev,
                      [currentDept]: prev[currentDept].map(s => s.id === editingService.id ? editingService : s)
                    }));
                    setEditingService(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition"
                >
                  <Save size={18} /> Enregistrer les modifications
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- UI ---------- */

const Tab = ({icon,label,active,onClick}:{icon:any,label:string,active:boolean,onClick:()=>void}) => (
  <button onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-4 font-medium transition
    ${active ? "border-b-2 border-indigo-500 text-indigo-600 bg-indigo-50/30" : "text-gray-500 hover:text-indigo-600"}`}>
    {icon} {label}
  </button>
);

const ServiceDept = ({
  title,
  count,
  isExpanded,
  onToggle,
  services,
  onAddService,
  onDeleteService,
  onEditService
}: {
  title: string;
  count: number;
  isExpanded: boolean;
  onToggle: () => void;
  services: Service[];
  onAddService: () => void;
  onDeleteService: (id: number) => void;
  onEditService?: (service: Service) => void;
}) => (
  <div className="mb-5">
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-5 text-white flex items-center justify-between shadow-lg">
      <h3 className="text-lg font-bold">{title}</h3>

      <div className="flex items-center gap-4">
        <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
          {count} service(s)
        </span>
        <button
          onClick={onToggle}
          className="w-10 h-10 flex items-center justify-center text-2xl font-bold hover:bg-white/10 rounded-lg transition"
        >
          {isExpanded ? "−" : "+"}
        </button>
      </div>
    </div>

    {isExpanded && (
      <div className="mt-3 space-y-3 bg-gray-50 rounded-xl p-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 flex items-start justify-between group hover:shadow-md transition"
          >
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 mb-1">{service.title}</h4>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
            <div className="flex items-center gap-2 ml-4 opacity-0 group-hover:opacity-100 transition">
              {onEditService && (
                <button 
                  onClick={() => onEditService(service)}
                  className="text-indigo-500 hover:text-indigo-700 bg-indigo-50 p-2 rounded-lg"
                  title="Modifier le service (et contenu du popup)"
                >
                  <Edit size={18} />
                </button>
              )}
              <button 
                onClick={() => onDeleteService(service.id)}
                className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg"
                title="Supprimer le service"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        
        <button 
          onClick={onAddService}
          className="w-full border-2 border-dashed border-indigo-300 rounded-lg p-4 text-indigo-600 font-medium hover:bg-indigo-50 hover:border-indigo-400 transition flex items-center justify-center gap-2"
        >
          + Ajouter un service
        </button>
      </div>
    )}
  </div>
);