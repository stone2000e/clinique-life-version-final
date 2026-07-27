import React, { useState, useEffect } from "react";
import { Layout, Edit, Save, X, Upload, Image as ImageIcon, PlayCircle } from "lucide-react";
import { initialSlides, CarouselSlide } from "../../data/carouselData";

const GestionCarousel: React.FC = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [editingSlide, setEditingSlide] = useState<CarouselSlide | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedSlides = localStorage.getItem("carouselSlides");
    setSlides(savedSlides ? JSON.parse(savedSlides) : initialSlides);
  }, []);

  const saveToStorage = (newSlides: CarouselSlide[]) => {
    localStorage.setItem("carouselSlides", JSON.stringify(newSlides));
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) { // 15MB limit
        alert("Le fichier est trop volumineux (max 15MB pour le carrousel local).");
        return;
      }
      const isVideo = file.type.startsWith("video/");
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingSlide) {
          setEditingSlide({ 
            ...editingSlide, 
            url: reader.result as string,
            type: isVideo ? "video" : "image"
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;
    
    const updated = slides.map(s => s.id === editingSlide.id ? editingSlide : s);
    setSlides(updated);
    saveToStorage(updated);
    setShowForm(false);
    setEditingSlide(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Layout size={28} className="text-blue-600" /> Gestion du Carrousel
        </h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slides.map((slide, index) => (
              <div key={slide.id} className="group border border-gray-100 rounded-[1.5rem] overflow-hidden flex flex-col hover:border-blue-200 transition-all duration-300 shadow-sm">
                <div className="relative aspect-video bg-gray-50 overflow-hidden">
                  {slide.type === "image" ? (
                    <img src={slide.url} alt={slide.title} className="w-full h-full object-cover transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full relative">
                      <video src={slide.url} className="w-full h-full object-cover" muted />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <PlayCircle size={48} className="text-white drop-shadow-lg" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                      {index + 1}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${slide.isActive !== false ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                      {slide.isActive !== false ? "Actif" : "Inactif"}
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-2 bg-white">
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-wider text-sm">{slide.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 italic">{slide.description}</p>
                  <button 
                    onClick={() => { setEditingSlide(slide); setShowForm(true); }}
                    className="mt-4 w-full py-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest"
                  >
                    <Edit size={14} /> Modifier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showForm && editingSlide && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl p-10 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Modifier le Slide</h2>
                <p className="text-gray-400 mt-2 font-medium italic">Personnalisez le visuel et les textes</p>
              </div>
              <button 
                onClick={() => setShowForm(false)} 
                className="w-12 h-12 flex items-center justify-center bg-gray-50 hover:bg-red-50 hover:text-red-600 rounded-full transition-all text-gray-400"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Titre du slide</label>
                    <input 
                      required 
                      type="text" 
                      value={editingSlide.title} 
                      onChange={e => setEditingSlide({...editingSlide, title: e.target.value})}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all duration-300 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Description courte</label>
                    <textarea 
                      required
                      rows={4}
                      value={editingSlide.description} 
                      onChange={e => setEditingSlide({...editingSlide, description: e.target.value})}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all duration-300 resize-none font-medium text-sm leading-relaxed"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Média (Vidéo ou Image)</label>
                  <div className="relative aspect-square rounded-[2.5rem] bg-gray-50 border-4 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden group hover:border-blue-400 transition-colors">
                    {editingSlide.url ? (
                      <>
                        {editingSlide.type === "image" ? (
                          <img src={editingSlide.url} alt="Aperçu" className="w-full h-full object-cover" />
                        ) : (
                          <video src={editingSlide.url} className="w-full h-full object-cover" muted />
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <Upload size={48} className="text-white" />
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-400 text-center p-4">
                        <ImageIcon size={40} className="mx-auto mb-2" />
                        <p className="text-xs font-bold uppercase tracking-widest">Importer</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*,video/*"
                      onChange={handleMediaChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">État du Slide</label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setEditingSlide({...editingSlide, isActive: editingSlide.isActive !== false ? false : true})}
                    className={`flex-1 py-4 text-center font-bold rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 mb-2 ${editingSlide.isActive !== false ? "bg-green-50 text-green-600 border border-green-200 hover:bg-green-100" : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"}`}
                  >
                    {editingSlide.isActive !== false ? "✓ Ce slide est Actif (Visible)" : "✕ Ce slide est Inactif (Masqué)"}
                  </button>
                  <p className="text-xs text-gray-400 flex-1 italic hidden md:block">Cliquez sur le bouton pour masquer ou afficher ce media sur la page d'accueil.</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  type="submit"
                  className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3"
                >
                  <Save size={20} /> Enregistrer les modifications
                </button>
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors uppercase tracking-widest text-[10px]"
                >
                  Annuler la modification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionCarousel;
