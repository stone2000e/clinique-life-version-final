import React, { useState, useEffect } from "react";
import { Users, Phone, Mail, X } from "lucide-react";
import { initialSpecialists, Specialist } from "../../data/teamData";
import OptimizedImage from "../ui/OptimizedImage";

const Teams: React.FC = () => {
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [specialists, setSpecialists] = useState<Specialist[]>(initialSpecialists);

  useEffect(() => {
    const savedSpecs = localStorage.getItem("specialists");
    if (savedSpecs) {
      setSpecialists(JSON.parse(savedSpecs));
    }
  }, []);

  return (
    <section className="w-full py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* GRILLE DES SPÉCIALISTES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialists.map((specialist) => (
            <div
              key={specialist.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
            >
              {/* IMAGE AVEC ICÔNE */}
              <div className="relative h-64 bg-gradient-to-b from-gray-200 to-gray-300">
                <OptimizedImage
                  src={specialist.image}
                  alt={specialist.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENU */}
              <div className="p-6">
                {/* NOM ET TITRE DANS LA PARTIE BLANCHE */}
                <div className="mb-4">
                  <h3 className="font-bold text-xl text-gray-900">{specialist.name}</h3>
                  <p className="text-sm text-blue-600 font-semibold">{specialist.title}</p>
                </div>


                {/* BOUTON VOIR LE PROFIL */}
                <button
                  onClick={() => setSelectedSpecialist(specialist)}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Voir le profil
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.964 0a9 9 0 10-11.964 0m11.964 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODALE DE PROFIL */}
      {selectedSpecialist && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* HEADER GRADIENT */}
            <div className="relative h-48 bg-gradient-to-r from-blue-600 via-blue-500 to-teal-400 rounded-t-3xl">
              {/* BOUTON FERMER */}
              <button
                onClick={() => setSelectedSpecialist(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

            
            </div>

            {/* CONTENU */}
            <div className="p-8 pt-20">
              {/* NOM ET TITRE */}
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedSpecialist.name}
              </h2>
              <p className="text-blue-600 font-semibold text-lg mb-1">
                {selectedSpecialist.title}
              </p>
              <p className="text-gray-600 mb-6">{selectedSpecialist.specialty}</p>

              {/* BIOGRAPHIE */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900 text-lg">Biographie</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{selectedSpecialist.bio}</p>
              </div>

              {/* QUALIFICATIONS */}
              <div className="mb-6">
                <div className="bg-blue-50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                      />
                    </svg>
                    <h4 className="font-semibold text-gray-900">Qualifications</h4>
                  </div>
                  <ul className="space-y-2">
                    {selectedSpecialist.qualifications?.map((qual, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CONTACT ET RENDEZ-VOUS */}
              <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-xl mb-4">Contact et rendez-vous</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* TÉLÉPHONE */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80">Téléphone</p>
                      <p className="font-semibold">{selectedSpecialist.phone}</p>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-white/80">Email</p>
                      <p className="font-semibold text-sm">{selectedSpecialist.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Teams;