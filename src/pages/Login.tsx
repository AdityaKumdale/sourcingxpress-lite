import React from "react"
import {
    useLoaderData,
    useNavigation,
    useNavigate ,
    Form,
    redirect,
    useActionData,
    Link
} from "react-router-dom"
import { loginUser } from "../api"



export function loader({ request }: { request: Request }) {
    const isLoggedIn = localStorage.getItem("loggedin") === "true";
    if (isLoggedIn) {
        return redirect("/jobs");
    }
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }:{request:Request}) {
    const formData = await request.formData()

    const email = formData.get("email")
    const password = formData.get("password") as string
    // const pathname = new URL(request.url)
    //     .searchParams.get("redirectTo") || '/'

    // Default redirect to /jobs if no specific history
    const pathname = new URL(request.url).searchParams.get("redirectTo") || '/jobs'
    
    try {
        const data = await loginUser({ email, password })            //get {user{},token} back
        localStorage.setItem("loggedin", "true")
        localStorage.setItem('user',JSON.stringify(data.user))
        return redirect(pathname)  
        
    } catch(err:any) {
        return err.message  
    }
}


export default function Login() {
    const errorMessage = useActionData() as string | undefined
    const message = useLoaderData() as string | undefined
    const navigation = useNavigation()

    return (
      
        <div className="min-h-screen flex items-center justify-center bg-[#4b4b4b] px-4">
            
  
            <div className="bg-white w-full max-w-[400px] p-8 md:p-10 rounded-sm shadow-xl">
                
            
                <div className="flex flex-col items-center mb-8">
                 
                    <img src ="/images/logosm.svg" alt="SourcingXPress" className="h-10 mb-4 object-contain" />
                    
                    <h1 className="text-2xl font-medium text-gray-900">Log in</h1>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                        Log in to SourcingXPress to continue
                    </p>
                </div>

               
                {message && (
                    <div className="mb-4 text-sm text-center text-red-600 bg-red-50 p-2 rounded border border-red-200">
                        {message}
                    </div>
                )}
                {errorMessage && (
                    <div className="mb-4 text-sm text-center text-red-600 bg-red-50 p-2 rounded border border-red-200">
                        {errorMessage}
                    </div>
                )}

       
                <Form method="post" replace className="flex flex-col gap-4">
                    
                    <div className="space-y-1">
                        <label className="sr-only" htmlFor="email">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email address*"
                            required
                            defaultValue="user@test.com"
                            className="w-full p-3 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="sr-only" htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password*"
                            required
                            defaultValue="123"
                            className="w-full p-3 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                        />
                    </div>

                    <button
                        disabled={navigation.state === "submitting"}
                        className="w-full bg-black text-white py-3 rounded font-medium mt-2 hover:bg-gray-800 transition-colors disabled:opacity-70"
                    >
                         {navigation.state === "submitting" ? "Logging in..." : "Log in"}
                    </button>

                </Form>

            
                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}


// export default function Login() {
//     const errorMessage = useActionData()
//     const message = useLoaderData()
//     const navigation = useNavigation()
    


//     return (
//         <div className="login-container">
//             <h1>Sign in to your account</h1>
//             {typeof message === 'string' && <h3 className="red">{message}</h3>}
//             {typeof errorMessage === 'string' && <h3 className="red">{errorMessage}</h3>}

//             <Form 
//                 method="post" 
//                 className="login-form" 
//                 replace  
//             >
//                 <input
//                     name="email"
//                     type="email"
//                     placeholder="Email address"
//                      defaultValue="user@test.com" 
//                 />
//                 <input
//                     name="password"
//                     type="password"
//                     placeholder="Password"
//                     defaultValue="123"
//                 />
//                 <button
//                     disabled={navigation.state === "submitting"}
//                 >
//                     {navigation.state === "submitting"
//                         ? "Logging in..."
//                         : "Log in"
//                     }
//                 </button>
//             </Form>
//         </div>
//     )
// }


// return {errMsg:'success',pathname:pathname }
//     const navigate = useNavigate();
//     useEffect(() => {
//     if (errorMessage && typeof errorMessage==='object' && errorMessage.errMsg === "success") {
//       navigate(errorMessage.pathname);          
//     }
//   }, [errorMessage, navigate]);