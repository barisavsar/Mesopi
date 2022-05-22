
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
import Patient from './components/Patient/index.js';
import PatientConsultation from './components/Patient/PatientConsultation.js';
import PractitionerList from './components/Practitioner/PractitionerList.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavbarContainer/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/AboutUs" element={<AboutUs/>}/>
          <Route exact path="/SignUp/Patients" element={<signUpPatient/>}/>
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


