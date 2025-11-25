import { getJobs } from "../api"
import Card from "../components/JobCard"
import type { Job } from "../server"
import { Await, useLoaderData, useSearchParams,defer } from "react-router-dom"
import React, { useEffect } from "react"
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react"
import Tabs from "../components/Tab"
import { getAppliedJobs } from "../api"
import { useLayoutEffect } from "react"
import { useNavigation } from "react-router-dom"




export  function loader({request}:{request:Request}) {
    const url = new URL(request.url)
    const searchTerm = url.searchParams.get('search')
    const tab = url.searchParams.get('tab')
    
    const isLoggedIn = localStorage.getItem("loggedin") === "true";
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // const liveJobsPromise = await getJobs(searchTerm);
    // const appliedJobsPromise = await (isLoggedIn && user.id) 
    //     ? getAppliedJobs(user.id, searchTerm) 
    //     : Promise.resolve([]); 

    
    return defer ({
        liveJobsPromise:getJobs(searchTerm),
        appliedJobsPromise: (isLoggedIn && user.id) 
        ? getAppliedJobs(user.id, searchTerm) 
        : Promise.resolve([]),
        searchTerm: searchTerm || "",
        isLoggedIn: isLoggedIn,
        currentTab: tab || 'live' 
    })
}



function JobList({ jobs, searchTerm, currentTab, onClear }: { jobs: Job[], searchTerm: string, currentTab: string, onClear: () => void }) {
    const [visibleCount, setVisibleCount] = useState(10);
 const loadMoreRef = React.useRef<HTMLDivElement>(null);

  
    useEffect(() => {
        setVisibleCount(10);
    }, [jobs]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting && visibleCount < jobs.length) {
                setTimeout(() => {
                     setVisibleCount(prev => prev + 10);
                }, 500);
            }
        }, {
            root: null, 
            rootMargin: "100px", 
            threshold: 0.1
        });

        const currentRef = loadMoreRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [visibleCount, jobs.length]);

    if (jobs.length === 0) {
        return (
            <div className="text-center p-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                    {searchTerm 
                       ? `No ${currentTab === 'applied' ? 'applied' : ''} jobs found for "${searchTerm}".`
                       : `No ${currentTab === 'applied' ? 'applied' : ''} jobs found.`
                    }
                </h2>
                <button onClick={onClear} className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600">
                    Clear Search
                </button>
            </div>
        )
    }

    const visibleJobs = jobs.slice(0, visibleCount);
    const hasMore = visibleCount < jobs.length;

    return (
        <>
            <h2 className="text-center text-lg font-medium mb-4 text-gray-600">
                Found {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'}.
            </h2>
            
            <div className="flex flex-col gap-4 mt-2"> 
                {visibleJobs.map(job => <Card key={job.id} jobData={job} />)}
            </div>

            
            {hasMore && (
                // <div className="flex justify-center mt-8 mb-8">
                //     <button 
                //         onClick={() => setVisibleCount(prev => prev + 10)}
                //         className="bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-8 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
                //     >
                //         Load More Jobs ({jobs.length - visibleCount} remaining)
                //     </button>
                // </div>

                 <div ref={loadMoreRef} className="h-24 flex items-center justify-center p-4 opacity-50">
                    <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </>
    )
}



export default function JobListings() {
    const {  liveJobsPromise, appliedJobsPromise, searchTerm, isLoggedIn, currentTab } = useLoaderData() as { 
         liveJobsPromise: Promise<Job[]>, 
        appliedJobsPromise: Promise<Job[]>,
        searchTerm: string, 
        isLoggedIn: boolean, 
        currentTab: string 
    }
    const [search, setSearch] = useState(searchTerm)
    const [searchParams, setSearchParams] = useSearchParams()

    const currentJobsPromise = currentTab === 'applied' ? appliedJobsPromise : liveJobsPromise;


  

    
    useEffect(() => {
        const timerId = setTimeout(() => {
            const currentTab = searchParams.get('tab');
            const newParams = new URLSearchParams();
            if (currentTab) newParams.set('tab', currentTab);
            if (search) newParams.set('search', search);
            setSearchParams(newParams);
        }, 300)
        return () => clearTimeout(timerId)
    }, [search, setSearchParams, searchParams])

    function handleClear() { setSearch(''); }

    // function renderJobCards(resolvedJobs: Job[]) {
    //     if (resolvedJobs.length === 0) {
    //         return (
    //             <div className="text-center p-10">
    //                 <h2 className="text-2xl font-semibold mb-4 text-gray-700">
    //                     {searchTerm 
    //                        ? `No ${currentTab === 'applied' ? 'applied' : ''} jobs found for "${searchTerm}".`
    //                        : `No ${currentTab === 'applied' ? 'applied' : ''} jobs found.`
    //                     }
    //                 </h2>
    //                 <button onClick={handleClear} className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600">
    //                     Clear Search
    //                 </button>
    //             </div>
    //         )
    //     }
    //     return (
    //         <div className="flex flex-col gap-4 mt-2"> 
    //             {resolvedJobs.map(job => <Card key={job.id} jobData={job} />)}
    //         </div>
    //     )
    // }

    return (
        <div className="max-w-4xl mx-auto min-h-screen bg-white"> 
            
        
            <div className=" sticky top-0 z-30   pt-6 px-4 pb-0 transition-all duration-300 ">
                
                <form 
                    onSubmit={(e) => e.preventDefault()}
                    className="flex items-center w-full bg-white border border-gray-300 mb-6 rounded-lg shadow-sm overflow-hidden 
                    focus-within:border-black-500 focus-within:ring-1 focus-within:ring-black-500 transition-all"
                >
                    <label htmlFor="search-jobs" className="p-3 text-gray-500 ">
                        <CiSearch size={24}/>
                    </label>
                    <input 
                        id="search-jobs"
                        className="flex-grow p-3 outline-none text-gray-800 "
                        value={search}
                        placeholder="Search by title, skill, or company..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button type="button" onClick={handleClear} className="p-3 text-gray-500 hover:text-gray-900">
                            <RxCross2 size={24} />
                        </button>
                    )}
                </form>
                
                {isLoggedIn && (
                      <Tabs 
                        liveJobsPromise={liveJobsPromise} 
                        appliedJobsPromise={appliedJobsPromise} 
                    />
                )}
            </div>

            <div className="p-4 pt-0">
                <React.Suspense fallback={<h2 className="text-center mt-10 text-2xl font-semibold text-gray-500">Loading jobs...</h2>}>
                    <Await resolve={currentJobsPromise}>
                        {(resolvedJobs) => 
                        (<JobList 
                                jobs={resolvedJobs} 
                                searchTerm={searchTerm} 
                                currentTab={currentTab} 
                                onClear={handleClear} 
                            />)
                        // renderJobCards(resolvedJobs)
                        
                        }
                    </Await>
                </React.Suspense>
            </div>
        </div>
    )
}

