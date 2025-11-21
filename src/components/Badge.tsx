import type { IconType } from "react-icons";
import React from 'react';

// type BadgeProps = {
//     title:string,
//     color?:string,
//     IoComponent?:IconType 
//     children?:React.ReactNode
// }

// export default function Badge( {children,title,IoComponent ,color}:BadgeProps){

//     return (
//         <>
//             <div className=" bg-red-500 rounded-lg w-fit h-fit flex items-center px-1"
//                 style={{backgroundColor:color || 'red-500'}}> 
//                 {IoComponent && <IoComponent size={16} />}
//                 <h2 className="h-5 m-0 pl-2 pr-2 text-[0.85rem] bold p-0">{title}</h2> 
//                 {children}            
//             </div>
//         </>
//     )
// }



type BadgeProps = {
  title: string;
  icon?: IconType; 
  className?: string; 
};

export default function Badge({ title, icon: Icon, className = "" }: BadgeProps) {
  return (
    <div 
      className={`
        inline-flex items-center justify-center gap-1.5 
        px-3 py-1 rounded-full text-xs font-medium 
        bg-orange-50 text-slate-700 border border-orange-100
        ${className} 
      `}
    >
      {Icon && <Icon className="text-slate-500" size={14} />}
      <span className="whitespace-nowrap">{title}</span>
    </div>
  );
}

// export default function Badge({ title, icon: Icon, className = "" }: BadgeProps) {
//   // Base classes that can be overridden
//   const baseClasses = "inline-flex items-center justify-center gap-1.5 rounded-full border";
  
//   // Default styling (can be completely overridden by className)
//   const defaultClasses = "px-3 py-1 text-xs font-medium bg-orange-50 text-slate-700 border-orange-100";
  
//   return (
//     <div 
//       className={`${baseClasses} ${className || defaultClasses}`}
//     >
//       {Icon && <Icon className="shrink-0" size={12} />}
//       <span className="whitespace-nowrap">{title}</span>
//     </div>
//   );
// }

