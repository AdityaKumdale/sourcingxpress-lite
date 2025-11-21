import Badge from "./Badge";
import { IoLocationOutline } from "react-icons/io5";
import { FaBuilding } from 'react-icons/fa';
import { LuFactory } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";
import { FaHandHoldingUsd } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { PiSuitcase } from "react-icons/pi";
import { LuClock4 } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import type { Job } from "../server";
import { NavLink } from "react-router-dom";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import React
 from "react";
type CardProps = {
    jobData:Job
}


// export default function Card({jobData}:CardProps) {
    
//   const getStatusAppearance = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'reviewed':
//         return { icon: IoCheckmarkCircleOutline, color: 'text-green-600', bg: 'bg-green-100' };
//       case 'rejected':
//         return { icon: IoCloseCircleOutline, color: 'text-red-600', bg: 'bg-red-100' };
//       case 'pending':
//       default:
//         return { icon: IoDocumentTextOutline, color: 'text-yellow-600', bg: 'bg-yellow-100' };
//     }
//   };

//    const statusInfo = jobData.applicationStatus ? getStatusAppearance(jobData.applicationStatus) : null;

// const skillsArr = jobData.skills
// const slicedSkillArr = skillsArr.slice(0, skillsArr.length - 3)
// const remainingElements = skillsArr.length - slicedSkillArr.length
// let renderSkills: any

// if (skillsArr.length > 5) {
//   renderSkills = (
//     <>
//       {(slicedSkillArr || []).map(skill => (
//         <Badge key={skill} title={skill}></Badge>
//       ))}
//       <Badge title={'+' + remainingElements.toString()}></Badge>
//     </>
//   )
// } else {
//   renderSkills = (
//     <>
//       {(skillsArr || []).map(skill => (
//         <Badge key={skill} title={skill}></Badge>
//       ))}
//     </>
//   )
// }

//     return (
//     <>
//       {/* 3. Use the dynamic data from jobData */}
//       <div className="border-2 border-grey-500 rounded p-4">
//         <section className="flex items-center justify-between">
//           <h2 className="font-medium">{jobData.title}</h2>
//           {/* Link to the JobDetail page from the title */}
//           {/* <Link to={`/jobs/${jobData.id}`} className="font-semibold text-xl text-gray-900 hover:text-red-500 transition-colors">
//           {jobData.title}
//         </Link> */}
//           <Badge title={jobData.workMode} IoComponent={IoLocationOutline}></Badge>
//         </section>
        
//         <section className="flex justify-between gap-17">
//           <div className="flex flex-col gap-1">
//             <div className="flex items-center gap-2">
//               <FaBuilding />
//               <p>{jobData.company}</p>
//             </div>

//             <div className="flex items-center gap-2">
//               {(jobData.companyType || []).map(type => (
//                 <Badge key={type} title={type}></Badge>
//               ))}
//             </div>

//             <div className="flex items-center gap-2">
//               <FaHandHoldingUsd />
//               <p>{jobData.stage}</p>
//             </div>

//             <div className="flex items-center gap-2">
//               <LuFactory />
//               <p>{jobData.industry}</p>
//             </div>

//             <div className="flex items-center gap-2">
//               <CiLocationOn />
//               <p>{jobData.location}</p>
//             </div>

//             <div className="flex items-center gap-2">
//               <CiMoneyBill />
//               <p>{jobData.salary}</p>
//             </div>
//           </div>

//           <div className="flex flex-col gap-1">
//             <div className="flex items-center gap-2">
//               <PiSuitcase />
//               <p>{jobData.employmentType}</p>
//             </div>

//             <div className="flex items-center gap-2">
//               <LuClock4 />
//               <p>Experience: {jobData.experience}</p>
//             </div>

//             <div className="flex items-center gap-2">
//               <HiOutlineLightBulb />
//               <p>Skills</p>
//             </div>

//             <div className="flex flex-wrap items-center gap-2 max-w-[300px]">
//               {
                
//                 renderSkills
               
//                 }
              
//             </div>
//           </div>
//         </section>

      
        

        
       


//          {/* --- Card Footer (Conditional) --- */}
//       <section className="flex gap-4 mt-5 pt-4 border-t border-gray-100">
//         {jobData.applicationStatus && statusInfo ? (
//           // RENDER STATUS if it's an applied job
//           <div 
//             className={`flex items-center gap-2 font-medium px-4 py-2 rounded-lg ${statusInfo.bg} ${statusInfo.color}`}
//           >
//             <statusInfo.icon size={20} />
//             <span>Status: {jobData.applicationStatus}</span>
//           </div>
//         ) : (
//           // RENDER DETAILS BUTTON if it's a live job
        
//            <section className="flex gap-5 my-1 mt-4">
//           <NavLink to={jobData.id} className="bg-red-500 rounded p-1 flex items-center gap-2 px-2">
//             <h2 className=" text-white text-[0.91rem]">Apply</h2>
//             <FaArrowRight className="text-white" />
//           </NavLink>

