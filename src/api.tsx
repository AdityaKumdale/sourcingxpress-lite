import type { Job } from "./server";


export async function getJobs(searchTerm?:string | null):Promise<Job[]> {
    
    const url = new URL('/api/jobs',window.location.origin)  

    if(searchTerm){
        url.searchParams.append('search',searchTerm)
    }
//`http://localhost:5000?search=${query}`
    const res = await fetch(url.toString())

    if(!res.ok){
        const error:any =  new Error("Failed to fetch jobs");
        error.status = res.status
        error.statusText = res.statusText
        throw error
    }

    const data = await res.json()

    return data.jobs
}

export async function getJob(jobId:number):Promise<Job>{

    const url = new URL(`/api/jobs/${jobId}`,window.location.origin)
    const res = await fetch(url)
    if(!res.ok){
        const error:any = new Error("Job detail not found")
        error.status = res.status
        error.statusText = res.statusText
        throw error 
    }
    const data = await res.json()
    //console.log(data)
    return data.job
}
//console.log(getJobs())//error

export async function loginUser(creds:Object) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

export async function applyToJob(jobId: string, userId: string) {
    
    const res = await fetch(`/api/jobs/${jobId}/apply`, { 
        method: 'post',
     
        body: JSON.stringify({ userId: userId }) 
    })
    
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message || "Failed to apply",
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}

// export async function getApplications( userId: string) {
//     const res = await fetch(`/api/applications`,{
//         method:'get',
//         body:JSON.stringify({userId:userId })
//     })

//     const data = await res.json()

//     if(!res.ok){
//         throw{
//             message:data.message || 'Failed to fetch applicatioins',
//             statusText:res.statusText,
//             status:res.status
//         }
//     }
//     console.log(data)
//     return data
// }

// --- NEW/UPDATED ---
// Fetches the *jobs* that the user has applied to.
export async function getAppliedJobs(userId: string, searchTerm?: string | null) {
    // 1. FIX: Send data as query params, not a body
    const url = new URL('/api/applications', window.location.origin);
    url.searchParams.append('userId', userId);
    
    // 2. Add search term support
    if (searchTerm) {
        url.searchParams.append('search', searchTerm);
    }
    
    // 3. This is a GET request, so no method/body needed
    const res = await fetch(url.toString());
    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.message || 'Failed to fetch applications',
            statusText: res.statusText,
            status: res.status
        }
    }
    
    // 4. The server will return the *filtered jobs*
    return data.jobs; 
}