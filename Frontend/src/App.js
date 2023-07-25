import './App.css';
import { BrowserRouter, Routes,Route, Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import EmployeeHomePage from './pages/employeeHomePage';
import LoginRegisterPage from './pages/loginRegisterPage';
import ManagerHomePage from './pages/managerHomePage';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<LoginRegisterPage />} />
          <Route path="employeehomepage" element={<EmployeeHomePage />} />
          <Route path="managerhomepage" element={<ManagerHomePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