// export default function JobListings() {
//    
//     const { jobsPromise, searchTerm, isLoggedIn, currentTab } = useLoaderData() as { 
//         jobsPromise: Promise<Job[]>,
//         searchTerm: string,
//         isLoggedIn: boolean,
//         currentTab: string
//     }
    
//     const [search,setSearch] = useState(searchTerm) // Sync input with URL
//     const [searchParams,setsearchParams] = useSearchParams()

//     // --- 3. UPDATE DEBOUNCER ---
//     useEffect(() => {
//         const timerId = setTimeout(() => {
//             // Get the current tab from the URL
//             const currentTab = searchParams.get('tab');
            
//             const newParams = new URLSearchParams();
            
//             // Preserve the tab param
//             if (currentTab) {
//                 newParams.set('tab', currentTab);
//             }
            
//             // Add the new search param
//             if (search) {
//                 newParams.set('search', search);
//             }
            
//             // Set the new params (e.g., "?tab=applied&search=pune")
//             setsearchParams(newParams);
            
//         }, 300) // 300ms delay
        
//         return () => clearTimeout(timerId)
//     },[search, setsearchParams]) // Only run when `search` state changes


//     function handleClear() {
//         setSearch('');
//         // This will trigger the useEffect, which will clear the search param
//     }

//     // --- 4. RENDER FUNCTION ---
//     function renderJobCards(resolvedJobs: Job[]) { 
        
//         //  "No Jobs" message
//         if (resolvedJobs.length === 0) {
//             return(
//                 <div className="text-center p-10">
//                     <h2 className="text-2xl font-semibold mb-4 text-gray-700">
//                         {searchTerm 
//                             ? `No ${currentTab === 'applied' ? 'applied' : ''} jobs found for "${searchTerm}".`
//                             : `No ${currentTab === 'applied' ? 'applied' : ''} jobs found.`
//                         }
//                     </h2>
//                     <button
//                         onClick={handleClear}
//                         className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors"
//                     >
//                         Clear Search
//                     </button>
//                 </div>
//             )
//         }

//         // Render the list of job cards
//         const jobListElement = resolvedJobs.map(job => {
//             return  <Card key={job.id} jobData={job} />
//         })
        
//         return  (
//             <>
//                 {/* Show "Found" count */}
//                 <h2 className="text-center text-lg font-medium mb-4 text-gray-600">
//                     Found {resolvedJobs.length} {resolvedJobs.length === 1 ? 'job' : 'jobs'}.
//                 </h2>
//                 <div className="flex flex-col gap-4">
//                     {jobListElement}
//                 </div>
//             </>
//         )
//     }
    
//     return (
//         <div className="p-4 max-w-4xl mx-auto min-h-screen">
//             {/* Search Bar */}
//             <form 
//                 onSubmit={(e) => e.preventDefault()} // Prevent form submit
//                 className="flex items-center w-full bg-white border border-gray-300 mb-6 rounded-lg shadow-sm overflow-hidden"
//             >
//                 <label htmlFor="search-jobs" className="p-3 text-gray-500">
//                     <CiSearch size={24}/>
//                 </label>
//                 <input 
//                     id="search-jobs"
//                     className="flex-grow p-3 outline-none text-gray-800"
//                     value={search}
//                     placeholder="Search by title, skill, or company..."
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//                 {search && (
//                     <button
//                         type="button"
//                         onClick={handleClear}
//                         className="p-3 text-gray-500 hover:text-gray-900 transition-colors"
//                     >
//                        <RxCross2 size={24} />
//                     </button>
//                 )}
//             </form>
            
//             {/* --- 5. RENDER TABS --- */}
//             {/* Only show the tabs if the user is logged in */}
//             {isLoggedIn && <Tabs />}
            
//             {/* Job List */}
//             <div className="flex flex-col gap-4 p-4">
//                 <React.Suspense fallback={<h2 className="text-center text-2xl font-semibold text-gray-500">Loading jobs....</h2>}>
//                     <Await resolve={jobsPromise}>
//                         {(resolvedJobs) => renderJobCards(resolvedJobs)} 
//                     </Await>
//                 </React.Suspense>
//             </div>
//         </div>
//     )
// }

