import { Form, Link, redirect, useActionData, useNavigation } from "react-router-dom"
import { getJob, applyToJob } from "../api";
import { useLoaderData } from "react-router-dom";
import { requireAuth } from "../utils";
import { 
    FaBuilding, FaHandHoldingUsd
} from 'react-icons/fa';
import { 
    IoAnalytics, IoPeople, IoShareSocial, IoLocationOutline, 
    IoCheckmarkCircleOutline, IoCloseCircleOutline 
} from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { BsCalendar } from "react-icons/bs";
import { PiSuitcase } from "react-icons/pi";
import { LuClock4 } from "react-icons/lu";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiArrowLeftSLine } from "react-icons/ri";
import type { Job } from "../server";
import Badge from "../components/Badge";
import { useLayoutEffect } from "react";

// --- Loader & Action (Unchanged) ---
export function loader({ params }: { params: any, request: Request }) {             
    return getJob(params.id)
}

export async function action({request, params}: {request: Request, params: any}){
    await requireAuth(request)
    
    const user = JSON.parse(localStorage.getItem('user')|| '{}')
    if(!user.id){ 
        return redirect('/login?message=User data not found')
    }

    try {
        const jobID = params.id
        await applyToJob(jobID, user.id)
        return {success: true, message: "Successfully applied!"}
    } catch (err: any) {
        return {success: false, message: err.message}
    }
}


function formatPostedDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Posted 1 day ago";
    if (diffDays <= 30) return `Posted ${diffDays} days ago`;
    
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return "Posted 1 month ago";
    return `Posted ${diffMonths} months ago`;
}


const DetailItem = ({ icon: Icon, text }: { icon: React.ElementType, text: string | number }) => (
    <div className="flex items-center gap-3 text-gray-600">
        <Icon className="text-gray-400" size={18} />
        <span className="font-medium text-sm sm:text-base">{text}</span>
    </div>
);


