import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const TeamSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* 1. Left Side: Image */}
          <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px] rounded-2xl overflow-hidden shadow-xl">
            {/* Replace the src below with your local image path */}
            <img 
              src="/images/team-photo.jpeg" 
              alt="The SourcingXPress Team" 
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* 2. Right Side: Content */}
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Meet the Innovators Behind SourcingXPress
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our team of passionate technologists, recruiters, and AI experts are 
              dedicated to revolutionizing how recruiters find and hire top talent.
            </p>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              With a decade of combined experience in technology, talent sourcing, recruiting, 
              and artificial intelligence, we understand the challenges of modern recruitment 
              and have built SourcingXPress to solve them.
            </p>

            <button className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg group">
              <span>Learn More About Us</span>
              <FaArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TeamSection;