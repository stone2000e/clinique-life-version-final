import React, { useState } from "react";
import { Shield, Zap, Users, User, ArrowRight, ArrowLeft, Phone, Calendar, Clock, Mail, MessageSquare, Stethoscope } from "lucide-react";
const PointIcon = new URL("../assets/Point.png", import.meta.url).href;

const Rdv: React.FC = () => {
  const [step, setStep] = useState(1);
  const [openService, setOpenService] = useState(false);
  const [openMedecin, setOpenMedecin] = useState(false);
  
  // STEP 1
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");

  // STEP 2
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [service, setService] = useState("");
  const [medecin, setMedecin] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [modeContact, setModeContact] = useState(""); // email, sms, whatsapp

  // Liste des services médicaux
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
    "Cardiologie"
  ];

  // Liste complète des médecins avec leur service
  const tousMedecins = [
    { nom: "Dr. Kouassi Emmanuel", service: "Médecine générale" },
    { nom: "Dr. Yao Franck", service: "Cardiologie" },
    { nom: "Dr. Koné Sarah", service: "Cardiologie" },
    { nom: "Dr. Aminata Traoré", service: "Obstétrique / Pédiatrie" },
    { nom: "Dr. Touré Aïcha", service: "Obstétrique / Pédiatrie" },
    { nom: "Dr. Bamba Mariam", service: "Gynécologie" },
    { nom: "Dr. Diallo Fatoumata", service: "Gynécologie" },
    { nom: "Dr. N'Guessan André", service: "Neurologie" },
    { nom: "Dr. Sanogo Moussa", service: "Neurologie" },
    { nom: "Dr. Diallo Mamadou", service: "Chirurgie digestive et générale" },
    { nom: "Dr. Traoré Seydou", service: "Chirurgie digestive et générale" },
    { nom: "Dr. Ouattara Fatima", service: "Dermatologie" },
    { nom: "Dr. Coulibaly Awa", service: "Dermatologie" },
    { nom: "Dr. Touré Ibrahim", service: "Urologie" },
    { nom: "Dr. Koné Lassina", service: "Urologie" },
    { nom: "Dr. Koffi Aya", service: "Endocrinologie" },
    { nom: "Dr. Sylla Mariama", service: "Endocrinologie" },
    { nom: "Dr. Bakayoko Jean", service: "Néphrologie" },
    { nom: "Dr. Cissé Aminata", service: "Néphrologie" },
    { nom: "Dr. Fofana Ismaël", service: "Diabétologie" },
    { nom: "Dr. Camara Hawa", service: "Diabétologie" },
    { nom: "Dr. Doumbia Youssouf", service: "Gastro-entérologie" },
    { nom: "Dr. Keita Salimata", service: "Gastro-entérologie" },
    { nom: "Dr. Ouédraogo Paul", service: "Traumatologie" },
    { nom: "Dr. Sawadogo Marie", service: "Traumatologie" },
    { nom: "Dr. Traoré Bakary", service: "Néonatologie" },
    { nom: "Dr. Konaté Kadiatou", service: "Néonatologie" },
    { nom: "Dr. Diabaté Moussa", service: "Vénérologie" },
    { nom: "Dr. Sidibé Aïssata", service: "Vénérologie" },
  ];

  // Filtrer les médecins selon le service sélectionné
  const medecinsFiltres = service 
    ? tousMedecins.filter(med => med.service === service)
    : [];

  const step1Valid = prenom && nom && email && tel;
  const step2Valid = date && heure && service && modeContact;

  const getContactMessage = () => {
    switch(modeContact) {
      case "email": return "un email";
      case "sms": return "un SMS";
      case "whatsapp": return "un message WhatsApp";
      default: return "un message";
    }
  };

  // Réinitialiser le médecin quand on change de service
  const handleServiceChange = (selectedService: string) => {
    setService(selectedService);
    setMedecin(""); // Reset médecin quand on change de service
    setOpenService(false);
  };

  return (
    <section className="w-full bg-white">
      {/* ZONE BLANCHE HAUTE */}
      <div className="w-full bg-white pt-24 md:pt-40 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Réservez votre consultation en <span className="text-blue-600">3 étapes</span>
          </h1>
          <p className="text-gray-500 mt-3">
            Processus simple et rapide • Confirmation immédiate • Service 24/7
          </p>
        </div>
      </div>

      {/* SECTION BLEU */}
      <section className="w-full bg-[#f4fbff] py-12">
        {/* BADGES */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 mb-24">
          {[
            { icon: Shield, title: "Données sécurisées", desc: "Confidentialité garantie", color: "blue" },
            { icon: Zap, title: "Réponse rapide", desc: "Confirmation sous 2h", color: "emerald" },
            { icon: Users, title: "Experts qualifiés", desc: "15+ médecins disponibles", color: "indigo" },
          ].map((b, i) => (
            <div key={i} className="bg-white rounded-3xl p-7 shadow-md flex items-center gap-5">
              <div className={`w-14 h-14 rounded-full bg-${b.color}-100 flex items-center justify-center`}>
                <b.icon className={`w-7 h-7 text-${b.color}-600`} />
              </div>
              <div>
                <h4 className="font-bold">{b.title}</h4>
                <p className="text-sm text-gray-500">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CARD */}
        <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden">
          {/* STEPPER */} 
          <div className="bg-[linear-gradient(90deg,#155DFC_0%,#00BBA7_100%)] px-12 py-10 text-white">
            <div className="flex items-center justify-between md:justify-center gap-0 md:gap-20 px-4">
              {[1,2,3].map(n=>(
                <div key={n} className={`flex items-center gap-4 ${step>=n?"":"opacity-40"}`}>
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold ${step>=n?"bg-white text-blue-600":"bg-white/20"}`}>
                    {step>n?"✓":n}
                  </div>
                  {n<3 && <div className={`w-12 md:w-28 h-[3px] ${step>n?"bg-white":"bg-white/20"} rounded-full`} />}
                </div>
              ))}
            </div>
            <p className="text-center mt-6 text-lg font-semibold">
              {step===1 && "Étape 1 : Vos informations"}
              {step===2 && "Étape 2 : Date, service et médecin"}
              {step===3 && "Étape 3 : Confirmation"}
            </p>
          </div>

          {/* BODY */}
          <div className="px-14 py-14">
            {/* STEP 1 */}
            {step===1 && (
              <div className="text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <User className="w-9 h-9 text-blue-600"/>
                </div>
                <h3 className="text-3xl font-extrabold">Commençons par vos informations</h3>
                <p className="text-gray-500 mb-10">Nous avons besoin de quelques détails</p>

                <div className="max-w-2xl mx-auto grid gap-7">
                  <div className="grid md:grid-cols-2 gap-7">
                    <input placeholder="Prénom *" className="premium-input" value={prenom} onChange={e=>setPrenom(e.target.value)} />
                    <input placeholder="Nom *" className="premium-input" value={nom} onChange={e=>setNom(e.target.value)} />
                  </div>
                  <input placeholder="Email *" className="premium-input" value={email} onChange={e=>setEmail(e.target.value)} />
                  <input placeholder="Téléphone *" className="premium-input" value={tel} onChange={e=>setTel(e.target.value)} />
                  <button
                    disabled={!step1Valid}
                    onClick={()=>step1Valid && setStep(2)}
                    className={`ml-auto mt-8 bg-[linear-gradient(90deg,#155DFC_0%,#00BBA7_100%)] text-white px-14 py-4 rounded-2xl flex items-center gap-3 ${!step1Valid && "opacity-40 cursor-not-allowed"}`}
                  >
                    Suivant <ArrowRight size={20}/>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step===2 && (
              <div className="text-center max-w-3xl mx-auto">
                <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                  <Calendar className="w-9 h-9 text-emerald-600"/>
                </div>

                <h3 className="text-3xl font-extrabold text-gray-900">
                  Choisissez votre créneau
                </h3>
                <p className="text-gray-500 mt-3 mb-12">
                  Sélectionnez la date, l'heure, le service et le médecin
                </p>

                <div className="grid gap-10">
                  {/* DATE + HEURE */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="text-left">
                      <label className="block text-sm font-semibold mb-2">
                        Date <span className="text-red-500">*</span>
                      </label>
                      <input type="date" className="premium-input w-full" value={date} onChange={e=>setDate(e.target.value)} />
                    </div>

                    <div className="text-left">
                      <label className="block text-sm font-semibold mb-2">
                        Heure <span className="text-red-500">*</span>
                      </label>
                      <input type="time" className="premium-input w-full" value={heure} onChange={e=>setHeure(e.target.value)} />
                    </div>
                  </div>

                  {/* SERVICE */}
                  <div className="text-left relative">
                    <label className="block text-sm font-semibold mb-2">
                      Service médical <span className="text-red-500">*</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => setOpenService(!openService)}
                      className="premium-input w-full flex items-center justify-between bg-white cursor-pointer"
                    >
                      <span className={service ? "text-gray-900" : "text-gray-400"}>
                        {service || "Sélectionner un service"}
                      </span>
                      <svg className={`w-4 h-4 transition ${openService ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>

                    {openService && (
                      <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border overflow-hidden">
                        <div className="max-h-48 overflow-y-auto custom-scroll">
                          {services.map((item, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleServiceChange(item)}
                              className="w-full text-left px-5 py-3 text-sm hover:bg-blue-50 transition"
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* MÉDECIN - Affiché seulement si un service est sélectionné */}
                  {service && (
                    <div className="text-left relative">
                      <label className="block text-sm font-semibold mb-2">
                        Sélectionner un médecin (facultatif)
                      </label>

                      {medecinsFiltres.length > 0 ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setOpenMedecin(!openMedecin)}
                            className="premium-input w-full flex items-center justify-between bg-white cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <Stethoscope className="w-5 h-5 text-blue-600" />
                              <span className={medecin ? "text-gray-900" : "text-gray-400"}>
                                {medecin || "Choisir un médecin"}
                              </span>
                            </div>
                            <svg className={`w-4 h-4 transition ${openMedecin ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24">
                              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>

                          {openMedecin && (
                            <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-xl border overflow-hidden">
                              <div className="max-h-64 overflow-y-auto custom-scroll">
                                {medecinsFiltres.map((med, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => {
                                      setMedecin(med.nom);
                                      setOpenMedecin(false);
                                    }}
                                    className="w-full text-left px-5 py-3 hover:bg-blue-50 transition border-b border-gray-100 last:border-0"
                                  >
                                    <div className="font-semibold text-gray-900">{med.nom}</div>
                                    <div className="text-xs text-gray-500 mt-1">{med.service}</div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="premium-input w-full bg-gray-50 text-gray-400 flex items-center gap-3">
                          <Stethoscope className="w-5 h-5" />
                          <span>Aucun médecin disponible pour ce service</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* MODE DE CONTACT */}
                  <div className="text-left">
                    <label className="block text-sm font-semibold mb-3">
                      Comment souhaitez-vous recevoir votre confirmation ? <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => setModeContact("email")}
                        className={`
                          p-4 rounded-xl border-2 transition flex flex-col items-center gap-2
                          ${modeContact === "email" 
                            ? "border-blue-500 bg-blue-50" 
                            : "border-gray-200 hover:border-blue-300"}
                        `}
                      >
                        <Mail className={`w-6 h-6 ${modeContact === "email" ? "text-blue-600" : "text-gray-400"}`} />
                        <span className="font-semibold text-sm">Email</span>
                      </button>

                      <button
                        onClick={() => setModeContact("sms")}
                        className={`
                          p-4 rounded-xl border-2 transition flex flex-col items-center gap-2
                          ${modeContact === "sms" 
                            ? "border-blue-500 bg-blue-50" 
                            : "border-gray-200 hover:border-blue-300"}
                        `}
                      >
                        <MessageSquare className={`w-6 h-6 ${modeContact === "sms" ? "text-blue-600" : "text-gray-400"}`} />
                        <span className="font-semibold text-sm">SMS</span>
                      </button>

                      <button
                        onClick={() => setModeContact("whatsapp")}
                        className={`
                          p-4 rounded-xl border-2 transition flex flex-col items-center gap-2
                          ${modeContact === "whatsapp" 
                            ? "border-green-500 bg-green-50" 
                            : "border-gray-200 hover:border-green-300"}
                        `}
                      >
                        <MessageSquare className={`w-6 h-6 ${modeContact === "whatsapp" ? "text-green-600" : "text-gray-400"}`} />
                        <span className="font-semibold text-sm">WhatsApp</span>
                      </button>
                    </div>
                  </div>

                  {/* COMMENTAIRE */}
                  <div className="text-left">
                    <label className="block text-sm font-semibold mb-2">
                      Commentaire / Message
                    </label>
                    <textarea
                      placeholder="Précisez l'objet de votre consultation ou toute information utile..."
                      className="premium-input w-full min-h-[120px] py-4 resize-none"
                      value={commentaire}
                      onChange={e => setCommentaire(e.target.value)}
                    />
                  </div>

                  {/* INFO BOX */}
                  <div className="bg-blue-50 rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600"/>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">Disponibilité 24/7</p>
                      <p className="text-sm text-gray-500">
                        Notre service d'urgence est disponible à tout moment
                      </p>
                    </div>
                  </div>

                  {/* NAVIGATION */}
                  <div className="pt-6 flex flex-col-reverse gap-4 md:flex-row md:justify-between md:items-center">
                    <button
                      onClick={()=>setStep(1)}
                      className="flex items-center justify-center md:justify-start gap-2 text-gray-500 hover:text-blue-600 transition w-full md:w-auto"
                    >
                      <ArrowLeft size={18}/> Précédent
                    </button>

                    <button
                      disabled={!step2Valid}
                      onClick={()=>step2Valid && setStep(3)}
                      className={`
                        w-full md:w-auto
                        bg-[linear-gradient(90deg,#155DFC_0%,#00BBA7_100%)]
                        text-white px-6 md:px-14 py-4 rounded-2xl
                        flex items-center justify-center gap-2
                        hover:scale-105 transition
                        ${!step2Valid && "opacity-40 cursor-not-allowed"}
                      `}
                    >
                      Suivant <ArrowRight size={18}/>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step===3 && (
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center text-center mb-12">
                  <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mb-6">
                    <svg width="36" height="36" fill="none" viewBox="0 0 24 24" className="text-white">
                      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>

                  <h3 className="text-3xl font-extrabold text-gray-900 mb-2">
                    Rendez-vous confirmé !
                  </h3>
                  <p className="text-gray-500">
                    Votre demande de rendez-vous a été enregistrée avec succès.
                  </p>
                </div>

                {/* RECAP */}
                <div className="bg-blue-50 rounded-3xl p-8 grid gap-6">
                  <div className="flex items-center gap-4">
                    <Calendar className="text-blue-600"/>
                    <span><b>Date :</b> {date}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Clock className="text-blue-600"/>
                    <span><b>Heure :</b> {heure}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Users className="text-blue-600"/>
                    <span><b>Service :</b> {service}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Stethoscope className="text-blue-600"/>
                    <span><b>Médecin :</b> {medecin || "Non spécifié"}</span>
                  </div>

                  {commentaire && (
                    <div className="flex items-start gap-4 pt-2 border-t border-blue-100">
                      <MessageSquare className="text-blue-600 mt-1 w-5 h-5"/>
                      <div className="text-left">
                        <div className="font-bold text-sm text-blue-800">Votre message :</div>
                        <div className="text-sm text-gray-700 mt-1 italic italic">"{commentaire}"</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-start gap-4">
                  <img
                    src={PointIcon}
                    alt="info"
                    className="w-6 h-6 mt-1"
                  />
                  <p className="text-sm text-emerald-700">
                    Vous recevrez {getContactMessage()} de confirmation avec tous les détails.  
                    Merci de vous présenter 10 minutes avant l'heure prévue.
                  </p>
                </div>

                {/* BTN */}
                <div className="flex justify-center mt-10">
                  <button
                    onClick={()=>{
                      setStep(1);
                      setModeContact("");
                      setMedecin("");
                      setService("");
                    }}
                    className="bg-[linear-gradient(90deg,#155DFC_0%,#00BBA7_100%)] text-white px-14 py-4 rounded-2xl hover:scale-105 transition"
                  >
                    Prendre un autre rendez-vous
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* URGENCE */}
        <div className="flex justify-center px-4 mt-12">
          <div className="w-full max-w-md md:w-auto bg-white px-6 md:px-10 py-3 md:py-4 rounded-2xl md:rounded-full shadow-xl flex flex-col md:flex-row items-center gap-2 md:gap-3 text-sm text-center md:text-left">
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-red-500"/>
              <span>Urgence ? Appelez le</span>
            </div>
            <span className="font-bold text-red-600 text-base">
              +225 07 77 34 48 59
            </span>
          </div>
        </div>
      </section>

      {/* BANDE BLANCHE BAS */}
      <div className="w-full h-32 bg-white"/>
    </section>
  );
};

export default Rdv;