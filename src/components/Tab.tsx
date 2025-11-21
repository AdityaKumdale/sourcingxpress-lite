

import React, { useLayoutEffect } from 'react';
import { useSearchParams, Link, Await } from 'react-router-dom';
import type { Job } from '../server';
import { useRef } from 'react';


interface TabsProps {
    liveJobsPromise: Promise<Job[]>;
    appliedJobsPromise: Promise<Job[]>;
}
// const scrollPositions:any = {}

export default function Tabs( { liveJobsPromise, appliedJobsPromise }: TabsProps) {
  const [searchParams] = useSearchParams();
  

  const currentTab = searchParams.get('tab') || 'live';
  const searchTerm = searchParams.get('search') || '';

  const getTabUrl = (targetTab: string) => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    params.set('tab', targetTab);
    return `?${params.toString()}`;
  };

  useLayoutEffect(() => {
       

        if(currentTab === 'live'){
           const savedPositionLive = sessionStorage.getItem("liveJobListScrollY")

           if(savedPositionLive){
             window.scrollTo(0, parseInt(savedPositionLive))
           }else{
            window.scrollTo(0, 0);
           }

           return () => {
             sessionStorage.setItem("liveJobListScrollY", window.scrollY.toString())
           }
        }

        
        if(currentTab === 'applied'){
             const savedPositionLive = sessionStorage.getItem("appliedJobListScrollY")

           if(savedPositionLive){
             window.scrollTo(0, parseInt(savedPositionLive))
           }else{
            window.scrollTo(0, 0);
           }

           return () => {
             sessionStorage.setItem("appliedJobListScrollY", window.scrollY.toString())
           }
        }

      
    }, [currentTab]);

  //   const previousTab = useRef(currentTab);
  //   useLayoutEffect(() => {
  //   // Save scroll position for the previous tab
  //   scrollPositions[previousTab.current] = window.scrollY;

  //   // Restore (or reset) scroll position for the new tab
  //   const savedPosition = scrollPositions[currentTab] ?? 0;
  //   window.scrollTo(0, savedPosition);

  //   previousTab.current = currentTab;
  // }, [currentTab]);


//   useLayoutEffect(() => {
//   window.scrollTo(0, 0);
// }, [location.search]);

  //Prevent navigation if already active ---
  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, targetTab: string) => {
    if (currentTab === targetTab) {
      e.preventDefault(); // Stops the navigation & loader fetch
    }
  };

  const containerStyle = "flex bg-gray-200 p-1 rounded-lg mb-6 w-full   shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)] shadow-white  "; //bg-white/30 backdrop-blur-md
  
 
  const activeStyle = "bg-white text-slate-900 shadow-sm cursor-default"; 
  const inactiveStyle = "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50 cursor-pointer";
  
  const tabBaseStyle = "flex-1 py-2 px-4 text-center text-sm font-semibold rounded-md transition-all duration-200 select-none";

  return (
    <div className={containerStyle}>
      <Link
        to={getTabUrl('live')}
        onClick={(e) => handleTabClick(e, 'live')}
        className={`${tabBaseStyle} ${currentTab === 'live' ? activeStyle : inactiveStyle}`}
      >
        Live Jobs
        <span className="ml-1 opacity-80">
            <React.Suspense fallback="(...)">
                <Await resolve={liveJobsPromise} errorElement="(0)">
                    {(jobs:any):any => `(${jobs.length})`}
                </Await>
            </React.Suspense>
        </span>
      </Link>

      <Link
        to={getTabUrl('applied')}
        onClick={(e) => handleTabClick(e, 'applied')} 
        className={`${tabBaseStyle} ${currentTab === 'applied' ? activeStyle : inactiveStyle}`}
      >
        Applied Jobs
        <span className="ml-1 opacity-80">
            <React.Suspense fallback="(...)">
                <Await resolve={appliedJobsPromise} errorElement="(0)">
                    {(jobs:any):any => `(${jobs.length})`}
                </Await>
            </React.Suspense>
        </span>
      </Link>
    </div>
  );
}



// import React from 'react';
// import { NavLink, useSearchParams } from 'react-router-dom';
// /**
//  * Renders the "Live Jobs" and "Applied Jobs" tabs.
//  * It preserves the current search query when switching tabs.
//  */
// export default function Tabs() {
//   const [searchParams] = useSearchParams();
//   // Get the current search term to preserve it
//   const searchTerm = searchParams.get('search') || '';

//   // Helper to create the correct URL, preserving the search term
//   const getTabUrl = (tab: string) => {
//     const params = new URLSearchParams();
//     if (searchTerm) {
//       params.append('search', searchTerm);
//     }
//     // Only add 'tab=applied'. 'live' is the default (no param).
//     if (tab === 'applied') {
//       params.append('tab', 'applied');
//     }
//     // This will return "?search=pune" or "?search=pune&tab=applied"
//     return `?${params.toString()}`;
//   };

//   const activeStyle = "border-b-2 border-red-500 text-red-500";
//   const inactiveStyle = "text-gray-500 hover:text-gray-800";

//   return (
//     <div className="flex justify-center border-b border-gray-200 mb-6">
//       <nav className="flex gap-8 -mb-px">
//         <NavLink
//           to={getTabUrl('live')}
//           // `end` is crucial. It means "only be active if this is the *exact* URL"
//           // This prevents it from being active when `?tab=applied` is also present.
//           end 
//           className={({ isActive }) => 
//             `py-4 px-1 text-center font-medium ${isActive ? activeStyle : inactiveStyle}`
//           }
//         >
//           Live Jobs
//         </NavLink>
//         <NavLink
//           to={getTabUrl('applied')}
//           className={({ isActive }) => 
//             `py-4 px-1 text-center font-medium ${isActive ? activeStyle : inactiveStyle}`
//           }
//         >
//           Applied Jobs
//         </NavLink>
//       </nav>
//     </div>
//   );
// }


