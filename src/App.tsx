
import './App.css'
import NotFound from './NotFound'
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"
import MainLayout from './components/MainLayout'
import Home from './pages/Home'
import JobListings, { loader as jobListingsLoader } from './pages/JobListings'
import Login,{loader as loginLoader,action as loginAction} from './pages/Login'
import JobDetail,{loader as jobDetailLoader,action as jobDetailAction} from './pages/JobDetail'
import ErrorBoundary from './Error'
import { redirect } from 'react-router-dom'
import "./server"
import { StrictMode } from 'react';

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      

      <Route index 
      element={<Home/>} 
      loader={async () => {
        const isLoggedIn = localStorage.getItem("loggedin") === "true";
        if (isLoggedIn) {
          throw redirect("/jobs");
        }
        // return null;
      }}
      errorElement={<ErrorBoundary />}
    />

      <Route path='jobs' 
      element={<JobListings/>}
      loader={jobListingsLoader}
      errorElement={<ErrorBoundary />}
      />

 
      <Route
            path='jobs/:id' 
            element={<JobDetail />}
            loader={jobDetailLoader}
            action={jobDetailAction} 
            errorElement={<ErrorBoundary />}
        />

      <Route path='login'
      element={<Login />}
      loader= {loginLoader}
      action={loginAction}
      errorElement={<ErrorBoundary />}
      />

      <Route path="*" element={<NotFound />} />

    </Route>
  ))

function App() {
  return (
    <RouterProvider router={router}/>
  )
}
ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
 // <App />
       <StrictMode>
    <App />
  </StrictMode>,
)

// export default App
