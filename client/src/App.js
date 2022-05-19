
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import NavbarComp from './components/top/NavbarComp.js';
//import CarouselComp from './components/mid/CarouselComp';
//import BottomComp from './components/bottom/BottomComp';
import NavbarContainer from './components/NavbarContainer';
import Home from './components/Home.js';
import AboutUs from './components/AboutUs.js';
import loginPatients from './components/Login/loginPatients';
import signUpPatient from './components/SignUp/signUpPatient.js';

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
        </Routes>
      </div>
  </BrowserRouter> 
  );
}

//function App() {
//  return (
  //  <div className="App">
    //  <GridComp/>
    //</div>
  //);
//}


export default App;


