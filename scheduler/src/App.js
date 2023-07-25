import './App.css';
import { BrowserRouter, Routes,Route, Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import LoginRegisterPage from './pages/loginRegisterPage';
import LandingPage from './pages/landingPage/landingPage';
import { registerLicense } from '@syncfusion/ej2-base';
import ButtonAppBar from './components/navbar';

function App() {
  registerLicense("Ngo9BigBOggjHTQxAR8/V1NGaF5cXmpCdkx0Rnxbf1xzZFRMZVxbQXBPIiBoS35RdUVkW3tfdHVRRmVVV0J3");
  return (
    <BrowserRouter>

      <main>
        <ButtonAppBar></ButtonAppBar>
        <Routes>
          <Route path="/" element={<LoginRegisterPage />} />
          <Route path="/schedule" element={<LandingPage props={"1"}></LandingPage>}></Route>
          <Route path="/post_shifts" element={<LandingPage props={"2"}></LandingPage>}></Route>
          <Route path="/my_shifts" element={<LandingPage props={"3"}></LandingPage>}></Route>
          <Route path="/available_shifts" element={<LandingPage props={"4"}></LandingPage>}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
