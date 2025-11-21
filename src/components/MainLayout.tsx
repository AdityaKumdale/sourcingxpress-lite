
// export default function MainLayout() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [userName, setUserName] = useState("");
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
//     const navigate = useNavigate();
//     const location = useLocation();

//     // Check login status on mount and when location changes
//     useEffect(() => {
//         const loggedInStatus = localStorage.getItem("loggedin") === "true";
//         const user = JSON.parse(localStorage.getItem("user") || "{}");
//         setIsLoggedIn(loggedInStatus);
//         setUserName(user.name || "User");
//         setIsMobileMenuOpen(false); // Close mobile menu on route change
//     }, [location]);

//     function handleLogout() {
//         localStorage.removeItem("loggedin");
//         localStorage.removeItem("user");
//         setIsLoggedIn(false);
//         setUserName("");
//         navigate("/");
//     }

//     return (
//         <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans"> {/*breakpt*/} 
            
//             <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
//                 <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex items-center justify-between h-20">

//                         {/* left */}
//                         <div className="flex items-center gap-8 lg:gap-12">
                            
//                             <Link to={isLoggedIn ? "/jobs" : "/"}
//                              className="flex items-center gap-1 text-2xl sm:text-3xl font-black italic tracking-tighter">
//                                 <span className="text-red-600">SOURCING</span>
//                                 <span className="text-orange-500">XPRESS</span>
//                             </Link>

                          
//                             {!isLoggedIn && (<nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-slate-900">
//                                 <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
//                                 <Link to="/about" className="hover:text-orange-600 transition-colors">About Us</Link>
//                                 <Link to="/contact" className="hover:text-orange-600 transition-colors">Contact Us</Link>
//                             </nav>)}
//                         </div>

//                         {/* right */}
//                         <div className="hidden lg:flex items-center gap-4">
                            
//                             {!isLoggedIn && (
//                                 <>
                          
//                             <Link 
//                                 to="/jobs" 
//                                 className="flex items-center gap-2 bg-slate-950 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
//                             >
//                                 <BsSearch className="text-white" />
//                                 <span>Explore Tech Jobs</span>
//                             </Link>

                       
//                             <Link 
//                                 to="/post-job"
//                                 className="flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-orange-700 transition-all shadow-sm hover:shadow-md"
//                             >
//                                 <HiOutlineSparkles />
//                                 <span>Post A Free Job</span>
//                                 <FaArrowRight />
//                             </Link>
// </>
//                             )}
                          
//                             {isLoggedIn ? (
//                                 <div className="flex items-center gap-3 ml-2 bg-gray-100 px-4 py-2 rounded-lg">
//                                     <span className="text-sm font-semibold text-slate-700 truncate max-w-[100px]">
//                                         {userName}
//                                     </span>
//                                     <button 
//                                         onClick={handleLogout} 
//                                         className="text-gray-500 hover:text-red-600 transition-colors"
//                                         title="Logout"
//                                     >
//                                         <RiLogoutCircleLine size={20} />
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <Link 
//                                     to={`/login?redirectTo=${location.pathname}`}
//                                     className="flex items-center gap-2 bg-gray-100 text-slate-900 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
//                                 >
//                                     <FaUser className="text-slate-600" />
//                                     <span>Login/Signup</span>
//                                 </Link>
//                             )}
//                         </div>

//                         {/* Mobile Menu Button */}
//                         <button 
//                             className="lg:hidden text-slate-900 p-2"
//                             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} //fn check needed
//                         >
//                             <FiMenu size={28} />
//                         </button>
//                     </div>
//                 </div>

//                 {/* Mobile Menu Dropdown*/}
//                 {isMobileMenuOpen && (
//                     <div className="lg:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-lg absolute w-full left-0 top-20">
//                         <nav className="flex flex-col gap-4">
//                             {/* <Link to="/" className="font-medium text-slate-900">Home</Link>
//                             <Link to="/about" className="font-medium text-slate-900">About Us</Link>
//                             <Link to="/contact" className="font-medium text-slate-900">Contact Us</Link>
//                             <hr />         //what is this
//                             <Link to="/jobs" className="flex items-center gap-2 font-medium text-slate-900">
//                                 <BsSearch /> Explore Tech Jobs
//                             </Link>
//                             <Link to="/post-job" className="flex items-center gap-2 font-medium text-orange-600">
//                                 <HiOutlineSparkles /> Post a Free Job
//                             </Link>
//                             {isLoggedIn ? (
//                                 <button onClick={handleLogout} className="flex items-center gap-2 font-medium text-red-600">
//                                     <RiLogoutCircleLine /> Logout ({userName})
//                                 </button>
//                             ) : (
//                                 <Link to="/login" className="flex items-center gap-2 font-medium text-slate-900">
//                                     <FaUser /> Login/Signup
//                                 </Link>
//                             )} */}

