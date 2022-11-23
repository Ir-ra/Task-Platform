import './App.css'

import { Routes, Route } from 'react-router-dom';
import DashBoard from './pages/dashboard/DashBoard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import ProjectDetails from './pages/projectDetails/ProjectDetails';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';



function App() {
  return (
    <div className="App">
      <Sidebar/>
      <div className='container'>
      
        <Navbar/>
        
        <Routes>
          <Route path='/' element={<DashBoard/>} />
          <Route path='/create' element={<Create />} />
          <Route path='/login' element={<Login />} />
          <Route path='/projects/:id' element={<ProjectDetails />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
