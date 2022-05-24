
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarContainer from './components/NavbarContainer';
import Home from './components/Home.js';
import AboutUs from './components/AboutUs.js';
import loginPatients from './components/Login/loginPatients';
import signUpPatient from './components/SignUp/signUpPatient.js';
import SignUp from './components/SignUp/index.js';
import Patient from './components/Patient/index.js';
import PatientConsultation from './components/Patient/PatientConsultation.js';
import PractitionerList from './components/Practitioner/PractitionerList.js';
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const handleLogin = (storage) => {
    setIsLoggedIn(storage);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <NavbarContainer/>
        <Routes>
          <Route exact path="/" element={<Home isLoggedIn={isLoggedIn} handleLogin={handleLogin}/>}/>
          <Route exact path="/AboutUs" element={<AboutUs/>}/>
          <Route exact path="/signup/patient" element={<SignUp/>}/>
          <Route exact path="/signup/doctor" element={<SignUp isPractitioner={true}/>}/>
          <Route exact path="/Login/Patients" element={<loginPatients/>}/>
          <Route exact path="/consultation" element={<PatientConsultation/>}/>
          <Route exact path="/patient" element={<Patient/>}/>
          <Route exact path="/doctors" element={<PractitionerList filter={true}/>}/>
          <Route exact path="/doctors/consultation" element={<PatientConsultation/>}/>
        </Routes>
      </div>
  </BrowserRouter> 
  );
}

export default App;