//                             {!isLoggedIn ? (
//                                 <>
//                                     <Link to="/" className="font-medium text-slate-900">Home</Link>
//                                     <Link to="/about" className="font-medium text-slate-900">About Us</Link>
//                                     <Link to="/contact" className="font-medium text-slate-900">Contact Us</Link>
//                                     <hr className="border-gray-100"/>
//                                     <Link to="/jobs" className="flex items-center gap-2 font-medium text-slate-900">
//                                         <BsSearch /> Explore Tech Jobs
//                                     </Link>
//                                     <Link to="/post-job" className="flex items-center gap-2 font-medium text-orange-600">
//                                         <HiOutlineSparkles /> Post a Free Job
//                                     </Link>
//                                     <Link to="/login" className="flex items-center gap-2 font-medium text-slate-900">
//                                         <FaUser /> Login/Signup
//                                     </Link>
//                                 </>
//                             ) : (
//                                 // IF LOGGED IN: Show ONLY Logout
//                                 <button 
//                                     onClick={handleLogout} 
//                                     className="flex items-center gap-2 font-medium text-red-600 w-full text-left"
//                                 >
//                                     <RiLogoutCircleLine size={20} /> 
//                                     Logout ({userName})
//                                 </button>
//                             )}


//                         </nav>
//                     </div>
//                 )}
//             </header>

          

//             <main className="flex-grow w-full">
//                 <Outlet />
//             </main>

           


//             <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
                    
//                     <div className="flex flex-col items-center md:items-start gap-4">
//                         <div className="flex gap-6 text-sm font-medium">
//                             <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"> {/*breakpt*/} 
//                                 <FaLinkedin className="text-xl" /> LinkedIn
//                             </a>
//                             <a href="#" className="hover:text-white transition-colors">Contact Us</a>
//                             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
//                         </div>
//                         <p className="text-xs text-slate-500">
//                             &copy; {new Date().getFullYear()} SourcingXPress. All rights reserved.
//                         </p>
//                     </div>

                   
//                     <div className="border border-slate-700 rounded-lg p-3 flex items-center gap-3 bg-slate-800/50">
//                         <div className="w-8 h-8 grid grid-cols-2 gap-0.5">
//                             <span className="bg-[#F25022]"></span>
//                             <span className="bg-[#7FBA00]"></span>
//                             <span className="bg-[#00A4EF]"></span>
//                             <span className="bg-[#FFB900]"></span>
//                         </div>
//                         <div className="flex flex-col leading-none">
//                             <span className="text-white font-semibold text-sm">Microsoft</span>
//                             <span className="text-[10px] text-slate-400">Partner for Startups</span>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// }

import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { BsSearch } from 'react-icons/bs';
import { FaArrowRight, FaUser, FaLinkedin } from 'react-icons/fa';
import { HiOutlineSparkles } from "react-icons/hi";
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';


const logo = "/images/logosm.svg"; 

