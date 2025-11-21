import React from 'react';

import { RiDoubleQuotesL } from 'react-icons/ri';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  company: string;
  imageSrc: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "We were able to close our hiring in 2 days with the help of SourcingXPress platform. The percentage matching score is supper helpful",
    name: "Rohan Marwaha",
    role: "Co-Founder & CEO",
    company: "TecHyrr & Neusort",
    imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=150&h=150", 
  },
  {
    id: 2,
    quote: "Shivkumar Gurram, You and your team is doing an amazing work with the platform SourcingXPress Keep up the good work team",
    name: "Ravinder R.",
    role: "Co-Founder",
    company: "Neura Dynamics",
    imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=150&h=150", 
  },
  {
    id: 3,
    quote: "SourcingXPress simplifies hiring by providing relevant talent, smart filters, and scorecards that make shortlisting fast and efficient",
    name: "Elvin Johnson",
    role: "Director",
    company: "Maple Green Recruitment Services",
    imageSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fit=crop&w=150&h=150",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it - hear from recruiters transforming their hiring
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col justify-between bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Content Top */}
              <div>
                {/* Quote Icon */}
                <div className="text-orange-500 mb-6">
                  <RiDoubleQuotesL className="w-10 h-10" />
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 italic mb-8 leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Section */}
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={item.imageSrc} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
                <div className="text-left">
                  <h4 className="text-sm font-bold text-slate-900">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {item.role}
                  </p>
                  <p className="text-xs text-orange-600 font-medium">
                    {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;