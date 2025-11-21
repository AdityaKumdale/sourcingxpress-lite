import React from 'react';
import { HiOutlineSparkles } from "react-icons/hi";
import { FaArrowRight, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';

const CTASection: React.FC = () => {
  return (
    <section className="w-full bg-orange-700 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl text-center text-white">
        
     
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Transform Your Hiring?
        </h2>

        {/* 2. Subheading */}
        <p className="text-lg md:text-xl text-orange-100 mb-10 max-w-3xl mx-auto leading-relaxed">
          Join hundreds of recruiters already using SourcingXPress to find, 
          engage, and hire the best tech talent faster than ever before.
        </p>

        {/* 3. Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
          
          {/* Post Job Button */}
          <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-white text-orange-800 font-bold rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
            <HiOutlineSparkles className="text-orange-600" />
            <span>Post A Free Job</span>
            <FaArrowRight className="text-orange-600 text-sm" />
          </button>

          {/* Schedule Demo Button */}
          <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white font-bold rounded-lg shadow-lg transition-transform duration-200 hover:bg-slate-800 hover:scale-105">
            <FaPhoneAlt className="w-4 h-4" />
            <span>Schedule a Demo</span>
          </button>
        </div>

        {/* 4. Contact Info Row */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-sm md:text-base font-medium text-orange-50 border-t border-white/10 pt-10">
          
          {/* Email */}
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            <MdEmail className="w-5 h-5" />
            <a href="mailto:gs@sourcingxpress.com">gs@sourcingxpress.com</a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            <FaPhoneAlt className="w-4 h-4" />
            <a href="tel:+918050020304">+91 8050020304</a>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MdLocationOn className="w-5 h-5" />
            <span>Available in India</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CTASection;