export default function MainLayout() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();

    const desktopUserDropdownRef = useRef<HTMLDivElement>(null);
    const mobileUserDropdownRef = useRef<HTMLDivElement>(null);
    
    const mobileMenuRef = useRef<HTMLDivElement>(null); 
    const mobileMenuButtonRef = useRef<HTMLButtonElement>(null); 

    useEffect(() => {
        const loggedInStatus = localStorage.getItem("loggedin") === "true";
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        setIsLoggedIn(loggedInStatus);
        setUserName(user.name || "User");
        setUserEmail(user.email || "");
        setIsMobileMenuOpen(false); 
        setIsUserDropdownOpen(false); 
    }, [location]);

    const xref = useRef<HTMLButtonElement | null>(null)
    useEffect(() => {
        
        if(isMobileMenuOpen && !isLoggedIn){
                xref.current?.focus()
        }
    },[isMobileMenuOpen , !isLoggedIn])


    
    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;

            const isClickInDesktop = desktopUserDropdownRef.current && desktopUserDropdownRef.current.contains(target);
            const isClickInMobile = mobileUserDropdownRef.current && mobileUserDropdownRef.current.contains(target);

            if (isUserDropdownOpen && !isClickInDesktop && !isClickInMobile) {
                setIsUserDropdownOpen(false);
            }
            
            
            if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(target) &&
                mobileMenuButtonRef.current && !mobileMenuButtonRef.current.contains(target)) {
                 // logic handled by backdrop, leaving empty to avoid conflict
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMobileMenuOpen, isUserDropdownOpen]);


    function handleLogout(event: React.MouseEvent) {
        event.stopPropagation(); 
        localStorage.removeItem("loggedin");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUserName("");
        setUserEmail("");
        navigate("/");
        setIsUserDropdownOpen(false); 
        setIsMobileMenuOpen(false); 
    }

    const handleResetScroll = () => {
        sessionStorage.removeItem('liveJobListScrollY')
        sessionStorage.removeItem('appliedJobListScrollY')
        window.scrollTo(0,0)
    }

    let clsForHead 

    if(isLoggedIn){
        clsForHead = ' max-w-[921px]'
    }else{
        clsForHead =' max-w-17xl'
    }
    return (
        <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans relative"> 
            
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className={`${clsForHead} mx-auto px-4 sm:px-6 lg:px-8`}>  
                    <div className="flex items-center justify-between h-20">

                      
                        <div className="flex items-center gap-8 lg:gap-12">
                            <Link 
                                to={isLoggedIn ? "/jobs" : "/"} 
                                onClick={handleResetScroll}
                                className="flex items-center gap-1 text-2xl sm:text-3xl font-black italic tracking-tighter"
                            >
                                <span className="text-red-600">SOURCING</span>
                                <span className="text-orange-500">XPRESS</span>
                            </Link>

                            {!isLoggedIn && (
                                <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-slate-900">
                                    <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
                                    <Link to="/about" className="hover:text-orange-600 transition-colors">About Us</Link>
                                    <Link to="/contact" className="hover:text-orange-600 transition-colors">Contact Us</Link>
                                </nav>
                            )}
                        </div>

                        
                        <div className="hidden lg:flex items-center gap-4">
                            {!isLoggedIn && (
                                <>
                                    <Link 
                                        to="/jobs" 
                                        className="flex items-center gap-2 bg-slate-950 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
                                    >
                                        <BsSearch className="text-white" />
                                        <span>Explore Tech Jobs</span>
                                    </Link>

                                    <Link 
                                        to="/post-job"
                                        className="flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide hover:bg-orange-700 transition-all shadow-sm hover:shadow-md"
                                    >
                                        <HiOutlineSparkles />
                                        <span>Post A Free Job</span>
                                        <FaArrowRight />
                                    </Link>
                                </>
                            )}

                            {isLoggedIn && (
                                <div className="relative" ref={desktopUserDropdownRef}>
                                    <button
                                        onClick={() => setIsUserDropdownOpen(prev => !prev)}
                                        className="flex items-center gap-2 bg-gray-100 text-slate-900 px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors"
                                        title="User Menu"
                                    >
                                        <FaUser size={20} className="text-slate-600" />
                                    </button>
                                    {isUserDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                                                <div className="px-4 py-2 text-sm text-gray-700">
                                                    <p className="font-semibold truncate">{userName}</p>
                                                    <p className="text-gray-500 truncate">{userEmail}</p>
                                                </div>
                                                <div className="border-t border-gray-100"></div>
                                                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => setIsUserDropdownOpen(false)}>
                                                    <FaUser size={16} /> Edit Profile
                                                </Link>
                                                <button 
                                                    onClick={handleLogout} 
                                                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100" 
                                                    role="menuitem"
                                                >
                                                    <RiLogoutCircleLine size={16} /> Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {!isLoggedIn && (
                                <Link 
                                    to={`/login?redirectTo=${location.pathname}`}
                                    className="flex items-center gap-2 bg-gray-100 text-slate-900 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                                >
                                    <FaUser className="text-slate-600" />
                                    <span>Login/Signup</span>
                                </Link>
                            )}
                        </div>

                        {/* dropdown when logged in */}
                        <div className="lg:hidden">
                            {isLoggedIn ? (
                                <div className="relative" ref={mobileUserDropdownRef}>
                                     <button
                                        onClick={() => setIsUserDropdownOpen(prev => !prev)} 
                                        className="text-slate-900 p-2"
                                        title="User Menu"
                                    >
                                        <FaUser size={24} /> 
                                    </button>
                                    {isUserDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                                                <div className="px-4 py-2 text-sm text-gray-700">
                                                    <p className="font-semibold truncate">{userName}</p>
                                                    <p className="text-gray-500 truncate">{userEmail}</p>
                                                </div>
                                                <div className="border-t border-gray-100"></div>
                                                <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" onClick={() => setIsUserDropdownOpen(false)}>
                                                    <FaUser size={16} /> Edit Profile
                                                </Link>
                                                <button 
                                                    onClick={handleLogout} 
                                                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100" 
                                                    role="menuitem"
                                                >
                                                    <RiLogoutCircleLine size={16} /> Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button 
                                    id="mobile-menu-button"
                                    ref={mobileMenuButtonRef}
                                    className="text-slate-900 p-2"
                                    onClick={() => setIsMobileMenuOpen(prev => !prev)}
                                >
                                  
                                    <FiMenu size={28} />
                                </button>
                            )}
                        </div>

                    </div>
                </div>

                
                {!isLoggedIn && (
                    <>
                        
                        <div 
                            className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ease-in-out ${
                                isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)} // Clicking dark area closes menu
                        />

                        
                        <div 
                            ref={mobileMenuRef}
                            className={`fixed inset-y-0 right-0 w-3/4 max-w-sm bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
                                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                            }`}
                        >
                             <div className="absolute top-4 right-4">
                                <button
                                    ref = {xref} 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-gray-600 hover:text-gray-900 p-2 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                    title="Close menu"
                                >
                                    <IoMdClose size={32} />
                                </button>
                            </div>
                            
                            <div className="flex flex-col items-center gap-6 mt-10">
                                <img src={logo} alt="SourcingXPress" className="h-10 mb-8 object-contain" />
                                <nav className="flex flex-col items-center text-xl font-bold gap-8">
                                    <Link to="/" className="text-gray-800 hover:text-orange-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                                    <Link to="/jobs" className="text-gray-800 hover:text-orange-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Search Jobs</Link>
                                    <Link to="/about" className="text-gray-800 hover:text-orange-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                                    <Link to="/contact" className="text-gray-800 hover:text-orange-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
                                </nav>
                            </div>
                            
                            <div className="flex flex-col items-center gap-4 px-4 pb-10">
                                <Link 
                                    to="/post-job"
                                    className="flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-bold w-full max-w-xs hover:bg-orange-700 transition-all shadow-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <HiOutlineSparkles />
                                    <span>POST A FREE JOB</span>
                                    <FaArrowRight />
                                </Link>
                                <Link 
                                    to={`/login?redirectTo=${location.pathname}`}
                                    className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg text-lg font-bold w-full max-w-xs hover:bg-slate-800 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <FaUser />
                                    <span>Login/Signup</span>
                                </Link>
                            </div>
                        </div>
                    </>
                )}

            </header>

            <main className="flex-grow w-full">
                <Outlet />
            </main>

            <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
                {/* Footer content ... */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex gap-6 text-sm font-medium">
                            <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"> 
                                <FaLinkedin className="text-xl" /> LinkedIn
                            </a>
                            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        </div>
                        <p className="text-xs text-slate-500">
                            &copy; {new Date().getFullYear()} SourcingXPress. All rights reserved.
                        </p>
                    </div>
                    <div className="border border-slate-700 rounded-lg p-3 flex items-center gap-3 bg-slate-800/50">
                        <div className="w-8 h-8 grid grid-cols-2 gap-0.5">
                            <span className="bg-[#F25022]"></span>
                            <span className="bg-[#7FBA00]"></span>
                            <span className="bg-[#00A4EF]"></span>
                            <span className="bg-[#FFB900]"></span>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-white font-semibold text-sm">Microsoft</span>
                            <span className="text-[10px] text-slate-400">Partner for Startups</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}