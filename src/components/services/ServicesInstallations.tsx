import React from 'react';
import { Baby, Heart, Scissors, FlaskConical, Check } from 'lucide-react';

// Import des images
import MaterniteImg from '../../assets/Maternite.jpg';
import CardiologieImg from '../../assets/Cardiologie.jpg';
import ChirurgieImg from '../../assets/Chirurgie.jpg';
import ImagerieImg from '../../assets/Imagerie.jpg';
import TechnologieImg from '../../assets/Technologie.jpg';
import OptimizedImage from '../ui/OptimizedImage';

const ServicesInstallations: React.FC = () => {
  const services = [
    {
      icon: Baby,
      title: "Maternité",
      description: "Suivi de grossesse & accouchement",
      image: MaterniteImg,
      color: "#E91E63" // Rose
    },
    {
      icon: Heart,
      title: "Cardiologie",
      description: "Santé cardiovasculaire",
      image: CardiologieImg,
      color: "#3F51B5" // Bleu
    },
    {
      icon: Scissors,
      title: "Chirurgie",
      description: "Interventions spécialisées",
      image: ChirurgieImg,
      color: "#009688" // Vert bleuté
    },
    {
      icon: FlaskConical,
      title: "Laboratoire",
      description: "Analyses médicales & examens biologiques",
      image: ImagerieImg,
      color: "#673AB7" // Violet
    }
  ];

  const avantages = [
    "Équipements stérilisés et conformes aux normes",
    "Personnel hautement qualifié et formé",
    "Protocoles de sécurité rigoureux"
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 mb-6">
            <FlaskConical className="w-5 h-5 text-cyan-600" />
            <span className="text-cyan-700 font-medium">Nos installations</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Des services médicaux d'excellence
          </h2>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Équipements modernes et équipe spécialisée pour votre prise en charge
          </p>
        </div>

        {/* Grille des 4 services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer h-80"
            >
              {/* Image de fond */}
              <OptimizedImage
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Overlay avec gradient */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, transparent 0%, ${service.color}CC 100%)`
                }}
              />
              
              {/* Contenu */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <service.icon className="w-10 h-10 mb-3" />
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm opacity-90">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Section Technologie */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <OptimizedImage
              src={TechnologieImg}
              alt="Technologie médicale"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Contenu */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-100 to-cyan-100 mb-6">
              <span className="text-teal-700 font-medium">Équipements de pointe</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technologie médicale de dernière génération
            </h3>

            <p className="text-gray-600 text-lg mb-6">
              Nos installations sont équipées des technologies les plus avancées pour garantir la précision des diagnostics et la sécurité des interventions. Nos blocs opératoires répondent aux normes internationales les plus strictes.
            </p>

            {/* Liste des avantages */}
            <div className="space-y-4">
              {avantages.map((avantage, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-teal-600" />
                  </div>
                  <p className="text-gray-700">{avantage}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ServicesInstallations;