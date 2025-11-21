import { Link, useNavigate } from "react-router-dom"
import Badge from "../components/Badge"
// import { BsFillSparkles } from 'react-icons/bs';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { HiOutlineUsers, HiOutlineBriefcase, HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { RiUserSearchLine } from 'react-icons/ri';
import BackedByLeadersSection from "../homeSections/LogoItem";
import { HiOutlineSparkles } from "react-icons/hi";
import PlatformInAction from "../homeSections/PlatformInAction";
import TeamSection from "../homeSections/TeamSection";
import CTASection from "../homeSections/CTASection";
import TestimonialsSection from "../homeSections/TestimonialsSection";

interface StatItem {
  id: number;
  icon: React.ReactNode;
  count: string;
  label: string;
}

const statsData: StatItem[] = [
  {
    id: 1,
    icon: <HiOutlineUsers className="w-10 h-10" />,
    count: "73K+",
    label: "Active Job Seekers",
  },
  {
    id: 2,
    icon: <RiUserSearchLine className="w-10 h-10" />,
    count: "360+",
    label: "Recruiters",
  },
  {
    id: 3,
    icon: <HiOutlineBuildingOffice2 className="w-10 h-10" />,
    count: "350+",
    label: "Companies",
  },
  {
    id: 4,
    icon: <HiOutlineBriefcase className="w-10 h-10" />,
    count: "1000+",
    label: "Jobs Posted",
  },
];

export default function Home() {
    //const navigate = useNavigate() //It's often better to use redirect in action/loader functions than this hook.
    return (
        <div>
            {/* <h1 className='text-green-500 bg-red p4 rounded-lg shadow-md'>Home page</h1> */}
           
            {/* <button className="bg-red-500 rounded p-1 flex items-center gap-2 px-2"
                onClick={() => navigate('jobs')} 
            >
                <h2 className=" text-white text-[0.91rem]">Go to Explore Tech Jobs</h2>
            </button> */}
            {/* <Link
                to='jobs'
                className="bg-red-500 rounded p-1 flex items-center gap-2 px-2 text-white text-[0.91rem]"
            >
                Go to Explore Tech Jobs
            </Link>

            <div className="bg-orange-500 p-4 m-4 flex flex-col items-center">
                <Badge title="AI-Powered Talent Sourcing Platform"></Badge>
                <h1>Find the Perfect Tech Talent with AI Precision</h1>
                <h2>SourcingXPress transforms how you discover, engage, and hire top tech talent. Powered by advanced AI, tailored for modern recruiting needs.</h2>
            
                <div>
                     <button className="bg-white text-black font-semibold py-2 px-4 rounded-lg text-sm hover:bg-red-600 transition-colors">
                            POST A FREE JOB +
                        </button>
                         <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-red-600 transition-colors">
                            Schedule a Demo
                        </button>
                </div>
                
            </div> */}

      
      
 {/* HEROO Section */}
      <section className="w-full bg-gradient-to-b from-orange-800 to-orange-900 text-white">

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
        
       
        <div className="mb-4">
          <span className="inline-block bg-white/10 rounded-full px-4 py-1 text-xs font-medium text-white">
            AI-Powered Talent Sourcing Platform
          </span>
        </div>

       
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
          Find the Perfect Tech Talent <br /> with AI Precision
        </h1>

      
        <p className="text-lg md:text-xl text-orange-100 max-w-3xl mx-auto mb-10">
          SourcingXpress transforms how you discover, engage, and hire top tech talent.
          Powered by advanced AI, tailored for modern recruiting needs.
        </p>

     
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          
      
          <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-white text-orange-900 font-semibold rounded-lg shadow-md transition-all duration-200 hover:bg-gray-100 hover:scale-105">
            <HiOutlineSparkles className="w-5 h-5" />
            <span>Post A Free Job</span>
            <FaArrowRight className="w-4 h-4" />
          </button>

         
          <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-black/40 text-white font-semibold rounded-lg transition-all duration-200 hover:bg-black/60 hover:scale-105">
            <FaCalendarAlt className="w-5 h-5" />
            <span>Schedule a Demo</span>
          </button>
        </div>

      </div>
    </section>




                 {/* Header Section */}
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        
       
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Trusted by Tech Professionals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of candidates and professionals who trust SourcingXPress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat) => (
            <div 
              key={stat.id} 
              className="flex flex-col items-center justify-center p-8 border border-gray-200 rounded-lg bg-white hover:shadow-lg transition-shadow duration-300"
            >
            
              <div className="text-orange-600 mb-4">
                {stat.icon}
              </div>
              
            
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                {stat.count}
              </h3>
           
              <p className="text-gray-600 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>




          {/* connect with section */}
    <section className="w-full bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
              Connect with <span className="text-orange-600">top talent</span> and 
              shortlist <span className="text-orange-600">in minutes</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              SourcingXPress is your hiring superhero, our tech lets you skip 
              manual screening and find top candidates in minutes with 80%+ matches!
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Post jobs for free",
                "Save time with exact match percentage",
                "Save money with pay-per-shortlist"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  
                  <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
              Post a free job
              <FaArrowRight />
            </button>
          </div>

          {/*  Right Content */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            {/* Main Container for the Radar */}
            <div className="relative w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] flex items-center justify-center">
              
              {/* Background Gradient Circle */}
              <div className="absolute inset-0 bg-orange-50/80 rounded-full blur-xl transform scale-90" />

              {/* Outer Dashed Circle */}
              <div className="absolute w-full h-full border border-dashed border-gray-300 rounded-full" />
              
              {/* Middle Dashed Circle */}
              <div className="absolute w-[70%] h-[70%] border border-dashed border-gray-300 rounded-full" />
              
              {/* Inner Dashed Circle */}
              <div className="absolute w-[40%] h-[40%] border border-dashed border-gray-300 rounded-full" />

              {/* The Connecting Line (Center to Top-Left) */}
              {/* Rotate and width calculations are approximate to match visual */}
              <div className="absolute w-[35%] h-[2px] bg-orange-400 top-[35%] left-[18%] -rotate-45 origin-right" />

              {/* --- Avatars --- */}
            
              
              {/* Center Avatar (Main) */}
              <div className="absolute z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200" 
                  alt="Central Candidate" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Top Left Avatar (Connected) */}
              <div className="absolute top-[10%] left-[15%] z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-orange-200 shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=150&h=150" 
                  alt="Candidate 1" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Top Right Avatar */}
              <div className="absolute top-[20%] right-[10%] z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=150&h=150" 
                  alt="Candidate 2" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Left Avatar */}
              <div className="absolute bottom-[20%] left-[10%] z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?fit=crop&w=150&h=150" 
                  alt="Candidate 3" 
                  className="w-full h-full object-cover"
                />
              </div>

               {/* Bottom Right Avatar */}
               <div className="absolute bottom-[10%] right-[20%] z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=150&h=150" 
                  alt="Candidate 4" 
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>


              <BackedByLeadersSection />
            <PlatformInAction />
            <TeamSection />
            <TestimonialsSection />
            <CTASection />
        </div>
    )
}