//            <NavLink to={jobData.id} className="bg-red-500 rounded p-1 flex items-center gap-2 px-2">
//             <h2 className=" text-white text-[0.91rem]">View Details</h2>
//           </NavLink>

//         </section>

//         )}
//       </section>
//       </div>
//     </>
//   )
// }

 function Card({ jobData }: CardProps) {


  const getStatusAppearance = (status: string) => {
    switch (status.toLowerCase()) {
      case 'reviewed':
        return { icon: IoCheckmarkCircleOutline, color: 'text-green-700', bg: 'bg-green-50 border-green-200' };
      case 'rejected':
        return { icon: IoCloseCircleOutline, color: 'text-red-700', bg: 'bg-red-50 border-red-200' };
      case 'pending':
      default:
        return { icon: IoDocumentTextOutline, color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200' };
    }
  };

  const statusInfo = jobData.applicationStatus ? getStatusAppearance(jobData.applicationStatus) : null;


  const renderSkills = () => {
    const skills = jobData.skills || [];
    const MAX_VISIBLE_SKILLS = 5;

    if (skills.length <= MAX_VISIBLE_SKILLS) {
      return skills.map(skill => (
        <Badge key={skill} title={skill} className="bg-orange-50 text-orange-800 border-orange-100" />
      ));
    }

    const visibleSkills = skills.slice(0, MAX_VISIBLE_SKILLS);
    const remainingCount = skills.length - MAX_VISIBLE_SKILLS;

    return (
      <>
        {visibleSkills.map(skill => (
          <Badge key={skill} title={skill} className="bg-orange-50 text-orange-800 border-orange-100" />
        ))}
        <Badge title={`+${remainingCount} Skills`} className="bg-slate-100 text-slate-600 border-slate-200" />
      </>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      
   
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">{jobData.title}</h2>
          
        </div>
        <Badge 
          title={jobData.workMode} 
          icon={IoLocationOutline} 
          
          // className="bg-white border-gray-200 text-slate-600 text-sm py-1.5 px-4" // Custom style for this specific badge
        />
      </div>

    
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 mb-6">
        
        {/*left side */}
        <div className="space-y-3">
        
          <div className="flex items-center gap-2 text-slate-700">
            <FaBuilding className="text-slate-400 w-4 h-4" />
            <span className="font-semibold">{jobData.company}</span>
          </div>

         
          <div className="flex flex-wrap gap-2">
            {(jobData.companyType || []).map(type => (
              <Badge key={type} title={type} className="bg-orange-50/50 text-orange-700 text-[10px] px-2 py-0.5" />
            ))}
            <span className="text-xs text-slate-500 ml-1 flex items-center gap-1">
            
               {jobData.stage && <span>🚀 {jobData.stage}</span>}
            </span>
          </div>

          
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <LuFactory className="text-slate-400 w-4 h-4" />
            <span>{jobData.industry}</span>
          </div>

       
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <CiLocationOn className="text-slate-400 w-5 h-5 -ml-0.5" />
            <span>{jobData.location}</span>
          </div>

         
          <div className="flex items-center gap-2 text-slate-900 font-medium text-sm">
            <CiMoneyBill className="text-slate-400 w-5 h-5 -ml-0.5" />
            <span>{jobData.salary}</span>
          </div>
        </div>

        {/* right side */}
        <div className="space-y-4">
           
          
           <div className="flex items-center gap-2 text-slate-600 text-sm">
              <PiSuitcase className="text-slate-400 w-4 h-4" />
              <span>{jobData.employmentType}</span>
           </div>

         
           <div className="flex items-center gap-2 text-slate-900 font-medium text-sm">
              <LuClock4 className="text-slate-400 w-4 h-4" />
              <span>Experience: {jobData.experience}</span>
           </div>

         
           <div className="space-y-2">
             <div className="flex items-center gap-2 text-slate-500 text-sm">
               <HiOutlineLightBulb className="w-4 h-4" />
               <span>Skills</span>
             </div>
             <div className="flex flex-wrap gap-2">
               {renderSkills()}
             </div>
           </div>
        </div>

      </div>

   
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        
        {jobData.applicationStatus && statusInfo ? (
         
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium ${statusInfo.bg} ${statusInfo.color}`}>
             <statusInfo.icon />
             <span>Status: {jobData.applicationStatus}</span>
          </div>
        ) : (
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link 
              to={`/jobs/${jobData.id}`} 
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Apply <FaArrowRight size={12} />
            </Link>
            
            <Link 
              to={`/jobs/${jobData.id}`} 
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors"
            >
              View Details
            </Link>
          </div>
        )}

        <span className="text-xs text-slate-400 hidden sm:block">Posted Today</span>
      </div>

    </div>
  );
}

// export default Card
export default React.memo(Card)