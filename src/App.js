import './App.css'

import { Routes, Route, Navigate } from 'react-router-dom';
import DashBoard from './pages/dashboard/DashBoard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import ProjectDetails from './pages/projectDetails/ProjectDetails';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';
import { BrowserRouter } from 'react-router-dom'
import OnlineUsers from './components/OnlineUsers';
import { useTheme } from './hooks/useTheme';



function App() {
  const { authIsReady, user } = useAuthContext()
  const { mode } = useTheme()

  return (
    <div className={`App ${mode}`}>
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />

            <Routes>
              <Route
                path='/'
                element={user ? <DashBoard /> : <Navigate to='/login' />} />

              <Route
                path='/create'
                element={user ? <Create /> : <Navigate to='/login' />} />

              <Route
                path='/login'
                element={user ? <Navigate to='/' /> : <Login />} />

              <Route
                path='/projects/:id'
                element={user ? <ProjectDetails /> : <Navigate to='/login' />} />

              <Route
                path='/signup'
                element={user ? <Navigate to='/' /> : <Signup />} />
            </Routes>

          </div>

          {user && <OnlineUsers />}

        </BrowserRouter>
      )}
    </div>
  );
}

export default App
