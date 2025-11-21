import { redirect } from "react-router-dom"

export function isAuthenticated(): boolean {
    return localStorage.getItem('loggedin') === 'true'
}

export async function requireAuth(request: Request) {
    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem('loggedin')
    
    if (!isLoggedIn) {
        throw redirect(`/login?message=Please log in first.&redirectTo=${pathname}`)
    }
}








