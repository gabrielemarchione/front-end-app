import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './components/Home'
import OurNavbar from './components/OurNavbar';
import Login from './components/Login';
import FormCreazioneEvento from "./components/FormCreazioneEvento"
import MyEvents from './components/MyEvents';
import ProfiloUtente from './components/ProfiloUtente';
import  LeMiePrenotazioni from './components/LeMiePrenotazioni'
import RegistrazioneNuovoUtente from './components/RegistrazioneNuovoUtente';
import PannelloAdmin from './components/PannelloAdmin'

function App() {
  return (
    <BrowserRouter> 
    <div>
      <OurNavbar/>
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path ="/evento" element= {<FormCreazioneEvento />} />
        <Route path="/myevents" element= {<MyEvents />} />
        <Route path = "/profilo" element= {<ProfiloUtente/>} />
        <Route path = "/mybookings" element= {<LeMiePrenotazioni/>}  />
        <Route path = "/signup" element= {<RegistrazioneNuovoUtente/>}  />
        <Route path = "/admin" element= {<PannelloAdmin/>}  />
      </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;