export default function JobDetail() {
    const job = useLoaderData() as Job
    const actionData = useActionData() as {success: boolean , message: string} | null
    const navigation = useNavigation()
    const isApplying = navigation.state === "submitting"

    const getStatusAppearance = (data: {success: boolean, message: string} | null) => {
        if (!data) return null;
        return data.success 
            ? { icon: IoCheckmarkCircleOutline, color: 'text-green-600 bg-green-50 border-green-200' }
            : { icon: IoCloseCircleOutline, color: 'text-red-600 bg-red-50 border-red-200' };
    };
    
    const statusInfo = getStatusAppearance(actionData);


    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []); 


    return(
        // Main Background changed to White
        <div className="bg-white min-h-screen py-10 px-4 font-sans text-gray-600">
            <div className="max-w-5xl mx-auto">
                
                {/* --- Back Link --- */}
                <Link 
                    to="/jobs" 
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 transition-colors mb-8"
                >
                    <RiArrowLeftSLine size={20} />
                    Back to job board
                </Link>

                {/* --- Main Content Container (Clean White, subtle border) --- */}
                <div className="border border-gray-200 rounded-xl p-6 sm:p-10 bg-white shadow-sm">
                    
                    {/* --- Header --- */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-8 border-b border-gray-100 pb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">{job.title}</h1>
                            
                            {/* Sub-header / Meta badges */}
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold tracking-wide uppercase">
                                    <FaBuilding className="text-gray-400" />
                                    {job.company}
                                </div>
                                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold tracking-wide uppercase border border-orange-100">
                                    <IoLocationOutline />
                                    {job.workMode}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-0 flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all text-sm font-medium">
                                <IoShareSocial size={16} />
                                Share
                            </button>
                        </div>
                    </div>

                    {/* --- Details Grid --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        
                        {/* Column 1 */}
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Role Details</h4>
                            <DetailItem icon={FaHandHoldingUsd} text={job.stage} />
                            <DetailItem icon={IoAnalytics} text={job.industry} />
                            <DetailItem icon={CiLocationOn} text={job.location} />
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-4">
                             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Employment</h4>
                            <DetailItem icon={PiSuitcase} text={job.employmentType} />
                            <DetailItem icon={LuClock4} text={`Exp: ${job.experience}`} />
                            <DetailItem icon={BsCalendar} text={formatPostedDate(job.postedDate)} />
                        </div>

                         {/* Column 3 (Stats) */}
                         <div className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Activity</h4>
                            <DetailItem icon={IoPeople} text={`${job.applicationCount} applications`} />
                            <div className="flex items-center gap-2 mt-2">
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-sm text-green-600 font-medium">Post Status: Active</span>
                            </div>
                        </div>
                    </div>

                    {/* --- Skills Section --- */}
                    <div className="mb-10 bg-gray-50 rounded-lg p-6 border border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-wide">
                            <HiOutlineLightBulb className="text-orange-500" size={18} />
                            Required Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill: any) => (
                                // Assuming Badge component can take styling or we wrap it. 
                                // If Badge has internal styles, you might want to replace it with a simple span for this look:
                                <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-md text-sm text-gray-700 font-medium shadow-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* --- Description --- */}
                    <div className="prose prose-gray max-w-none">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">About the job</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">{job.description}</p>
                        
                        <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">What you will do</h3>
                        <ul className="list-disc pl-5 text-gray-600 space-y-2 marker:text-orange-500">
                            <li>Review and analyze system specifications.</li>
                            <li>Collaborate with QA Engineers to develop effective strategies and test plans.</li>
                            <li>Execute test cases (manual or automated) and analyze results.</li>
                            <li>Create robust cloud-based systems used by students globally at scale.</li>
                        </ul>

                        <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">What are we looking for?</h3>
                        <ul className="list-disc pl-5 text-gray-600 space-y-2 marker:text-orange-500">
                            {job.requirements.map((req: any, i: any) => (
                                <li key={i}>{req}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* --- Footer / Apply Action --- */}
                <div className="mt-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Form method="post">
                            <button 
                                disabled={isApplying || actionData?.success}
                                className="bg-orange-600 text-white font-bold py-3 px-10 rounded-lg text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                            >
                                {isApplying ? "Applying..." : (actionData?.success ? "Applied Successfully" : "Apply Now →")}
                            </button>
                        </Form>
                        
                        {/* --- Action Message --- */}
                        {actionData && statusInfo && (
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${statusInfo.color}`}>
                                <statusInfo.icon size={20} />
                                <span className="font-medium">{actionData.message}</span>
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-gray-400 mt-4">
                        NOTE: Team leads/Architects who are ready to work on Hardcore Coding are also invited.
                    </p>
                </div>

            </div>
        </div>
    )
}

// import { Form, Link, redirect, useActionData, useNavigation } from "react-router-dom"
// import type { LoaderFunctionArgs } from 'react-router-dom';
// import { getJob,applyToJob } from "../api";
// import { useLoaderData } from "react-router-dom";
// import { requireAuth } from "../utils";
// import { isAuthenticated } from "../utils"
// import { 
//     FaBuilding, FaHandHoldingUsd, FaLink 
// } from 'react-icons/fa';
// import { 
//     IoAnalytics, IoPeople, IoShareSocial, IoLocationOutline, 
//     IoDocumentTextOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline 
// } from "react-icons/io5";
// import { CiLocationOn, CiMoneyBill } from "react-icons/ci";
// import { BsCheckCircleFill, BsCalendar } from "react-icons/bs";
// import { PiSuitcase } from "react-icons/pi";
// import { LuClock4 } from "react-icons/lu";
// import { HiOutlineLightBulb } from "react-icons/hi";
// import { RiArrowLeftSLine } from "react-icons/ri";
// import type { Job } from "../server";
// import Badge from "../components/Badge";



// export function loader({ params, request }: { params: any, request: Request }) {            

//     return getJob(params.id)
// }

// export async function  action({request,params}:{request:Request,params:any}){


//     await requireAuth(request)
    
//     const user = JSON.parse(localStorage.getItem('user')|| '{}')
//     if(!user.id){ 
//         return redirect('/login?message=User data not found')
//     }

//     try {
//         const jobID = params.id
//         await applyToJob(jobID,user.id)
//         return {success:true,message:"Successfully applied!"}
//     } catch (err:any) {
//         return {success:false,message:err.message}
//     }

// }





// // --- Date Formatting Helper ---
// function formatPostedDate(dateString: string) {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now.getTime() - date.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     if (diffDays === 1) return "Posted 1 day ago";
//     if (diffDays <= 30) return `Posted ${diffDays} days ago`;
    
//     const diffMonths = Math.floor(diffDays / 30);
//     if (diffMonths === 1) return "Posted 1 month ago";
//     return `Posted ${diffMonths} months ago`;
// }

// // --- Detail Row Helper Component ---
// const DetailItem = ({ icon: Icon, text }: { icon: React.ElementType, text: string | number }) => (
//     <div className="flex items-center gap-3 text-gray-300">
//         <Icon className="text-gray-400" size={18} />
//         <span>{text}</span>
//     </div>
// );


// // --- Job Detail Component ---
// export default function JobDetail() {
//     const job = useLoaderData() as Job
//     // FIX 1: Type actionData as potentially null
//     const actionData = useActionData() as {success:boolean , message:string} | null
//     const navigation = useNavigation()
//     const isApplying = navigation.state === "submitting"

//     // FIX 2: Corrected helper function syntax and logic
//     // It now takes the entire actionData object
//     const getStatusAppearance = (data: {success: boolean, message: string} | null) => {
//         if (!data) { // Check if data is null or undefined
//             return null;
//         }
//         return data.success 
//             ? { icon: IoCheckmarkCircleOutline, color: 'text-green-400' }
//             : { icon: IoCloseCircleOutline, color: 'text-red-400' };
//     };
//     // FIX 3: Pass the whole actionData object to the helper
//     const statusInfo = getStatusAppearance(actionData);

//     return(
//         <div className="bg-gray-900 py-12 px-4">
//             <div className="max-w-4xl mx-auto">
//                 {/* --- Back Link --- */}
//                 <Link 
//                     to="/jobs" 
//                     className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 mb-6"
//                 >
//                     <RiArrowLeftSLine size={20} />
//                     Back to job board
//                 </Link>

//                 {/* --- Main Content Card --- */}
//                 <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
//                     <div className="p-8">
//                         {/* --- Header --- */}
//                         <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
//                             <h1 className="text-3xl font-bold text-white mb-2 sm:mb-0">{job.title}</h1>
//                             <div className="flex items-center gap-4">
//                                 <Badge title={job.workMode} IoComponent={IoLocationOutline} />
//                                 <button className="flex items-center gap-2 text-gray-400 hover:text-white">
//                                     <IoShareSocial size={18} />
//                                     Share
//                                 </button>
//                             </div>
//                         </div>

//                         {/* --- Details Grid --- */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 border-b border-gray-700 pb-6 mb-8">
//                             {/* Left Column */}
//                             <div className="flex flex-col gap-4">
//                                 <DetailItem icon={FaBuilding} text={job.company} />
//                                 <DetailItem icon={FaHandHoldingUsd} text={job.stage} />
//                                 <DetailItem icon={IoAnalytics} text={job.industry} />
//                                 <DetailItem icon={CiLocationOn} text={job.location} />
//                             </div>
//                             {/* Right Column */}
//                             <div className="flex flex-col gap-4">
//                                 <DetailItem icon={PiSuitcase} text={job.employmentType} />
//                                 <DetailItem icon={IoPeople} text={`${job.applicationCount} applications`} />
//                                 <DetailItem icon={LuClock4} text={`Experience: ${job.experience}`} />
//                                 <DetailItem icon={BsCalendar} text={formatPostedDate(job.postedDate)} />
//                             </div>
//                         </div>

//                         {/* --- Skills --- */}
//                         <div className="border-b border-gray-700 pb-6 mb-8">
//                             <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//                                 <HiOutlineLightBulb size={20} />
//                                 Skills
//                             </h3>
//                             <div className="flex flex-wrap gap-2">
//                                 {job.skills.map((skill:any) => (
//                                     <Badge key={skill} title={skill} />
//                                 ))}
//                             </div>
//                         </div>

//                         {/* --- Description --- */}
//                         <div className="prose prose-invert max-w-none text-gray-300">
//                             <h3 className="text-lg font-semibold text-white mb-4">About the job</h3>
//                             <p>{job.description}</p>
                            
//                             <h3 className="text-lg font-semibold text-white mt-8 mb-4">What you will do</h3>
//                             <ul className="list-disc pl-5">
//                                 {/* Placeholder content as this is not in the Job model */}
//                                 <li>Review and analyze system specifications.</li>
//                                 <li>Collaborate with QA Engineers to develop effective strategies and test plans.</li>
//                                 <li>Execute test cases (manual or automated) and analyze results.</li>
//                                 <li>Report bugs and errors to development teams.</li>
//                             </ul>

//                             <h3 className="text-lg font-semibold text-white mt-8 mb-4">What are we looking for?</h3>
//                             <ul className="list-disc pl-5">
//                                 {job.requirements.map((req:any, i:any) => (
//                                     <li key={i}>{req}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- Apply Button / Form --- */}
//                 <div className="mt-8 flex items-center gap-4">
//                     <Form method="post">
//                         <button 
//                             disabled={isApplying || actionData?.success} // Disable if applying or already applied
//                             className="bg-red-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-red-600 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             {isApplying ? "Applying..." : (actionData?.success ? "Applied!" : "Apply Now")}
//                         </button>
//                     </Form>
//                     {/* --- Action Message --- */}
//                     {actionData && statusInfo && (
//                         <div className={`flex items-center gap-2 font-medium ${statusInfo.color}`}>
//                             <statusInfo.icon size={24} />
//                             <span>{actionData.message}</span>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }


