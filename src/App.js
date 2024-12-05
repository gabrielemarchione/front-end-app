import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './components/Home'
import OurNavbar from './components/OurNavbar';
import Login from './components/Login';



function App() {
  return (
    <BrowserRouter> 
    <div>
      <OurNavbar/>
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;