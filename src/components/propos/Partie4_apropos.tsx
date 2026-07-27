import React, { useState } from "react";
import OptimizedImage from "../ui/OptimizedImage";

// IMPORTS DES IMAGES DEPUIS src/assets/team/
import { initialAdminTeam, AdminTeamMember } from "../../data/teamData";

const Partie4_apropos: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<AdminTeamMember | null>(null);
  const team = initialAdminTeam;

  return (
    <section className="w-full py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Notre Équipe Administrative
        </h2>
        <p className="text-gray-500 mb-14">
          Des professionnels dévoués pour vous accompagner dans vos démarches
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* IMAGE */}
              <div className="relative h-80 bg-gray-100">
                <OptimizedImage
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                {/* ICÔNE BRIEFCASE */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
              </div>

              {/* CONTENU */}
              <div className="p-6 text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 text-sm font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {member.specialty}
                </p>

                {/* BOUTON VOIR LE PROFIL */}
                <button
                  onClick={() => setSelectedMember(member)}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium text-sm py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
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
      {selectedMember && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl max-h-[95vh] overflow-y-auto">
            {/* HEADER AVEC GRADIENT */}
            <div className="relative h-20 sm:h-32 bg-gradient-to-r from-[#0066FF] via-[#00A0E9] to-[#00C9B7] p-3 sm:p-6">
              {/* BOUTON FERMER */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* CONTENU */}
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
                {selectedMember.name}
              </h3>
              <p className="text-sm sm:text-base text-blue-600 font-medium mb-1 sm:mb-2">
                {selectedMember.role}
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                {selectedMember.specialty}
              </p>

              {/* RESPONSABILITÉS SUPPRIMÉES SELON LA DEMANDE */}

              {/* ÉDUCATION (SI DISPONIBLE) */}
              {selectedMember.education && (
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                      />
                    </svg>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900">Formation</h4>
                  </div>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {selectedMember.education.map((edu, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm">
                        <span className="text-blue-600 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* EXPÉRIENCE ET CONTACT */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                {/* EXPÉRIENCE */}
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                      />
                    </svg>
                    <p className="text-xs sm:text-sm text-gray-600">En service depuis</p>
                  </div>
                  <p className="text-base sm:text-xl font-bold text-gray-900">
                    {selectedMember.experience}
                  </p>
                </div>

                {/* CONTACT */}
                <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                    <p className="text-xs sm:text-sm text-gray-600">Contact</p>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 mb-0.5 sm:mb-1">
                    {selectedMember.phone}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-600 break-all">
                    {selectedMember.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Partie4_apropos;