import React, { useState } from 'react';

// Define a type for our logo data
interface LogoItem {
  id: number;
  grayscaleSrc: string; // Path to the grayscale logo
  colorSrc: string;    // Path to the colored logo
  alt: string;
}

const companyLogos: LogoItem[] = [
  {
    id: 1,
    grayscaleSrc: '/logos/microsoft_gray.png', // Assuming these paths
    colorSrc: '/logos/microsoft_color.png',   // are relative to your public folder
    alt: 'Microsoft Logo',
  },
  {
    id: 2,
    grayscaleSrc: '/logos/neo4j_gray.png',
    colorSrc: '/logos/neo4j_color.png',
    alt: 'Neo4j Logo',
  },
  {
    id: 3,
    grayscaleSrc: '/logos/okta_gray.png',
    colorSrc: '/logos/okta_gray.png',
    alt: 'Okta Logo',
  },
];

const BackedByLeadersSection: React.FC = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl text-center">
        
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Backed by Industry Leaders
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Trusted and supported by leading technology leaders
        </p>

        {/* Logos Grid */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {companyLogos.map((logo) => (
            <LogoImage key={logo.id} {...logo} />
          ))}
        </div>

      </div>
    </section>
  );
};

// Helper component for each logo to manage its hover state
const LogoImage: React.FC<LogoItem> = ({ grayscaleSrc, colorSrc, alt }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="max-w-[150px] transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <img
        src={isHovered ? colorSrc : grayscaleSrc}
        alt={alt}
        className="h-10 sm:h-12 object-contain" // Adjust height as needed
      />
    </div>
  );
};

export default BackedByLeadersSection;