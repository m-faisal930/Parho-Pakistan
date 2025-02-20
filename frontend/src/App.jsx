import Dashboard from './pages/dashboard';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import About from './pages/about';
import Page404 from './pages/Page404';
import Contact from './pages/Contact';
import CaesPage from './pages/CaesPage';
import CaseDetails from './pages/CaseDetails';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
// import CasesPage from './pages/CasesPage/CasesPage';
import FilterPage from './pages/FilterPage/FilterPage';
import SchoolProfile from './pages/SchoolProfile/SchoolProfile';
import SchoolsPage from './pages/SchoolsPage/SchoolsPage';
import AddStudentPage from './pages/AddStudentPage/AddStudentPage';
import AddSchoolPage from './pages/AddSchoolPage/AddSchoolPage';
import StudentProfilePage from './pages/StudentProfilePage/StudentProfilePage';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Schools from './pages/Schools/Schools';
import SponsershipPage from './pages/SponsershipPage';

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<SplashScreen isLoggedIn={isAuthenticated} />}
        />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <SignupPage />
          }
        />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/casedetails" element={isAuthenticated?<CaseDetails />: <Navigate to={'/login'} />} />
        <Route path="/cases" element={<FilterPage />} />

        <Route path="/school" element={ isAuthenticated? <SchoolsPage />: <Navigate to={'/login'} />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/addstudent" element={ isAuthenticated? <AddStudentPage />: <Navigate to={'/login'} />} />
        <Route path="/addschool" element={ isAuthenticated? <AddSchoolPage />: <Navigate to={'/login'}/>} />
        <Route path="/studentprofile" element={isAuthenticated? <StudentProfilePage />: <Navigate to={'/login'} />} />
        <Route path="/sponsership" element={isAuthenticated? <SponsershipPage />: <Navigate to={'/login'} />} />
      </Routes>
    </>
  );
}

export default App;
